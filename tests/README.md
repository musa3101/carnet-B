# 🧪 Suites de Testing y Auditoría — CARNET B

Esta carpeta contiene las herramientas de auditoría y pruebas automatizadas con **Playwright** para la aplicación web de CARNET B.

---

## 📂 Estructura de Archivos

| Archivo | Propósito | Comando de Ejecución |
| :--- | :--- | :--- |
| `audit_master_suite.js` | **Suite Principal Integral:** Audita las 7 vistas, navegación, búsqueda modal, modo examen, flashcards 3D, responsive (0px overflow en iPhone SE, iPhone 15 Pro, Pro Max, iPad Mini) y 0 errores de consola. | `node tests/audit_master_suite.js` |
| `test_senales_complete.js` | **Auditoría del Catálogo de Señales:** Verifica las 8 categorías oficiales de señales DGT, renderizado de SVG vectoriales y buscador. | `node tests/test_senales_complete.js` |
| `test_tutor_exact.js` | **Test de Inferencia del Profesor IA:** Valida la precisión de respuestas directas y formativas (ej. Autopista vs Autovía, Parada vs Estacionamiento). | `node tests/test_tutor_exact.js` |
| `screenshots/` | Capturas de pantalla generadas automáticamente durante las pruebas en diferentes viewports. | — |

---

## 🚀 Requisitos y Ejecución

Para ejecutar todas las pruebas en local:
```bash
# 1. Asegúrate de tener el servidor local activo
npm run dev

# 2. Ejecuta la suite principal
node tests/audit_master_suite.js
```
