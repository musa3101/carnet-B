import { chromium } from '@playwright/test';

async function testExactQuestion() {
  console.log('=== TEST DE PRECISIÓN DEL PROFESOR IA ===\n');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(300);

  // 1. Open Professor
  await page.locator('button:has-text("Profesor IA")').first().click();
  await page.waitForTimeout(300);

  // 2. Ask exact user question
  const input = page.locator('input[placeholder*="Pregúntale a tu profesor"]');
  await input.fill('Cuál es la diferencia entre una autopista y una autovía?');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);

  // 3. Inspect last message bubble text
  const lastBubble = page.locator('div.text-slate-100').last();
  const text = await lastBubble.textContent();
  console.log('RESPUESTA DEL PROFESOR:\n', text);

  // Check key concepts in response
  const hasAcceso = text.includes('Acceso a propiedades') || text.includes('colindantes');
  const hasBicis = text.includes('Bicicletas') || text.includes('bicicletas');
  const hasPeajes = text.includes('peaje') || text.includes('Peajes');

  if (hasAcceso && hasBicis && hasPeajes) {
    console.log('\n[🟢 PASS] La respuesta responde EXACTAMENTE a la diferencia entre autopista y autovía con todos los puntos clave.');
  } else {
    console.log('\n[🔴 FAIL] Falta precisión en la respuesta.');
  }

  await page.screenshot({ path: 'tests/screenshot_profesor_exact.png' });
  await browser.close();
}

testExactQuestion().catch(console.error);
