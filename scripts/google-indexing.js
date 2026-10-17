import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml');
const CREDENTIALS_PATH = path.resolve(__dirname, '../service_account.json');

// 1. Read URLs from sitemap
const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urlRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
const urls = [];
let match;
while ((match = urlRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1]);
}

console.log(`================================================================`);
console.log(`🚀 GOOGLE INDEXING API & CRAWL PING ENGINE — VIRELONSOFT`);
console.log(`================================================================`);
console.log(`[Google Indexing] Toplam ${urls.length} adet taranacak URL bulundu.`);

// 2. Ping Google Sitemap Ping Endpoint
async function pingGoogleSitemap() {
  const pingUrl = `https://www.google.com/ping?sitemap=https://virelonsoft.muhammetatmaca.com.tr/sitemap.xml`;
  console.log(`\n[Ping] Googlebot Sitemap Ping endpointine sinyal gönderiliyor...`);
  try {
    const res = await fetch(pingUrl);
    console.log(`[Ping] Google Ping Yanıtı: ${res.status} ${res.statusText}`);
    console.log(`[Ping] Googlebot sitemap.xml dosyasını yeniden tarama kuyruğuna aldı.`);
  } catch (err) {
    console.warn(`[Ping] Ping uyarısı:`, err.message);
  }
}

// 3. Helper: Generate Google OAuth2 JWT Token using native crypto
function generateJwtToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const claimSet = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const base64UrlHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64UrlClaimSet = Buffer.from(JSON.stringify(claimSet)).toString('base64url');
  const signatureInput = `${base64UrlHeader}.${base64UrlClaimSet}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(serviceAccount.private_key, 'base64url');

  return `${signatureInput}.${signature}`;
}

// 4. Exchange JWT for Google Access Token
async function getAccessToken(serviceAccount) {
  const jwtToken = generateJwtToken(serviceAccount);
  const params = new URLSearchParams();
  params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  params.append('assertion', jwtToken);

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google OAuth token hatası: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

// 5. Publish URL to Google Indexing API
async function publishUrl(url, accessToken) {
  const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      url: url,
      type: 'URL_UPDATED',
    }),
  });

  const data = await response.json();
  return { status: response.status, ok: response.ok, data };
}

// 6. Main Orchestrator
async function runIndexing() {
  await pingGoogleSitemap();

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.warn(`\n[Uyarı] service_account.json bulunamadı. Sadece sitemap ping çalıştırıldı.`);
    return;
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  } catch (err) {
    console.error(`[Hata] service_account.json okunamadı:`, err.message);
    return;
  }

  console.log(`\n[OAuth] Google Indexing API için yetkilendirme alınıyor (${serviceAccount.client_email})...`);
  let accessToken;
  try {
    accessToken = await getAccessToken(serviceAccount);
    console.log(`[OAuth] Başarılı! Access Token alındı.`);
  } catch (err) {
    console.error(`[OAuth Hata]`, err.message);
    return;
  }

  console.log(`\n[Indexing] URL bildirimleri Googlebot API'sine gönderiliyor...`);
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const targetUrl = urls[i];
    try {
      const result = await publishUrl(targetUrl, accessToken);
      if (result.ok) {
        successCount++;
        console.log(`  [${i + 1}/${urls.length}] OK (${result.status}) -> ${targetUrl}`);
      } else {
        failCount++;
        console.warn(`  [${i + 1}/${urls.length}] HATA (${result.status}) -> ${targetUrl} [${result.data?.error?.message || 'Bilinmeyen hata'}]`);
      }
    } catch (err) {
      failCount++;
      console.error(`  [${i + 1}/${urls.length}] İSTEK HATASI -> ${targetUrl}:`, err.message);
    }
  }

  console.log(`\n================================================================`);
  console.log(`✨ BİTTİ: ${successCount} başarılı, ${failCount} hatalı bildirim.`);
  console.log(`================================================================`);
}

runIndexing();
