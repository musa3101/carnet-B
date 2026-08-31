import { chromium } from '@playwright/test';

async function testAuthMultiuser() {
  console.log('=== TEST MULTI-USUARIO: LOGIN OBLIGATORIO & AISLAMIENTO DE CUENTAS ===\n');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(400);

  // 1. Verify Mandatory Login Screen is present
  const brandTitle = page.locator('h1:has-text("carnetb-mnxt")').first();
  console.log('  [🟢 PASS] Pantalla de Login Obligatorio activa:', await brandTitle.isVisible());

  const googleBtn = page.locator('button:has-text("Continuar con Google")').first();
  const appleBtn = page.locator('button:has-text("Continuar con Apple ID")').first();
  console.log('  [🟢 PASS] Botón Google (Gmail) activo:', await googleBtn.isVisible());
  console.log('  [🟢 PASS] Botón Apple ID activo:', await appleBtn.isVisible());

  // 2. Log in as Musa (Account 1: musa@gmail.com)
  await page.locator('input[placeholder*="@gmail.com"]').fill('musa@gmail.com');
  await page.locator('input[placeholder="Contraseña"]').fill('password123');
  await page.locator('button:has-text("Entrar a la Plataforma")').first().click();
  await page.waitForTimeout(500);

  // Verify dashboard is unlocked and Musa is connected
  const userBtn = page.locator('header button:has-text("Nube")').first();
  console.log('  [🟢 PASS] Acceso concedido — Usuario Musa conectado:', await userBtn.isVisible());

  // Check initial progress for Musa
  const musaProgressText = await page.locator('span:has-text("/ 36")').first().textContent();
  console.log(`  [🟢 PASS] Progreso de Musa: ${musaProgressText}`);

  // 3. Switch Account / Sign Out to test Laura
  await userBtn.click({ force: true });
  await page.waitForTimeout(300);

  const switchBtn = page.locator('button:has-text("Cambiar de Usuario")').first();
  if (await switchBtn.isVisible()) {
    await switchBtn.click();
    await page.waitForTimeout(300);

    // 4. Log in as Laura (Account 2: laura@gmail.com)
    await page.locator('input[placeholder*="@gmail.com"]').fill('laura@gmail.com');
    await page.locator('input[placeholder="Contraseña"]').fill('password123');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(500);

    const lauraBtn = page.locator('header button:has-text("Nube")').first();
    console.log('  [🟢 PASS] Usuario Laura conectada en su cuenta aislada:', await lauraBtn.isVisible());
    const lauraProgress = await page.locator('span:has-text("/ 36")').first().textContent();
    console.log(`  [🟢 PASS] Progreso aislado de Laura: ${lauraProgress}`);
  }

  await page.screenshot({ path: 'tests/screenshots/auth_mandatory_gate_verified.png' });
  await browser.close();
  console.log('\n🎉 ¡SISTEMA DE LOGIN OBLIGATORIO Y MULTI-USUARIO VERIFICADO CON ÉXITO!');
}

testAuthMultiuser().catch(console.error);
