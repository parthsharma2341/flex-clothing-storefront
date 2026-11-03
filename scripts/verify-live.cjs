const https = require('https');

function check(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          hasLcpPreload: data.includes('rel="preload" as="image" href="/assets/products/muscle-tee-black.webp"'),
          hasFontPreload: data.includes('fonts.googleapis.com'),
          bodySnippet: data.substring(0, 300)
        });
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Probing https://www.flex-fit.shop ...');
  const result = await check('https://www.flex-fit.shop/?v=' + Date.now());
  console.log('HTTP Status:', result.statusCode);
  console.log('LCP Hero Image Preload present:', result.hasLcpPreload);
  console.log('Font Preload present:', result.hasFontPreload);
}

main().catch(console.error);
