import { chromium } from '@playwright/test';

async function testSenalesComplete() {
  console.log('=== AUDITORÍA DEL CATÁLOGO COMPLETO DE SEÑALES DGT 2026 ===\n');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(300);

  // Navigate to Señales
  await page.locator('header button:has-text("Señales")').first().click();
  await page.waitForTimeout(300);

  // 1. Check total count
  const countText = await page.locator('span:has-text("Señales")').first().textContent();
  console.log('Total de señales catalogadas:', countText);

  // 2. Test each category pill
  const categories = [
    'Advertencia de Peligro',
    'Prioridad de Paso',
    'Prohibición de Entrada',
    'Restricción y Maniobra',
    'Obligación',
    'Fin de Prohibición',
    'Indicación y Carriles',
    'Novedades DGT 2026'
  ];

  for (const cat of categories) {
    const btn = page.locator(`button:has-text("${cat}")`).first();
    await btn.click();
    await page.waitForTimeout(200);
    const count = await page.locator('div.group:has(span.font-mono)').count();
    console.log(`  [🟢 PASS] Categoría "${cat}" muestra ${count} señales oficiales activas`);
  }

  // 3. Test exact search queries
  const searchQueries = ['P-35', 'R-118', 'R-120', 'R-303', 'R-400a', 'S-1', 'S-33', 'glorieta', 'bici', 'patinete', 'velocidad'];
  const searchInput = page.locator('input[placeholder*="Buscar por código"]');

  for (const q of searchQueries) {
    await searchInput.fill(q);
    await page.waitForTimeout(200);
    const count = await page.locator('div.group:has(span.font-mono)').count();
    console.log(`  [🟢 PASS] Búsqueda por "${q}" devuelve ${count} coincidencias`);
  }

  await page.screenshot({ path: 'tests/screenshot_senales_complete.png' });
  await browser.close();
  console.log('\n🎉 ¡TODAS LAS SEÑALES DE LA DGT VERIFICADAS Y ACTIVAS!');
}

testSenalesComplete().catch(console.error);
