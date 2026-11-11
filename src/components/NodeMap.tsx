import { DataNode, Cyberdeck } from "../types";
import { Shield, Zap, Globe, Lock, CheckCircle2, Unlock } from "lucide-react";
import { motion } from "motion/react";

interface NodeMapProps {
  nodes: DataNode[];
  cyberdeck: Cyberdeck;
  onHackNode: (nodeId: string) => void;
  isHacking: boolean;
}

export default function NodeMap({
  nodes,
  cyberdeck,
  onHackNode,
  isHacking
}: NodeMapProps) {
  // Simple deterministic positions for the visual map node representation
  const positionMap: Record<string, { x: number; y: number }> = {
    n1: { x: 30, y: 35 },
    n2: { x: 65, y: 25 },
    n3: { x: 20, y: 75 },
    n4: { x: 80, y: 65 }
  };

  return (
    <div
      id="node_map_panel"
      className="solarpunk-glass border border-emerald-800/10 p-5 flex flex-col h-full shadow-sm rounded-2xl relative overflow-hidden bg-white/60"
    >
      <div className="flex items-center justify-between mb-4 border-b border-emerald-800/10 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#2E7D32] animate-spin-slow" />
          <div className="text-left">
            <h2 className="text-xs font-bold tracking-wider font-sans text-[#2E7D32] uppercase">MAPA BIOLÓGICO DA REDE</h2>
            <p className="text-[9px] text-[#546E7A] font-sans uppercase">CONEXÕES FLORESTAIS DE SÃO PAULO // VER v2.4</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold bg-[#E8F5E9] border border-emerald-800/10 px-2.5 py-1 rounded-xl text-[#2E7D32] shadow-sm">
          <Zap className="w-3.5 h-3.5 text-[#2E7D32] animate-pulse" />
          <span>CONEXÃO BIOTECNOLÓGICA ATIVA</span>
        </div>
      </div>

      {/* Retro-Futuristic Grid Vector Map with Solarpunk theme */}
      <div className="relative bg-[#E8F5E9]/20 border border-emerald-800/10 h-44 mb-5 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
        {/* SVG Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,245,233,0)_95%,rgba(46,125,50,0.05)_95%),linear-gradient(90deg,rgba(232,245,233,0)_95%,rgba(46,125,50,0.05)_95%)] bg-[size:24px_24px] opacity-80 pointer-events-none" />
        
        {/* Blinking central hub beacon */}
        <div className="absolute w-2 h-2 bg-[#2E7D32] rounded-full animate-ping" style={{ left: "50%", top: "50%" }} />
        <div className="absolute w-2 h-2 bg-[#2E7D32] rounded-full" style={{ left: "50%", top: "50%" }} />
        <span className="absolute text-[8.5px] text-[#2E7D32] font-sans top-[54%] left-[53%] font-semibold uppercase">GERADOR DE BIOMASSA</span>

        {/* Render interactive map pins */}
        {nodes.map((node) => {
          const pos = positionMap[node.id] || { x: 50, y: 50 };
          const isActive = node.status === "Ativo";
          const isCorporate = node.securityLevel === "Corporativo" || node.securityLevel === "Alto";

          return (
            <div
              key={node.id}
              className="absolute group"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {/* Dynamic Map Point */}
              <motion.button
                whileHover={{ scale: 1.3 }}
                onClick={() => node.status === "Criptografado" && onHackNode(node.id)}
                disabled={isActive || isHacking}
                className={`w-3.5 h-3.5 rounded-full border border-white cursor-pointer focus:outline-none flex items-center justify-center relative ${
                  isActive
                    ? "bg-[#2E7D32] shadow-sm"
                    : isCorporate
                    ? "bg-[#26A69A] shadow-sm animate-pulse"
                    : "bg-yellow-400 shadow-sm"
                }`}
              >
                {/* Micro outer glowing ring */}
                <div className={`absolute -inset-1.5 border border-dashed opacity-50 ${isActive ? "border-emerald-800/30 animate-spin-slow" : "border-zinc-300 animate-pulse"}`} />
              </motion.button>

              {/* Tooltip on Hover */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-emerald-800/10 rounded-xl p-2.5 text-[9px] font-sans text-[#263238] w-38 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-md">
                <div className="font-semibold text-[#2E7D32] truncate text-left">{node.name}</div>
                <div className="text-[#546E7A] text-left">{node.district}</div>
                <div className="flex justify-between mt-1 text-[#546E7A]">
                  <span>Seg: {node.securityLevel}</span>
                  <span className={isActive ? "text-[#2E7D32] font-semibold" : "text-[#26A69A] font-semibold"}>
                    {isActive ? "Conectado" : "Bloqueado"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <span className="absolute bottom-1 right-2 text-[8px] font-sans text-[#2E7D32]/60 font-semibold uppercase">PORTAL RAÍZES SINTONIA DIRETA</span>
      </div>

      {/* Nodes List */}
      <div className="space-y-3 overflow-y-auto flex-1 pr-1 max-h-[220px] custom-scrollbar">
        {nodes.map((node) => {
          const isActive = node.status === "Ativo";
          
          return (
            <div
              key={node.id}
              className={`p-3.5 border transition-all flex items-center justify-between gap-3 shadow-sm ${
                isActive
                  ? "bg-[#E8F5E9]/50 border-[#2E7D32]/25 rounded-2xl"
                  : "bg-white border-emerald-800/10 hover:border-emerald-800/20 rounded-2xl"
              }`}
            >
              <div className="space-y-1 min-w-0 flex-1 text-left">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-[#2E7D32] animate-pulse" : "bg-[#26A69A]"
                    }`}
                  />
                  <h3 className="text-xs font-bold text-[#263238] uppercase truncate">{node.name}</h3>
                </div>
                <p className="text-[9px] text-[#546E7A] font-sans truncate">{node.district}</p>
                
                {/* Stats row */}
                <div className="flex items-center gap-3 text-[9px] font-sans text-[#546E7A] pt-1">
                  <span className="flex items-center gap-0.5">
                    <Shield className="w-2.5 h-2.5 text-zinc-500" />
                    Seg: <span className="text-zinc-500 font-semibold">{node.securityLevel}</span>
                  </span>
                  <span>Payload: <span className="text-[#26A69A] font-semibold">{node.dataCapacity}</span></span>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                {isActive ? (
                  <div className="flex items-center gap-1 bg-[#E8F5E9] border border-emerald-800/10 px-2.5 py-1 text-[#2E7D32] rounded-xl font-sans text-[9px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>SINCRONIZADO</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onHackNode(node.id)}
                    disabled={isHacking}
                    className="flex items-center gap-1 bg-gradient-to-r from-[#2E7D32] to-[#26A69A] hover:opacity-95 text-white font-medium text-[9px] font-sans px-3.5 py-2 rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border-transparent"
                  >
                    <Unlock className="w-3 h-3 text-white" />
                    <span>HACKEAR ({node.reward} CR)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
