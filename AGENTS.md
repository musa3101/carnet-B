# 🚀 Reglas Globales de MYNEXT

Estas reglas rigen automáticamente todo el comportamiento de desarrollo web en este entorno.
Si estás construyendo una web, asume que estas reglas están activas y combínalas con las *skills* de este repositorio.

## 1. Regla de Oro de Inicialización ("iniciar el startup", "startup de Musa", "iniciar el setup", "setup", "@setup")
- **DIFERENCIACIÓN DE COMANDOS**:
  - **"iniciar sesión" / "@inicio" / "@start"**: Lee `docs/SESSION_LATEST_ES.md` y `docs/ROADMAP.md`, resume el estado del proyecto y espera confirmación del usuario antes de modificar código.
  - **"iniciar el startup" / "startup de Musa" / "iniciar el setup" / "@setup" / "vamos a iniciar el setup"**:
    1. **DESDE EL SEGUNDO 0**: Cambia o garantiza inmediatamente la rama `dev` (`git checkout dev || git checkout -b dev`). Está **terminantemente prohibido** trabajar o modificar archivos en `main`.
    2. Garantiza la estructura de documentación en `docs/` (`SESSION_LATEST_ES.md` y `ROADMAP.md`).
    3. Levanta el servidor local (`setup.sh`, `server.py` o `npm run dev`) y muestra el enlace `http://localhost:...`.
    4. **MODO AISLAMIENTO Y BLOQUEO DE SEGURIDAD**: Todo el trabajo queda strictly retenido en la rama `dev` en entorno local. **NUNCA** hagas commit a `main`, merge ni `git push` a GitHub sin la aprobación explícita del usuario (*"ok"*, *"me gustó"*, *"merge"*, *"fusión"*, *"sube a git"*).

## 2. Diseño y Tipografía (Premium)
- **NO uses estéticas genéricas**.
- Sigue la **jerarquía tipográfica estricta**:
  - `H1`: Gigante, bold, tracking muy ajustado.
  - `H2`: Grande, semibold o regular.
  - `H3 (Eyebrow)`: Pequeño, encima del H1.
  - `H4`: Cuerpo del texto, límite de 65 caracteres de ancho.
  - `CTA (Call To Action)`: Texto muy pequeño, MAYÚSCULAS, tracking (espaciado de letras) muy amplio.
- **Emparejamientos de Fuentes MYNEXT**: Prioriza pares modernos como MUSERO x ERTINAS, ELEGIST x MARLINO, RIVAGE x ERTINAS, CLEAN FRAGILE x MIRAVA, o GRANITY x INTER.

## 3. Motion Design & UI
- Usa estructuras limpias como **Bento Grids**.
- Las animaciones deben ser avanzadas: usa `GSAP` si hay mucho movimiento, implementa apariciones escalonadas (*stagger*), *blur-reveal* para títulos, y usa siempre curvas *cubic-bezier* (nunca transiciones lineales).
- Asegúrate de que las microinteracciones en botones y enlaces se sientan orgánicas.

## 4. Código y Estructura
- Mantén el HTML modular y limpio.
- Si usas Tailwind CSS v4, centraliza colores personalizados, fuentes y radios en la directiva `@theme`.
- Protege los diseños al internacionalizarlos (i18n), evitando traducciones literales y validando que las palabras más largas (como en español) no rompan los contenedores.

## 5. Flujo de Trabajo (Git & Cloudflare) - REGLA ESTRICTA
- **NUNCA** hagas `git commit` ni `git push` a `main` o a GitHub de forma automática sin confirmación.
- Todo el trabajo, pruebas locales y cambios se deben hacer exclusivamente en la rama `dev`.
- Si el usuario te pide levantar el entorno o iniciar el startup, ejecuta el archivo `setup.sh` (si existe) para automatizar la rama `dev`, el `npm install` y el `npm run dev` / `python3 server.py`.
- **Regla de Aprobación**: Solo realizarás commits locales en `dev`, fusiones (merge) de `dev` a `main`, o subidas (push) a Git cuando el usuario dé su aprobación explícitamente mediante expresiones como: *"ok"*, *"me gustó"*, *"merge"*, *"fusión de lo que hicimos"* o *"sube a git"*. Sin esta confirmación directa, no debes guardar ni subir ningún cambio a los repositorios remotos.
