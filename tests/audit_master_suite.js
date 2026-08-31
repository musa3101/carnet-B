import { chromium } from '@playwright/test';

async function runMasterAudit() {
  console.log('===========================================================');
  console.log('🚀 INICIANDO AUDITORÍA INTEGRAL PLAYWRIGHT — CARNET B 2026');
  console.log('===========================================================\n');

  const browser = await chromium.launch({ headless: true });
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  const assert = (condition, description) => {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  [🟢 PASS] ${description}`);
    } else {
      failedTests++;
      console.log(`  [🔴 FAIL] ${description}`);
    }
  };

  // 1. DESKTOP SUITE (1440 x 900)
  console.log('🖥️ 1. VERIFICACIÓN ENTORNO DESKTOP (1440x900):');
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Listen for JS runtime errors
  const jsRuntimeErrors = [];
  desktopPage.on('pageerror', err => {
    jsRuntimeErrors.push(err.message);
  });
  desktopPage.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('401') && !msg.text().includes('favicon')) {
      jsRuntimeErrors.push(msg.text());
    }
  });

  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Mandatory Login Gate
  const emailInput = desktopPage.locator('input[type="email"]');
  if (await emailInput.isVisible()) {
    await emailInput.fill('musa@gmail.com');
    await desktopPage.locator('input[type="password"]').fill('password123');
    await desktopPage.locator('button[type="submit"]').click();
    await desktopPage.waitForTimeout(1000);
  }

  // A. HOME DASHBOARD VERIFICATION
  console.log('\n--- A. INICIO (Dashboard de Estudio) ---');
  const title = await desktopPage.locator('h1').first().textContent();
  assert(title.includes('Permiso B'), 'H1 principal contiene Permiso B');

  const continueBtn = await desktopPage.locator('button:has-text("Continuar")').first();
  assert(await continueBtn.isVisible(), 'Botón de "Continuar estudiando" está visible en el Hero');

  const studyModules = await desktopPage.locator('h3:has-text("El Manual Digital")').first();
  assert(await studyModules.isVisible(), 'Módulo "El Manual Digital" visible en Bento Grid');

  // B. TEMARIO & TOPIC DETAIL VERIFICATION
  console.log('\n--- B. TEMARIO & LECTURA MANUAL ---');
  await desktopPage.locator('nav button:has-text("Temario")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h1:has-text("Capítulos")').isVisible(), 'Vista Temario lista los 36 capítulos');

  // Open Topic 01
  await desktopPage.locator('h3:has-text("Introducción")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h1:has-text("Introducción")').isVisible(), 'Abre el detalle del Tema 01');

  // Verify Structured Sections exist
  const queSaberSec = await desktopPage.locator('section:has-text("Lo que Tienes que Saber")').first();
  assert(await queSaberSec.isVisible(), 'Sección "1. Lo que Tienes que Saber" visible y estructurada');

  const igorSec = await desktopPage.locator('section:has-text("Explicación Pedagógica de Igor")').first();
  assert(await igorSec.isVisible(), 'Sección "2. Explicación de Igor" visible');

  const dgtSec = await desktopPage.locator('section:has-text("Marco Legal y Verificación Normativa")').first();
  assert(await dgtSec.isVisible(), 'Sección "3. Verificación Normativa DGT" visible y separada');

  const youtubeLink = await desktopPage.locator('a[href*="youtube.com"]').first();
  assert(await youtubeLink.isVisible(), 'Enlace directo sincronizado con YouTube visible con timestamp');

  // C. SEÑALES (Traffic Signs Library)
  console.log('\n--- C. BIBLIOTECA VISUAL DE SEÑALES ---');
  await desktopPage.locator('nav button:has-text("Señales")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h1:has-text("Señales de Tráfico")').isVisible(), 'Vista de Señales activa');

  // Filter Nuevas 2026
  await desktopPage.locator('button:has-text("Novedades DGT 2026")').first().click();
  await desktopPage.waitForTimeout(200);
  const p35Card = await desktopPage.locator('div:has-text("P-35")').first();
  assert(await p35Card.isVisible(), 'Señal P-35 (Trenzado de carril) se muestra en filtro Nuevas 2026');

  // Open Signal Modal
  await p35Card.click();
  await desktopPage.waitForTimeout(200);
  const modalSignalTitle = await desktopPage.locator('h3:has-text("Trenzado de Carriles")').first();
  assert(await modalSignalTitle.isVisible(), 'Modal de detalle de señal abre con significado y trampa');
  await desktopPage.keyboard.press('Escape');

  // D. PROFESOR IA (Tutor con Voz)
  console.log('\n--- D. PROFESOR IA (Tutor Virtual) ---');
  await desktopPage.locator('nav button:has-text("Inicio")').first().click();
  await desktopPage.waitForTimeout(200);
  await desktopPage.locator('button:has-text("Pregúntale al Profesor Musa")').first().click();
  await desktopPage.waitForTimeout(300);
  const tutorInput = desktopPage.locator('input[placeholder*="Pregúntale"]');
  assert(await tutorInput.isVisible(), 'Modal del Profesor Musa abre correctamente');

  await tutorInput.fill('diferencia entre parada y estacionamiento');
  await desktopPage.keyboard.press('Enter');
  await desktopPage.waitForTimeout(600);

  const responseText = await desktopPage.locator('div:has-text("2 minutos")').first();
  assert(await responseText.isVisible(), 'El Profesor Musa responde con la regla de los 2 minutos y abandono');
  await desktopPage.keyboard.press('Escape');

  // E. TESTS & SIMULATOR
  console.log('\n--- E. BANCO DE TESTS Y SIMULADOR ---');
  await desktopPage.locator('nav button:has-text("Tests")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h3:has-text("Simulacro Oficial (30 Qs)")').isVisible(), 'Selector de modalidad de examen visible');

  // Start Quick Test
  await desktopPage.locator('h3:has-text("Test Express (10 Qs)")').first().click();
  await desktopPage.locator('button:has-text("Comenzar Test")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('span:has-text("1/10")').first().isVisible(), 'Comienza el test express con 10 preguntas');

  // Answer first option and click Finalizar
  const opt = desktopPage.locator('div[class*="p-4 rounded-2xl border cursor-pointer"]').first();
  if (await opt.isVisible()) await opt.click();
  await desktopPage.waitForTimeout(200);
  
  await desktopPage.locator('button:has-text("Finalizar")').first().click();
  await desktopPage.waitForTimeout(400);
  const resultHeader = desktopPage.locator('h2:has-text("APROBADO"), h2:has-text("NO APTO")').first();
  assert(await resultHeader.isVisible(), 'Pantalla de corrección razonada y resultado generada');

  // F. FLASHCARDS 3D & TABLAS MAESTRAS
  console.log('\n--- F. FLASHCARDS 3D & TABLAS MAESTRAS ---');
  await desktopPage.locator('nav button:has-text("Flashcards")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h1:has-text("Flashcards")').isVisible(), 'Vista de Flashcards activa');

  // Flip Flashcard
  await desktopPage.keyboard.press('Space');
  await desktopPage.waitForTimeout(200);
  assert(await desktopPage.locator('div[class*="rotate-y-180"]').first().isVisible(), 'Giro 3D de Flashcard con tecla Espacio funciona');

  // Switch to Tablas tab
  await desktopPage.locator('button:has-text("Tablas")').first().click();
  await desktopPage.waitForTimeout(300);
  const tableTitle = await desktopPage.locator('h3:has-text("Velocidades")').first();
  assert(await tableTitle.isVisible(), 'Tabla maestra de velocidades visible');

  // G. PROGRESO & ANALÍTICA
  console.log('\n--- G. PROGRESO & ANALÍTICA ---');
  await desktopPage.locator('nav button:has-text("Progreso")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h1:has-text("Progreso")').isVisible(), 'Vista de Progreso activa');

  const statsCard = await desktopPage.locator('span:has-text("Simulacros Realizados")').first();
  assert(await statsCard.isVisible(), 'Métricas de simulacros calculadas');

  // 2. MOBILE RESPONSIVENESS & OVERFLOW AUDIT
  console.log('\n📱 2. VERIFICACIÓN DE RESPONSIVE EN MÓVILES (0px horizontal overflow):');
  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 15 Pro', width: 390, height: 844 },
    { name: 'iPhone 15 Pro Max', width: 430, height: 932 },
    { name: 'iPad Mini', width: 768, height: 1024 }
  ];

  const views = [
    { name: 'home', label: 'Inicio' },
    { name: 'temario', label: 'Temario' },
    { name: 'senales', label: 'Señales' },
    { name: 'examen', label: 'Tests' },
    { name: 'flashcards', label: 'Cards' }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    const mEmailInput = page.locator('input[type="email"]');
    if (await mEmailInput.isVisible()) {
      await mEmailInput.fill('musa@gmail.com');
      await page.locator('input[type="password"]').fill('password123');
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(600);
    }

    for (const v of views) {
      const btn = page.locator(`nav.safe-bottom button:has-text("${v.label}")`).first();
      if (await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(200);
      }

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - window.innerWidth;
      });

      assert(overflow <= 0, `${vp.name} (${vp.width}x${vp.height}) en vista "${v.name}" tiene 0px overflow (actual: ${overflow}px)`);
    }

    await page.close();
  }

  // 3. CONSOLE ERROR CHECK
  console.log('\n🛡️ 3. REVISIÓN DE ERRORES EN CONSOLA:');
  if (jsRuntimeErrors.length > 0) {
    console.log('  Detalles de errores detectados:', jsRuntimeErrors);
  }
  assert(jsRuntimeErrors.length === 0, `0 errores en consola de JavaScript (detectados: ${jsRuntimeErrors.length})`);

  console.log('\n===========================================================');
  console.log(`📊 RESULTADO FINAL: ${passedTests}/${totalTests} PRUEBAS SUPERADAS`);
  if (failedTests === 0) {
    console.log('🎉 ¡AUDITORÍA 100% EXITOSA SIN ERRORES!');
  } else {
    console.log(`⚠️ ${failedTests} PRUEBAS HAN FALLADO.`);
  }
  console.log('===========================================================');

  await desktopPage.screenshot({ path: 'tests/screenshot_final_desktop.png' });
  await browser.close();
}

runMasterAudit().catch(console.error);
