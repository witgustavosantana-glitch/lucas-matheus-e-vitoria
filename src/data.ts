import { BioPlant, DataNode } from "./types";

export const INITIAL_PLANTS: BioPlant[] = [
  {
    id: "p1",
    name: "Bonsai de Silício Criptográfico",
    scientificName: "Acer palmatum siliconis",
    description: "Um bonsai geneticamente modificado com nanopartículas de grafeno para armazenar, encriptar e isolar dados corporativos ultrassecretos diretamente em sua parede celular vegetativa.",
    rarity: "Lendária",
    cost: 1500,
    oxygenProduction: 80,
    datastreamCapacity: 256,
    stability: 95,
    image: "/src/assets/images/cyber_bonsai_1782235347682.jpg",
    effects: ["Criptografia Orgânica", "Armazenamento Frio", "Suporte Neural"]
  },
  {
    id: "p2",
    name: "Hera de Fibra Óptica",
    scientificName: "Hedera helix optica",
    description: "Esta trepadeira bio-modificada se acopla fisicamente a cabos elétricos urbanos e redireciona pacotes de dados extraviados na rede através de seus nódulos de clorofila condutiva.",
    rarity: "Comum",
    cost: 250,
    oxygenProduction: 15,
    datastreamCapacity: 12,
    stability: 80,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400",
    effects: ["Bypass de Sinal", "Absorção Térmica"]
  },
  {
    id: "p3",
    name: "Orquídea Neon Espectral",
    scientificName: "Orchidaceae spectra-neon",
    description: "Suas pétalas sintetizam ondas eletromagnéticas dispersas das antenas corporativas, emitindo um brilho cian/magenta intenso que neutraliza varreduras de IP e rastreadores.",
    rarity: "Rara",
    cost: 800,
    oxygenProduction: 45,
    datastreamCapacity: 64,
    stability: 65,
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=400",
    effects: ["Anulador de Sinal IP", "Filtro de Ruído RF"]
  },
  {
    id: "p4",
    name: "Musgo Termo-Resfriador",
    scientificName: "Bryophyta thermis",
    description: "Um musgo sintético projetado para crescer sobre o chassi de decks neurais e servidores, absorvendo calor extremo do hardware e convertendo-o em luz fria bioluminescente.",
    rarity: "Incomum",
    cost: 450,
    oxygenProduction: 35,
    datastreamCapacity: 32,
    stability: 90,
    image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&q=80&w=400",
    effects: ["Dissipador Térmico", "Regeneração de CPU"]
  },
  {
    id: "p5",
    name: "Samambaia Holo-Esporo",
    scientificName: "Polypodiopsida holospora",
    description: "Espalha esporos microscópicos que se mantêm suspensos e agem como repetidores wi-fi de curtíssimo alcance, gerando uma rede de comunicação mesh totalmente indetectável por radares corporativos.",
    rarity: "Rara",
    cost: 700,
    oxygenProduction: 50,
    datastreamCapacity: 48,
    stability: 70,
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400",
    effects: ["Rede Mesh Botânica", "Sincronização Estável"]
  }
];

export const INITIAL_NODES: DataNode[] = [
  {
    id: "n1",
    name: "Estufa Corporativa Arasaka-SP",
    district: "Berrini Cyber-Zone",
    securityLevel: "Alto",
    status: "Criptografado",
    decryptionProgress: 0,
    reward: 450,
    dataCapacity: "128 TB"
  },
  {
    id: "n2",
    name: "Servidor Distribuidor Liberdade",
    district: "Liberdade Subterrânea",
    securityLevel: "Médio",
    status: "Ativo",
    decryptionProgress: 100,
    reward: 200,
    dataCapacity: "64 TB"
  },
  {
    id: "n3",
    name: "Banco de Dados de Genoma Militech",
    district: "Chácara Santo Antônio",
    securityLevel: "Corporativo",
    status: "Criptografado",
    decryptionProgress: 0,
    reward: 1100,
    dataCapacity: "1024 TB"
  },
  {
    id: "n4",
    name: "Roteador do Porto Seco Tietê",
    district: "Marginal Grid",
    securityLevel: "Baixo",
    status: "Inativo",
    decryptionProgress: 0,
    reward: 150,
    dataCapacity: "32 TB"
  }
];

export const SYSTEM_GLOSSARY = [
  {
    term: "Bio-Hacking Vegetal",
    definition: "O processo de alteração e hibridização do código genético de plantas usando transceptores eletrônicos integrados à seiva e às células vegetais."
  },
  {
    term: "Clorofila Sintética",
    definition: "Pigmento modificado que não apenas realiza fotossíntese, mas também canaliza fluxo eletrônico pulsante de dados digitais."
  },
  {
    term: "Firewall Fúngico",
    definition: "Sistemas de defesa cibernética baseados no micélio de cogumelos, que distribuem e detectam ataques de vírus através de conexões de micorrizas na terra."
  },
  {
    term: "Deck Neural Orgânico",
    definition: "Um computador cibernético de última geração que se funde diretamente com o sistema nervoso do usuário e o sistema vascular das plantas conectadas."
  }
];

export const BASE_PLANTS = [
  {
    id: "bp-1",
    name: "Araucária de São Paulo",
    scientificName: "Araucaria angustifolia",
    rarity: "Rara"
  },
  {
    id: "bp-2",
    name: "Ipê Amarelo Urbano",
    scientificName: "Handroanthus albus",
    rarity: "Comum"
  },
  {
    id: "bp-3",
    name: "Samambaia-Açu Atlântica",
    scientificName: "Cyathea delgadii",
    rarity: "Incomum"
  },
  {
    id: "bp-4",
    name: "Manacá da Serra",
    scientificName: "Tibouchina mutabilis",
    rarity: "Comum"
  }
];

export const TECH_ENHANCEMENTS = [
  {
    id: "te-1",
    name: "Semicondutores de Cloroplasto",
    category: "Hardware",
    description: "Modulação de fluxo energético para amplificar condutividade de seiva."
  },
  {
    id: "te-2",
    name: "Transceptor Micelial Mesh",
    category: "Frequência",
    description: "Conexão sem fio ponto-a-ponto subterrânea utilizando hifas de fungos."
  },
  {
    id: "te-3",
    name: "Graphene Sap Armor",
    category: "Segurança",
    description: "Revestimento molecular nas paredes de xilema para conter ataques cibernéticos."
  },
  {
    id: "te-4",
    name: "Bioluminescent Status LED",
    category: "Sinal",
    description: "Modificação genética para sinalizar status de integridade de dados via brilho celular."
  }
];
