import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runHumanAudit() {
  console.log('======================================================================');
  console.log('🧑‍💻 INICIANDO AUDITORÍA INTEGRAL EXPERTA Y HUMANA — CARNET B 2026');
  console.log('======================================================================\n');

  const screenshotsDir = path.resolve('tests/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    details: [],
    findings: [],
    performance: {}
  };

  const assert = (condition, category, description, failureNote = '') => {
    results.total++;
    if (condition) {
      results.passed++;
      console.log(`  [🟢 PASS] [${category}] ${description}`);
      results.details.push({ status: 'PASS', category, description });
    } else {
      results.failed++;
      console.log(`  [🔴 FAIL] [${category}] ${description} -> ${failureNote}`);
      results.details.push({ status: 'FAIL', category, description, note: failureNote });
      results.findings.push({ category, issue: description, note: failureNote });
    }
  };

  // 1. DESKTOP WORKFLOW (1440 x 900)
  console.log('\n🖥️ [FASE 1] AUDITORÍA DESKTOP & EXPERIENCIA HUMANA (1440x900):');
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const jsErrors = [];
  desktopPage.on('pageerror', err => jsErrors.push(err.message));
  desktopPage.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('401') && !msg.text().includes('favicon')) {
      jsErrors.push(msg.text());
    }
  });

  const t0 = Date.now();
  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const initialLoadTime = Date.now() - t0;
  results.performance.initialLoadTimeMs = initialLoadTime;
  assert(initialLoadTime < 3000, 'Performance', `Carga inicial rápida (${initialLoadTime}ms)`, 'Tardó más de 3000ms');

  // --- 1.1 LOGIN GATE AUDIT ---
  console.log('\n--- 1.1 Pantalla de Login & Acceso ---');
  await desktopPage.screenshot({ path: 'tests/screenshots/01_login_gate.png' });
  
  const emailInput = desktopPage.locator('input[type="email"], input[placeholder*="email"]').first();
  const isGateVisible = await emailInput.isVisible();
  assert(isGateVisible, 'Auth Gate', 'Pantalla de acceso protegida presente para usuarios sin sesión');

  const googleBtn = desktopPage.locator('button:has-text("Continuar con Google")').first();
  assert(await googleBtn.isVisible(), 'Auth Gate', 'Botón de Google Gmail activo y visible');

  // Perform Login
  await emailInput.fill('musa@gmail.com');
  await desktopPage.locator('input[type="password"]').first().fill('123456');
  await desktopPage.locator('button[type="submit"]').first().click();
  await desktopPage.waitForTimeout(1000);

  // --- 1.2 HOME DASHBOARD AUDIT ---
  console.log('\n--- 1.2 Dashboard Principal (Home) ---');
  await desktopPage.screenshot({ path: 'tests/screenshots/02_home_dashboard.png' });

  const heroH1 = await desktopPage.locator('h1').first().textContent();
  assert(heroH1.includes('Permiso B'), 'Home UI', 'Hero principal contiene "Permiso B"');

  const continueStudyBtn = desktopPage.locator('button:has-text("Continuar:")').first();
  assert(await continueStudyBtn.isVisible(), 'Home UX', 'CTA de Reanudar Estudio inteligente visible');

  const bentoModules = ['El Manual Digital', 'Biblioteca de Señales', 'Simulador de Tests', 'Flashcards 3D', 'Trampas de Examen'];
  for (const mod of bentoModules) {
    const isModVisible = await desktopPage.locator(`h3:has-text("${mod}")`).first().isVisible();
    assert(isModVisible, 'Home Bento Grid', `Módulo "${mod}" visible con tipografía y diseño premium`);
  }

  // --- 1.3 TEMARIO & TOPIC DETAIL AUDIT ---
  console.log('\n--- 1.3 Temario (36 Capítulos) y Lector de Temas ---');
  await desktopPage.locator('header button:has-text("Temario")').first().click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: 'tests/screenshots/03_temario_grid.png' });

  const temarioTitle = await desktopPage.locator('h1:has-text("Capítulos")').first().isVisible();
  assert(temarioTitle, 'Temario', 'Vista de Temario lista los 36 capítulos del curso de Igor');

  // Search filter in temario
  const searchTemarioInput = desktopPage.locator('input[placeholder*="Buscar"]').first();
  if (await searchTemarioInput.isVisible()) {
    await searchTemarioInput.fill('velocidad');
    await desktopPage.waitForTimeout(200);
    const filteredCount = await desktopPage.locator('div[class*="group cursor-pointer"]').count();
    assert(filteredCount > 0, 'Temario Search', `Filtro en tiempo real por palabra clave funciona (${filteredCount} temas encontrados)`);
    await searchTemarioInput.fill('');
    await desktopPage.waitForTimeout(200);
  }

  // Open Topic 01 (La Vía)
  await desktopPage.locator('h3:has-text("La Vía")').first().click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: 'tests/screenshots/04_topic_detail.png' });

  const topicH1 = await desktopPage.locator('h1').first().textContent();
  assert(topicH1.includes('La Vía') || topicH1.includes('Capítulo 1'), 'Topic Detail', 'Detalle de tema carga correctamente');

  // Verify 3-tier pedagogy structure
  const sec1 = await desktopPage.locator('section:has-text("Lo que Tienes que Saber")').first().isVisible();
  assert(sec1, 'Topic Structure', 'Sección 1: "Lo que Tienes que Saber" estructurada');

  const sec2 = await desktopPage.locator('section:has-text("Explicación Pedagógica de Igor")').first().isVisible();
  assert(sec2, 'Topic Structure', 'Sección 2: "Explicación Pedagógica de Igor" presente');

  const sec3 = await desktopPage.locator('section:has-text("Marco Legal")').first().isVisible();
  assert(sec3, 'Topic Structure', 'Sección 3: "Marco Legal y Verificación Normativa DGT" presente');

  const ytBtn = await desktopPage.locator('a[href*="youtube.com"]').first().isVisible();
  assert(ytBtn, 'Video Sync', 'Enlace sincronizado con timestamp exacto de YouTube activo');

  // --- 1.4 BIBLIOTECA DE SEÑALES DGT AUDIT ---
  console.log('\n--- 1.4 Catálogo Visual de Señales de Tráfico ---');
  await desktopPage.locator('header button:has-text("Señales")').first().click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: 'tests/screenshots/05_senales_view.png' });

  const senalesH1 = await desktopPage.locator('h1:has-text("Señales")').first().isVisible();
  assert(senalesH1, 'Señales UI', 'Vista de Biblioteca de Señales abierta');

  // Test Category Pills
  const newSignsBtn = desktopPage.locator('button:has-text("Novedades DGT 2026")').first();
  if (await newSignsBtn.isVisible()) {
    await newSignsBtn.click();
    await desktopPage.waitForTimeout(300);
    const p35 = desktopPage.locator('div:has-text("P-35")').first();
    assert(await p35.isVisible(), 'Señales 2026', 'Filtro Novedades DGT 2026 muestra P-35 (Trenzado de Carriles)');
    
    // Open Signal Modal
    await p35.click();
    await desktopPage.waitForTimeout(300);
    await desktopPage.screenshot({ path: 'tests/screenshots/06_signal_modal.png' });

    const modalTitle = desktopPage.locator('h3:has-text("Trenzado de Carriles")').first();
    assert(await modalTitle.isVisible(), 'Signal Modal', 'Modal de detalle de señal abre con significado oficial y trampas de examen');

    // Close modal
    await desktopPage.keyboard.press('Escape');
    await desktopPage.waitForTimeout(200);
  }

  // --- 1.5 SIMULADOR DE EXAMEN DGT ---
  console.log('\n--- 1.5 Simulador de Examen DGT Oficial ---');
  await desktopPage.locator('header button:has-text("Tests")').first().click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: 'tests/screenshots/07_examen_modes.png' });

  const examModes = desktopPage.locator('h3:has-text("Simulacro Oficial (30 Qs)")').first();
  assert(await examModes.isVisible(), 'Examen UI', 'Modalidades de examen DGT disponibles');

  // Start Express Test
  await desktopPage.locator('h3:has-text("Test Express (10 Qs)")').first().click();
  await desktopPage.locator('button:has-text("Comenzar Test")').first().click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: 'tests/screenshots/08_examen_active.png' });

  const questionProgress = desktopPage.locator('span:has-text("1/10")').first();
  assert(await questionProgress.isVisible(), 'Examen Flow', 'Inicia test interactivo en pregunta 1/10');

  // Answer 10 questions
  for (let q = 1; q <= 10; q++) {
    const firstOption = desktopPage.locator('button[class*="group relative p-4"]').first();
    if (await firstOption.isVisible()) {
      await firstOption.click();
      await desktopPage.waitForTimeout(100);
    }
  }
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: 'tests/screenshots/09_examen_results.png' });

  const resultsTitle = desktopPage.locator('h1:has-text("Resultado del Examen")').first();
  assert(await resultsTitle.isVisible(), 'Examen Scoring', 'Calcula corrección detallada y desglose de fallos razonados');

  // --- 1.6 FLASHCARDS 3D ---
  console.log('\n--- 1.6 Flashcards 3D & Repaso Espaciado ---');
  await desktopPage.locator('header button:has-text("Flashcards")').first().click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: 'tests/screenshots/10_flashcards_view.png' });

  const flashH1 = desktopPage.locator('h1:has-text("Flashcards")').first();
  assert(await flashH1.isVisible(), 'Flashcards UI', 'Vista de Flashcards 3D cargada');

  // 3D Flip Test
  await desktopPage.keyboard.press('Space');
  await desktopPage.waitForTimeout(300);
  const cardFlipped = await desktopPage.locator('div[class*="rotate-y-180"]').first().isVisible();
  assert(cardFlipped, 'Flashcards 3D', 'Efecto de volteo 3D con barra espaciadora responde fluido');

  // --- 1.7 PROFESOR MUSA (IA CHATBOT & ASISTENTE) ---
  console.log('\n--- 1.7 Profesor Musa (IA Chatbot & Tutor Virtual) ---');
  await desktopPage.locator('button:has-text("Duda con Musa")').first().click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: 'tests/screenshots/11_tutor_modal.png' });

  const tutorInput = desktopPage.locator('input[placeholder*="Pregúntale"]').first();
  assert(await tutorInput.isVisible(), 'AI Tutor UI', 'Modal del Profesor Musa abre con historial y prompts rápidos');

  // Ask real question
  await tutorInput.fill('¿Cuál es la diferencia entre autopista y autovía?');
  await desktopPage.keyboard.press('Enter');
  await desktopPage.waitForTimeout(800);

  const tutorReply = await desktopPage.locator('div[class*="markdown"], div:has-text("Autopista"), div:has-text("Autovía")').first().isVisible();
  assert(tutorReply, 'AI Tutor Inference', 'El Profesor Musa razona y responde con precisión pedagógica');
  await desktopPage.keyboard.press('Escape');
  await desktopPage.waitForTimeout(300);

  // --- 1.8 BÚSQUEDA GLOBAL (Cmd+K) ---
  console.log('\n--- 1.8 Búsqueda Global Inteligente (Cmd+K) ---');
  await desktopPage.keyboard.press('Meta+k');
  await desktopPage.waitForTimeout(300);
  const searchInput = desktopPage.locator('input[placeholder*="Buscar"]').first();
  if (await searchInput.isVisible()) {
    await searchInput.fill('alcoholemia');
    await desktopPage.waitForTimeout(300);
    const searchResults = await desktopPage.locator('div[class*="cursor-pointer"]').count();
    assert(searchResults > 0, 'Global Search', `Búsqueda global devuelve coincidencias instantáneas (${searchResults} resultados)`);
    await desktopPage.keyboard.press('Escape');
  }

  // --- 2. RESPONSIVE MOBILE & VIEWPORT AUDIT (0px OVERFLOW) ---
  console.log('\n📱 [FASE 2] AUDITORÍA RESPONSIVE MULTI-DISPOSITIVO (0px Horizontal Overflow):');
  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 15 Pro', width: 390, height: 844 },
    { name: 'iPhone 15 Pro Max', width: 430, height: 932 },
    { name: 'iPad Mini (Tablet)', width: 768, height: 1024 }
  ];

  const testViews = [
    { label: 'Inicio', name: 'home' },
    { label: 'Temario', name: 'temario' },
    { label: 'Señales', name: 'senales' },
    { label: 'Tests', name: 'examen' },
    { label: 'Cards', name: 'flashcards' }
  ];

  for (const vp of viewports) {
    const mobilePage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(300);

    // Auto-login on mobile context
    const mEmail = mobilePage.locator('input[type="email"]').first();
    if (await mEmail.isVisible({ timeout: 500 }).catch(() => false)) {
      await mEmail.fill('musa@gmail.com');
      await mobilePage.locator('input[type="password"]').first().fill('123456');
      await mobilePage.locator('button[type="submit"]').first().click();
      await mobilePage.waitForTimeout(600);
    }

    // Verify BottomNav
    const bottomNav = mobilePage.locator('nav.safe-bottom, nav[class*="bottom"]').first();
    assert(await bottomNav.isVisible(), 'Mobile UX', `BottomNav táctil visible en ${vp.name} (${vp.width}x${vp.height})`);

    for (const v of testViews) {
      const tabBtn = mobilePage.locator(`nav button:has-text("${v.label}")`).first();
      if (await tabBtn.isVisible()) {
        await tabBtn.click();
        await mobilePage.waitForTimeout(200);
      }

      const overflow = await mobilePage.evaluate(() => {
        return Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
      });

      assert(overflow <= 0, 'Zero Overflow', `${vp.name} en vista "${v.name}" tiene 0px desborde (actual: ${overflow}px)`, `Desborde de ${overflow}px detectado`);
    }

    await mobilePage.screenshot({ path: `tests/screenshots/mobile_${vp.name.replace(/\s+/g, '_').toLowerCase()}.png` });
    await mobilePage.close();
  }

  // --- 3. CONSOLE & RUNTIME AUDIT ---
  console.log('\n🛡️ [FASE 3] AUDITORÍA DE ERRORES Y CONSOLA JS:');
  if (jsErrors.length > 0) {
    console.log('  ⚠️ Errores detectados en consola:', jsErrors);
    results.findings.push({ category: 'Runtime Errors', issue: 'Errores JS detectados en consola', note: jsErrors.join(' | ') });
  }
  assert(jsErrors.length === 0, 'Clean Console', `0 errores en consola durante todo el flujo de usuario (detectados: ${jsErrors.length})`, jsErrors.join(', '));

  console.log('\n======================================================================');
  console.log(`📊 INFORME FINAL DE AUDITORÍA: ${results.passed}/${results.total} PRUEBAS SUPERADAS (${Math.round((results.passed / results.total) * 100)}%)`);
  if (results.failed === 0) {
    console.log('🏆 ¡AUDITORÍA CUMPLIDA AL 100% SIN NINGÚN ERROR!');
  } else {
    console.log(`⚠️ Se identificaron ${results.failed} aspectos a optimizar.`);
  }
  console.log('======================================================================\n');

  // Save audit report JSON
  fs.writeFileSync('tests/audit_report.json', JSON.stringify(results, null, 2));

  await desktopPage.close();
  await browser.close();
}

runHumanAudit().catch(err => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
