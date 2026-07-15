import { chromium } from 'playwright-core';
import path from 'node:path';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
});

const baseURL = process.env.BLOG_URL ?? 'http://127.0.0.1:4321';
const viewports = [
  { name: 'home-desktop', path: '/', width: 1440, height: 1000 },
  { name: 'home-mobile', path: '/', width: 390, height: 844 },
  { name: 'posts-desktop', path: '/posts/', width: 1440, height: 1000 },
  { name: 'article-mobile', path: '/posts/%E6%8A%8A%E6%B3%A8%E6%84%8F%E5%8A%9B%E8%BF%98%E7%BB%99%E7%94%9F%E6%B4%BB/', width: 390, height: 844 },
];
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(`${baseURL}${viewport.path}`, { waitUntil: 'networkidle' });
  await page.screenshot({
    path: path.join(process.cwd(), `verification-${viewport.name}.png`),
    fullPage: true,
  });

  const metrics = await page.evaluate(() => {
    const offenders = [...document.querySelectorAll('body *')]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return { tag: element.tagName, className: element.className, left: rect.left, right: rect.right };
      })
      .filter(({ left, right }) => left < -1 || right > document.documentElement.clientWidth + 1)
      .slice(0, 8);
    return {
      title: document.title,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      images: [...document.images].map((image) => ({ src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 })),
      offenders,
    };
  });

  await page.locator('.menu-toggle').click();
  const menuVisible = await page.locator('.site-menu').getAttribute('aria-hidden') === 'false';
  await page.waitForTimeout(650);
  if (viewport.name === 'home-mobile') {
    await page.screenshot({ path: path.join(process.cwd(), 'verification-menu-mobile.png'), fullPage: false });
  }
  await page.locator('.theme-toggle').click();
  const theme = await page.locator('html').getAttribute('data-theme');
  results.push({ viewport, ...metrics, menuVisible, themeAfterToggle: theme, consoleErrors: errors });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));

if (results.some((result) => result.scrollWidth > result.clientWidth || result.consoleErrors.length || result.images.some((image) => !image.loaded))) {
  process.exitCode = 1;
}
