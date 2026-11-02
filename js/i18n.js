import { readProgress, writeProgress } from "./core/storage.js";

export const LANGUAGES = ["pt-BR", "en", "es"];
const dictionaries = {
  "pt-BR": {},
  en: {
    "SOM: LIGADO":"SOUND: ON","SOM: DESLIGADO":"SOUND: OFF","MOVIMENTO: NORMAL":"MOTION: NORMAL","MOVIMENTO: REDUZIDO":"MOTION: REDUCED","VERSÃO 2.0":"VERSION 2.0",
    "NÍVEL":"LEVEL","PESCADOR INICIANTE":"NOVICE ANGLER","PESCADOR APRENDIZ":"APPRENTICE ANGLER","PESCADOR EXPERIENTE":"EXPERIENCED ANGLER","PESCADOR ESPECIALISTA":"EXPERT ANGLER","MESTRE DAS MARÉS":"TIDE MASTER",
    "Expedição submarina":"Underwater expedition","DIA":"DAY","OXIGÊNIO":"OXYGEN","CAPTURAS":"CATCHES","ESPÉCIES":"SPECIES","MOEDAS":"COINS",
    "UM PEQUENO OCEANO, UM GRANDE SONHO":"A SMALL OCEAN, A BIG DREAM","Quem vai explorar hoje?":"Who will explore today?","Escolha seu mergulhador para começar a jornada.":"Choose your diver to begin the journey.","Personagem masculino":"Male character","Personagem feminino":"Female character","está pronto para mergulhar.":"is ready to dive.",
    "ESCOLHA SEU DESTINO":"CHOOSE YOUR DESTINATION","Disponível":"Available","Missão:":"Mission:","e ganhe":"and earn","moedas.":"coins.","COMEÇAR A JORNADA":"START THE JOURNEY",
    "PRIMEIRA EXPEDIÇÃO":"FIRST EXPEDITION","Aprenda o ritmo do oceano":"Learn the rhythm of the ocean","Explore:":"Explore:","use WASD ou as setas; no celular, use o direcional.":"use WASD or arrow keys; on mobile, use the directional pad.","Capture:":"Catch:","aproxime-se de um peixe e pressione E ou CAPTURAR.":"get close to a fish and press E or CATCH.","Retorne:":"Return:","acompanhe o oxigênio e pressione R ou SUPERFÍCIE.":"watch your oxygen and press R or SURFACE.","Complete a missão:":"Complete the mission:","capture três peixes para receber moedas extras.":"catch three fish to earn bonus coins.","Peixes raros aparecem em biomas e níveis mais avançados. O estoque coletado abastece o Sushi Bar à noite.":"Rare fish appear in advanced biomes and levels. Your catch supplies the Sushi Bar at night.","ENTENDI · COMEÇAR MERGULHO":"GOT IT · START DIVE",
    "DE VOLTA À SUPERFÍCIE":"BACK TO THE SURFACE","Mergulho concluído!":"Dive complete!","Sua captura está segura.":"Your catch is safe.","ABRIR SUSHI BAR":"OPEN SUSHI BAR","MERGULHAR NOVAMENTE":"DIVE AGAIN",
    "MISSÃO DA EXPEDIÇÃO":"EXPEDITION MISSION","peixes":"fish","Capture 3 peixes para receber a recompensa.":"Catch 3 fish to earn the reward.","Nadar":"Swim","Capturar":"Catch","Superfície":"Surface","Encontre um peixe para começar":"Find a fish to begin","CAPTURAR":"CATCH","SUPERFÍCIE":"SURFACE",
    "HOSPITALIDADE ZEN":"ZEN HOSPITALITY","CASA DE CHÁ":"TEA HOUSE","SALÃO NEON":"NEON LOUNGE","JARDIM ZEN":"ZEN GARDEN","SUSHI PALACE":"SUSHI PALACE","NEXUS IMPERIAL":"NEXUS IMPERIAL",
    "moedas":"coins","Um momento de calma na cidade neon":"A moment of calm in the neon city","CLIENTE ATUAL":"CURRENT CUSTOMER","Aguardando cliente":"Waiting for a customer","Abra o bar para receber seu primeiro pedido.":"Open the bar to receive your first order.","Bem-vindo. Sirva com atenção.":"Welcome. Serve with care.","PACIÊNCIA":"PATIENCE","PREPARANDO":"PREPARING","Aguardando estação":"Waiting for station","PRÓXIMOS CLIENTES":"UPCOMING CUSTOMERS","clientes atendidos":"customers served","CARDÁPIO DA CASA":"HOUSE MENU","Escolha o pedido correto para iniciar o preparo.":"Choose the correct order to start preparing it.","ESTOQUE":"INVENTORY","Reputação":"Reputation","MELHORAR DECORAÇÃO":"UPGRADE DECOR","REABASTECER CHÁS":"RESTOCK TEA","AMPLIAR O BAR":"EXPAND THE BAR","MELHORAR EQUIPAMENTO":"UPGRADE EQUIPMENT","ESPECIALIZAÇÃO DO EQUIPAMENTO":"EQUIPMENT SPECIALIZATION","Equilibrado":"Balanced","Autonomia":"Endurance","Velocidade":"Speed","Carga":"Cargo","INICIAR PRÓXIMO MERGULHO":"START NEXT DIVE",
    "Turno encerrado":"Shift complete","Todos os clientes foram atendidos.":"All customers have been served.","Sem fila":"No queue","Receita concluída":"Recipe complete","Sushi":"Sushi","Chá":"Tea","preferência":"favorite","Estoque vazio":"Inventory empty","Nível de pesca":"Fishing level","Nível do bar":"Bar level","Reputação":"Reputation","Satisfação":"Satisfaction","Turno:":"Shift:","atendidos":"served","saídas":"walkouts","gorjetas":"tips","Vá com calma. O oceano é seu para explorar.":"Take it slow. The ocean is yours to explore.","Você capturou ":"You caught ","! +":"! +"," moedas":" coins","Sua cesta está cheia! Volte à superfície.":"Your basket is full! Return to the surface.","Chegue mais perto do peixe!":"Get closer to the fish!","Missão da expedição concluída!":"Expedition mission complete!"," ao retornar.":" when you return.","Cesta cheia — volte à superfície":"Basket full — return to the surface","NÍVEL ":"LEVEL "," · PESCADOR INICIANTE":" · NOVICE ANGLER"," · PESCADOR APRENDIZ":" · APPRENTICE ANGLER"," · PESCADOR EXPERIENTE":" · EXPERIENCED ANGLER"," · PESCADOR ESPECIALISTA":" · EXPERT ANGLER"," · MESTRE DAS MARÉS":" · TIDE MASTER","Perto:":"Nearby:","Explore a lagoa":"Explore the lagoon","Ótimo mergulho!":"Great dive!","O oxigênio acabou.":"You ran out of oxygen."," qualidade":" quality"," de missão":" mission reward","Expedição de":"Expedition with","Lagoa Azul":"Blue Lagoon","Recife Neon":"Neon Reef","Abismo Lótus":"Lotus Abyss","Águas tranquilas":"Calm waters","Corais luminosos":"Glowing corals","Profundezas misteriosas":"Mysterious depths","Sardine":"Sardine","Clownfish":"Clownfish","Blue Tang":"Blue Tang","Pufferfish":"Pufferfish","Moonfish":"Moonfish","Lanternfish":"Lanternfish","Koi Ray":"Koi Ray","Bem-vindo ao Nexus Sushi Bar.":"Welcome to Nexus Sushi Bar.","Turno encerrado. O Nexus agradece sua presença.":"Shift complete. Nexus thanks you for visiting.","Estoque esgotado. A próxima expedição trará novos ingredientes.":"Out of stock. The next expedition will bring fresh ingredients."," chegou ao balcão. Preferências:":" arrived at the counter. Preferences:"," ou ":" or ","Esse preparo não corresponde ao pedido. Confira as preferências do cliente.":"This preparation does not match the order. Check the customer's preferences.","Ingrediente em falta. Faça uma nova expedição.":"Missing ingredient. Start another expedition.","Pedido iniciado:":"Order started:","Escolha a estação correta.":"Choose the correct station.","Estação incorreta. Confira a etapa da receita antes de continuar.":"Incorrect station. Check the recipe step before continuing.","Etapa concluída. Próxima:":"Step complete. Next:"," perdeu a paciência e foi embora. Reputação -1.":" lost patience and left. Reputation -1.","Ingrediente em falta.":"Missing ingredient.","Pedido servido! +":"Order served! +"," gorjeta":" tip","Esse não é o pedido do cliente. Confira o balcão!":"That is not the customer's order. Check the counter!","Ambiente aprimorado para o nível ":"Venue upgraded to level ",". A decoração acolhe melhor os clientes.":". The décor makes guests feel more welcome.","O bar subiu para o nível ":"The bar reached level ","! Mais clientes chegarão à casa.":"! More guests will visit.","Equipamento de pesca nível ":"Fishing equipment level ","! Mais autonomia e capacidade.":"! More endurance and capacity.","São necessárias ":"You need "," para reabastecer os chás.":" to restock tea.","Chás reabastecidos. A casa está pronta para receber.":"Tea restocked. The house is ready for guests.","Preparar pedido":"Prepare order","Modelar arroz":"Shape rice","Finalizar nigiri":"Finish nigiri","Aquecer água":"Heat water","Infusionar matcha":"Steep matcha","Preparar hojicha":"Prepare hojicha","Infusionar lótus":"Steep lotus tea","Preparar base de arroz":"Prepare rice base","Fritar e montar tempurá":"Fry and assemble tempura","Cortar sashimi":"Slice sashimi","Finalizar apresentação":"Finish presentation","Finalizar nigiri especial":"Finish specialty nigiri","Modelar arroz premium":"Shape premium rice","Montagem imperial":"Imperial plating","Infusionar genmaicha":"Steep genmaicha","Preparar yuzu":"Prepare yuzu","Casa de chá":"Tea house","Salão Neon":"Neon lounge","Jardim Zen":"Zen garden"
  },
  es: {
    "SOM: LIGADO":"SONIDO: ACTIVADO","SOM: DESLIGADO":"SONIDO: DESACTIVADO","MOVIMENTO: NORMAL":"MOVIMIENTO: NORMAL","MOVIMENTO: REDUZIDO":"MOVIMIENTO: REDUCIDO","VERSÃO 2.0":"VERSIÓN 2.0",
    "NÍVEL":"NIVEL","PESCADOR INICIANTE":"PESCADOR PRINCIPIANTE","PESCADOR APRENDIZ":"PESCADOR APRENDIZ","PESCADOR EXPERIENTE":"PESCADOR EXPERIMENTADO","PESCADOR ESPECIALISTA":"PESCADOR EXPERTO","MESTRE DAS MARÉS":"MAESTRO DE LAS MAREAS",
    "Expedição submarina":"Expedición submarina","DIA":"DÍA","OXIGÊNIO":"OXÍGENO","CAPTURAS":"CAPTURAS","ESPÉCIES":"ESPECIES","MOEDAS":"MONEDAS",
    "UM PEQUENO OCEANO, UM GRANDE SONHO":"UN PEQUEÑO OCÉANO, UN GRAN SUEÑO","Quem vai explorar hoje?":"¿Quién explorará hoy?","Escolha seu mergulhador para começar a jornada.":"Elige a tu buceador para comenzar la aventura.","Personagem masculino":"Personaje masculino","Personagem feminino":"Personaje femenino","está pronto para mergulhar.":"está listo para bucear.",
    "ESCOLHA SEU DESTINO":"ELIGE TU DESTINO","Disponível":"Disponible","Missão:":"Misión:","e ganhe":"y gana","moedas.":"monedas.","COMEÇAR A JORNADA":"COMENZAR LA AVENTURA",
    "PRIMEIRA EXPEDIÇÃO":"PRIMERA EXPEDICIÓN","Aprenda o ritmo do oceano":"Aprende el ritmo del océano","Explore:":"Explora:","use WASD ou as setas; no celular, use o direcional.":"usa WASD o las flechas; en el móvil, usa el control direccional.","Capture:":"Captura:","aproxime-se de um peixe e pressione E ou CAPTURAR.":"acércate a un pez y pulsa E o CAPTURAR.","Retorne:":"Regresa:","acompanhe o oxigênio e pressione R ou SUPERFÍCIE.":"vigila el oxígeno y pulsa R o SUPERFICIE.","Complete a missão:":"Completa la misión:","capture três peixes para receber moedas extras.":"captura tres peces para ganar monedas extra.","Peixes raros aparecem em biomas e níveis mais avançados. O estoque coletado abastece o Sushi Bar à noite.":"Los peces raros aparecen en biomas y niveles avanzados. Tu captura abastece el Sushi Bar por la noche.","ENTENDI · COMEÇAR MERGULHO":"ENTENDIDO · COMENZAR A BUCEAR",
    "DE VOLTA À SUPERFÍCIE":"DE VUELTA A LA SUPERFICIE","Mergulho concluído!":"¡Inmersión completada!","Sua captura está segura.":"Tu captura está a salvo.","ABRIR SUSHI BAR":"ABRIR SUSHI BAR","MERGULHAR NOVAMENTE":"BUCEAR DE NUEVO",
    "MISSÃO DA EXPEDIÇÃO":"MISIÓN DE EXPEDICIÓN","peixes":"peces","Capture 3 peixes para receber a recompensa.":"Captura 3 peces para recibir la recompensa.","Nadar":"Nadar","Capturar":"Capturar","Superfície":"Superficie","Encontre um peixe para começar":"Encuentra un pez para empezar","CAPTURAR":"CAPTURAR","SUPERFÍCIE":"SUPERFICIE",
    "HOSPITALIDADE ZEN":"HOSPITALIDAD ZEN","CASA DE CHÁ":"CASA DE TÉ","SALÃO NEON":"SALÓN NEÓN","JARDIM ZEN":"JARDÍN ZEN","SUSHI PALACE":"SUSHI PALACE","NEXUS IMPERIAL":"NEXUS IMPERIAL",
    "moedas":"monedas","Um momento de calma na cidade neon":"Un momento de calma en la ciudad neón","CLIENTE ATUAL":"CLIENTE ACTUAL","Aguardando cliente":"Esperando al cliente","Abra o bar para receber seu primeiro pedido.":"Abre el bar para recibir tu primer pedido.","Bem-vindo. Sirva com atenção.":"Bienvenido. Atiende con atención.","PACIÊNCIA":"PACIENCIA","PREPARANDO":"PREPARANDO","Aguardando estação":"Esperando estación","PRÓXIMOS CLIENTES":"PRÓXIMOS CLIENTES","clientes atendidos":"clientes atendidos","CARDÁPIO DA CASA":"MENÚ DE LA CASA","Escolha o pedido correto para iniciar o preparo.":"Elige el pedido correcto para comenzar a prepararlo.","ESTOQUE":"INVENTARIO","Reputação":"Reputación","MELHORAR DECORAÇÃO":"MEJORAR DECORACIÓN","REABASTECER CHÁS":"REPONER TÉS","AMPLIAR O BAR":"AMPLIAR EL BAR","MELHORAR EQUIPAMENTO":"MEJORAR EQUIPO","ESPECIALIZAÇÃO DO EQUIPAMENTO":"ESPECIALIZACIÓN DEL EQUIPO","Equilibrado":"Equilibrado","Autonomia":"Autonomía","Velocidade":"Velocidad","Carga":"Carga","INICIAR PRÓXIMO MERGULHO":"INICIAR PRÓXIMA INMERSIÓN",
    "Turno encerrado":"Turno terminado","Todos os clientes foram atendidos.":"Todos los clientes han sido atendidos.","Sem fila":"Sin cola","Receita concluída":"Receta completada","Sushi":"Sushi","Chá":"Té","preferência":"preferencia","Estoque vazio":"Inventario vacío","Nível de pesca":"Nivel de pesca","Nível do bar":"Nivel del bar","Reputação":"Reputación","Satisfação":"Satisfacción","Turno:":"Turno:","atendidos":"atendidos","saídas":"salidas","gorjetas":"propinas","Vá com calma. O oceano é seu para explorar.":"Ve con calma. El océano es tuyo para explorar.","Você capturou ":"Has capturado ","! +":"! +"," moedas":" monedas","Sua cesta está cheia! Volte à superfície.":"¡La cesta está llena! Vuelve a la superficie.","Chegue mais perto do peixe!":"¡Acércate al pez!","Missão da expedição concluída!":"¡Misión de expedición completada!"," ao retornar.":" al regresar.","Cesta cheia — volte à superfície":"Cesta llena — vuelve a la superficie","NÍVEL ":"NIVEL "," · PESCADOR INICIANTE":" · PESCADOR PRINCIPIANTE"," · PESCADOR APRENDIZ":" · PESCADOR APRENDIZ"," · PESCADOR EXPERIENTE":" · PESCADOR EXPERIMENTADO"," · PESCADOR ESPECIALISTA":" · PESCADOR EXPERTO"," · MESTRE DAS MARÉS":" · MAESTRO DE LAS MAREAS","Perto:":"Cerca:","Explore a lagoa":"Explora la laguna","Ótimo mergulho!":"¡Buena inmersión!","O oxigênio acabou.":"Se acabó el oxígeno."," qualidade":" calidad"," de missão":" recompensa de misión","Expedição de":"Expedición de","Lagoa Azul":"Laguna Azul","Recife Neon":"Arrecife Neón","Abismo Lótus":"Abismo Loto","Águas tranquilas":"Aguas tranquilas","Corais luminosos":"Corales luminosos","Profundezas misteriosas":"Profundidades misteriosas","Sardine":"Sardina","Clownfish":"Pez payaso","Blue Tang":"Pez cirujano azul","Pufferfish":"Pez globo","Moonfish":"Pez luna","Lanternfish":"Pez linterna","Koi Ray":"Raya koi","Bem-vindo ao Nexus Sushi Bar.":"Bienvenido a Nexus Sushi Bar.","Turno encerrado. O Nexus agradece sua presença.":"Turno terminado. Nexus agradece tu visita.","Estoque esgotado. A próxima expedição trará novos ingredientes.":"Inventario agotado. La próxima expedición traerá nuevos ingredientes."," chegou ao balcão. Preferências:":" llegó al mostrador. Preferencias:"," ou ":" o ","Esse preparo não corresponde ao pedido. Confira as preferências do cliente.":"Esta preparación no coincide con el pedido. Revisa las preferencias del cliente.","Ingrediente em falta. Faça uma nova expedição.":"Falta un ingrediente. Inicia otra expedición.","Pedido iniciado:":"Pedido iniciado:","Escolha a estação correta.":"Elige la estación correcta.","Estação incorreta. Confira a etapa da receita antes de continuar.":"Estación incorrecta. Revisa el paso de la receta antes de continuar.","Etapa concluída. Próxima:":"Paso completado. Siguiente:"," perdeu a paciência e foi embora. Reputação -1.":" perdió la paciencia y se fue. Reputación -1.","Ingrediente em falta.":"Falta un ingrediente.","Pedido servido! +":"¡Pedido servido! +"," gorjeta":" propina","Esse não é o pedido do cliente. Confira o balcão!":"Ese no es el pedido del cliente. ¡Revisa el mostrador!","Ambiente aprimorado para o nível ":"Local mejorado al nivel ",". A decoração acolhe melhor os clientes.":". La decoración hace que los clientes se sientan mejor.","O bar subiu para o nível ":"El bar alcanzó el nivel ","! Mais clientes chegarão à casa.":"¡Llegarán más clientes!","Equipamento de pesca nível ":"Equipo de pesca nivel ","! Mais autonomia e capacidade.":"¡Más autonomía y capacidad!","São necessárias ":"Necesitas "," para reabastecer os chás.":" para reponer el té.","Chás reabastecidos. A casa está pronta para receber.":"Té repuesto. La casa está lista para recibir clientes.","Preparar pedido":"Preparar pedido","Modelar arroz":"Moldear arroz","Finalizar nigiri":"Terminar nigiri","Aquecer água":"Calentar agua","Infusionar matcha":"Preparar matcha","Preparar hojicha":"Preparar hojicha","Infusionar lótus":"Preparar loto","Preparar base de arroz":"Preparar base de arroz","Fritar e montar tempurá":"Freír y montar tempura","Cortar sashimi":"Cortar sashimi","Finalizar apresentação":"Terminar presentación","Finalizar nigiri especial":"Terminar nigiri especial","Modelar arroz premium":"Moldear arroz premium","Montagem imperial":"Montaje imperial","Infusionar genmaicha":"Preparar genmaicha","Preparar yuzu":"Preparar yuzu","Casa de chá":"Casa de té","Salão Neon":"Salón Neón","Jardim Zen":"Jardín Zen"
  }
};

