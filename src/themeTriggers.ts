import { ThemeId } from "./themes";

export interface ThemeTrigger {
  id: string;
  phrase: string;
  videoUrl: string;
  videoName: string;
  description: string;
  isFixed?: boolean;
}

export interface ThemeMediaDefinition {
  themeId: ThemeId;
  themeName: string;
  intro: {
    id: string;
    phrase: string;
    videoUrl: string;
    videoName: string;
    description: string;
    isFixed?: boolean;
  };
  triggers: ThemeTrigger[];
  suggestedQuestions: string[];
}

/**
 * ESTRUTURA CENTRALIZADA DE VÍDEOS E GATILHOS FIXOS
 * Compartilhada universalmente entre todos os 5 temas (Amazônia, Taiga, Caatinga, Bambuçal, Pantanal).
 * As URLs são fixas no código-fonte e protegidas contra alterações acidentais.
 */
export const CENTRAL_FIXED_MEDIA: ThemeMediaDefinition = {
  themeId: "amazonia",
  themeName: "Central Ecossistema",
  intro: {
    id: "intro",
    phrase: "introdução",
    videoUrl: "https://youtube.com/shorts/lvrfiUS1hQc?si=Oifgcfg4S9J2AFZ7",
    videoName: "Apresentação: Assistente Virtual (HD)",
    description: "Vídeo de introdução e apresentação interativa do assistente virtual",
    isFixed: true,
  },
  triggers: [
    {
      id: "taiga_gatilho_1",
      phrase: "Como podemos preservar?",
      videoUrl: "https://youtube.com/shorts/Nvq2pUB2KQM?si=ZA0z8gjjZNxVkBaH",
      videoName: "Gatilho 1 - Como podemos preservar?",
      description: "Práticas e orientações para preservação do ecossistema e meio ambiente",
      isFixed: true,
    },
    {
      id: "taiga_gatilho_2",
      phrase: "Quais são as ameaças?",
      videoUrl: "https://youtube.com/shorts/3xtGroxD40k?si=Xi8fIacXF_dUv7oq",
      videoName: "Gatilho 2 - Quais são as ameaças?",
      description: "Ameaças ambientais, climáticas e ações humanas que afetam o ecossistema",
      isFixed: true,
    },
    {
      id: "taiga_gatilho_3",
      phrase: "Qual é a sua localização?",
      videoUrl: "https://youtube.com/shorts/ARbK4-Cgzf0?si=tst0eZkoGL-h4H1g",
      videoName: "Gatilho 3 - Qual é a sua localização?",
      description: "Localização geográfica, extensão territorial e características do bioma",
      isFixed: true,
    },
    {
      id: "taiga_gatilho_4",
      phrase: "Por que preservar a natureza?",
      videoUrl: "https://youtube.com/shorts/vPDfMaBTYQE?si=kJvOPPaMueIDyYC5",
      videoName: "Gatilho 4 - Por que preservar a natureza?",
      description: "Importância e motivos ecológicos para preservar a natureza e a biodiversidade",
      isFixed: true,
    },
  ],
  suggestedQuestions: [
    "Como podemos preservar?",
    "Quais são as ameaças?",
    "Qual é a sua localização?",
    "Por que preservar a natureza?",
    "reiniciar apresentação"
  ]
};

// Aliases para compatibilidade total com módulos existentes
export const TAIGA_THEME_MEDIA: ThemeMediaDefinition = {
  ...CENTRAL_FIXED_MEDIA,
  themeId: "taiga",
  themeName: "Taiga"
};

export const AMAZONIA_THEME_MEDIA: ThemeMediaDefinition = {
  ...CENTRAL_FIXED_MEDIA,
  themeId: "amazonia",
  themeName: "Amazônia"
};

/**
 * Mapeamento centralizado de mídias para cada um dos cinco temas.
 * A troca de tema modifica apenas a identidade visual do app;
 * todos os 5 temas compartilham o acervo central fixo de vídeos e gatilhos.
 */
export const THEME_MEDIA_MAP: Record<ThemeId, ThemeMediaDefinition> = {
  amazonia: {
    ...CENTRAL_FIXED_MEDIA,
    themeId: "amazonia",
    themeName: "Amazônia",
  },
  taiga: {
    ...CENTRAL_FIXED_MEDIA,
    themeId: "taiga",
    themeName: "Taiga",
  },
  caatinga: {
    ...CENTRAL_FIXED_MEDIA,
    themeId: "caatinga",
    themeName: "Caatinga",
  },
  bambucal: {
    ...CENTRAL_FIXED_MEDIA,
    themeId: "bambucal",
    themeName: "Bambuçal",
  },
  pantanal: {
    ...CENTRAL_FIXED_MEDIA,
    themeId: "pantanal",
    themeName: "Pantanal",
  }
};

