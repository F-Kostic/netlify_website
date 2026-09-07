// ============================================================================
// dev-screenshot.mjs
// ============================================================================
// Builds the site to static files, serves that build with a plain Node
// static file server, opens it in headless Firefox (via Playwright's
// bundled build — run `npx playwright install firefox` once beforehand),
// and saves a screenshot.
//
// Why build + a plain static server instead of `vite dev`: this repo lives
// on a network share, where Vite's dev middleware (esbuild dependency
// scanning on first request) can take minutes or hang outright. A
// production build plus serving plain files avoids that entirely.
//
// Usage:
//   node scripts/dev-screenshot.mjs [output-path] [width] [height]
//
// Examples:
//   node scripts/dev-screenshot.mjs
//   node scripts/dev-screenshot.mjs screenshots/bottom-right.png 1366 768
//
// Pass --skip-build to reuse the existing dist/ folder instead of
// rebuilding (faster, but make sure dist/ is up to date first).
// ============================================================================

import { build } from 'vite';
import { firefox } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import http from 'node:http';

const args = process.argv.slice(2).filter((a) => a !== '--skip-build');
const skipBuild = process.argv.includes('--skip-build');
const outPath = args[0] || 'screenshots/screenshot.png';
const width = parseInt(args[1] || '1440', 10);
const height = parseInt(args[2] || '900', 10);
const port = 5199; // dedicated port for this script

const root = process.cwd();
const distDir = path.join(root, 'dist');

fs.mkdirSync(path.dirname(outPath), { recursive: true });

if (!skipBuild) {
  console.log('Building site...');
  await build({ logLevel: 'warn' });
} else if (!fs.existsSync(distDir)) {
  throw new Error('dist/ does not exist — run without --skip-build first.');
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4', '.woff': 'font/woff', '.woff2': 'font/woff2',
};

// Serves dist/ for built assets, and public/ for anything else (images,
// audio referenced by absolute /images/... paths that Vite copies verbatim
// at build time — already present in dist/, this public/ fallback is just
// a safety net for anything not picked up by the build).
const publicDir = path.join(root, 'public');
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const candidates = [path.join(distDir, urlPath), path.join(publicDir, urlPath)];
  const filePath = candidates.find((p) => fs.existsSync(p) && fs.statSync(p).isFile())
    || (urlPath === '/' ? path.join(distDir, 'index.html') : null);

  if (!filePath) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

let exitCode = 0;
try {
  await new Promise((resolve) => server.listen(port, resolve));
  const url = `http://localhost:${port}`;
  console.log(`Serving dist/ at ${url}`);

  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width, height } });
  // Not 'networkidle': the site randomly auto-opens a few folder windows on
  // load, some containing YouTube/Vimeo embeds whose background requests
  // never go idle. 'load' plus a fixed settle time is enough for a static
  // screenshot.
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);

  // The desktop randomly auto-opens a few folder/media windows on load.
  // Close them so the screenshot shows the plain desktop and its icons —
  // pass --keep-windows to see the site as a first-time visitor would.
  if (!process.argv.includes('--keep-windows')) {
    for (let i = 0; i < 10; i++) {
      const closed = await page.evaluate(() => {
        const lines = document.querySelectorAll('svg line[x1="18"][y1="6"][x2="6"][y2="18"]');
        lines.forEach((line) => line.closest('button')?.click());
        return lines.length;
      });
      if (closed === 0) break;
      await page.waitForTimeout(150);
    }
  }

  await page.screenshot({ path: outPath });
  await browser.close();
  console.log(`Screenshot saved to ${outPath}`);
} catch (err) {
  console.error(err);
  exitCode = 1;
} finally {
  server.close();
  process.exit(exitCode);
}
