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
    "Turno encerrado":"Shift complete","Todos os clientes foram atendidos.":"All customers have been served.","Sem fila":"No queue","Receita concluída":"Recipe complete","Sushi":"Sushi","Chá":"Tea","preferência":"favorite","Estoque vazio":"Inventory empty","Nível de pesca":"Fishing level","Nível do bar":"Bar level","Reputação":"Reputation","Satisfação":"Satisfaction","Turno:":"Shift:","atendidos":"served","saídas":"walkouts","gorjetas":"tips","Vá com calma. O oceano é seu para explorar.":"Take it slow. The ocean is yours to explore."
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
    "Turno encerrado":"Turno terminado","Todos os clientes foram atendidos.":"Todos los clientes han sido atendidos.","Sem fila":"Sin cola","Receita concluída":"Receta completada","Sushi":"Sushi","Chá":"Té","preferência":"preferencia","Estoque vazio":"Inventario vacío","Nível de pesca":"Nivel de pesca","Nível do bar":"Nivel del bar","Reputação":"Reputación","Satisfação":"Satisfacción","Turno:":"Turno:","atendidos":"atendidos","saídas":"salidas","gorjetas":"propinas","Vá com calma. O oceano é seu para explorar.":"Ve con calma. El océano es tuyo para explorar."
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
