# Informe de Auditoría Crítica y Validación — FASE 1.5

**Fecha de Auditoría:** 31 de agosto de 2026  
**Resultado de Auditoría:** 🟢 **LISTO PARA FASE 2**

---

## 1. Métricas de Cobertura y Fidelidad de la Fuente
- **Vídeo Analizado:** *Intensivo de Teórica Completo y Actualizado 2026 (Igor)*
- **ID YouTube:** `Sx2prUxQbaM` | **Duración:** 17.877 segundos (04h 57m 57s).
- **Capítulos Detectados y Procesados:** 36 / 36 (100% de cobertura temática).
- **Segmentos Temporales Auditados:** 8.462 segmentos sincronizados.
- **Palabras Transcritas Verbatim:** 55.939 palabras (disponibles en `01_FUENTE/transcript_completo.md`).
- **Archivos Verificados:** 51 archivos Markdown organizados en 5 directorios.

---

## 2. Resultados de las Comprobaciones de Auditoría

| Comprobación | Estado | Detalle del Resultado |
|---|---|---|
| **1. Cobertura del vídeo** | ✅ 100% | Ningún segundo ni capítulo del vídeo ha quedado fuera. |
| **2. Separación de Fuentes** | ✅ Verificado | Cada uno de los 36 temas etiqueta de forma explícita `[FUENTE: IGOR]` y `[VERIFICACIÓN NORMATIVA DGT]`. |
| **3. Cifras y Límites Numéricos** | ✅ Verificado | Verificada concordancia exacta entre `cifras_importantes.md`, los 36 temas y la transcripción oficial. |
| **4. Integridad de Timestamps** | ✅ Verificado | 36 rangos cronológicos validados (`start < end <= 17877s`) con enlaces directos (`&t=...s`). |
| **5. Detección de Duplicados** | ✅ Coherente | Duplicación intencionada de reglas transversales en índices y resúmenes sin discrepancias internas. |
| **6. Búsqueda Semántica** | ✅ Ampliado | Incorporados sinónimos de alta frecuencia (ej. *rotonda* para *glorieta*, *patinete/VMP*, *alcoholemia/tasas*, *sillita/SRI*, etc.). |
| **7. Ausencia de Código Web** | ✅ Respetado | No se ha generado código HTML, CSS, React ni componentes UI antes de la Fase 2. |

---

## 3. Matriz de Validación de Cifras Clave

| Parámetro / Cifra | Valor Auditado | Fuente Original | Estado |
|---|---|---|---|
| **Velocidad Autopista Turismos/Motos** | **120 km/h** *(mín. 60)* | Cap. 06 (`00:28:26`) | ✅ Validado |
| **Velocidad Autopista Buses/Mixtos** | **100 km/h** | Cap. 06 (`00:28:26`) | ✅ Validado |
| **Velocidad Autopista Camiones/Remolques** | **90 km/h** | Cap. 06 (`00:28:26`) | ✅ Validado |
| **Velocidad Convencional Turismos/Buses** | **90 km/h** *(mín. 45)* | Cap. 06 (`00:28:26`) | ✅ Validado |
| **Velocidad Convencional Camiones/Mixtos** | **80 km/h** *(mín. 40)* | Cap. 06 (`00:28:26`) | ✅ Validado |
| **Velocidad Vías Urbanas (1 carril / 2+ carriles)** | **30 km/h / 50 km/h** *(20 única)* | Cap. 06 (`00:28:26`) | ✅ Validado |
| **Margen +20 km/h al adelantar** | **0 km/h (Eliminado)** | Cap. 06 / Cap. 08 | ✅ Validado |
| **Tasa Alcohol General (Aire / Sangre)** | **0,25 mg/l / 0,50 g/l** | Cap. 28 (`03:31:38`) | ✅ Validado |
| **Tasa Alcohol Novel y Profesional** | **0,15 mg/l / 0,30 g/l** | Cap. 28 (`03:31:38`) | ✅ Validado |
| **Tasa Alcohol Menores de Edad** | **0,00 mg/l (Tasa Cero)** | Cap. 28 (`03:31:38`) | ✅ Validado |
| **Puntos Carnet Novel / Saldo Máximo** | **8 puntos / 15 puntos** | Cap. 19 (`03:09:05`) | ✅ Validado |
| **Pérdida Puntos Móvil en Mano** | **6 puntos** | Cap. 19 / Cap. 27 | ✅ Validado |
| **Separación Lateral Ciclistas Interurbana** | **1,5 metros** | Cap. 08 / Cap. 21 | ✅ Validado |
| **Profundidad Neumáticos Turismos** | **1,6 mm** | Cap. 29 (`03:43:08`) | ✅ Validado |
| **Distancia Volante con Airbag** | **25 cm** | Cap. 30 (`03:49:22`) | ✅ Validado |
| **Estatura Menores Asientos Traseros SRI** | **135 cm** | Cap. 15 (`02:40:35`) | ✅ Validado |
| **Carga que Sobresale Turismo por Detrás** | **10% divisible / 15% indivisible** | Cap. 16 (`02:45:15`) | ✅ Validado |
| **Plazos ITV Turismos (4-2-1)** | **Hasta 4 exento / 4-10 bienal / >10 anual** | Cap. 17 (`02:53:45`) | ✅ Validado |
| **Tiempo de Reacción Medio Conductor** | **0,75 segundos** *(0,5s a 1s)* | Cap. 22 / Cap. 23 | ✅ Validado |
| **Descansos en Viajes Largos** | **Cada 2 horas o 200 km** | Cap. 24 (`03:26:45`) | ✅ Validado |
| **Marcha Atrás Recorrido Máximo** | **15 metros** *(sin invadir cruces)* | Cap. 08 (`00:49:49`) | ✅ Validado |

---

## 4. Estado de los Archivos del Repositorio

- `01_FUENTE/`: 3 archivos de auditoría de fuente y transcripción completa íntegra.
- `02_TEMARIO/`: 36 temas estructurados con etiquetas de procedencia explícitas.
- `03_CONOCIMIENTO/`: 6 compendios de conocimiento puro (reglas, excepciones, cifras, trampas, errores y consejos).
- `04_INDICES/`: 4 índices de navegación y búsqueda semántica enriquecida.
- `05_AUDITORIA/`: 2 informes de control de calidad y registro de evoluciones normativas.

**Conclusión de la Fase 1.5:** La base de conocimiento es sólida, autosuficiente, precisa y está verificada para servir como motor de datos de la aplicación web en la FASE 2.
