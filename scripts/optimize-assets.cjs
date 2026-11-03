/**
 * FLEX Asset Optimizer
 * Converts all heavy image assets to modern WebP format
 * and creates optimized fallback versions.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSET_DIRS = [
  'public/assets/products',
  'public/assets/branding',
  'public/assets/hero',
  'public/assets/lookbook'
];

async function optimizeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file.endsWith('.webp')) continue;
    if (!/\.(png|jpe?g)$/i.test(file)) continue;

    const fullPath = path.join(dirPath, file);
    const parsed = path.parse(fullPath);
    const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

    const origStat = fs.statSync(fullPath);
    const origMb = (origStat.size / (1024 * 1024)).toFixed(2);

    try {
      // 1. Generate WebP (quality 82, max width 1400px)
      await sharp(fullPath)
        .resize({ width: 1400, height: 1750, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(webpPath);

      const webpStat = fs.statSync(webpPath);
      const webpKb = (webpStat.size / 1024).toFixed(1);
      const reduction = (((origStat.size - webpStat.size) / origStat.size) * 100).toFixed(1);

      console.log(`✓ Converted: ${file} (${origMb} MB) -> ${parsed.name}.webp (${webpKb} KB, -${reduction}%)`);
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err.message);
    }
  }
}

async function main() {
  console.log('====================================================');
  console.log('FLEX ASSET OPTIMIZER (PNG/JPG -> WebP)');
  console.log('====================================================\n');

  for (const dir of ASSET_DIRS) {
    console.log(`Processing ${dir}...`);
    await optimizeDirectory(dir);
  }

  // Create video poster image from lifestyle hero
  const heroPath = 'public/assets/hero/hero-lifestyle.png';
  if (fs.existsSync(heroPath)) {
    const posterPath = 'public/assets/video/video-poster.webp';
    await sharp(heroPath)
      .resize({ width: 1280, height: 720, fit: 'cover' })
      .webp({ quality: 75 })
      .toFile(posterPath);
    console.log(`\n✓ Generated video poster: ${posterPath}`);
  }

  console.log('\nAsset optimization complete!');
}

main().catch(console.error);
