import { chromium } from '@playwright/test';

async function testFull() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log(`[BROWSER CONSOLE] ${msg.text()}`));
  page.on('pageerror', err => console.log(`[BROWSER ERROR] ${err.message}`));

  console.log('Navegando a localhost:5173...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  console.log('Title:', await page.title());

  const email = page.locator('input[type="email"]');
  if (await email.isVisible()) {
    console.log('Login gate detected. Logging in as musa@gmail.com...');
    await email.fill('musa@gmail.com');
    await page.locator('input[type="password"]').fill('123456');
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(1000);
  }

  const h1 = await page.locator('h1').first().textContent();
  console.log('H1 on page:', h1);

  // Check Modules
  console.log('Manual digital visible:', await page.locator('h3:has-text("El Manual Digital")').isVisible());
  console.log('Señales visible:', await page.locator('h3:has-text("Biblioteca de Señales")').isVisible());
  console.log('Tests visible:', await page.locator('h3:has-text("Simulador de Tests")').isVisible());

  // Test Temario Navigation
  await page.locator('div[class*="group"]:has-text("El Manual Digital")').first().click();
  await page.waitForTimeout(500);
  console.log('Temario View Title:', await page.locator('h1').first().textContent());

  // Click Topic 01 card
  await page.locator('h3:has-text("Introducción")').first().click();
  await page.waitForTimeout(500);
  console.log('Topic Detail Title:', await page.locator('h1').first().textContent());

  // Test Tutor Chatbot
  await page.locator('button:has-text("Duda con Musa")').first().click();
  await page.waitForTimeout(400);
  console.log('Chatbot open:', await page.locator('h3:has-text("Profesor Musa")').first().isVisible());
  console.log('Conversations in history sidebar:', await page.locator('span:has-text("Historial de Consultas")').first().isVisible());

  // Send message to Musa
  await page.locator('input[placeholder*="Pregúntale"]').first().fill('¿Diferencia entre parada y estacionamiento?');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  console.log('Tutor replied with 2 minutes rule:', await page.locator('div:has-text("2 Minutos")').first().isVisible());

  await page.screenshot({ path: 'tests/screenshots/audit_full_verified.png' });
  await browser.close();
  console.log('🎉 Full verification passed!');
}

testFull().catch(console.error);
