import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'virelonsoft.muhammetatmaca.com.tr';
const KEY = 'd8b5c924e17f48a1a36e92b5d4f71a08';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Read all URLs from sitemap.xml
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

const urlRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
const urls = [];
let match;
while ((match = urlRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1]);
}

console.log(`[IndexNow] Found ${urls.length} URLs in sitemap.xml for ${HOST}`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

const endpoints = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

async function submitToIndexNow() {
  console.log(`[IndexNow] Submitting ${urls.length} URLs to IndexNow endpoints...`);

  for (const endpoint of endpoints) {
    try {
      console.log(`[IndexNow] Pinging ${endpoint}...`);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      console.log(`[IndexNow] Endpoint: ${endpoint} -> Status: ${response.status} (${response.statusText})`);
      if (response.status === 200 || response.status === 202) {
        console.log(`[IndexNow] SUCCESS: All ${urls.length} URLs submitted to ${endpoint}!`);
      } else {
        const text = await response.text();
        console.log(`[IndexNow] Response details: ${text}`);
      }
    } catch (err) {
      console.error(`[IndexNow] Error submitting to ${endpoint}:`, err.message);
    }
  }
}

submitToIndexNow();
