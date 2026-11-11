import { useState, useRef, useEffect } from "react";
import { MessageSquare, Cpu, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FloraOracleProps {
  floraAvatar: string; // path to the generated flora netrunner image
}

export default function FloraOracle({ floraAvatar }: FloraOracleProps) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const responseEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    responseEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [response, loading]);

  const askOracle = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error("Transmissão interrompida pelo firewall corporativo.");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido na rede.");
    } finally {
      setLoading(false);
    }
  };

  // Pre-configured suggestive questions (Solarpunk theme)
  const SUGGESTED_QUERIES = [
    "Como integrar a energia solar à automação florestal?",
    "Qual é a função do micélio no equilíbrio biológico?",
    "Como o musgo sintético ajuda na refrigeração verde?",
    "Dicas de tecnologia sustentável para comunidades rurais."
  ];

  return (
    <div
      id="oracle_panel"
      className="solarpunk-glass border border-emerald-800/10 p-5 flex flex-col h-full shadow-sm rounded-2xl relative overflow-hidden bg-white/60"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-emerald-800/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#2E7D32] animate-pulse" />
          <div className="text-left">
            <h2 className="text-xs font-bold tracking-wider font-sans text-[#2E7D32] uppercase">ORÁCULO DE FLORA</h2>
            <p className="text-[9px] text-[#546E7A] font-sans uppercase">Guardião da Sabedoria Eco-Tecnológica // Inteligência Semântica</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start flex-1 min-h-0">
        {/* Left Column: Avatar & Lore */}
        <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-3 items-center shrink-0">
          <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-emerald-800/15 shadow-sm bg-white">
            <img
              src={floraAvatar}
              alt="Flora Netrunner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#2E7D32] text-white text-[8px] font-bold py-0.5 text-center tracking-widest uppercase font-sans">
              ONLINE
            </div>
          </div>
          <div className="flex-1 md:text-center text-left">
            <div className="text-xs font-bold text-[#263238] font-sans">FLORA V.02</div>
            <div className="text-[9px] font-sans text-[#26A69A] uppercase mt-0.5">Inteligência Ecológica Ancestral</div>
            <p className="text-[10px] text-[#546E7A] mt-1.5 leading-relaxed hidden md:block italic">
              "Conecte seu espírito à natureza viva. A tecnologia deve florescer em harmonia com a Terra."
            </p>
          </div>
        </div>

        {/* Right Column: Interaction Console */}
        <div className="flex-1 flex flex-col w-full h-full min-h-[250px] md:min-h-0 justify-between gap-3">
          {/* Output Display Container */}
          <div className="flex-1 bg-white/85 border border-emerald-800/10 rounded-xl p-3 overflow-y-auto max-h-[160px] custom-scrollbar flex flex-col justify-center min-h-[100px] shadow-inner text-left">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-2 py-4"
                >
                  <Cpu className="w-6 h-6 text-[#2E7D32] animate-spin" />
                  <span className="text-[9px] font-sans text-[#2E7D32] animate-pulse font-medium">
                    CONECTANDO AO MICÉLIO COGNITIVO...
                  </span>
                </motion.div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-xs font-sans p-3 border border-red-100 rounded-xl bg-red-50 text-center shadow-sm"
                >
                  [ERRO DE CONEXÃO]: {error}
                </motion.div>
              ) : response ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] font-sans text-[#263238] leading-relaxed whitespace-pre-wrap select-text selection:bg-[#E8F5E9] selection:text-[#2E7D32]"
                >
                  {response}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-4 text-[#546E7A] text-[10px] font-sans"
                >
                  <MessageSquare className="w-5 h-5 mx-auto mb-1.5 opacity-30 text-[#2E7D32]" />
                  Envie uma dúvida para consultar a sabedoria botânica integrada à inteligência artificial.
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={responseEndRef} />
          </div>

          {/* Suggested Queries Chips */}
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setQuestion(q)}
                className="text-[9.5px] font-sans bg-white border border-emerald-800/10 text-[#546E7A] px-2.5 py-1.5 rounded-xl hover:border-[#2E7D32] hover:text-[#2E7D32] hover:bg-[#E8F5E9]/30 transition-all text-left cursor-pointer truncate max-w-[220px] shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askOracle()}
              disabled={loading}
              placeholder="Digite sua dúvida de bio-hacking..."
              className="flex-1 bg-white border border-emerald-800/20 rounded-xl px-3 py-2 text-xs font-sans text-[#263238] placeholder:text-[#546E7A]/50 outline-none focus:border-[#2E7D32] shadow-sm transition-all"
            />
            <button
              onClick={askOracle}
              disabled={loading || !question.trim()}
              className="bg-gradient-to-r from-[#2E7D32] to-[#26A69A] hover:opacity-95 text-white font-medium text-xs px-3.5 py-2 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm border-transparent"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
