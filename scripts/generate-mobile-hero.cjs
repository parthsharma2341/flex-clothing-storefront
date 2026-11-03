const sharp = require('sharp');
const fs = require('fs');

async function main() {
  const source = 'public/assets/products/muscle-tee-black.png';
  if (!fs.existsSync(source)) {
    console.error('Source does not exist:', source);
    return;
  }

  // 1. Mobile variant: 600x750 (perfect for 360px-412px mobile screens at ~1.5x-2x DPR)
  await sharp(source)
    .resize({ width: 600, height: 750, fit: 'cover' })
    .webp({ quality: 80, effort: 6 })
    .toFile('public/assets/products/muscle-tee-black-mobile.webp');

  const mobileStat = fs.statSync('public/assets/products/muscle-tee-black-mobile.webp');
  console.log('Mobile WebP generated:', (mobileStat.size / 1024).toFixed(1), 'KB');

  // 2. Desktop variant: 1000x1250 (crisp for large displays)
  await sharp(source)
    .resize({ width: 1000, height: 1250, fit: 'cover' })
    .webp({ quality: 80, effort: 6 })
    .toFile('public/assets/products/muscle-tee-black.webp');

  const deskStat = fs.statSync('public/assets/products/muscle-tee-black.webp');
  console.log('Desktop WebP generated:', (deskStat.size / 1024).toFixed(1), 'KB');
}

main().catch(console.error);
