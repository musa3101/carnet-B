// Catálogo Exhaustivo de Señales de Tráfico Oficiales DGT 2026
// Con significado legal, explicación de Igor, trampas de examen y categoría

export const SENALES_CATEGORIES = [
  { id: 'todas', label: 'Todas las Señales', icon: '🚦' },
  { id: 'peligro', label: 'Advertencia de Peligro', icon: '⚠️' },
  { id: 'prioridad', label: 'Prioridad de Paso', icon: '🛑' },
  { id: 'prohibicion_entrada', label: 'Prohibición de Entrada', icon: '⛔' },
  { id: 'restriccion_paso', label: 'Restricción y Maniobra', icon: '🚫' },
  { id: 'obligacion', label: 'Obligación', icon: '🔵' },
  { id: 'fin_prohibicion', label: 'Fin de Prohibición', icon: '⚪' },
  { id: 'indicacion', label: 'Indicación y Carriles', icon: '🟦' },
  { id: 'nuevas_2026', label: 'Novedades DGT 2026', icon: '✨' }
];

export const SENALES_DATABASE = [
  // ==========================================
  // 1. SEÑALES DE PRIORIDAD
  // ==========================================
  {
    code: "R-1",
    name: "Ceda el Paso",
    category: "prioridad",
    shape: "triangular_invertido",
    description: "Obligación de ceder el paso en la próxima intersección a los vehículos que circulen por la vía prioritaria.",
    explicacionIgor: "No obliga a parar si no viene nadie. Solo te detienes si se aproximan vehículos a los que debas ceder la preferencia.",
    trampaExamen: "¿Es obligatorio detenerse siempre ante un Ceda el Paso? NO, solo si vienen vehículos con preferencia. Si hay visibilidad total, pasas sin detenerte.",
    topicId: "07",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-2",
    name: "STOP (Detención Obligatoria)",
    category: "prioridad",
    shape: "octogonal",
    description: "Obligación de detener completamente el vehículo (0 km/h) ante la línea de detención o antes del cruce, y ceder el paso.",
    explicacionIgor: "Parada OBLIGATORIA SIEMPRE, vengan o no vengan coches. Velocímetro a 0 absoluto. Si no ves bien, haces un segundo STOP.",
    trampaExamen: "Si no viene nadie y la visibilidad es perfecta, ¿puedes pasar despacio sin detenerte? NUNCA. La detención es obligatoria siempre.",
    topicId: "07",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-3",
    name: "Calzada con Prioridad",
    category: "prioridad",
    shape: "rombo",
    description: "Indica a los conductores que circulan por dicha calzada su prioridad en todas las intersecciones sucesivas.",
    explicacionIgor: "Rombo amarillo con borde blanco. Mientras circules por esta vía tienes preferencia en todos los cruces.",
    trampaExamen: "¿Otorga prioridad en todas las intersecciones sucesivas? SÍ, hasta que encuentres la señal R-4 de fin de calzada con prioridad.",
    topicId: "07",
    colorScheme: "amarillo_blanco"
  },
  {
    code: "R-4",
    name: "Fin de Calzada con Prioridad",
    category: "prioridad",
    shape: "rombo",
    description: "Indica que la calzada por la que se circula pierde su prioridad respecto a otras vías.",
    explicacionIgor: "Rombo amarillo tachado con franja negra diagonal. A partir de aquí vuelve a regir la regla general de ceder el paso a la derecha.",
    trampaExamen: "¿Qué norma rige tras esta señal si no hay otra señalización? La regla general de prioridad de la derecha.",
    topicId: "07",
    colorScheme: "amarillo_negro"
  },
  {
    code: "R-5",
    name: "Prioridad en Sentido Contrario",
    category: "prioridad",
    shape: "circular_rojo",
    description: "Prohibición de entrar en un paso estrecho si obliga a los vehículos del sentido contrario a detenerse.",
    explicacionIgor: "Círculo rojo con flecha roja y flecha negra. La flecha roja eres tú: NO tienes prioridad en el estrechamiento.",
    trampaExamen: "¿Quién pasa primero ante la señal R-5? El vehículo que viene en sentido contrario (flecha negra).",
    topicId: "07",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-6",
    name: "Prioridad Respecto al Sentido Contrario",
    category: "prioridad",
    shape: "cuadrada_azul",
    description: "Indica a los conductores que en un paso estrecho tienen prioridad sobre los vehículos que circulan en sentido contrario.",
    explicacionIgor: "Cuadrada azul con flecha blanca grande y flecha roja pequeña. Tú eres la flecha blanca: TÚ tienes preferencia en el estrechamiento.",
    trampaExamen: "Diferencia entre R-5 (redonda roja = cedes el paso) y R-6 (cuadrada azul = tienes prioridad).",
    topicId: "07",
    colorScheme: "azul_blanco"
  },
  {
    code: "P-1",
    name: "Intersección con Prioridad de la Derecha",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por proximidad de una intersección en la que rige la regla general de ceder el paso a los vehículos de la derecha.",
    explicacionIgor: "Cruz negra (X). Te advierte de que el cruce NO tiene señales de prioridad y tienes que ceder el paso a quien venga por tu derecha.",
    trampaExamen: "¿Quién tiene preferencia ante esta señal? Los vehículos que se aproximen por la derecha.",
    topicId: "07",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-1a",
    name: "Intersección con Prioridad sobre Vía a la Derecha",
    category: "prioridad",
    shape: "triangular",
    description: "Peligro por la proximidad de una intersección con una vía a la derecha cuyos usuarios deben ceder el paso.",
    explicacionIgor: "Flecha ancha con ramal fino a la derecha. Tú vas por la flecha ancha, así que tú tienes la prioridad sobre el que entra por la derecha.",
    trampaExamen: "¿Tienes que ceder el paso a los vehículos de la derecha ante la señal P-1a? NO, tú tienes prioridad porque la vía transversal tiene que ceder el paso.",
    topicId: "07",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-1c",
    name: "Incorporación por la Derecha con Prioridad",
    category: "prioridad",
    shape: "triangular",
    description: "Peligro por la proximidad de una incorporación por la derecha de vehículos que deben ceder el paso.",
    explicacionIgor: "Tú tienes la prioridad, pero debes facilitar la incorporación en la medida de lo posible cambiando de carril o adecuando la velocidad.",
    trampaExamen: "¿Estás obligado a ceder el paso al que se incorpora? No, pero sí tienes la obligación de facilitarle la maniobra en la medida de lo posible.",
    topicId: "07",
    colorScheme: "rojo_blanco"
  },

  // ==========================================
  // 2. SEÑALES DE ADVERTENCIA DE PELIGRO
  // ==========================================
  {
    code: "P-3",
    name: "Semáforos",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de una intersección o tramo regulado por semáforos.",
    explicacionIgor: "Semáforo dibujado dentro del triángulo. Te avisa con tiempo para que no te sorprenda una luz roja o amarilla.",
    trampaExamen: "¿Qué peligro advierte la señal P-3? La proximidad de un semáforo.",
    topicId: "11",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-4",
    name: "Intersección Giratoria (Glorieta)",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de una glorieta donde la circulación se efectúa en sentido giratorio.",
    explicacionIgor: "Tres flechas giratorias. Recuerda que dentro de la glorieta tienen prioridad los vehículos que ya están dentro del anillo.",
    trampaExamen: "¿Esta señal te da prioridad? No, te advierte del peligro de la glorieta, donde la preferencia es de quien ya circula por ella.",
    topicId: "08",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-7",
    name: "Paso a Nivel con Barreras",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un paso a nivel provisto de barreras o semibarreras.",
    explicacionIgor: "Valla dibujada. Significa que tiene barrera que sube y baja.",
    trampaExamen: "Diferencia entre P-7 (valla = CON barreras) y P-8 (tren de vapor = SIN barreras).",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-8",
    name: "Paso a Nivel sin Barreras",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un paso a nivel desprovisto de barreras o semibarreras.",
    explicacionIgor: "Locomotora de vapor antigua. No tiene barrera, debes extremar la precaución al cruzar las vías.",
    trampaExamen: "¿Tiene barreras el paso a nivel con silueta de tren? NO, es un paso a nivel SIN barreras.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-13a",
    name: "Curva Peligrosa a la Derecha",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de una curva peligrosa hacia la derecha.",
    explicacionIgor: "Curva hacia la derecha. Modera la velocidad ANTES de entrar en la curva, nunca frenes bruscamente dentro.",
    trampaExamen: "¿Dónde se debe frenar ante una curva peligrosa? Antes de entrar en la curva, acelerando suavemente al salir.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-14a",
    name: "Curvas Peligrosas (Primera a la Derecha)",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de una sucesión de curvas peligrosas, la primera de ellas hacia la derecha.",
    explicacionIgor: "S doble con el primer giro a la derecha. Indica tramo continuado de curvas.",
    trampaExamen: "¿Hacia qué lado gira la primera curva en la señal P-14a? Hacia la derecha.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-15",
    name: "Perfil Irregular (Resalto o Badén)",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un resalto, badén o pavimento en mal estado.",
    explicacionIgor: "Doble curvatura. Modera la velocidad para no dañar los amortiguadores ni perder adherencia.",
    trampaExamen: "¿Qué indica la señal con doble ondulación? Perfil irregular en la vía.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-15a",
    name: "Resalto en la Calzada",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un resalto o elevación en la calzada.",
    explicacionIgor: "Ondulación hacia arriba (paso elevado o reductor de velocidad).",
    trampaExamen: "Diferencia con P-15b: P-15a es elevación (hacia arriba) y P-15b es badén (hacia abajo).",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-16a",
    name: "Bajada Peligrosa (Fuerte Pendiente)",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un tramo de vía con fuerte pendiente descendente (ej: 10%).",
    explicacionIgor: "Porcentaje bajando de izquierda a derecha. Usa el freno de motor engranando marchas cortas para no calentar los frenos.",
    trampaExamen: "¿Cómo se debe descender una pendiente prolongada? Utilizando marchas cortas para aprovechar el freno motor y evitar el fading.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-17",
    name: "Estrechamiento de Calzada",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un tramo de la vía en el que la calzada se estrecha por ambos lados.",
    explicacionIgor: "Si no caben dos vehículos a la vez y no hay señales de prioridad, pasa primero el que haya entrado primero.",
    trampaExamen: "¿Quién pasa primero en un estrechamiento sin señales? Quien haya entrado primero. En caso de duda, el vehículo con mayor dificultad de maniobra.",
    topicId: "07",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-18",
    name: "Obras",
    category: "peligro",
    shape: "triangular_amarillo",
    description: "Peligro por la proximidad de un tramo de vía en obras con fondo amarillo.",
    explicacionIgor: "Fondo amarillo. El significado de la señal es exactamente el mismo que con fondo blanco, pero advierte de que el peligro es circunstancial por obras.",
    trampaExamen: "¿Cambia el significado de las señales por tener fondo amarillo? NO, el significado normativo es idéntico, solo indica que es por obras.",
    topicId: "16",
    colorScheme: "rojo_amarillo"
  },
  {
    code: "P-19",
    name: "Pavimento Deslizante",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de una zona de la calzada cuyo pavimento puede resultar muy deslizante.",
    explicacionIgor: "Coche derrapando con huellas en S. Aumenta la distancia de seguridad y evita frenazos o volantazos bruscos.",
    trampaExamen: "¿Qué maniobras debes evitar ante esta señal? Frenazos, aceleraciones y cambios de dirección bruscos.",
    topicId: "22",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-20",
    name: "Paso para Peatones (Peligro)",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un paso para peatones señalizado en la calzada.",
    explicacionIgor: "Triángulo con peatón cruzando. Si ves peatones con intención de cruzar, debes detenerte y cederles el paso.",
    trampaExamen: "Diferencia entre P-20 (triangular = peligro por paso peatones) y S-13 (cuadrada azul = situación exacta del paso).",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-21",
    name: "Paso Frecuente de Niños",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un lugar frecuentado por niños, como escuelas o parques.",
    explicacionIgor: "Silueta de dos niños corriendo. Obliga a extremar la precaución y reducir la velocidad.",
    trampaExamen: "¿Tienen preferencia los niños fuera de paso ante esta señal? No tienen preferencia legal salvo en paso señalizado, pero debes poder detener el coche.",
    topicId: "21",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-21b",
    name: "Paso de Personas Mayores (Nueva DGT 2026)",
    category: "nuevas_2026",
    shape: "triangular",
    description: "Peligro por la proximidad de un lugar frecuentado por personas de avanzada edad, como residencias o centros de día.",
    explicacionIgor: "Nueva señal que actualiza figuras antiguas mostrando dos personas mayores caminando.",
    trampaExamen: "¿Qué indica la nueva señal P-21b? Proximidad de un lugar frecuentado por ancianos.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-22",
    name: "Paso para Ciclistas",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un paso para ciclistas o lugar donde cruzan la vía.",
    explicacionIgor: "Los ciclistas tienen prioridad de paso en su carril o paso debidamente señalizado.",
    trampaExamen: "¿Quién tiene prioridad en un paso para ciclistas? Los ciclistas.",
    topicId: "21",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-23",
    name: "Paso de Animales Domésticos (Cañada)",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un lugar donde frecuentemente cruzan animales domésticos. Si lleva el panel 'CAÑADA', los animales tienen prioridad.",
    explicacionIgor: "Silueta de vaca. Si tiene debajo el cartel 'CAÑADA', los animales tienen preferencia absoluta de paso.",
    trampaExamen: "¿Cuándo tienen prioridad los animales que cruzan la calzada? Cuando cruzan por una cañada debidamente señalizada con el panel complementario.",
    topicId: "21",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-24",
    name: "Paso de Animales en Libertad",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un lugar donde la calzada puede ser atravesada por animales en libertad (ciervo/jabalí).",
    explicacionIgor: "Silueta de ciervo saltando. En caso de atropello a animales cinegéticos, la responsabilidad suele ser del conductor salvo omisión de vallado o batida.",
    trampaExamen: "¿Tienen prioridad de paso los animales en libertad? NO, nunca tienen prioridad de paso.",
    topicId: "21",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-25",
    name: "Circulación en Dos Sentidos",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un tramo de calzada donde la circulación se realiza provisional o definitivamente en ambos sentidos.",
    explicacionIgor: "Dos flechas opuestas dentro del triángulo. Te avisa de que se acaba el sentido único y te vas a cruzar coches de frente.",
    trampaExamen: "¿Qué indica la señal P-25? Que la calzada pasa a ser de doble sentido de circulación.",
    topicId: "03",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-29",
    name: "Viento Transversal",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de una zona donde sopla frecuentemente viento fuerte en dirección transversal.",
    explicacionIgor: "Manga de viento. Ojo al salir de túneles o adelantar a camiones por el 'efecto pantalla'.",
    trampaExamen: "¿Dónde es más peligroso el viento transversal? Al salir de túneles, cortes de terreno o al adelantar a vehículos voluminosos por el efecto pantalla.",
    topicId: "22",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-33",
    name: "Visibilidad Reducida",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un tramo en que la circulación se ve dificultada por una pérdida notable de visibilidad (niebla, lluvia, humo, nieve).",
    explicacionIgor: "Coche entrando en una nube de puntos. Reduce velocidad y enciende el alumbrado correspondiente.",
    trampaExamen: "¿Qué luces debes encender ante visibilidad reducida? Al menos las luces de posición y cruce, y antiniebla si la visibilidad es muy escasa.",
    topicId: "14",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-34",
    name: "Pavimento Deslizante por Hielo o Nieve",
    category: "peligro",
    shape: "triangular",
    description: "Peligro por la proximidad de un tramo de calzada cuyo pavimento puede resultar especialmente deslizante a causa del hielo o la nieve.",
    explicacionIgor: "Copo de nieve dibujado dentro del triángulo. Con hielo la distancia de frenado se puede multiplicar hasta por 10.",
    trampaExamen: "¿Cuánto puede aumentar la distancia de frenado con hielo? Hasta 10 veces más respecto a pavimento seco.",
    topicId: "22",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-35",
    name: "Trenzado de Carriles (Nueva DGT 2025/2026)",
    category: "nuevas_2026",
    shape: "triangular",
    description: "Peligro por la proximidad de un tramo de confluencia y bifurcación donde los vehículos cruzan sus trayectorias para cambiar de carril.",
    explicacionIgor: "Dos flechas que se entrecruzan. Muy preguntada en los nuevos exámenes DGT.",
    trampaExamen: "¿Qué advierte la señal P-35? La proximidad de un tramo de trenzado donde los vehículos cruzan sus trayectorias.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "P-50",
    name: "Otros Peligros",
    category: "peligro",
    shape: "triangular",
    description: "Indica la proximidad de un peligro distinto de los advertidos por otras señales del catálogo.",
    explicacionIgor: "Signo de admiración (!). Suele ir acompañado de un panel inferior que especifica el peligro exacto.",
    trampaExamen: "¿Qué significa la señal con signo de admiración? Peligro indefinido u otros peligros no reglamentados.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },

  // ==========================================
  // 3. SEÑALES DE PROHIBICIÓN DE ENTRADA
  // ==========================================
  {
    code: "R-100",
    name: "Circulación Prohibida",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Prohibición de circulación de toda clase de vehículos en ambos sentidos.",
    explicacionIgor: "Círculo blanco con borde rojo vacío. Nadie puede circular en ningún sentido.",
    trampaExamen: "¿Prohíbe la entrada solo en tu sentido o en ambos? En AMBOS sentidos a todo tipo de vehículos.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-101",
    name: "Entrada Prohibida",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Prohibición de acceso a toda clase de vehículos en este sentido de marcha.",
    explicacionIgor: "Círculo rojo con barra blanca horizontal. Sentido único en contra.",
    trampaExamen: "¿Significa calle sin salida? NO, significa que no puedes entrar porque es de sentido contrario.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-102",
    name: "Entrada Prohibida a Vehículos de Motor",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Prohibición de acceso a vehículos de motor (turismos, motos, camiones...).",
    explicacionIgor: "Círculo rojo con coche dibujado. Prohíbe a TODOS los vehículos de motor.",
    trampaExamen: "¿Pueden entrar ciclomotores ante la señal R-102? SÍ, porque el ciclomotor NO se considera legalmente vehículo de motor.",
    topicId: "02",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-103",
    name: "Entrada Prohibida a Vehículos de Motor Excepto Motos sin Sidecar",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Prohíbe el acceso a automóviles, pero PERMITE el paso a motocicletas de dos ruedas sin sidecar.",
    explicacionIgor: "Círculo rojo con coche frontal. Prohíbe a turismos y camiones pero las motos de 2 ruedas SÍ pueden pasar.",
    trampaExamen: "¿Puede pasar una moto de dos ruedas sin sidecar ante esta señal? SÍ, está permitida su entrada expresamente.",
    topicId: "02",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-104",
    name: "Entrada Prohibida a Motocicletas",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Prohibición de acceso a motocicletas de todo tipo.",
    explicacionIgor: "Círculo rojo con una moto dibujada. Solo prohíbe a motocicletas.",
    trampaExamen: "¿Pueden pasar ciclomotores ante la señal R-104? SÍ, porque el ciclomotor no es una motocicleta.",
    topicId: "02",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-105",
    name: "Entrada Prohibida a Ciclomotores",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Prohibición de acceso a ciclomotores de dos y tres ruedas, cuadriciclos ligeros y vehículos para personas de movilidad reducida.",
    explicacionIgor: "Círculo rojo con ciclomotor. Prohíbe a ciclomotores y coches sin carnet (cuadriciclos ligeros).",
    trampaExamen: "¿Prohíbe el paso a los cuadriciclos ligeros? SÍ, la señal R-105 prohíbe también a cuadriciclos ligeros.",
    topicId: "02",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-106",
    name: "Entrada Prohibida a Camiones y Furgones",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Prohibición de acceso a vehículos destinados al transporte de mercancías (camiones y furgones), independientemente de su masa.",
    explicacionIgor: "Silueta de camión. Prohíbe a TODOS los camiones y furgones salvo que indique una cifra de masa.",
    trampaExamen: "¿Prohíbe a un furgón de 2.000 kg si no tiene cifra de masa inscrita? SÍ, prohíbe a todos los vehículos de transporte de mercancías.",
    topicId: "16",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-114",
    name: "Entrada Prohibida a Ciclos (Bicicletas)",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Prohibición de acceso a ciclos de dos, tres o cuatro ruedas.",
    explicacionIgor: "Círculo rojo con bicicleta negra. Prohibido el paso a bicis.",
    trampaExamen: "¿A qué vehículos prohíbe el paso? A los ciclos (bicicletas).",
    topicId: "21",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-116",
    name: "Entrada Prohibida a Peatones",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Prohibición de acceso a peatones.",
    explicacionIgor: "Círculo rojo con peatón negro. Prohíbe circular a pie por esa vía.",
    trampaExamen: "¿Pueden circular personas empujando un carrito ante esta señal? NO, el paso de peatones está prohibido.",
    topicId: "21",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-118",
    name: "Prohibido Vehículos de Movilidad Personal (VMP / Patinetes)",
    category: "nuevas_2026",
    shape: "circular_rojo",
    description: "Prohibición de acceso a vehículos de movilidad personal (patinetes eléctricos y similares).",
    explicacionIgor: "Círculo rojo con un patinete eléctrico dentro. Novedad DGT.",
    trampaExamen: "¿A qué vehículos prohíbe el paso la señal R-118? Exclusivamente a los Vehículos de Movilidad Personal (VMP).",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-120",
    name: "Zona de Bajas Emisiones (ZBE)",
    category: "nuevas_2026",
    shape: "circular_rojo",
    description: "Prohibición de acceso a vehículos que no cumplan los criterios ambientales exigidos en la Zona de Bajas Emisiones.",
    explicacionIgor: "Círculo rojo con coche emitiendo partículas y paneles con distintivos 0, ECO, C, B permitidos.",
    trampaExamen: "¿Pueden entrar todos los vehículos con distintivo C? Depende de la ordenanza municipal y del panel complementario.",
    topicId: "36",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-200",
    name: "Prohibición de Pasar sin Detenerse",
    category: "prohibicion_entrada",
    shape: "circular_rojo",
    description: "Indica el lugar donde es obligatoria la detención por la proximidad de un peaje, aduana o control de policía.",
    explicacionIgor: "Círculo rojo con franja negra horizontal y texto 'PEAJE', 'ADUANA' o 'POLICÍA'. Detención obligatoria.",
    trampaExamen: "¿Es obligatorio detenerse si la barrera de peaje está abierta? SÍ, salvo que esté habilitado el sistema de telepeaje dinámico.",
    topicId: "12",
    colorScheme: "rojo_blanco"
  },

  // ==========================================
  // 4. SEÑALES DE RESTRICCIÓN DE PASO Y MANIOBRA
  // ==========================================
  {
    code: "R-300",
    name: "Separación Mínima Obligatoria",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohíbe circular sin mantener con el vehículo precedente una distancia igual o superior a la indicada en metros (ej: 70m).",
    explicacionIgor: "Dos coches con una cifra en metros en medio. Obliga a mantener esa distancia salvo para adelantar.",
    trampaExamen: "¿Se puede reducir esa distancia para iniciar un adelantamiento? SÍ, se puede reducir exclusivamente para efectuar la maniobra de adelantamiento.",
    topicId: "05",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-301",
    name: "Velocidad Máxima Permitida",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohíbe circular a velocidad superior, en km/h, a la indicada en la señal.",
    explicacionIgor: "Círculo rojo con número negro. Obliga desde la señal hasta la próxima señal de fin de limitación o hasta el cruce.",
    trampaExamen: "Si la señal R-301 está colocada bajo una señal de peligro P-X, ¿cuándo termina la limitación? Cuando termina el peligro indicado.",
    topicId: "06",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-302",
    name: "Giro a la Derecha Prohibido",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohibición de girar a la derecha en la próxima intersección.",
    explicacionIgor: "Flecha negra tachada a la derecha. Prohíbe doblar hacia la derecha.",
    trampaExamen: "¿Permite seguir de frente o girar a la izquierda? SÍ, solo prohíbe girar a la derecha.",
    topicId: "08",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-303",
    name: "Giro a la Izquierda Prohibido",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohibición de girar a la izquierda. ¡ATENCIÓN: Prohíbe también el cambio de sentido de marcha!",
    explicacionIgor: "¡Pregunta estrella de examen! Si no puedes girar a la izquierda, por lógica TAMPOCO puedes hacer un cambio de sentido.",
    trampaExamen: "¿La señal de giro a la izquierda prohibido prohíbe el cambio de sentido? SÍ, prohíbe tanto el giro a la izquierda como el cambio de sentido.",
    topicId: "08",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-304",
    name: "Cambio de Sentido Prohibido",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohibición de efectuar la maniobra de cambio de sentido (media vuelta).",
    explicacionIgor: "Flecha en U invertida tachada. Prohíbe dar media vuelta, pero SÍ PERMITE girar a la izquierda.",
    trampaExamen: "¿Permite girar a la izquierda la señal de cambio de sentido prohibido? SÍ, solo prohíbe el cambio de sentido, no el giro a la izquierda.",
    topicId: "08",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-305",
    name: "Adelantamiento Prohibido",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohibición de adelantar a los vehículos de motor de 4 ruedas, salvo a motos de 2 ruedas sin invadir el sentido contrario.",
    explicacionIgor: "Coche rojo adelantando a coche negro. Prohíbe adelantar a vehículos de motor.",
    trampaExamen: "¿Se puede adelantar a una moto de 2 ruedas ante la señal R-305? SÍ, si no se invade el sentido contrario y se deja la distancia lateral de seguridad.",
    topicId: "08",
    colorScheme: "rojo_blanco"
  },
  {
    code: "R-307",
    name: "Parada y Estacionamiento Prohibidos",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohibición de parada (<2 min) y estacionamiento en el lado de la calzada en que esté situada.",
    explicacionIgor: "Cruz en aspa (X) sobre fondo azul. Prohibido tanto parar como aparcar.",
    trampaExamen: "¿Se puede parar durante 30 segundos para bajar un pasajero? NO, prohíbe la parada y el estacionamiento.",
    topicId: "09",
    colorScheme: "rojo_azul"
  },
  {
    code: "R-308",
    name: "Estacionamiento Prohibido",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohibición de estacionamiento en el lado de la calzada donde esté situada. SÍ permite la parada.",
    explicacionIgor: "Una sola barra diagonal sobre fondo azul. Prohibido aparcar, pero SÍ puedes parar (< 2 minutos sin abandonar el coche).",
    trampaExamen: "¿Se puede parar para recoger a una persona ante la señal R-308? SÍ, porque la parada está permitida (solo prohíbe estacionar).",
    topicId: "09",
    colorScheme: "rojo_azul"
  },
  {
    code: "R-308a",
    name: "Estacionamiento Prohibido los Días Impares",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohibición de estacionamiento en los días impares del mes (1, 3, 5...) en el lado de la calzada señalizado.",
    explicacionIgor: "Una barra blanca vertical (I) tachada. Prohibido aparcar días impares.",
    trampaExamen: "¿Se puede estacionar el día 4 ante la señal R-308a? SÍ, porque el 4 es día par.",
    topicId: "09",
    colorScheme: "rojo_azul"
  },
  {
    code: "R-308c",
    name: "Estacionamiento Prohibido 1ª Quincena",
    category: "restriccion_paso",
    shape: "circular_rojo",
    description: "Prohibición de estacionamiento desde las 9:00 horas del día 1 hasta las 9:00 horas del día 16.",
    explicacionIgor: "Texto '1-15' tachado. Ojo con la hora de cambio: la prohibición finaliza el día 16 a las 9:00 de la mañana.",
    trampaExamen: "¿A qué hora finaliza la prohibición de la 1ª quincena? El día 16 a las 9:00 horas.",
    topicId: "09",
    colorScheme: "rojo_azul"
  },

  // ==========================================
  // 5. SEÑALES DE OBLIGACIÓN
  // ==========================================
  {
    code: "R-400a",
    name: "Sentido Obligatorio (Frente)",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación de seguir de frente en la próxima intersección.",
    explicacionIgor: "Círculo azul con flecha recta hacia arriba. Obliga a seguir recto y prohíbe cualquier giro.",
    trampaExamen: "¿Esta señal te prohíbe girar a la derecha? SÍ, al obligar a ir de frente prohíbe giros y cambios de sentido.",
    topicId: "12",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-400b",
    name: "Sentido Obligatorio (Derecha)",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación de girar a la derecha en la próxima intersección.",
    explicacionIgor: "Círculo azul con flecha a la derecha. Obligado girar a la derecha.",
    trampaExamen: "¿Te permite seguir de frente? NO, la única dirección permitida es hacia la derecha.",
    topicId: "12",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-401a",
    name: "Paso Obligatorio por la Derecha",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación para los vehículos de pasar por el lado derecho del refugio, isleta o obstáculo.",
    explicacionIgor: "Flecha inclinada a 45 grados. Indica por qué lado del obstáculo debes pasar.",
    trampaExamen: "Diferencia con R-400b: R-401a es paso por el lado del obstáculo (flecha inclinada), R-400b es giro obligatorio en cruce (flecha horizontal).",
    topicId: "12",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-402",
    name: "Paso Obligatorio Giratorio",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación de efectuar el movimiento giratorio en el sentido de las flechas (antihorario).",
    explicacionIgor: "Círculo azul con tres flechas giratorias. Obliga a rodear la glorieta por la derecha.",
    trampaExamen: "Diferencia con P-4: R-402 es circular azul (OBLIGACIÓN de giro), P-4 es triangular (ADVERTENCIA de peligro).",
    topicId: "08",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-404",
    name: "Calzada para Automóviles Excepto Motos sin Sidecar",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación para los conductores de automóviles, excepto motocicletas de dos ruedas sin sidecar, de circular por la calzada a cuya entrada esté situada.",
    explicacionIgor: "Círculo azul con coche blanco. Obliga a turismos y camiones, y prohíbe al resto.",
    trampaExamen: "¿Pueden circular ciclomotores o peatones por esta calzada? NO, es exclusiva para automóviles.",
    topicId: "02",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-407a",
    name: "Vía Reservada para Ciclos (Vía Ciclista)",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación para los conductores de ciclos de circular por dicha vía y prohibición a los demás usuarios de la vía de utilizarla.",
    explicacionIgor: "Círculo azul con bicicleta blanca. Obliga a los ciclistas y prohíbe al resto de vehículos.",
    trampaExamen: "¿Pueden circular ciclomotores o peatones por una vía con señal R-407a? NO, es de uso exclusivo para ciclos.",
    topicId: "21",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-407b",
    name: "Vía Reservada para Ciclomotores",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación para los conductores de ciclomotores de circular por dicha vía y prohibición a los demás usuarios.",
    explicacionIgor: "Círculo azul con ciclomotor blanco. Exclusiva para ciclomotores.",
    trampaExamen: "¿Pueden circular motocicletas por esta vía? NO, las motocicletas tienen prohibida la entrada.",
    topicId: "02",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-411",
    name: "Velocidad Mínima Obligatoria",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación para todos los conductores de circular, desde el lugar en que esté situada, al menos a la velocidad indicada en km/h (ej: 30 km/h o 60 km/h).",
    explicacionIgor: "Círculo azul con número blanco. Prohibido circular por debajo de esa velocidad salvo causa justificada.",
    trampaExamen: "¿Qué velocidad mínima exige la señal R-411 con un 30? No se puede circular a menos de 30 km/h.",
    topicId: "06",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-412",
    name: "Cadenas para Nieve Obligatorias",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación de no proseguir la marcha sin cadenas para nieve u otros dispositivos autorizados en al menos las ruedas motrices.",
    explicacionIgor: "Círculo azul con rueda y cadena. Velocidad máxima recomendada con cadenas: 50 km/h.",
    trampaExamen: "¿En qué ruedas se deben colocar las cadenas? Al menos en las ruedas motrices (las que reciben la fuerza del motor).",
    topicId: "29",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-413",
    name: "Alumbrado de Corto Alcance Obligatorio",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación de circular con el alumbrado de corto alcance (cruce) al menos, con independencia de las condiciones de luz.",
    explicacionIgor: "Círculo azul con faro encendido. Típica de entrada a túneles.",
    trampaExamen: "¿Qué luces mínimas debes encender ante la señal R-413? Las luces de posición y corto alcance (cruce).",
    topicId: "14",
    colorScheme: "azul_blanco"
  },
  {
    code: "R-414",
    name: "Cinturón de Seguridad Obligatorio",
    category: "obligacion",
    shape: "circular_azul",
    description: "Obligación para los conductores y ocupantes de utilizar el cinturón de seguridad y sistemas de retención homologados.",
    explicacionIgor: "Círculo azul con silueta de persona con cinturón.",
    trampaExamen: "¿A quién obliga el uso del cinturón? A todos los ocupantes de los asientos equipados con él.",
    topicId: "30",
    colorScheme: "azul_blanco"
  },

  // ==========================================
  // 6. SEÑALES DE FIN DE PROHIBICIÓN O RESTRICCIÓN
  // ==========================================
  {
    code: "R-500",
    name: "Fin de Todas las Prohibiciones Específicas",
    category: "fin_prohibicion",
    shape: "circular_blanco",
    description: "Señala el lugar donde todas las prohibiciones específicas para vehículos en movimiento dejan de tener aplicación.",
    explicacionIgor: "Círculo blanco con franja diagonal negra. Anula límites de velocidad y prohibición de adelantar anteriores.",
    trampaExamen: "¿Anula la prohibición de estacionar? NO, solo anula prohibiciones relativas a vehículos en movimiento.",
    topicId: "12",
    colorScheme: "blanco_negro"
  },
  {
    code: "R-501",
    name: "Fin de Limitación de Velocidad",
    category: "fin_prohibicion",
    shape: "circular_blanco",
    description: "Señala el lugar desde donde deja de ser aplicable una anterior señal de velocidad máxima.",
    explicacionIgor: "Círculo blanco con número en gris tachado con barras diagonales. Vuelves a la velocidad genérica de la vía.",
    trampaExamen: "¿A qué velocidad puedes circular tras esta señal? A la velocidad máxima genérica fijada para el tipo de vía y vehículo.",
    topicId: "06",
    colorScheme: "blanco_negro"
  },
  {
    code: "R-502",
    name: "Fin de Prohibición de Adelantamiento",
    category: "fin_prohibicion",
    shape: "circular_blanco",
    description: "Señala el lugar desde donde deja de ser aplicable una anterior señal de prohibición de adelantamiento.",
    explicacionIgor: "Dos coches en gris tachados con barras diagonales. Vuelve a permitirse el adelantamiento si la señalización horizontal lo permite.",
    trampaExamen: "¿Permite adelantar si hay línea continua? NO, las marcas viales continuas siguen prohibiendo el adelantamiento.",
    topicId: "08",
    colorScheme: "blanco_negro"
  },
  {
    code: "R-506",
    name: "Fin de Velocidad Mínima Obligatoria",
    category: "fin_prohibicion",
    shape: "circular_azul",
    description: "Señala el lugar desde donde deja de ser aplicable una anterior señal de velocidad mínima obligatoria.",
    explicacionIgor: "Círculo azul con número blanco tachado con franja roja diagonal.",
    trampaExamen: "¿Qué indica la señal R-506? El fin de la velocidad mínima que obligaba la señal anterior.",
    topicId: "06",
    colorScheme: "azul_rojo"
  },

  // ==========================================
  // 7. SEÑALES DE INDICACIÓN GENERAL Y CARRILES
  // ==========================================
  {
    code: "S-1",
    name: "Autopista",
    category: "indicacion",
    shape: "cuadrada_azul",
    description: "Indica el principio de una autopista. Velocidad máxima 120 km/h, mínima 60 km/h. Prohibido peatones, ciclos y ciclomotores.",
    explicacionIgor: "Puente blanco sobre dos calzadas en fondo azul. Vía vallada sin accesos a fincas.",
    trampaExamen: "¿Pueden circular bicicletas por autopista? NO, está totalmente prohibido a ciclistas en autopista.",
    topicId: "06",
    colorScheme: "azul_blanco"
  },
  {
    code: "S-1a",
    name: "Autovía",
    category: "indicacion",
    shape: "cuadrada_azul",
    description: "Indica el principio de una autovía. Permite la circulación de ciclistas mayores de 14 años por el arcén salvo señal prohibitiva.",
    explicacionIgor: "Similar a autopista pero con texto 'AUTOVÍA'. Permite bicis mayores de 14 años por el arcén.",
    trampaExamen: "¿Qué vehículos pueden circular por autovía que no pueden por autopista? Bicicletas conducidas por mayores de 14 años por el arcén salvo señal expresa.",
    topicId: "06",
    colorScheme: "azul_blanco"
  },
  {
    code: "S-2",
    name: "Fin de Autopista",
    category: "indicacion",
    shape: "cuadrada_azul",
    description: "Indica el final de una autopista y la pérdida de sus normas especiales de circulación.",
    explicacionIgor: "Señal de autopista tachada con franja roja diagonal. Debes adecuar la velocidad a la vía a la que te incorpores.",
    trampaExamen: "¿Qué indica la señal S-2? El final de una autopista.",
    topicId: "06",
    colorScheme: "azul_rojo"
  },
  {
    code: "S-3",
    name: "Vía para Automóviles",
    category: "indicacion",
    shape: "cuadrada_azul",
    description: "Indica el principio de una vía para automóviles, reservada exclusivamente a la circulación de automóviles.",
    explicacionIgor: "Coche blanco visto de perfil sobre fondo azul. Velocidad máxima genérica 90 km/h.",
    trampaExamen: "¿Qué velocidad máxima rige en una vía para automóviles para un turismo? 90 km/h.",
    topicId: "06",
    colorScheme: "azul_blanco"
  },
  {
    code: "S-5",
    name: "Túnel",
    category: "indicacion",
    shape: "cuadrada_azul",
    description: "Indica el principio de un túnel o tramo asimilado. Obliga a encender el alumbrado de corto alcance y mantener distancia de seguridad.",
    explicacionIgor: "Boca de túnel en fondo azul. Distancia de seguridad mínima dentro del túnel: 100m (4s) para turismos, 150m (6s) para camiones.",
    trampaExamen: "¿Qué distancia de seguridad debe mantener un turismo dentro de un túnel si no va a adelantar? Al menos 100 metros o 4 segundos de intervalo.",
    topicId: "05",
    colorScheme: "azul_blanco"
  },
  {
    code: "S-7",
    name: "Velocidad Máxima Aconsejable",
    category: "indicacion",
    shape: "cuadrada_azul",
    description: "Recomienda una velocidad de circulación, en km/h, que se aconseja no sobrepasar aunque las condiciones sean favorables.",
    explicacionIgor: "Cuadrada azul con número blanco. NO ES OBLIGATORIA, es aconsejada.",
    trampaExamen: "Diferencia con R-301: S-7 (cuadrada azul = ACONSEJA velocidad máxima), R-301 (redonda roja = PROHÍBE superar la velocidad).",
    topicId: "06",
    colorScheme: "azul_blanco"
  },
  {
    code: "S-11",
    name: "Calzada de Sentido Único",
    category: "indicacion",
    shape: "cuadrada_azul",
    description: "Indica que en la calzada que se prolonga la circulación se efectúa en un solo sentido.",
    explicacionIgor: "Flecha blanca ancha hacia arriba en fondo azul. Toda la calzada va en el mismo sentido.",
    trampaExamen: "¿Se puede parar o estacionar en el lado izquierdo de una calle de sentido único? SÍ, en vías urbanas de sentido único se puede parar o estacionar en ambos lados.",
    topicId: "09",
    colorScheme: "azul_blanco"
  },
  {
    code: "S-13",
    name: "Situación de Paso para Peatones",
    category: "indicacion",
    shape: "cuadrada_azul",
    description: "Indica la situación exacta de un paso para peatones en la calzada.",
    explicacionIgor: "Cuadrada azul con peatón cruzando sobre rayas blancas. Señala el lugar exacto del paso.",
    trampaExamen: "Diferencia con P-20: S-13 (cuadrada azul = SITUACIÓN EXACTA del paso), P-20 (triángulo rojo = PELIGRO por proximidad de paso).",
    topicId: "12",
    colorScheme: "azul_blanco"
  },
  {
    code: "S-28",
    name: "Calle Residencial (Zona 20)",
    category: "indicacion",
    shape: "cuadrada_azul",
    description: "Indica una zona de circulación especialmente acondicionada para peatones. Velocidad máxima 20 km/h y prioridad peatonal absoluta.",
    explicacionIgor: "Casa, coche y personas jugando. Velocidad máxima 20 km/h y los peatones tienen preferencia en toda la calle.",
    trampaExamen: "¿A qué velocidad máxima se puede circular en una calle residencial S-28? A 20 km/h.",
    topicId: "06",
    colorScheme: "azul_blanco"
  },
  {
    code: "S-33",
    name: "Señal V-16 Conectada DGT 3.0",
    category: "nuevas_2026",
    shape: "cuadrada_azul",
    description: "Dispositivo luminoso de preseñalización de peligro conectado con DGT 3.0 para emergencias y averías sin bajar del vehículo.",
    explicacionIgor: "Sustituye obligatoriamente a los triángulos de emergencia. Se coloca en el techo sin bajar del coche.",
    trampaExamen: "¿Cuándo es obligatorio el uso exclusivo de la señal V-16 conectada con geolocalización DGT 3.0? A partir del 1 de enero de 2026.",
    topicId: "31",
    colorScheme: "azul_amarillo"
  }
];
