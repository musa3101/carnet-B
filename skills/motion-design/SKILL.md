---
name: motion-design
description: Aplica animaciones y cinemática tipográfica avanzada con GSAP (stagger, blur-reveal, etc).
---

# 🎞️ Skill de Motion Design: motion-design

Implementa efectos de cinemática tipográfica de alta gama y transiciones fluidas.

## Directrices
1. **Librerías Preferidas**: Usa **GSAP** (y Motion Primitives) para las animaciones complejas en lugar de simples transiciones CSS lineales.
2. **Efectos Clave**:
   - **Aparición Escalonada (Stagger)**: Aplícala en listas, tarjetas y palabras de los títulos.
   - **Blur-Reveal**: Usa desenfoque suave al revelar titulares (`filter: blur(10px)` a `blur(0)`).
3. **Curvas de Tiempo**: NUNCA uses `linear`. Usa curvas orgánicas como `ease: "power3.out"` o `cubic-bezier` personalizadas para que se sienta natural.
4. **Rendimiento**: Aprovecha la aceleración por hardware (`transform`, `opacity`, `will-change`). Evita animar propiedades como `width`, `height` o `margin`.