export function translate(value, language = readProgress().language || "pt-BR") {
  if (language === "pt-BR" || !value) return value;
  let result = String(value);
  const dictionary = dictionaries[language] || dictionaries.en;
  for (const [source, target] of Object.entries(dictionary).sort((a,b)=>b[0].length-a[0].length)) {
    result = result.replaceAll(source, target);
  }
  return result;
}

export function applyLanguage(language = readProgress().language || "pt-BR") {
  const lang = LANGUAGES.includes(language) ? language : "pt-BR";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(node => {
    if (!node.dataset.i18nOriginal) node.dataset.i18nOriginal = node.textContent;
    node.textContent = translate(node.dataset.i18nOriginal, lang);
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    if (!node.parentElement?.closest("[data-i18n]")) {
      if (!node.__nexusOriginal) node.__nexusOriginal = node.nodeValue;
      node.nodeValue = translate(node.__nexusOriginal, lang);
    }
  }
  document.querySelectorAll("[aria-label]").forEach(node => {
    if (!node.dataset.i18nAria) node.dataset.i18nAria = node.getAttribute("aria-label");
    node.setAttribute("aria-label", translate(node.dataset.i18nAria, lang));
  });
  document.querySelectorAll("option").forEach(node => {
    if (!node.dataset.i18nOriginal) node.dataset.i18nOriginal = node.textContent;
    node.textContent = translate(node.dataset.i18nOriginal, lang);
  });
  return lang;
}

export function setLanguage(language) {
  const lang = applyLanguage(language);
  writeProgress({ ...readProgress(), language: lang });
  const selector = document.querySelector("#language-select");
  if (selector) selector.value = lang;
  return lang;
}

export function observeTranslations(languageGetter) {
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === "characterData") {
        const node = record.target;
        if (!node.__nexusOriginal) node.__nexusOriginal = node.nodeValue;
        const translated = translate(node.__nexusOriginal, languageGetter());
        if (node.nodeValue !== translated) node.nodeValue = translated;
      } else {
        record.addedNodes.forEach(added => {
          if (added.nodeType === Node.TEXT_NODE) {
            if (!added.__nexusOriginal) added.__nexusOriginal = added.nodeValue;
            added.nodeValue = translate(added.__nexusOriginal, languageGetter());
          } else if (added.nodeType === Node.ELEMENT_NODE) {
            const walker = document.createTreeWalker(added, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
              const node = walker.currentNode;
              if (!node.__nexusOriginal) node.__nexusOriginal = node.nodeValue;
              node.nodeValue = translate(node.__nexusOriginal, languageGetter());
            }
          }
        });
      }
    }
  });
  observer.observe(document.body, { childList: true, characterData: true, subtree: true });
  return observer;
}
