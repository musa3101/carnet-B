import React from 'react';

export const TrafficSignIcon = ({ code, shape, colorScheme, size = 64, className = "" }) => {
  const s = size;

  switch (code) {
    // --- 1. PRIORIDAD ---
    case "R-1": // Ceda el Paso (Triángulo invertido)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="5,15 95,15 50,92" fill="#DC2626" />
          <polygon points="18,22 82,22 50,78" fill="#FFFFFF" />
        </svg>
      );

    case "R-2": // STOP (Octógono rojo)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#DC2626" stroke="#FFFFFF" strokeWidth="4" />
          <text x="50" y="60" fill="#FFFFFF" fontSize="26" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            STOP
          </text>
        </svg>
      );

    case "R-3": // Calzada con prioridad (Rombo)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,5 95,50 50,95 5,50" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
          <polygon points="50,18 82,50 50,82 18,50" fill="#FACC15" stroke="#000000" strokeWidth="2" />
        </svg>
      );

    case "R-4": // Fin de prioridad
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,5 95,50 50,95 5,50" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
          <polygon points="50,18 82,50 50,82 18,50" fill="#9CA3AF" />
          <line x1="20" y1="80" x2="80" y2="20" stroke="#000000" strokeWidth="8" />
        </svg>
      );

    case "R-5": // Prioridad en sentido contrario
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          {/* Black arrow (right/up) */}
          <line x1="60" y1="70" x2="60" y2="35" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
          <polygon points="60,25 52,38 68,38" fill="#000000" />
          {/* Red arrow (left/down) */}
          <line x1="40" y1="30" x2="40" y2="65" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
          <polygon points="40,75 32,62 48,62" fill="#DC2626" />
        </svg>
      );

    case "R-6": // Prioridad respecto a sentido contrario
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          {/* White arrow (right/up) */}
          <line x1="38" y1="75" x2="38" y2="35" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          <polygon points="38,20 25,38 51,38" fill="#FFFFFF" />
          {/* Red arrow (left/down) */}
          <line x1="62" y1="30" x2="62" y2="65" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
          <polygon points="62,75 54,62 70,62" fill="#DC2626" />
        </svg>
      );

    // --- 2. PELIGRO ---
    case "P-1": // Prioridad de la derecha (X)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          <line x1="35" y1="45" x2="65" y2="75" stroke="#000000" strokeWidth="6" />
          <line x1="65" y1="45" x2="35" y2="75" stroke="#000000" strokeWidth="6" />
        </svg>
      );

    case "P-1a": // Prioridad vía derecha
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          <line x1="50" y1="75" x2="50" y2="40" stroke="#000000" strokeWidth="8" />
          <polygon points="50,32 42,44 58,44" fill="#000000" />
          <line x1="50" y1="58" x2="68" y2="58" stroke="#000000" strokeWidth="4" />
        </svg>
      );

    case "P-3": // Semáforos
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          <rect x="42" y="44" width="16" height="30" fill="#000000" rx="3" />
          <circle cx="50" cy="49" r="3.5" fill="#EF4444" />
          <circle cx="50" cy="59" r="3.5" fill="#F59E0B" />
          <circle cx="50" cy="69" r="3.5" fill="#10B981" />
        </svg>
      );

    case "P-4": // Glorieta peligro
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          <circle cx="50" cy="58" r="16" fill="none" stroke="#000000" strokeWidth="3" strokeDasharray="14 10" />
          <polygon points="62,46 68,52 60,56" fill="#000000" />
          <polygon points="38,70 32,64 40,60" fill="#000000" />
        </svg>
      );

    case "P-18": // Obras
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FBBF24" />
          {/* Worker icon */}
          <circle cx="50" cy="45" r="4" fill="#000000" />
          <line x1="50" y1="49" x2="46" y2="65" stroke="#000000" strokeWidth="3" />
          <line x1="46" y1="65" x2="38" y2="76" stroke="#000000" strokeWidth="3" />
          <line x1="46" y1="65" x2="56" y2="76" stroke="#000000" strokeWidth="3" />
          <line x1="50" y1="53" x2="62" y2="68" stroke="#000000" strokeWidth="2.5" />
          <line x1="62" y1="68" x2="68" y2="76" stroke="#000000" strokeWidth="3" />
        </svg>
      );

    case "P-19": // Pavimento deslizante
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          {/* Car skidding */}
          <rect x="40" y="50" width="20" height="12" fill="#000000" rx="2" />
          <path d="M35,68 Q45,60 40,75" stroke="#000000" strokeWidth="2" fill="none" />
          <path d="M55,68 Q65,60 60,75" stroke="#000000" strokeWidth="2" fill="none" />
        </svg>
      );

    case "P-20": // Paso peatones peligro
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          <circle cx="50" cy="44" r="3.5" fill="#000000" />
          <line x1="50" y1="48" x2="48" y2="65" stroke="#000000" strokeWidth="3" />
          <line x1="48" y1="65" x2="40" y2="76" stroke="#000000" strokeWidth="3" />
          <line x1="48" y1="65" x2="56" y2="76" stroke="#000000" strokeWidth="3" />
        </svg>
      );

    case "P-22": // Ciclistas peligro
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          <circle cx="38" cy="68" r="6" fill="none" stroke="#000000" strokeWidth="2.5" />
          <circle cx="62" cy="68" r="6" fill="none" stroke="#000000" strokeWidth="2.5" />
          <line x1="38" y1="68" x2="50" y2="68" stroke="#000000" strokeWidth="2.5" />
          <line x1="50" y1="68" x2="58" y2="58" stroke="#000000" strokeWidth="2.5" />
          <line x1="58" y1="58" x2="62" y2="68" stroke="#000000" strokeWidth="2.5" />
        </svg>
      );

    case "P-35": // Trenzado de carriles (Nueva DGT 2026)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          {/* Intertwined arrows */}
          <path d="M35,74 Q55,60 62,46" stroke="#000000" strokeWidth="3.5" fill="none" />
          <polygon points="65,40 56,48 68,52" fill="#000000" />
          <path d="M65,74 Q45,60 38,46" stroke="#000000" strokeWidth="3.5" fill="none" />
          <polygon points="35,40 44,48 32,52" fill="#000000" />
        </svg>
      );

    case "P-21b": // Personas mayores (Nueva DGT 2026)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          <circle cx="42" cy="46" r="3" fill="#000000" />
          <line x1="42" y1="49" x2="40" y2="64" stroke="#000000" strokeWidth="2.5" />
          <line x1="40" y1="64" x2="35" y2="76" stroke="#000000" strokeWidth="2.5" />
          <line x1="40" y1="64" x2="46" y2="76" stroke="#000000" strokeWidth="2.5" />
          <circle cx="58" cy="48" r="3" fill="#000000" />
          <line x1="58" y1="51" x2="56" y2="64" stroke="#000000" strokeWidth="2.5" />
          <line x1="56" y1="64" x2="52" y2="76" stroke="#000000" strokeWidth="2.5" />
          <line x1="56" y1="64" x2="62" y2="76" stroke="#000000" strokeWidth="2.5" />
          <line x1="62" y1="58" x2="66" y2="76" stroke="#000000" strokeWidth="1.5" />
        </svg>
      );

    case "P-50": // Otros peligros (!)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#DC2626" />
          <polygon points="50,24 82,80 18,80" fill="#FFFFFF" />
          <line x1="50" y1="44" x2="50" y2="65" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="73" r="3.5" fill="#000000" />
        </svg>
      );

    // --- 3. PROHIBICIÓN Y RESTRICCIÓN ---
    case "R-100": // Circulación prohibida
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
        </svg>
      );

    case "R-101": // Entrada prohibida
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <rect x="18" y="42" width="64" height="16" fill="#FFFFFF" rx="2" />
        </svg>
      );

    case "R-102": // Prohibido vehículos de motor
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          <rect x="30" y="46" width="40" height="18" fill="#000000" rx="4" />
          <circle cx="38" cy="65" r="4" fill="#000000" />
          <circle cx="62" cy="65" r="4" fill="#000000" />
        </svg>
      );

    case "R-104": // Prohibido motocicletas
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          <circle cx="32" cy="58" r="8" fill="none" stroke="#000000" strokeWidth="3" />
          <circle cx="68" cy="58" r="8" fill="none" stroke="#000000" strokeWidth="3" />
          <line x1="32" y1="58" x2="50" y2="58" stroke="#000000" strokeWidth="3" />
          <line x1="50" y1="58" x2="62" y2="44" stroke="#000000" strokeWidth="3" />
          <circle cx="48" cy="40" r="3" fill="#000000" />
        </svg>
      );

    case "R-118": // Prohibido VMP / Patinetes
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          <circle cx="35" cy="65" r="6" fill="#000000" />
          <circle cx="65" cy="65" r="6" fill="#000000" />
          <line x1="35" y1="65" x2="65" y2="65" stroke="#000000" strokeWidth="4" />
          <line x1="60" y1="65" x2="52" y2="35" stroke="#000000" strokeWidth="4" />
          <line x1="45" y1="35" x2="59" y2="35" stroke="#000000" strokeWidth="4" />
        </svg>
      );

    case "R-120": // Zona de Bajas Emisiones (ZBE)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          <text x="50" y="44" fill="#000000" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            ZBE
          </text>
          <text x="50" y="64" fill="#DC2626" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            DGT
          </text>
        </svg>
      );

    case "R-301": // Velocidad máxima
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          <text x="50" y="60" fill="#000000" fontSize="28" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            90
          </text>
        </svg>
      );

    case "R-302": // Giro derecha prohibido
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          <path d="M40,68 L40,48 Q40,38 52,38 L65,38" fill="none" stroke="#000000" strokeWidth="5" />
          <polygon points="62,30 74,38 62,46" fill="#000000" />
          <line x1="25" y1="25" x2="75" y2="75" stroke="#DC2626" strokeWidth="8" />
        </svg>
      );

    case "R-303": // Giro izquierda prohibido
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          <path d="M60,68 L60,48 Q60,38 48,38 L35,38" fill="none" stroke="#000000" strokeWidth="5" />
          <polygon points="38,30 26,38 38,46" fill="#000000" />
          <line x1="25" y1="25" x2="75" y2="75" stroke="#DC2626" strokeWidth="8" />
        </svg>
      );

    case "R-304": // Cambio de sentido prohibido
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          <path d="M60,68 L60,45 Q60,30 50,30 Q40,30 40,45 L40,65" fill="none" stroke="#000000" strokeWidth="5" />
          <polygon points="32,60 40,72 48,60" fill="#000000" />
          <line x1="25" y1="25" x2="75" y2="75" stroke="#DC2626" strokeWidth="8" />
        </svg>
      );

    case "R-305": // Adelantamiento prohibido
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
          <rect x="25" y="42" width="22" height="16" fill="#DC2626" rx="3" />
          <rect x="53" y="42" width="22" height="16" fill="#000000" rx="3" />
        </svg>
      );

    case "R-307": // Parada y estacionamiento prohibido (X)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="35" fill="#2563EB" />
          <line x1="25" y1="25" x2="75" y2="75" stroke="#DC2626" strokeWidth="10" />
          <line x1="75" y1="25" x2="25" y2="75" stroke="#DC2626" strokeWidth="10" />
        </svg>
      );

    case "R-308": // Estacionamiento prohibido (/)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#DC2626" />
          <circle cx="50" cy="50" r="35" fill="#2563EB" />
          <line x1="75" y1="25" x2="25" y2="75" stroke="#DC2626" strokeWidth="10" />
        </svg>
      );

    // --- 4. OBLIGACIÓN ---
    case "R-400a": // Sentido obligatorio frente
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="50,20 65,42 55,42 55,75 45,75 45,42 35,42" fill="#FFFFFF" />
        </svg>
      );

    case "R-400b": // Sentido obligatorio derecha
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="80,50 58,35 58,45 25,45 25,55 58,55 58,65" fill="#FFFFFF" />
        </svg>
      );

    case "R-402": // Paso obligatorio giratorio
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeDasharray="25 15" />
          <polygon points="65,30 75,38 65,46" fill="#FFFFFF" />
          <polygon points="35,70 25,62 35,54" fill="#FFFFFF" />
        </svg>
      );

    case "R-407a": // Vía para ciclos
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="32" cy="58" r="10" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="68" cy="58" r="10" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="32" y1="58" x2="48" y2="58" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="48" y1="58" x2="62" y2="44" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="62" y1="44" x2="68" y2="58" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="40" y1="44" x2="48" y2="58" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
      );

    case "R-411": // Velocidad mínima obligatoria
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <text x="50" y="62" fill="#FFFFFF" fontSize="28" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            30
          </text>
        </svg>
      );

    case "R-412": // Cadenas para nieve
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="50" cy="50" r="22" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="12" fill="#2563EB" />
          <line x1="50" y1="28" x2="50" y2="72" stroke="#2563EB" strokeWidth="4" />
          <line x1="28" y1="50" x2="72" y2="50" stroke="#2563EB" strokeWidth="4" />
        </svg>
      );

    case "R-413": // Alumbrado corto alcance
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M30,35 Q50,30 50,50 Q50,70 30,65 Z" fill="#FFFFFF" />
          <line x1="58" y1="42" x2="72" y2="48" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="58" y1="50" x2="72" y2="56" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="58" y1="58" x2="72" y2="64" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
      );

    // --- 5. FIN DE PROHIBICIÓN ---
    case "R-500": // Fin de prohibiciones
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
          <line x1="20" y1="80" x2="80" y2="20" stroke="#000000" strokeWidth="8" />
        </svg>
      );

    case "R-501": // Fin limitación velocidad
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
          <text x="50" y="58" fill="#9CA3AF" fontSize="26" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            80
          </text>
          <line x1="20" y1="80" x2="80" y2="20" stroke="#000000" strokeWidth="6" />
        </svg>
      );

    case "R-506": // Fin velocidad mínima
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <text x="50" y="60" fill="#FFFFFF" fontSize="26" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            30
          </text>
          <line x1="20" y1="80" x2="80" y2="20" stroke="#DC2626" strokeWidth="8" />
        </svg>
      );

    // --- 6. INDICACIÓN Y SERVICIOS ---
    case "S-1": // Autopista
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          <line x1="20" y1="35" x2="80" y2="35" stroke="#FFFFFF" strokeWidth="6" />
          <line x1="30" y1="85" x2="42" y2="35" stroke="#FFFFFF" strokeWidth="6" />
          <line x1="70" y1="85" x2="58" y2="35" stroke="#FFFFFF" strokeWidth="6" />
          <line x1="50" y1="85" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6 4" />
        </svg>
      );

    case "S-1a": // Autovía
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          <line x1="20" y1="30" x2="80" y2="30" stroke="#FFFFFF" strokeWidth="5" />
          <line x1="30" y1="75" x2="42" y2="30" stroke="#FFFFFF" strokeWidth="5" />
          <line x1="70" y1="75" x2="58" y2="30" stroke="#FFFFFF" strokeWidth="5" />
          <text x="50" y="90" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            AUTOVÍA
          </text>
        </svg>
      );

    case "S-2": // Fin de Autopista
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          <line x1="20" y1="35" x2="80" y2="35" stroke="#FFFFFF" strokeWidth="5" />
          <line x1="30" y1="85" x2="42" y2="35" stroke="#FFFFFF" strokeWidth="5" />
          <line x1="70" y1="85" x2="58" y2="35" stroke="#FFFFFF" strokeWidth="5" />
          <line x1="15" y1="85" x2="85" y2="15" stroke="#DC2626" strokeWidth="8" />
        </svg>
      );

    case "S-3": // Vía para automóviles
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          <rect x="25" y="46" width="50" height="20" fill="#FFFFFF" rx="4" />
          <circle cx="35" cy="68" r="5" fill="#FFFFFF" />
          <circle cx="65" cy="68" r="5" fill="#FFFFFF" />
        </svg>
      );

    case "S-5": // Túnel
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          <path d="M25,75 L25,50 Q50,20 75,50 L75,75 Z" fill="#000000" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
      );

    case "S-7": // Velocidad aconsejada
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          <text x="50" y="60" fill="#FFFFFF" fontSize="28" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            70
          </text>
        </svg>
      );

    case "S-11": // Sentido único
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          <polygon points="50,18 68,44 56,44 56,80 44,80 44,44 32,44" fill="#FFFFFF" />
        </svg>
      );

    case "S-13": // Paso peatones situación
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          <polygon points="50,15 85,82 15,82" fill="#FFFFFF" />
          <circle cx="50" cy="40" r="3.5" fill="#000000" />
          <line x1="50" y1="44" x2="48" y2="62" stroke="#000000" strokeWidth="3" />
          <line x1="48" y1="62" x2="40" y2="74" stroke="#000000" strokeWidth="3" />
          <line x1="48" y1="62" x2="56" y2="74" stroke="#000000" strokeWidth="3" />
        </svg>
      );

    case "S-28": // Calle residencial
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
          <polygon points="25,40 38,28 50,40 50,60 25,60" fill="#FFFFFF" />
          <rect x="55" y="48" width="30" height="12" fill="#FFFFFF" rx="2" />
          <circle cx="70" cy="36" r="3" fill="#FFFFFF" />
        </svg>
      );

    case "S-33": // Señal V-16 Conectada
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="5" y="5" width="90" height="90" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" rx="8" />
          <circle cx="50" cy="50" r="22" fill="#F59E0B" />
          <polygon points="50,36 54,46 64,48 57,55 58,65 50,60 42,65 43,55 36,48 46,46" fill="#FFFFFF" />
          <text x="50" y="86" fill="#38BDF8" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            V-16
          </text>
        </svg>
      );

    // Fallback por formas geométricas reglamentarias
    default:
      if (shape === "triangular" || shape === "triangular_amarillo") {
        return (
          <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
            <polygon points="50,8 95,88 5,88" fill="#DC2626" />
            <polygon points="50,24 82,80 18,80" fill={shape === "triangular_amarillo" ? "#FBBF24" : "#FFFFFF"} />
            <text x="50" y="68" fill="#000000" fontSize="14" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              {code}
            </text>
          </svg>
        );
      } else if (shape === "circular_azul") {
        return (
          <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
            <circle cx="50" cy="50" r="45" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
            <text x="50" y="57" fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
              {code}
            </text>
          </svg>
        );
      } else if (shape === "circular_rojo") {
        return (
          <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
            <circle cx="50" cy="50" r="45" fill="#DC2626" />
            <circle cx="50" cy="50" r="33" fill="#FFFFFF" />
            <text x="50" y="57" fill="#DC2626" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              {code}
            </text>
          </svg>
        );
      } else {
        return (
          <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
            <rect x="5" y="5" width="90" height="90" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" rx="8" />
            <text x="50" y="56" fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
              {code}
            </text>
          </svg>
        );
      }
  }
};
