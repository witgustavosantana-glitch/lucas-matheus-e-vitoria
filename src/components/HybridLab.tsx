import React, { useState } from "react";
import { BASE_PLANTS, TECH_ENHANCEMENTS } from "../data";
import { HybridResult } from "../types";
import { Cpu, Leaf, Beaker, FileText, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

interface HybridLabProps {
  onSplicingStateChange?: (isSplicing: boolean) => void;
}

export default function HybridLab({ onSplicingStateChange }: HybridLabProps) {
  const [selectedPlantId, setSelectedPlantId] = useState(BASE_PLANTS[0].id);
  const [selectedTechId, setSelectedTechId] = useState(TECH_ENHANCEMENTS[0].id);
  const [customNotes, setCustomNotes] = useState("");
  const [isSplicing, setIsSplicing] = useState(false);
  const [splicingLogs, setSplicingLogs] = useState<string[]>([]);
  const [result, setResult] = useState<HybridResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulated log items shown sequentially during fusion loading
  const runSplicingSimulation = async () => {
    setIsSplicing(true);
    setResult(null);
    setError(null);
    onSplicingStateChange?.(true);

    const logs = [
      "► SylvaSync Kernel: Iniciando Câmara de Hibridização...",
      "► Lendo mapa de genoma do espécime vegetal...",
      "► Calibrando eletrodos de micro-injeção bio-eletroquímica...",
      "► Splicing de parede celular e canais de xilema iniciado...",
      "► Integrando semicondutores de silício nos cloroplastos...",
      "► Alinhando canais de fibra de carbono na rede micelial...",
      "► Mapeando fluxo de seiva e sinais de ressonância...",
      "► Conectando com a Inteligência Geral de Bio-Modulação...",
      "► Consolidando parâmetros vitais do Híbrido...",
    ];

    setSplicingLogs([]);

    // Stagger the logs on the screen for deep immersion
    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setSplicingLogs((prev) => [...prev, logs[i]]);
    }

    // Now issue the real fetch call to our server
    try {
      const response = await fetch("/api/hybridize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plantId: BASE_PLANTS.find((p) => p.id === selectedPlantId)?.name,
          techId: TECH_ENHANCEMENTS.find((t) => t.id === selectedTechId)?.name,
          customNotes,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Falha na comunicação com o laboratório genético do Gemini. Verifique os Secrets."
        );
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido ao processar híbrido.");
    } finally {
      setIsSplicing(false);
      onSplicingStateChange?.(false);
    }
  };

  const activePlant = BASE_PLANTS.find((p) => p.id === selectedPlantId);
  const activeTech = TECH_ENHANCEMENTS.find((t) => t.id === selectedTechId);

  return (
    <div className="flex flex-col gap-4 border border-emerald-800/10 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm relative overflow-hidden text-left">
      
      {/* Decorative background circle */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full border border-emerald-800/5 pointer-events-none" />

      {/* Lab Interface Header */}
      <div className="flex items-center justify-between border-b border-emerald-800/10 pb-3 z-10">
        <div className="flex items-center gap-2">
          <Beaker className="w-5 h-5 text-[#2E7D32]" />
          <h2 className="font-sans font-semibold text-[#263238] tracking-tight">
            Câmara de Hibridização Bionética
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-sans text-[#26A69A] font-semibold">
          <Cpu className="w-3.5 h-3.5 animate-pulse" />
          <span>SÍNTESE BIO-LÓGICA</span>
        </div>
      </div>

      {!isSplicing && !result ? (
        /* SPLICING SETUP CONFIGURATOR */
        <div className="flex flex-col gap-4 z-10">
          
          <p className="text-xs text-[#546E7A] leading-relaxed font-sans">
            Selecione uma planta florestal nativa e integre modificações cibernéticas avançadas para forjar um híbrido biológico-digital de alta eficiência.
          </p>

          {/* 1. Base Plant Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sans text-[#2E7D32] uppercase tracking-widest font-bold flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5" /> 01. Espécime Vegetal Base
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BASE_PLANTS.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => setSelectedPlantId(plant.id)}
                  className={`flex flex-col text-left p-2.5 rounded-xl border transition-all duration-300 ${
                    selectedPlantId === plant.id
                      ? "bg-[#E8F5E9] border-[#2E7D32]/30 shadow-sm text-[#2E7D32]"
                      : "bg-white border-emerald-800/10 text-[#546E7A] hover:border-[#2E7D32]/30 hover:bg-[#E8F5E9]/10"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-sans font-semibold text-xs">{plant.name}</span>
                    <span className="text-[8px] font-sans border border-emerald-800/10 px-1.5 py-0.5 rounded-full uppercase bg-[#E8F5E9] text-[#2E7D32] font-semibold">
                      {plant.rarity}
                    </span>
                  </div>
                  <span className="text-[9px] font-sans italic opacity-60 mt-0.5">
                    {plant.scientificName}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Cybernetic Enhancement Selector */}
          <div className="flex flex-col gap-1.5 mt-1">
            <label className="text-[10px] font-sans text-[#26A69A] uppercase tracking-widest font-bold flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" /> 02. Aprimoramento Tecnológico
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TECH_ENHANCEMENTS.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTechId(tech.id)}
                  className={`flex flex-col text-left p-2.5 rounded-xl border transition-all duration-300 ${
                    selectedTechId === tech.id
                      ? "bg-[#26A69A]/10 border-[#26A69A]/40 shadow-sm text-[#26A69A]"
                      : "bg-white border-emerald-800/10 text-[#546E7A] hover:border-[#26A69A]/30 hover:bg-[#26A69A]/5"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-sans font-semibold text-xs">{tech.name}</span>
                    <span className="text-[8px] font-sans bg-[#26A69A]/10 text-[#26A69A] border border-[#26A69A]/20 px-1.5 py-0.5 rounded-full uppercase font-semibold">
                      {tech.category}
                    </span>
                  </div>
                  <span className="text-[9px] font-sans leading-tight opacity-75 mt-1 line-clamp-1">
                    {tech.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Summary Preview Panel */}
          {activePlant && activeTech && (
            <div className="flex items-center justify-between bg-white border border-emerald-800/10 p-3 rounded-xl text-xs font-sans shadow-sm">
              <div className="flex flex-col">
                <span className="text-[9px] text-[#2E7D32] block uppercase font-semibold mb-0.5">FUSÃO PREVISTA</span>
                <span className="text-[#263238] font-semibold">{activePlant.name}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#2E7D32] animate-pulse" />
              <div className="flex flex-col text-right">
                <span className="text-[9px] text-[#26A69A] block uppercase font-semibold mb-0.5">UPGRADE ACESSÓRIO</span>
                <span className="text-[#263238] font-semibold">{activeTech.name}</span>
              </div>
            </div>
          )}

          {/* 3. Custom Laboratory Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sans text-[#2E7D32] uppercase tracking-widest font-bold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> 03. Notas Adicionais de Laboratório (Opcional)
            </label>
            <textarea
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Ex: Ampliar espectro luminescente; calibrar condutividade para solo úmido..."
              rows={2}
              className="w-full bg-white border border-emerald-800/20 rounded-xl p-2.5 text-xs text-[#263238] font-sans placeholder-[#546E7A]/50 focus:outline-none focus:border-[#2E7D32] shadow-sm transition-all"
            />
          </div>

          {/* Submit Action */}
          <button
            onClick={runSplicingSimulation}
            id="btn-sintetizar"
            className="w-full py-3 bg-gradient-to-r from-[#2E7D32] to-[#26A69A] hover:opacity-95 text-white font-semibold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 border-transparent transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
            Sintetizar Híbrido Botânico
          </button>
          
        </div>
      ) : isSplicing ? (
        /* INTERACTIVE SPLICING SEQUENCE SCREEN (LOADING) */
        <div className="flex flex-col gap-4 py-6 text-xs font-sans min-h-64 justify-center">
          
          <div className="flex flex-col items-center justify-center gap-3 mb-2">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-[#2E7D32]/10 border-t-[#2E7D32] rounded-full animate-spin" />
              <div className="absolute inset-1.5 border-4 border-[#26A69A]/10 border-b-[#26A69A] rounded-full animate-spin" style={{ animationDirection: "reverse" }} />
              <Leaf className="w-6 h-6 text-[#2E7D32] animate-bounce" />
            </div>
            <div className="text-center">
              <h3 className="font-sans font-semibold text-[#263238] text-sm">
                Sintetizando Sequência Gênica
              </h3>
              <p className="text-[10px] text-[#26A69A] font-semibold animate-pulse mt-0.5 uppercase tracking-wider">
                Integrando Biologia e Silício via Gemini AI
              </p>
            </div>
          </div>

          {/* Sequential Command Prompt Log display */}
          <div className="bg-white border border-emerald-800/10 p-3 rounded-xl h-36 overflow-y-auto flex flex-col gap-1 text-[10px] text-[#2E7D32] shadow-inner text-left">
            {splicingLogs.map((log, index) => (
              <div key={index} className="leading-tight animate-fade-in font-sans">
                {log}
              </div>
            ))}
            <div className="w-1.5 h-3.5 bg-[#2E7D32] animate-pulse ml-0.5 mt-0.5 self-start" />
          </div>

        </div>
      ) : error ? (
        /* ERROR DISPLAY */
        <div className="flex flex-col gap-4 py-6 text-center">
          <div className="text-red-600 font-sans text-xs p-4 bg-red-50 border border-red-100 rounded-xl shadow-sm">
            <p className="font-bold uppercase text-red-500 mb-1">ERRO DE SÍNTESE</p>
            {error}
          </div>
          <button
            onClick={() => {
              setError(null);
              setResult(null);
            }}
            className="px-4 py-2 border border-emerald-800/10 text-[#2E7D32] hover:bg-[#E8F5E9] rounded-xl text-xs font-sans font-medium self-center shadow-sm"
          >
            Tentar Novamente
          </button>
        </div>
      ) : (
        /* SYNTHESIZED HYBRID RESULTS SCREEN */
        result && (
          <div className="flex flex-col gap-4 animate-fade-in z-10 max-h-[580px] overflow-y-auto pr-1">
            
            {/* Header Identity banner */}
            <div className="bg-gradient-to-tr from-[#E8F5E9] to-[#26A69A]/5 border border-[#66BB6A]/20 rounded-xl p-3.5 relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 p-2.5 opacity-10">
                <Leaf className="w-16 h-16 text-[#2E7D32]" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-sans text-[9px] text-[#2E7D32] bg-[#E8F5E9] border border-[#2E7D32]/10 px-1.5 py-0.5 rounded-full font-semibold uppercase">
                    Híbrido Consolidado
                  </span>
                  <h3 className="font-sans font-bold text-[#2E7D32] text-lg mt-1">
                    {result.name}
                  </h3>
                  <span className="font-sans text-xs italic text-[#26A69A]">
                    {result.scientificName}
                  </span>
                </div>
                <div className="text-right font-sans">
                  <div className="text-[10px] text-[#2E7D32] uppercase font-semibold">Cód. Laboratório</div>
                  <div className="text-[#263238] text-xs font-bold">{result.codename}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#263238] leading-relaxed font-sans bg-white border border-emerald-800/10 p-3.5 rounded-xl shadow-sm text-left">
              {result.description}
            </p>

            {/* Augmented Stats Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-left">
              <div className="bg-white border border-emerald-800/10 p-3.5 rounded-xl shadow-sm">
                <span className="text-[9px] text-[#2E7D32] block uppercase font-semibold mb-0.5">FOTOSSÍNTESE BIONÉTICA</span>
                <span className="text-[#263238] font-bold">{result.vitalSigns.photosynthesis}</span>
              </div>
              <div className="bg-white border border-emerald-800/10 p-3.5 rounded-xl shadow-sm">
                <span className="text-[9px] text-[#2E7D32] block uppercase font-semibold mb-0.5">PRESSÃO DE SEIVA</span>
                <span className="text-[#263238] font-bold">{result.vitalSigns.sapPressure}</span>
              </div>
              <div className="bg-white border border-emerald-800/10 p-3.5 rounded-xl shadow-sm">
                <span className="text-[9px] text-[#2E7D32] block uppercase font-semibold mb-0.5">SATURAÇÃO DE SILÍCIO</span>
                <span className="text-[#263238] font-bold">{result.vitalSigns.siliconSaturation}</span>
              </div>
              <div className="bg-white border border-emerald-800/10 p-3.5 rounded-xl shadow-sm">
                <span className="text-[9px] text-[#2E7D32] block uppercase font-semibold mb-0.5">RESSONÂNCIA DO SINAL</span>
                <span className="text-[#263238] font-bold">{result.vitalSigns.signalResonance}</span>
              </div>
            </div>

            {/* Efficiency boost gauge banner */}
            <div className="flex items-center justify-between p-3 bg-[#E8F5E9]/50 border border-emerald-800/10 rounded-xl text-xs font-sans shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-[#E8F5E9] rounded-full text-[#2E7D32]">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[#2E7D32] text-[10px] uppercase block leading-none mb-0.5 font-semibold">Eficiência Fotossintética</span>
                  <span className="text-[#263238] font-medium">Bioneticamente Otimizada</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[#2E7D32] text-xl font-bold">+{result.efficiencyBoost}%</span>
              </div>
            </div>

            {/* Micro-networks details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="bg-white border border-emerald-800/10 p-3.5 rounded-xl flex flex-col gap-2 shadow-sm text-left">
                <span className="text-[10px] font-sans text-[#2E7D32] uppercase tracking-widest font-bold">Bio-Componentes Orgânicos</span>
                <div className="flex flex-wrap gap-1">
                  {result.components.organic.map((org, idx) => (
                    <span key={idx} className="text-[9.5px] font-sans bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/10 px-2.5 py-1 rounded-xl font-medium">
                      🌿 {org}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-emerald-800/10 p-3.5 rounded-xl flex flex-col gap-2 shadow-sm text-left">
                <span className="text-[10px] font-sans text-[#26A69A] uppercase tracking-widest font-bold">Hardware Integrado</span>
                <div className="flex flex-wrap gap-1">
                  {result.components.synthetic.map((syn, idx) => (
                    <span key={idx} className="text-[9.5px] font-sans bg-[#26A69A]/10 text-[#26A69A] border border-[#26A69A]/10 px-2.5 py-1 rounded-xl font-medium">
                      ⚙️ {syn}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ASCII Schematic Code diagram */}
            <div className="flex flex-col gap-1.5 mt-1 text-left">
              <span className="text-[10px] font-sans text-[#26A69A] uppercase tracking-widest font-bold">
                Esquema Elétrico e Conexão Neural (ASCII)
              </span>
              <div className="bg-[#E8F5E9]/30 border border-emerald-800/10 p-3.5 rounded-xl overflow-x-auto shadow-inner">
                <pre className="font-mono text-[9px] text-[#2E7D32] leading-tight select-all">
                  {result.schematicAscii}
                </pre>
              </div>
            </div>

            {/* Growth logs logbook entry */}
            <div className="bg-white border border-emerald-800/10 p-3.5 rounded-xl flex flex-col gap-1.5 shadow-sm text-left">
              <span className="text-[10px] font-sans text-[#2E7D32] uppercase tracking-widest font-bold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> Diário de Campo (Biólogo Cibernético)
              </span>
              <p className="text-xs text-[#546E7A] italic leading-relaxed font-sans">
                "{result.growthLog}"
              </p>
            </div>

            {/* Reset button */}
            <button
              onClick={() => {
                setResult(null);
                setCustomNotes("");
              }}
              className="w-full py-3 bg-[#E8F5E9] hover:bg-[#E8F5E9]/80 text-[#2E7D32] font-semibold rounded-xl text-xs border border-emerald-800/10 transition-all text-center cursor-pointer uppercase tracking-wider shadow-sm"
            >
              Iniciar Nova Síntese Genética
            </button>

          </div>
        )
      )}

    </div>
  );
}
