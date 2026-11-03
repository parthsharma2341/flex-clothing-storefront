/**
 * FLEX — Direct GitHub Publisher
 * Pushes the codebase directly to GitHub using the GitHub REST & Git Data APIs.
 * Requires: GITHUB_TOKEN
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.argv[2];
const REPO_NAME = process.env.REPO_NAME || process.argv[3] || 'flex-clothing-storefront';
const IS_PRIVATE = process.env.IS_PRIVATE === 'true';

if (!GITHUB_TOKEN) {
  console.error('\n❌ ERROR: GitHub Token not provided.');
  console.log('\nUsage:');
  console.log('  node scripts/publish-to-github.cjs <YOUR_GITHUB_TOKEN> [REPO_NAME]');
  console.log('Or:');
  console.log('  $env:GITHUB_TOKEN="ghp_xxx"; node scripts/publish-to-github.cjs');
  process.exit(1);
}

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        headers: {
          'User-Agent': 'FLEX-Storefront-Publisher',
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const parsed = body ? JSON.parse(body) : {};
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(new Error(`GitHub API [${res.statusCode}]: ${parsed.message || body}`));
            }
          } catch (e) {
            reject(new Error(`Failed to parse response: ${body}`));
          }
        });
      }
    );

    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (
      file === 'node_modules' ||
      file === 'dist' ||
      file === '.git' ||
      file === '.gemini' ||
      file === '3d-paper.json'
    ) {
      continue;
    }
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getFiles(full, fileList);
    } else {
      fileList.push(full);
    }
  }
  return fileList;
}

async function main() {
  console.log('====================================================');
  console.log('FLEX GITHUB REPOSITORY PUBLISHER');
  console.log('====================================================\n');

  console.log('1. Authenticating with GitHub API...');
  const user = await request({ hostname: 'api.github.com', path: '/user', method: 'GET' });
  console.log(`   Authenticated as GitHub User: @${user.login} (${user.name || user.login})`);

  console.log(`\n2. Accessing repository "${REPO_NAME}" on GitHub...`);
  let repo;
  try {
    repo = await request({ hostname: 'api.github.com', path: `/repos/${user.login}/${REPO_NAME}`, method: 'GET' });
    console.log(`   ✓ Connected to existing repository: ${repo.html_url}`);
  } catch (err) {
    console.log(`   Creating repository "${REPO_NAME}" on GitHub...`);
    repo = await request(
      { hostname: 'api.github.com', path: '/user/repos', method: 'POST' },
      {
        name: REPO_NAME,
        description: 'FLEX — Premium Athletic Performance & Luxury Streetwear E-Commerce Storefront',
        private: IS_PRIVATE,
        auto_init: true,
      }
    );
    console.log(`   ✓ Repository created: ${repo.html_url}`);
  }

  console.log('\n3. Scanning workspace files...');
  const allFiles = getFiles('.');
  console.log(`   Found ${allFiles.length} files to commit.`);

  console.log('\n4. Uploading file blobs to GitHub...');
  const treeItems = [];
  let count = 0;

  for (const file of allFiles) {
    const relativePath = file.replace(/\\/g, '/').replace(/^\.\//, '');
    const content = fs.readFileSync(file);
    const base64Content = content.toString('base64');

    const blob = await request(
      { hostname: 'api.github.com', path: `/repos/${user.login}/${REPO_NAME}/git/blobs`, method: 'POST' },
      { content: base64Content, encoding: 'base64' }
    );

    treeItems.push({
      path: relativePath,
      mode: '100644',
      type: 'blob',
      sha: blob.sha,
    });

    count++;
    if (count % 20 === 0 || count === allFiles.length) {
      process.stdout.write(`   Uploaded ${count}/${allFiles.length} files...\r`);
    }
  }
  console.log(`\n   ✓ All ${allFiles.length} files uploaded as git blobs.`);

  console.log('\n5. Creating Git Tree...');
  const tree = await request(
    { hostname: 'api.github.com', path: `/repos/${user.login}/${REPO_NAME}/git/trees`, method: 'POST' },
    { tree: treeItems }
  );
  console.log(`   ✓ Tree created with SHA: ${tree.sha.substring(0, 10)}...`);

  console.log('\n6. Fetching main branch reference...');
  let parentCommitSha = null;
  try {
    const ref = await request({ hostname: 'api.github.com', path: `/repos/${user.login}/${REPO_NAME}/git/ref/heads/main`, method: 'GET' });
    parentCommitSha = ref.object.sha;
  } catch {
    // Brand new repository might not have heads/main yet
  }

  console.log('\n7. Creating Commit...');
  const commit = await request(
    { hostname: 'api.github.com', path: `/repos/${user.login}/${REPO_NAME}/git/commits`, method: 'POST' },
    {
      message: 'perf: Google PageSpeed 90-95+ mobile optimization (Self-hosted zero-roundtrip fonts, responsive 63KB hero WebP, preloaded WOFF2, console strip)',
      tree: tree.sha,
      parents: parentCommitSha ? [parentCommitSha] : [],
    }
  );
  console.log(`   ✓ Commit created with SHA: ${commit.sha.substring(0, 10)}...`);

  console.log('\n8. Updating main branch reference...');
  if (parentCommitSha) {
    await request(
      { hostname: 'api.github.com', path: `/repos/${user.login}/${REPO_NAME}/git/refs/heads/main`, method: 'PATCH' },
      { sha: commit.sha, force: true }
    );
  } else {
    try {
      await request(
        { hostname: 'api.github.com', path: `/repos/${user.login}/${REPO_NAME}/git/refs`, method: 'POST' },
        { ref: 'refs/heads/main', sha: commit.sha }
      );
    } catch {
      await request(
        { hostname: 'api.github.com', path: `/repos/${user.login}/${REPO_NAME}/git/refs/heads/main`, method: 'PATCH' },
        { sha: commit.sha, force: true }
      );
    }
  }
  console.log(`   ✓ Branch main updated to latest commit.`);

  console.log('\n====================================================');
  console.log('🎉 REPOSITORY SUCCESSFULLY PUBLISHED TO GITHUB!');
  console.log(`Repository URL: ${repo.html_url}`);
  console.log('====================================================\n');
}

main().catch((err) => {
  console.error('\n❌ Deployment failed:', err.message);
  process.exit(1);
});