/**
 * Normaliza strings para comparação fonética e por similaridade textual:
 * Remove acentos, pontuações, caracteres especiais e espaços extras.
 */
export function normalizeVoiceText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9\s]/g, " ")     // pontuações viram espaços
    .replace(/\s+/g, " ")             // normaliza espaços
    .trim();
}

/**
 * Identificador e resolvedor especializado para os gatilhos centrais.
 * Compartilhado igualmente entre Amazônia, Taiga, Caatinga, Bambuçal e Pantanal.
 * Permite variações de escrita e reconhecimento de voz sem confundir os gatilhos.
 */
export function matchCentralTrigger(input: string): string | null {
  const norm = normalizeVoiceText(input);
  if (!norm) return null;

  // Intro matchers: apresentação, introdução, início, começar, voltar
  const introWords = ["introducao", "inicio", "iniciar", "apresentacao", "apresentar", "comecar", "comeco", "abrir", "voltar"];
  if (introWords.some(w => norm === w || norm.startsWith(w + " ") || norm.endsWith(" " + w) || norm.includes(w))) {
    return "intro";
  }

  // Gatilho 2: "Quais são as ameaças?"
  // Prioridade alta para detecção da palavra-chave única "ameaca" / "ameacas" / "perigos" / "riscos"
  if (
    norm.includes("ameaca") ||
    norm.includes("ameacas") ||
    norm.includes("quais sao as ameacas") ||
    norm.includes("quais as ameacas") ||
    norm.includes("o que ameaca") ||
    norm.includes("principais ameacas") ||
    norm.includes("maiores ameacas") ||
    norm.includes("perigos") ||
    norm.includes("riscos ambientais") ||
    norm.includes("riscos")
  ) {
    return "taiga_gatilho_2";
  }

  // Gatilho 3: "Qual é a sua localização?"
  // Prioridade para detecção de "localizacao", "onde fica", "onde esta", "onde se localiza"
  if (
    norm.includes("localizacao") ||
    norm.includes("localizada") ||
    norm.includes("onde fica") ||
    norm.includes("onde esta") ||
    norm.includes("onde se localiza") ||
    norm.includes("onde encontramos") ||
    norm.includes("qual e a localizacao") ||
    norm.includes("qual sua localizacao") ||
    norm.includes("qual e a sua localizacao") ||
    norm.includes("onde se situa")
  ) {
    return "taiga_gatilho_3";
  }

  // Gatilho 4: "Por que preservar a natureza?"
  // Diferencia-se de "Como podemos preservar" por conter "por que" / "porque" / "natureza" / "motivo" / "razao" / "importancia"
  if (
    norm.includes("natureza") ||
    norm.includes("por que preservar") ||
    norm.includes("porque preservar") ||
    norm.includes("por que proteger") ||
    norm.includes("motivos para preservar") ||
    norm.includes("motivo para preservar") ||
    norm.includes("razao para preservar") ||
    norm.includes("por que devemos preservar") ||
    norm.includes("importancia de preservar") ||
    norm.includes("por que preservar a natureza") ||
    norm.includes("porque preservar a natureza") ||
    norm.includes("por que e importante preservar")
  ) {
    return "taiga_gatilho_4";
  }

  // Gatilho 1: "Como podemos preservar?"
  // Diferencia-se por focar em "como", "podemos", "maneiras", "acoes", "preservar" (sem "natureza" ou "por que")
  if (
    norm.includes("como podemos preservar") ||
    norm.includes("como preservar") ||
    norm.includes("como proteger") ||
    norm.includes("como cuidar") ||
    norm.includes("como podemos cuidar") ||
    norm.includes("como podemos proteger") ||
    norm.includes("como a gente preserva") ||
    norm.includes("o que fazer para preservar") ||
    norm.includes("maneiras de preservar") ||
    norm.includes("formas de preservar") ||
    norm.includes("podemos preservar") ||
    norm === "preservar"
  ) {
    return "taiga_gatilho_1";
  }

  return null;
}

// Mantido como alias para retrocompatibilidade
export const matchTaigaTrigger = matchCentralTrigger;
