# 🚗 CARNET B — Manual Digital & Centro de Estudio Personal DGT 2026

Aplicación web personal de alto rendimiento para el estudio y preparación del examen teórico del **Permiso B (Coche)** en España, basada en el curso intensivo de **Igor** (4h 57m 57s, 36 temas, 55.939 palabras) con verificación jurídica y normativa oficial de la **DGT 2026**.

---

## 🏛️ Estructura del Repositorio

```text
CARNET B/
├── 01_FUENTE/             # Transcripción íntegra, metadatos y timestamps originales del vídeo
├── 02_TEMARIO/            # 36 capítulos del manual en Markdown con doble capa (Igor + DGT)
├── 03_CONOCIMIENTO/       # Reglas fijas, cifras maestras, 25 trampas y excepciones
├── 04_INDICES/            # Índices por conceptos, temas y minutos del vídeo
├── 05_AUDITORIA/          # Auditoría de extracción y validación de concordancia
│
├── docs/                  # Bitácora de desarrollo y estado del proyecto
│   ├── SESSION_LATEST_ES.md
│   └── ROADMAP.md
│
├── src/                   # Código fuente de la aplicación React + Vite
│   ├── components/        # Componentes UI (Navbar, BottomNav, Modales, SVG Icons)
│   ├── context/           # Estado global y persistencia en LocalStorage
│   ├── data/              # Bases de datos compiladas (carnetData, senalesData, tutorKnowledge)
│   └── views/             # Las 7 vistas principales de la aplicación
│
├── tests/                 # Suites de testing automatizado con Playwright
├── skills/                # Playbooks de diseño, Tailwind y motion de MYNEXT
├── typography/            # Guía tipográfica y jerarquías visuales
├── AGENTS.md              # Reglas globales de desarrollo y control de versiones
├── setup.sh               # Script automatizado de inicio de entorno
└── package.json           # Dependencias y scripts de construcción
```

---

## 🌟 Los 7 Pilares de la Aplicación

1. 🏠 **Inicio (Centro de Estudio Personal):** Botón *"Continuar donde lo dejaste"*, diagnóstico automático de *«Temas donde más estás fallando»* y Bento Grid interactivo.
2. 📚 **Temario (Manual Digital):** 36 temas con lectura escaneable dividida en 9 capas estructuradas (*Lo que debes saber, Igor, DGT 2026, Excepciones, Ejemplos, Trampas, Mnemotécnias, Cifras clave y Enlaces a YouTube*).
3. 🚦 **Biblioteca de Señales:** Catálogo completo oficial de la DGT con renderizado vectorial SVG, categorías (*Peligro, Prioridad, Prohibición, Obligación, Fin, Indicación, Nuevas 2026*) y buscador interactivo.
4. 🤖 **Profesor IA (Tutor con Voz):** Chatbot especializado en teórica con reconocimiento de voz (🎙️) y lectura en voz alta (🔊).
5. 📝 **Banco de Tests (5 Modalidades):** Simulacro Oficial (30 Qs / 30 min / 3 fallos), Test por Tema, Test Express (10 Qs), **Test de Preguntas Falladas** y Test de 25 Trampas.
6. 🧠 **Flashcards y Tablas Maestras:** Mazo de tarjetas con rotación 3D, marcado de retención (*«Ya me lo sé»* vs *«Tengo que repasarlo»*) y tablas maestras de velocidades, alcohol, distancias y puntos.
7. 📊 **Progreso y Rendimiento:** Historial de tests, métricas de retención y analítica de estudio guardadas en LocalStorage.

---

## 🚀 Comandos de Inicio y Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor local
npm run dev

# Ejecutar auditoría completa Playwright (Desktop + Mobile)
node tests/audit_master_suite.js

# Construir para producción
npm run build
```

---

## 🛡️ Entorno y Control de Versiones

- **Rama de Trabajo:** `dev` (está terminantemente prohibido hacer commit o push directo a `main` sin aprobación).
- **Servidor Local:** `http://localhost:5173/` y acceso móvil en red local `http://192.168.1.26:5173/`.
