import { chromium } from '@playwright/test';

async function debugVercel() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const logs = [];
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[PAGE_ERROR] ${err.message}`));

  await page.goto('https://carnet-b-phi.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('Console logs on Vercel:');
  console.log(logs);

  const title = await page.title();
  console.log('Page Title:', title);

  const bodyHtml = await page.innerHTML('body');
  console.log('Body HTML snippet:', bodyHtml.substring(0, 500));

  await page.screenshot({ path: 'tests/screenshots/vercel_debug.png' });
  await browser.close();
}

debugVercel().catch(console.error);
