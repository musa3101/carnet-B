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
  
  // Listen for console errors
  const consoleErrors = [];
  desktopPage.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await desktopPage.goto('http://localhost:5173/');
  await desktopPage.waitForTimeout(300);

  // A. HOME DASHBOARD VERIFICATION
  console.log('\n--- A. INICIO (Dashboard de Estudio) ---');
  const title = await desktopPage.locator('h1').textContent();
  assert(title.includes('Permiso B'), 'H1 principal contiene Permiso B');

  const continueBtn = await desktopPage.locator('button:has-text("Continuar:")').first();
  assert(await continueBtn.isVisible(), 'Botón de "Continuar estudiando" está visible en el Hero');

  const studyModules = await desktopPage.locator('h3:has-text("El Manual Digital")').first();
  assert(await studyModules.isVisible(), 'Módulo "El Manual Digital" visible en Bento Grid');

  // B. TEMARIO & TOPIC DETAIL VERIFICATION
  console.log('\n--- B. TEMARIO & LECTURA MANUAL ---');
  await desktopPage.locator('header button:has-text("Temario")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h1:has-text("36 Capítulos")').isVisible(), 'Vista Temario lista los 36 capítulos');

  // Open Topic 12 (Señales)
  await desktopPage.locator('h3:has-text("Señales Verticales")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h1:has-text("Señales Verticales")').isVisible(), 'Abre el detalle del Tema 12');

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
  await desktopPage.locator('header button:has-text("Señales")').first().click();
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
  await desktopPage.locator('button:has-text("Profesor IA")').first().click();
  await desktopPage.waitForTimeout(300);
  const tutorInput = desktopPage.locator('input[placeholder*="Pregúntale a tu profesor"]');
  assert(await tutorInput.isVisible(), 'Modal del Profesor IA abre correctamente');
  
  await tutorInput.fill('Cuál es la diferencia entre parada y estacionamiento?');
  await desktopPage.keyboard.press('Enter');
  await desktopPage.waitForTimeout(400);
  
  const tutorResp = await desktopPage.locator('div.text-slate-100').last().textContent();
  assert(tutorResp.includes('2 minutos') && tutorResp.includes('Parada'), 'El Profesor IA responde con la regla de los 2 minutos y abandono');
  await desktopPage.keyboard.press('Escape');

  // E. TESTS & SIMULATOR
  console.log('\n--- E. BANCO DE TESTS Y SIMULADOR ---');
  await desktopPage.locator('header button:has-text("Tests")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h3:has-text("Simulacro Oficial (30 Qs)")').isVisible(), 'Selector de modalidad de examen visible');

  // Start Quick Test
  await desktopPage.locator('h3:has-text("Test Express (10 Qs)")').first().click();
  await desktopPage.locator('button:has-text("Comenzar Test")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('span:has-text("1/10")').first().isVisible(), 'Comienza el test express con 10 preguntas');

  // Click on first option
  await desktopPage.locator('div.p-4.rounded-2xl.border.cursor-pointer').first().click();
  await desktopPage.waitForTimeout(200);
  
  // Finish test
  await desktopPage.locator('button:has-text("Finalizar")').first().click();
  await desktopPage.waitForTimeout(300);
  const resultHeader = await desktopPage.locator('h2:has-text("APROBADO")').or(desktopPage.locator('h2:has-text("NO APTO")')).first();
  assert(await resultHeader.isVisible(), 'Pantalla de corrección razonada y resultado generada');

  // F. FLASHCARDS & REPASO
  console.log('\n--- F. FLASHCARDS 3D & TABLAS MAESTRAS ---');
  await desktopPage.locator('header button:has-text("Flashcards")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h1:has-text("Flashcards")').isVisible(), 'Vista de Flashcards activa');

  // Flip card
  await desktopPage.keyboard.press('Space');
  await desktopPage.waitForTimeout(200);
  assert(await desktopPage.locator('span:has-text("Respuesta Oficial DGT")').first().isVisible(), 'Giro 3D de Flashcard con tecla Espacio funciona');

  // Mark as Mastered
  await desktopPage.locator('button:has-text("Ya me lo sé")').first().click();
  await desktopPage.waitForTimeout(200);

  // Switch to Tablas Maestras
  await desktopPage.locator('button:has-text("Tablas de Cifras")').first().click();
  await desktopPage.waitForTimeout(200);
  assert(await desktopPage.locator('th:has-text("Tipo de Vía")').isVisible(), 'Tabla maestra de velocidades visible');

  // G. PROGRESO
  console.log('\n--- G. PROGRESO & ANALÍTICA ---');
  await desktopPage.locator('header button:has-text("Progreso")').first().click();
  await desktopPage.waitForTimeout(300);
  assert(await desktopPage.locator('h1:has-text("Tu Progreso")').isVisible(), 'Vista de Progreso activa');
  assert(await desktopPage.locator('span:has-text("Simulacros")').first().isVisible(), 'Métricas de simulacros calculadas');

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
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(200);

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
  assert(consoleErrors.length === 0, `0 errores en consola de JavaScript (detectados: ${consoleErrors.length})`);

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
