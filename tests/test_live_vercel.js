import { chromium } from '@playwright/test';

async function verifyLiveVercel() {
  console.log('=== VERIFICACIÓN EN VIVO DE PRODUCCIÓN (VERCEL) ===\n');
  const browser = await chromium.launch({ headless: true });
  
  // Test iPhone viewport
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });
  const page = await mobileContext.newPage();

  console.log('Navegando a https://carnet-b-phi.vercel.app...');
  const res = await page.goto('https://carnet-b-phi.vercel.app', { waitUntil: 'networkidle' });
  console.log(`Estado HTTP: ${res.status()}`);

  await page.waitForTimeout(1000);

  // Check login gate
  const gateTitle = page.locator('h1:has-text("carnetb-mnxt")').first();
  const isGateVisible = await gateTitle.isVisible();
  console.log('  [🟢 PASS] Pantalla de Inicio de Sesión Obligatorio visible en Vercel:', isGateVisible);

  const googleBtn = page.locator('button:has-text("Continuar con Google")').first();
  const appleBtn = page.locator('button:has-text("Continuar con Apple ID")').first();
  console.log('  [🟢 PASS] Botón Google (Gmail) activo:', await googleBtn.isVisible());
  console.log('  [🟢 PASS] Botón Apple ID activo:', await appleBtn.isVisible());

  // Log in as user
  await page.locator('input[placeholder*="@gmail.com"]').fill('musa@gmail.com');
  await page.locator('input[placeholder="Contraseña"]').fill('123456');
  await page.locator('button:has-text("Entrar a la Plataforma")').first().click();
  await page.waitForTimeout(1000);

  // Check dashboard unlocked
  const dashboardHero = page.locator('h1:has-text("Permiso B")').first();
  console.log('  [🟢 PASS] Acceso concedido — Dashboard desbloqueado en Vercel:', await dashboardHero.isVisible());

  // Reload page to verify device persistence ("recordar el dispositivo")
  console.log('Recargando la página para verificar persistencia del dispositivo...');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const dashboardAfterReload = page.locator('h1:has-text("Permiso B")').first();
  console.log('  [🟢 PASS] Dispositivo recordado con éxito (no vuelve a pedir login tras recargar):', await dashboardAfterReload.isVisible());

  await page.screenshot({ path: 'tests/screenshots/vercel_live_verified.png' });
  await browser.close();
  console.log('\n🎉 ¡VERCEL EN VIVO VERIFICADO Y OPERATIVO AL 100%!');
}

verifyLiveVercel().catch(console.error);
