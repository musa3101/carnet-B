// Base de Conocimiento Especializada del Profesor Virtual de Teórica (Igor & DGT 2026)

export const TUTOR_QA_DATABASE = [
  {
    id: "autopista-vs-autovia",
    keywords: ["diferencia", "autopista", "autovia", "autovía", "peaje", "fincas", "bicicletas", "acceso"],
    questionMatch: "¿Cuál es la diferencia entre una autopista y una autovía?",
    explicacionIgor: `¡Esta pregunta cae en casi todos los exámenes! Mira la diferencia clave:

1. **Acceso a propiedades colindantes:**
   • La **Autopista** NO tiene acceso a fincas ni propiedades colindantes bajo ningún concepto (está completamente vallada).
   • La **Autovía** puede tener accesos limitados a propiedades colindantes.

2. **Peajes:**
   • Las autopistas pueden ser de peaje o libres de peaje.
   • Las autovías son siempre gratuitas (salvo excepciones históricas de concesión).

3. **Ciclistas (Bicicletas):**
   • En **Autopistas** está **TOTALMENTE PROHIBIDA** la entrada de bicicletas.
   • En **Autovías**, los conductores de bicicletas mayores de 14 años **SÍ pueden circular por el arcén derecho**, salvo que una señal expresa lo prohíba.

4. **Similitudes clave para el test:**
   • Ambas tienen calzadas separadas para cada sentido.
   • Ninguna se cruza a nivel con otra vía (no hay cruces ni semáforos).
   • Velocidad máxima: **120 km/h** para turismos y motos.
   • Velocidad mínima: **60 km/h** para todos los vehículos.
   • Prohibido ciclomotores, peatones y vehículos que no alcancen 60 km/h en llano.`,
    normaDGT: `Reglamento General de Circulación (Art. 38 y Anexo I). Autopista: carretera especialmente proyectada y construida para la exclusiva circulación de automóviles, sin accesos directos a predios colindantes. Autovía: carretera con calzadas separadas que puede tener acceso limitado a propiedades colindantes.`,
    trucoMemoria: `«Pista = Privada de accesos y Prohibida a bicis. Vía = Vale para bicis por arcén salvo señal».`,
    trampaExamen: `¿Pueden circular bicicletas por autovía? SÍ, mayores de 14 años por el arcén salvo que una señal vertical lo prohíba expresamente. En autopista: NUNCA.`,
    topicId: "06",
    videoTimestamp: "00:28:26",
    followUps: [
      "¿A qué velocidad mínima se puede circular en autopista y autovía?",
      "¿Pueden entrar los ciclomotores en una autovía?",
      "¿Qué pasa si tengo una avería en autopista o autovía?"
    ]
  },
  {
    id: "parada-estacionamiento-detencion",
    keywords: ["parada", "estacionamiento", "detencion", "detención", "diferencia", "minutos", "abandonar", "inmovilizacion"],
    questionMatch: "¿Qué diferencia hay entre parada, estacionamiento y detención?",
    explicacionIgor: `Es una de las trampas favoritas de la DGT. Vamos a diferenciarlo con la regla del tiempo y la voluntad:

1. **DETENCIÓN (Involuntaria):**
   • No depende de ti. Es una inmovilización obligada por el tráfico (un atasco), por una señal (un Stop o semáforo en rojo) o por una emergencia (avería).

2. **PARADA (Voluntaria, < 2 minutos):**
   • Decides tú parar.
   • Dura **MENOS de 2 minutos** (1 minuto y 59 segundos como máximo).
   • El conductor **NO abandona el vehículo** (puedes bajarte a abrir el maletero, pero tienes que estar junto a él para moverlo si molestas).

3. **ESTACIONAMIENTO (Voluntaria, >= 2 minutos o abandono):**
   • Es voluntario y dura **2 minutos o más**, O BIEN cuando el conductor **abandona el vehículo** (aunque te vayas solo 30 segundos a comprar pan, si dejas el coche solo ya es estacionamiento).`,
    normaDGT: `Art. 90-94 RGC. La detención es impuesta por la regulación del tráfico. La parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. El estacionamiento es toda inmovilización que no sea parada o detención.`,
    trucoMemoria: `«Menos de 2 minutos y pegado al coche = Parada. 2 minutos o coche solo = Estacionamiento. Te obliga la vía = Detención».`,
    trampaExamen: `Si te bajas a comprar tabaco y tardas 40 segundos dejando el coche solo en doble fila, ¿es parada o estacionamiento? Es ESTACIONAMIENTO porque has abandonado el vehículo.`,
    topicId: "12",
    videoTimestamp: "01:21:40",
    followUps: [
      "¿Se puede parar en doble fila?",
      "¿Se puede estacionar en doble fila?",
      "¿En qué lugares está prohibido parar y estacionar?"
    ]
  },
  {
    id: "adelantar-20-kmh-convencional",
    keywords: ["adelantar", "20", "20 km/h", "rebasar", "convencional", "carretera", "margen", "limite", "superar"],
    questionMatch: "¿Se puede superar la velocidad máxima en 20 km/h para adelantar?",
    explicacionIgor: `¡MUCHA ATENCIÓN! Esta es la norma más actualizada y la que más preguntas trampa genera:

❌ **NO, YA NO SE PUEDE SUPERAR EN 20 KM/H.**

• La DGT eliminó definitivamente el margen de 20 km/h que existía antes para adelantar en carreteras convencionales.
• En una carretera convencional con límite de **90 km/h**, la velocidad máxima para adelantar a otro vehículo es exactamente **90 km/h**.
• Si el vehículo que va delante circula a 90 km/h, **está prohibido adelantarlo** porque tendrías que superar el límite legal.`,
    normaDGT: `Ley de Tráfico y Seguridad Vial (Reforma art. 21). Queda suprimida la posibilidad de que turismos y motocicletas puedan rebasar en 20 km/h los límites de velocidad en las carreteras convencionales cuando adelanten a otros vehículos.`,
    trucoMemoria: `«El límite es un techo de cristal: NUNCA se rompe, ni para adelantar».`,
    trampaExamen: `¿A qué velocidad máxima puede adelantar un turismo a un camión que va a 80 km/h en carretera convencional? A 90 km/h (nunca a 110 km/h).`,
    topicId: "06",
    videoTimestamp: "00:32:15",
    followUps: [
      "¿Cuál es la velocidad genérica en carreteras convencionales?",
      "¿A qué distancia lateral se adelanta a un ciclista?",
      "¿Se puede pisar línea continua para adelantar a una bici?"
    ]
  },
  {
    id: "rotonda-glorieta-prioridad-salida",
    keywords: ["rotonda", "glorieta", "prioridad", "carril", "salir", "interseccion", "intersección", "girar"],
    questionMatch: "¿Quién tiene prioridad en una rotonda y cómo se debe salir?",
    explicacionIgor: `En las glorietas la regla es sagrada y sencilla. Grábate estos 3 mandamientos:

1. **Prioridad de entrada:**
   • Tienen preferencia los vehículos que **ya están circulando DENTRO del anillo** de la glorieta frente a los que pretenden entrar (salvo que haya semáforo o agente que indique lo contrario).

2. **Elección de carril para circular:**
   • En glorietas dentro de poblado puedes usar el carril que mejor convenga a tu destino.
   • Fuera de poblado debes circular por el carril exterior (derecho) y usar los interiores solo para adelantar.

3. **SALIDA DE LA GLORIETA (Regla de Oro):**
   • Para salir de la glorieta es **OBLIGATORIO situarse previamente en el carril exterior (derecho)**.
   • **ESTÁ TOTALMENTE PROHIBIDO salir directamente desde un carril interior o izquierdo**. Si vas por dentro y no puedes pasar al carril derecho porque hay coches, debes **dar otra vuelta completa** a la glorieta.`,
    normaDGT: `Instrucción DGT y Art. 57 RGC. En glorietas la prioridad es del vehículo que circula por la vía circular. La maniobra de salida debe realizarse inexcusablemente desde el carril exterior derecho.`,
    trucoMemoria: `«Para salir, siempre a la derecha. Si estás dentro y no puedes salir, das otra vuelta».`,
    trampaExamen: `¿Se puede salir de una rotonda desde el carril interior si no molestas a nadie? NO, NUNCA. La salida se efectúa siempre desde el carril exterior.`,
    topicId: "08",
    videoTimestamp: "00:46:12",
    followUps: [
      "¿Quién tiene prioridad si entra un grupo de ciclistas en la rotonda?",
      "¿Qué intermitente se pone dentro de una rotonda?",
      "¿Se puede adelantar dentro de una glorieta?"
    ]
  },
  {
    id: "luces-antiniebla-delantera-trasera",
    keywords: ["antiniebla", "luces", "luz", "trasera", "delantera", "espesa", "lluvia", "niebla", "alumbrado"],
    questionMatch: "¿Cuándo es obligatoria la luz antiniebla trasera y delantera?",
    explicacionIgor: `Mucho ojo aquí porque la DGT distingue entre delantera (opcional) y trasera (obligatoria solo en casos extremos):

1. **Luz Antiniebla TRASERA (1 o 2 luces rojas intensas):**
   • Es **OBLIGATORIA** únicamente en condiciones meteorológicas **ESPECIALMENTE DESFAVORABLES**:
     - Niebla muy espesa.
     - Lluvia muy intensa (torrencial).
     - Fuerte nevada.
     - Nubes densas de humo o polvo.
   • ⚠️ **PROHIBIDA** en lluvia normal o niebla ligera porque su alta intensidad deslumbra gravemente a los conductores que vienen detrás.

2. **Luz Antiniebla DELANTERA (blanca o amarilla selectiva):**
   • Es siempre **OPCIONAL** (el vehículo no está obligado a llevarla instalada).
   • Se puede encender con niebla (ligera o densa), lluvia intensa, nevada o humo, o en tramos de curvas estrechas señalizadas.`,
    normaDGT: `Art. 106 RGC. La luz antiniebla trasera solamente deberá llevarse encendida cuando las condiciones meteorológicas o ambientales sean especialmente desfavorables. La luz delantera es optativa.`,
    trucoMemoria: `«Trasera = Solo en caso de catástrofe (niebla muy espesa / lluvia torrencial). Delantera = Opcional si hay mala visibilidad».`,
    trampaExamen: `Si llueve con intensidad moderada, ¿debe encenderse la luz antiniebla trasera? NO, está prohibida porque deslumbra. Solo con lluvia MUY intensa.`,
    topicId: "13",
    videoTimestamp: "01:34:50",
    followUps: [
      "¿Qué luces son obligatorias en un túnel?",
      "¿Se puede circular solo con las luces de posición?",
      "¿Cuándo es obligatorio el alumbrado de corto alcance de día?"
    ]
  },
  {
    id: "tasas-alcohol-noveles-menores",
    keywords: ["alcohol", "tasa", "alcoholemia", "novel", "menores", "menor", "profesional", "general", "sangre", "aire"],
    questionMatch: "¿Cuáles son las tasas máximas de alcohol permitidas?",
    explicacionIgor: `Grábate esta tabla de memoria porque cae siempre en el examen:

1. **MENORES DE EDAD (Cualquier vehículo: coche, patinete, bici, ciclomotor):**
   • **TASA 0,0** (0,0 g/l en sangre y 0,0 mg/l en aire espirado). Cero absoluto.

2. **CONDUCTORES NOVELES (Primeros 2 años de carnet):**
   • **0,15 mg/l** en aire espirado.
   • **0,30 g/l** en sangre.

3. **CONDUCTORES PROFESIONALES (Transporte de mercancías > 3.500 kg, viajeros, escolares, emergencias):**
   • **0,15 mg/l** en aire espirado.
   • **0,30 g/l** en sangre.

4. **CONDUCTORES GENERALES (Más de 2 años de permiso):**
   • **0,25 mg/l** en aire espirado.
   • **0,50 g/l** en sangre.

⚠️ **Datos clave para el test:**
• El pico máximo de alcohol en sangre se alcanza entre los **30 y 90 minutos** después de haber bebido.
• Negarse a realizar la prueba de alcoholemia constituye un **delito penal** castigado con prisión y retirada del carnet.`,
    normaDGT: `Art. 20 RGC y Ley de Seguridad Vial. Límite general 0,25 mg/l (0,50 g/l). Noveles y profesionales 0,15 mg/l (0,30 g/l). Menores de edad tasa 0,0.`,
    trucoMemoria: `«Noveles y Profesionales = 0,15 aire / 0,30 sangre (la mitad de 0,30 es 0,15). Generales = 0,25 aire / 0,50 sangre. Menores = 0,0».`,
    trampaExamen: `¿Durante cuánto tiempo se aplica la tasa de novel de 0,15 mg/l? Durante los primeros 2 AÑOS desde la obtención del primer permiso. (Cuidado: la placa L se lleva 1 año, pero la tasa reducida dura 2 años).`,
    topicId: "28",
    videoTimestamp: "03:45:10",
    followUps: [
      "¿Durante cuánto tiempo se lleva la placa L?",
      "¿Cuánto tiempo tarda el alcohol en alcanzar su nivel máximo?",
      "¿Qué tasa tiene un ciclista mayor de edad?"
    ]
  },
  {
    id: "puntos-sanciones-movil-cinturon",
    keywords: ["puntos", "sanciones", "movil", "móvil", "telefono", "teléfono", "cinturon", "cinturón", "radar", "casco", "sri"],
    questionMatch: "¿Cuántos puntos se pierden por usar el móvil, cinturón o detector de radar?",
    explicacionIgor: `Con la reforma de la Ley de Tráfico se endurecieron las sanciones más peligrosas:

• 📱 **Sujetar el teléfono móvil con la mano mientras se conduce:** Se pierden **6 PUNTOS** (aunque estés parado en un semáforo en rojo). Si se usa en soporte sin tocarlo con la mano, la pérdida es de 3 puntos.
• 💺 **No llevar puesto el cinturón de seguridad, el casco o el sistema de retención infantil (SRI):** Se pierden **4 PUNTOS**.
• 📡 **Llevar en el vehículo mecanismos de detección de radares o cinemómetros:** Se pierden **3 PUNTOS** (incluso aunque estén apagados).
• 🔥 **Arrojar a la vía objetos que puedan producir incendios o accidentes:** Se pierden **6 PUNTOS**.
• 🚴 **Adelantar a ciclistas sin dejar la distancia de 1,5 m o entorpeciendo:** Se pierden **6 PUNTOS**.`,
    normaDGT: `Anexo II Ley de Tráfico y Seguridad Vial. Infracciones que conllevan pérdida de puntos.`,
    trucoMemoria: `«Móvil en mano = 6 puntos. Sin cinturón/casco/sillita = 4 puntos. Detector de radar = 3 puntos».`,
    trampaExamen: `¿Te pueden quitar 6 puntos si tienes el móvil en la mano mirando el GPS parado en un semáforo en rojo? SÍ, porque parar en un semáforo es una detención del tráfico, sigues conduciendo.`,
    topicId: "19",
    videoTimestamp: "02:22:15",
    followUps: [
      "¿Con cuántos puntos empieza un conductor novel?",
      "¿Cómo se recuperan los puntos del carnet?",
      "¿Qué dispositivos de radar están prohibidos?"
    ]
  },
  {
    id: "distancia-adelantar-ciclistas",
    keywords: ["ciclista", "ciclistas", "bici", "bicicleta", "adelantar", "1,5", "metro", "separacion", "distancia", "linea", "continua"],
    questionMatch: "¿Qué distancia y precauciones se deben tomar al adelantar a ciclistas?",
    explicacionIgor: `Para adelantar a ciclistas o ciclomotores fuera de poblado la ley es muy estricta:

1. **Distancia lateral obligatoria:**
   • Debes dejar una separación lateral mínima de **1,5 METROS**.

2. **Ocupación de carril:**
   • En carreteras con más de un carril por sentido, es **OBLIGATORIO cambiar completamente de carril** ocupando el carril contiguo.
   • Si hay un solo carril por sentido, debes ocupar la mayor parte posible del carril contrario.

3. **Línea continua:**
   • **SÍ se puede pisar y rebasar la línea continua** para adelantar a ciclistas, peatones, animales o vehículos de tracción animal, siempre que haya suficiente visibilidad y no se ponga en peligro a nadie ni a los que vengan de frente.`,
    normaDGT: `Art. 85 RGC y Ley de Seguridad Vial. Al adelantar a ciclos o ciclomotores se debe mantener una separación lateral mínima de 1,5 m e invadir total o parcialmente el carril contiguo.`,
    trucoMemoria: `«1,5 metros y si hay línea continua SÍ se puede pisar si no viene nadie».`,
    trampaExamen: `¿Se puede adelantar a un ciclista pisando línea continua si viene un coche de frente a lo lejos? NO. Solo se puede rebasar la línea si la maniobra puede realizarse con total seguridad y sin riesgo para los demás usuarios.`,
    topicId: "09",
    videoTimestamp: "00:58:30",
    followUps: [
      "¿Tienen prioridad los ciclistas en una rotonda si entra el primero?",
      "¿Pueden circular los ciclistas en paralelo?",
      "¿Es obligatorio el casco para ciclistas?"
    ]
  },
  {
    id: "senal-v16-geolocalizada",
    keywords: ["v16", "v-16", "triangulos", "triángulos", "emergencia", "averia", "luz", "geolocalizada", "senales"],
    questionMatch: "¿Cuándo es obligatoria la señal de emergencia V-16 y cómo funciona?",
    explicacionIgor: `La señal V-16 es el dispositivo oficial de emergencia que sustituye definitivamente a los triángulos:

• **¿Qué es?:** Es una baliza luminosa de color amarillo autooscilante que se coloca en la parte más alta del vehículo (en el techo) sin necesidad de salir del coche (simplemente sacando el brazo por la ventanilla).
• **Conectividad DGT 3.0:** La baliza obligatoria lleva un sistema de geolocalización GPS y tarjeta SIM integrada que comunica automáticamente la posición del coche averiado al centro de gestión de tráfico de la DGT para avisar en paneles y a otros conductores.
• **Sustitución de triángulos:** Sustituye a los tradicionales triángulos de preseñalización de peligro para evitar atropellos en el arcén.`,
    normaDGT: `Real Decreto 159/2021 del servicio de auxilio en vía pública y DGT 2026. Baliza luminosa V-16 conectada con sistema de geolocalización 3.0 obligatoria.`,
    trucoMemoria: `«V-16 en el techo sin bajarte del coche, conectada a la DGT».`,
    trampaExamen: `¿Es necesario bajarse del coche para colocar la señal V-16? NO, se coloca sacando el brazo por la ventanilla sobre el techo para evitar el riesgo de atropello.`,
    topicId: "18",
    videoTimestamp: "02:14:00",
    followUps: [
      "¿Cuándo es obligatorio el chaleco reflectante?",
      "¿Qué debemos hacer si tenemos una avería en autopista?",
      "¿Qué accesorios obligatorios debe llevar un turismo?"
    ]
  },
  {
    id: "primeros-auxilios-protocolo-pas",
    keywords: ["pas", "primeros", "auxilios", "accidente", "socorrer", "heridos", "casco", "agua", "proteger", "avisar"],
    questionMatch: "¿Qué es la regla PAS y qué NO debemos hacer con un herido de tráfico?",
    explicacionIgor: `La regla de oro ante un accidente de tráfico es el protocolo PAS en este orden estricto:

1. **P - PROTEGER:**
   • Lo primero es asegurar la zona para no provocar un nuevo accidente (poner luces de emergencia, chaleco reflectante y señalizar).

2. **A - AVISAR:**
   • Llamar al teléfono de emergencias **112** e indicar lugar exacto, número de heridos y estado.

3. **S - SOCORRER:**
   • Atender a las víctimas según la gravedad.

🚫 **LO QUE NUNCA DEBES HACER EN UN ACCIDENTE (Preguntas trampa de la DGT):**
• ❌ **NUNCA dar de beber ni comida a un herido** (ni siquiera agua, por riesgo de asfixia o vómito).
• ❌ **NUNCA quitar el casco a un motorista accidentado** (salvo que seas personal sanitario especializado).
• ❌ **NUNCA mover a un herido del vehículo** (salvo riesgo inminente de explosión o incendio).
• ❌ **NUNCA suministrar medicamentos** a las víctimas.`,
    normaDGT: `Art. 129 RGC y manual de primeros auxilios DGT. Protocolo PAS (Proteger, Avisar, Socorrer). Prohibición de retirar el casco o suministrar bebidas.`,
    trucoMemoria: `«P-A-S en orden. A los heridos: NI agua, NI moverlos, NI quitarles el casco».`,
    trampaExamen: `Si un motorista herido te pide agua porque tiene mucha sed, ¿qué debes hacer? NO darle de beber bajo ningún concepto.`,
    topicId: "33",
    videoTimestamp: "04:18:20",
    followUps: [
      "¿Cuál es el número único de emergencias europeo?",
      "¿Cómo se coloca a un herido inconsciente que respira (PLS)?",
      "¿Es obligatorio auxiliar si ya está la policía en el lugar?"
    ]
  },
  {
    id: "distancia-reaccion-frenado-detencion",
    keywords: ["reaccion", "reacción", "frenado", "detencion", "detención", "formula", "fórmula", "tiempo", "segundos", "lluvia"],
    questionMatch: "¿Cómo se calculan las distancias de reacción, frenado y detención?",
    explicacionIgor: `Vamos a dejar estos tres conceptos cristalinos:

1. **Tiempo de Reacción (Humano):**
   • Tiempo que pasa desde que ves un peligro hasta que tu pie pisa el pedal de freno.
   • En un conductor normal en buen estado es de **0,75 segundos** (unos 3/4 de segundo).
   • Depende **ÚNICAMENTE del estado del conductor** (aumenta con fatiga, alcohol, drogas, móvil, somnolencia). La lluvia o el coche NO cambian el tiempo de reacción.

2. **Distancia de Reacción:**
   • Espacio que recorre el vehículo durante esos 0,75 segundos.
   • Truco de cálculo rápido: Multiplica la primera cifra de tu velocidad por **3** (ej. a 90 km/h: 9 x 3 = 27 metros).

3. **Distancia de Frenado (Física y Mecánica):**
   • Metros que recorre el coche desde que pisas el freno hasta que se para por completo.
   • Depende de la velocidad, los neumáticos, los frenos y el estado de la calzada.
   • ⚠️ Con el pavimento mojado por lluvia, **la distancia de frenado se MULTIPLICA POR DOS (el doble)**; con hielo puede multiplicarse por 10.

4. **Distancia de Detención Total:**
   • **Detención Total = Distancia de Reacción + Distancia de Frenado**.`,
    normaDGT: `Manual DGT de física de la conducción. Distancia de detención = D. Reacción + D. Frenado. Influencia de la velocidad y adherencia.`,
    trucoMemoria: `«Reacción = Tu cabeza (0,75s). Frenado = Las ruedas y el asfalto. Detención = La suma de las dos».`,
    trampaExamen: `Si la calzada está mojada, ¿aumenta el tiempo de reacción? NO, el tiempo de reacción depende de tu cerebro. Lo que aumenta es la distancia de frenado.`,
    topicId: "23",
    videoTimestamp: "03:02:15",
    followUps: [
      "¿Qué es el aquaplaning y cómo se evita?",
      "¿Cómo se frena con ABS en caso de emergencia?",
      "¿Qué factores aumentan el tiempo de reacción?"
    ]
  },
  {
    id: "ciclomotor-vs-motocicleta",
    keywords: ["ciclomotor", "motocicleta", "moto", "cilindrada", "45", "arcen", "arcén", "velocidad", "diferencia"],
    questionMatch: "¿Qué diferencia hay entre un ciclomotor y una motocicleta?",
    explicacionIgor: `Son dos vehículos completamente distintos para el Código de Circulación:

1. **CICLOMOTOR (Matrícula Amarilla):**
   • Motor de hasta **50 cc** (centímetros cúbicos) y velocidad máxima de **45 km/h**.
   • **NO se considera legalmente vehículo de motor**.
   • Debe circular obligatoriamente por el **arcén derecho** si existe y es transitable.
   • Prohibido en autopistas y autovías.

2. **MOTOCICLETA (Matrícula Blanca):**
   • Cilindrada superior a 50 cc o velocidad superior a 45 km/h.
   • **SÍ es un vehículo de motor**.
   • Circula por la calzada como un turismo (no por el arcén).
   • Velocidad máxima en autopista/autovía: **120 km/h**; en convencional: **90 km/h**.
   • Obligada a llevar la **luz de cruce (corto alcance) encendida las 24 horas del día**, incluso a pleno sol.`,
    normaDGT: `Anexo II Definiciones RGC. Ciclomotor (<= 50 cc y <= 45 km/h). Motocicleta (automóvil de dos ruedas > 50 cc o > 45 km/h con alumbrado diurno obligatorio).`,
    trucoMemoria: `«Ciclomotor = Amarillo, 45 km/h y al arcén. Motocicleta = Blanca, luz siempre y por la calzada».`,
    trampaExamen: `¿Debe una motocicleta llevar la luz de cruce encendida de día con sol radiante? SÍ, es obligatoria siempre para ser visible.`,
    topicId: "02",
    videoTimestamp: "00:08:45",
    followUps: [
      "¿Qué casco es obligatorio para una moto?",
      "¿Pueden llevar pasajeros los ciclomotores y motos?",
      "¿A qué velocidad máxima puede ir un ciclomotor?"
    ]
  }
];
