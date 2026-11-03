const fs = require('fs');
const path = require('path');

function walk(dir) {
  let list = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!['node_modules', 'dist', '.git', 'scripts'].includes(f)) {
        list = list.concat(walk(p));
      }
    } else if (/\.(tsx?|html)$/.test(f)) {
      list.push(p);
    }
  }
  return list;
}

const files = walk('.');
let totalReplaced = 0;

for (const f of files) {
  let text = fs.readFileSync(f, 'utf8');
  let modified = false;

  const newText = text.replace(/\/assets\/([^'"\s`)]+)\.(png|jpg|jpeg)/gi, (match, assetName, ext) => {
    const webpRel = path.join('public', 'assets', `${assetName}.webp`);
    if (fs.existsSync(webpRel)) {
      modified = true;
      totalReplaced++;
      return `/assets/${assetName}.webp`;
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(f, newText, 'utf8');
    console.log(`Updated images in: ${f}`);
  }
}

console.log(`\nReplaced ${totalReplaced} image references with .webp`);
