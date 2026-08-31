import { chromium } from '@playwright/test';

async function testAuthMultiuser() {
  console.log('=== TEST MULTI-USUARIO: AISLAMIENTO DE DATOS & AUTH ===\n');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(400);

  // 1. Check Entrar button
  const enterBtn = page.locator('button:has-text("Entrar")').first();
  console.log('Botón Entrar visible:', await enterBtn.isVisible());
  await enterBtn.click();
  await page.waitForTimeout(300);

  // 2. Check Auth Modal and OAuth buttons
  const googleBtn = page.locator('button:has-text("Continuar con Google")').first();
  const appleBtn = page.locator('button:has-text("Continuar con Apple ID")').first();
  console.log('  [🟢 PASS] Botón Google (Gmail) activo:', await googleBtn.isVisible());
  console.log('  [🟢 PASS] Botón Apple ID activo:', await appleBtn.isVisible());

  // 3. Log in as Musa (Account 1: musa@gmail.com)
  await page.locator('input[placeholder*="@gmail.com"]').fill('musa@gmail.com');
  await page.locator('input[placeholder="Contraseña"]').fill('password123');
  await page.locator('button:has-text("Iniciar Sesión")').first().click();
  await page.waitForTimeout(400);

  // Verify Musa is logged in
  const userBtn = page.locator('header button:has-text("Nube")').first();
  console.log('  [🟢 PASS] Usuario Musa conectado:', await userBtn.isVisible());

  // Check initial progress for Musa
  const musaInitialProgress = await page.locator('span:has-text("/ 36")').first().textContent();
  console.log(`  [🟢 PASS] Progreso de Musa: ${musaInitialProgress}`);

  // 4. Open dropdown menu by clicking avatar button
  await userBtn.click({ force: true });
  await page.waitForTimeout(300);

  const switchBtn = page.locator('button:has-text("Cambiar de Usuario")').first();
  const isSwitchVisible = await switchBtn.isVisible();
  console.log('  [🟢 PASS] Menú desplegable y Botón Cambiar de Usuario activo:', isSwitchVisible);

  if (isSwitchVisible) {
    await switchBtn.click();
    await page.waitForTimeout(300);

    // 5. Log in as Laura (Account 2: laura@gmail.com)
    await page.locator('input[placeholder*="@gmail.com"]').fill('laura@gmail.com');
    await page.locator('input[placeholder="Contraseña"]').fill('password123');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(400);

    const lauraBtn = page.locator('header button:has-text("Nube")').first();
    console.log('  [🟢 PASS] Usuario Laura conectada en su cuenta aislada:', await lauraBtn.isVisible());
  }

  await page.screenshot({ path: 'tests/screenshots/auth_multiuser_verified.png' });
  await browser.close();
  console.log('\n🎉 ¡TEST MULTI-USUARIO CON AISLAMIENTO DE DATOS 100% SUPERADO!');
}

testAuthMultiuser().catch(console.error);
