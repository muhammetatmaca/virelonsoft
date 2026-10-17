import https from 'node:https';

const URLS = [
  'https://virelonsoft.muhammetatmaca.com.tr/',
  'https://virelonsoft.muhammetatmaca.com.tr/projects',
  'https://virelonsoft.muhammetatmaca.com.tr/supply',
  'https://virelonsoft.muhammetatmaca.com.tr/ai',
  'https://virelonsoft.muhammetatmaca.com.tr/equator',
  'https://virelonsoft.muhammetatmaca.com.tr/tickets',
  'https://virelonsoft.muhammetatmaca.com.tr/robots.txt',
  'https://virelonsoft.muhammetatmaca.com.tr/sitemap.xml',
  'https://virelonsoft.muhammetatmaca.com.tr/image-sitemap.xml',
  'https://virelonsoft.muhammetatmaca.com.tr/geositemap.xml',
  'https://virelonsoft.muhammetatmaca.com.tr/llms.txt',
  'https://virelonsoft.muhammetatmaca.com.tr/llms-full.txt',
  'https://virelonsoft.muhammetatmaca.com.tr/humans.txt',
  'https://virelonsoft.muhammetatmaca.com.tr/security.txt',
  'https://virelonsoft.muhammetatmaca.com.tr/feed.xml'
];

console.log('================================================================');
console.log('🏛️ INTERNET ARCHIVE (WAYBACK MACHINE) SNAPSHOT ENGINE — VIRELONSOFT');
console.log('================================================================');

for (const targetUrl of URLS) {
  const saveUrl = `https://web.archive.org/save/${targetUrl}`;
  console.log(`[Wayback Machine] Submitting: ${targetUrl}...`);

  https.get(saveUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  }, (res) => {
    console.log(`✅ [Wayback Response]: ${targetUrl} -> Status: ${res.statusCode} (Archived)`);
  }).on('error', (err) => {
    console.log(`⚠️  [Wayback Note]: ${targetUrl} -> ${err.message}`);
  });
}
