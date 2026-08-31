---
name: skill-tailwind
description: Optimiza estilos en Tailwind CSS v4 centralizando tipografías y colores en @theme.
---

# 💨 Skill de Tailwind CSS: skill-tailwind

Optimiza la escritura de estilos en entornos con Tailwind CSS v4 para mantener un HTML modular y súper limpio.

## Directrices
1. **Centraliza los Tokens**: Extiende siempre la directiva `@theme` en el CSS global para las fuentes, colores y radios personalizados. No uses clases utilitarias redundantes y repetitivas (como colores arbitrarios `text-[#123456]`).
2. **HTML Limpio**: Delega la coherencia del diseño al archivo CSS principal siempre que sea posible para evitar que el DOM se vuelva inmanejable.
3. **Clases Lógicas**: Usa las utilidades de Tailwind inteligentemente, aprovechando los modificadores de estado (ej. `hover:`, `group-hover:`, `focus:`) y los modificadores de modo oscuro (`dark:`).
