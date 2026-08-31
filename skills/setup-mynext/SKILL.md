---
name: setup-mynext
description: Inicializa y levanta el entorno de desarrollo local (setup.sh, rama dev, docs) al iniciar un nuevo proyecto o sesión.
---

# 🚀 Skill de Setup y Control de Flujo: setup-mynext

Esta skill automatiza el inicio seguro de proyectos y asegura que se cumplan las políticas de control de versiones locales y remotas de MYNEXT.

## 📋 Flujo de Inicialización (Al decir "iniciar el startup", "startup de Musa", "iniciar el setup", "setup", "@setup", o "iniciar el entorno")
Cuando el usuario solicite iniciar el setup/startup de un proyecto o levantar el entorno, sigue estrictamente estos pasos:

1. **Garantía Inmediata de Rama `dev` (DESDE EL SEGUNDO 0 - OBLIGATORIO)**:
   - Cambia o crea inmediatamente la rama `dev` ejecutando `git checkout dev || git checkout -b dev`.
   - **REGLA DE SEGURIDAD ABSOLUTA**: Todo el desarrollo y las pruebas se realizan exclusivamente en la rama `dev` en modo aislamiento local. Está **terminantemente prohibido** hacer commit o push directo a `main` o a GitHub. NUNCA se hace merge a `main` ni push a GitHub sin la aprobación explícita del usuario ("ok", "me gustó", "merge", "fusión", "sube a git").

2. **Inicialización de Git**:
   - Comprueba si existe la carpeta `.git`.
   - Si no existe, ejecuta `git init` en el directorio de trabajo actual.

3. **Estructura de Documentación Inicial**:
   - Comprueba si existen los archivos `docs/SESSION_LATEST_ES.md` y `docs/ROADMAP.md`.
   - Si no existen, crea la carpeta `docs/` y genera dichos archivos vacíos o con la plantilla estándar para cumplir con las reglas de sesión globales.

4. **Ejecución de `setup.sh` y Configuración Keep-Alive**:
   - Comprueba si existe `setup.sh` en la raíz del proyecto.
   - Si existe, ejecútalo (`bash setup.sh`).
   - El script `setup.sh` debe, además de levantar el entorno local, detectar si existe un archivo `.env` con credenciales de Supabase (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`). Si existen y no están configuradas las automatizaciones Keep-Alive, debe generar automáticamente los archivos:
     - `.github/workflows/keep-alive.yml` (Para GitHub Actions)
     - `.gitlab-ci.yml` (Para GitLab CI)
     Ambos flujos deben realizar un ping periódico (cada martes y viernes) al endpoint universal de salud de Supabase `/auth/v1/health` para evitar que las bases de datos de planes gratuitos se pausen por inactividad.
   - Si `setup.sh` no existe, y detectas que es un proyecto Node (p.ej., hay `package.json`), crea un `setup.sh` completo que incluya esta lógica y ejecútalo.
   - Levanta el servidor local (`npm run dev` o el comando correspondiente) usando la ejecución de comandos de Antigravity (se ejecuta como tarea de fondo).

5. **Parada y Confirmación**:
   - Una vez levantado el entorno local y configurados los Keep-Alive correspondientes, **DETENTE inmediatamente** y muestra un resumen al usuario indicando que el servidor de desarrollo está activo en localhost, las automatizaciones Keep-Alive creadas y que estás listo para trabajar en la rama `dev`.
   - Espera a que el usuario te dé confirmación antes de hacer cualquier modificación en los archivos del proyecto.

## 🛑 Flujo de Fin de Sesión (Al decir @final, @end, terminar, o similar)
Cuando el usuario pida finalizar la sesión o terminar:
1. Asegúrate de actualizar los archivos de documentación obligatorios:
   - `docs/SESSION_LATEST_ES.md` (resumen en español de cambios, archivos modificados, problemas resueltos y pendientes).
   - `docs/ROADMAP.md` (tareas completadas, en progreso y próximas).
2. Haz commit de todos los cambios de código realizados durante la sesión en la rama `dev` (p.ej. `git add .` y `git commit -m "update: ..."`).
3. **NUNCA hagas merge a `main` ni hagas push a GitHub a menos que el usuario te lo pida explícitamente usando palabras como "sincronizar", "merge", "push a main", "fusión" u "ok para subir a producción".**
4. Deja el proyecto limpio y documentado. No realices más cambios de código tras actualizar la documentación.
