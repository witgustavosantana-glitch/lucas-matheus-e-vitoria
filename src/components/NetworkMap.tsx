import React, { useState, useEffect } from "react";
import { TreeSpecimen } from "../types";
import { ShieldAlert, Zap, Radio, Database, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface NetworkMapProps {
  trees: TreeSpecimen[];
  selectedTree: TreeSpecimen;
  onSelectTree: (tree: TreeSpecimen) => void;
}

export default function NetworkMap({ trees, selectedTree, onSelectTree }: NetworkMapProps) {
  const [pulsePhase, setPulsePhase] = useState(0);

  // Animate a simple signal line simulation for aesthetics
  useEffect(() => {
    let animId: number;
    const update = () => {
      setPulsePhase((prev) => (prev + 0.15) % (Math.PI * 2));
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Generate coordinates for a cool SVG network vector grid that connects nodes to center
  const renderConnections = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        {trees.map((t) => {
          // Draw a circuit trace path from each tree to the next or to a central bus line
          return (
            <line
              key={`line-${t.id}`}
              x1={`${t.coords.x}%`}
              y1={`${t.coords.y}%`}
              x2="50%"
              y2="50%"
              stroke="rgba(16, 185, 129, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="animate-pulse"
            />
          );
        })}
        {/* Draw central bio-bus core */}
        <circle cx="50%" cy="50%" r="6" fill="#00ff88" className="animate-ping opacity-60" />
        <circle cx="50%" cy="50%" r="4" fill="#06b6d4" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col gap-4 border border-forest-medium/60 bg-forest-dark/40 backdrop-blur-sm rounded-xl p-5 shadow-xl">
      
      {/* Section Title */}
      <div className="flex items-center justify-between border-b border-forest-medium/50 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyber-neon" />
          <h2 className="font-display font-medium text-white tracking-tight">
            Mapa de Telemetria Biosférica
          </h2>
        </div>
        <span className="font-mono text-[10px] text-emerald-500 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
          SETOR FLORESTAL B-12
        </span>
      </div>

      {/* Grid Canvas Map */}
      <div className="relative w-full h-64 bg-forest-dark/90 border border-emerald-950 rounded-lg cyber-grid overflow-hidden flex items-center justify-center">
        {renderConnections()}

        {/* Ambient Ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
          <div className="w-48 h-48 rounded-full border border-cyber-neon border-dashed animate-spin" style={{ animationDuration: "25s" }}></div>
          <div className="absolute w-32 h-32 rounded-full border border-cyber-blue border-dashed animate-spin" style={{ animationDuration: "12s" }}></div>
        </div>

        {/* Topographic Legend Labels */}
        <div className="absolute top-2 left-2 text-[8px] font-mono text-emerald-700 pointer-events-none uppercase">
          X-COORD [TR-GRID-04]<br/>Y-COORD [SYS-LATENCY-OK]
        </div>
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-cyan-700 pointer-events-none">
          ESC: 1:500m | ELEV: 852m
        </div>

        {/* Center Bus Label */}
        <div className="absolute top-[44%] left-[53%] text-[8px] font-mono text-cyber-blue bg-forest-dark/80 px-1 border border-cyan-900/40 pointer-events-none uppercase">
          NÚCLEO BIO-MÍSTICO
        </div>

        {/* Dynamic Nodes */}
        {trees.map((tree) => {
          const isSelected = tree.id === selectedTree.id;
          const statusColors = {
            ONLINE: "bg-cyber-neon border-emerald-500",
            STANDBY: "bg-cyber-blue border-cyan-600",
            ALERT: "bg-red-500 border-red-800",
          };

          return (
            <button
              key={tree.id}
              onClick={() => onSelectTree(tree)}
              className="absolute group -translate-x-1/2 -translate-y-1/2 focus:outline-none z-10"
              style={{ left: `${tree.coords.x}%`, top: `${tree.coords.y}%` }}
            >
              {/* Dynamic pulse background */}
              <span className={`absolute -inset-2.5 rounded-full opacity-40 transition-all duration-300 ${
                isSelected ? "bg-cyber-neon/30 animate-ping" : "group-hover:bg-emerald-950/50"
              }`}></span>

              {/* Node Core */}
              <div
                className={`w-4.5 h-4.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                  statusColors[tree.status]
                } ${isSelected ? "scale-125 shadow-[0_0_12px_rgba(0,255,136,0.6)]" : ""}`}
              >
                {/* Mini inner core indicator */}
                <div className={`w-1.5 h-1.5 rounded-full bg-white ${tree.status === "ALERT" ? "animate-pulse" : ""}`} />
              </div>

              {/* Hover Label */}
              <span className="absolute left-6 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform origin-left whitespace-nowrap bg-forest-dark border border-forest-medium px-2 py-1 rounded text-[10px] font-mono text-white z-20 shadow-md">
                {tree.commonName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Tree Details Panel */}
      <div className="bg-forest-deep/60 border border-forest-medium/30 rounded-lg p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-mono text-cyber-mint uppercase tracking-widest font-bold">
              Espécime Conectado
            </div>
            <h3 className="font-display font-medium text-white text-base">
              {selectedTree.commonName}
            </h3>
            <span className="font-mono text-xs italic text-emerald-500/80">
              {selectedTree.species}
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex flex-col items-end gap-1">
            <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
              selectedTree.status === "ONLINE"
                ? "bg-cyber-neon/10 border-cyber-neon/40 text-cyber-neon"
                : selectedTree.status === "STANDBY"
                ? "bg-cyber-blue/10 border-cyber-blue/40 text-cyber-blue"
                : "bg-red-950/50 border-red-800/50 text-red-400"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                selectedTree.status === "ONLINE" ? "bg-cyber-neon" : selectedTree.status === "STANDBY" ? "bg-cyber-blue" : "bg-red-500 animate-ping"
              }`} />
              {selectedTree.status}
            </span>
            <span className="font-mono text-[9px] text-emerald-600/70">
              ID: {selectedTree.nodeId}
            </span>
          </div>
        </div>

        {/* Telemetry Progress Bars (Bio-Gauges) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 text-xs font-mono">
          
          {/* Health Gauge */}
          <div className="bg-forest-dark/40 border border-emerald-950/50 p-2 rounded">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-emerald-500">SAÚDE BIOLÓGICA</span>
              <span className="text-white font-bold">{selectedTree.health}%</span>
            </div>
            <div className="w-full bg-forest-dark h-1.5 rounded overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-cyber-neon h-full transition-all duration-500"
                style={{ width: `${selectedTree.health}%` }}
              />
            </div>
          </div>

          {/* Photosynthesis Voltage */}
          <div className="bg-forest-dark/40 border border-emerald-950/50 p-2 rounded">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-emerald-500">FOTOSVERGA GERAL (TENSÃO)</span>
              <span className="text-cyber-neon font-bold">{selectedTree.photosynthesis}%</span>
            </div>
            <div className="w-full bg-forest-dark h-1.5 rounded overflow-hidden">
              <div
                className="bg-cyber-neon h-full transition-all duration-500"
                style={{ width: `${selectedTree.photosynthesis}%` }}
              />
            </div>
          </div>

          {/* Sap Flow */}
          <div className="bg-forest-dark/40 border border-emerald-950/50 p-2 rounded">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-emerald-500">FLUXO DE SEIVA</span>
              <span className="text-cyber-blue font-bold">{selectedTree.sapFlow} mL/min</span>
            </div>
            <div className="w-full bg-forest-dark h-1.5 rounded overflow-hidden">
              <div
                className="bg-cyber-blue h-full transition-all duration-500"
                style={{ width: `${Math.min(selectedTree.sapFlow * 2.2, 100)}%` }}
              />
            </div>
          </div>

          {/* Silicon Saturation */}
          <div className="bg-forest-dark/40 border border-emerald-950/50 p-2 rounded">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-emerald-500">SATURAÇÃO DE SILÍCIO</span>
              <span className="text-white font-bold">{selectedTree.siliconSaturation}%</span>
            </div>
            <div className="w-full bg-forest-dark h-1.5 rounded overflow-hidden">
              <div
                className="bg-slate-400 h-full transition-all duration-500"
                style={{ width: `${selectedTree.siliconSaturation}%` }}
              />
            </div>
          </div>

        </div>

        {/* Live Signal Oscilloscope SVG wave */}
        <div className="relative border border-emerald-950/60 bg-forest-dark/70 rounded h-12 overflow-hidden flex items-center p-2">
          <div className="absolute top-1 left-2 text-[8px] font-mono text-emerald-600/60 uppercase">
            Sinal Micelial Ativo ({selectedTree.mycelialSpeed})
          </div>
          <svg className="w-full h-8 stroke-cyber-neon/80 fill-none" viewBox="0 0 400 40">
            <path
              d={Array.from({ length: 41 }, (_, i) => {
                const x = i * 10;
                const freq = selectedTree.status === "ALERT" ? 0.08 : 0.03;
                const amp = selectedTree.status === "STANDBY" ? 5 : selectedTree.status === "ALERT" ? 15 : 10;
                const y = 20 + Math.sin(x * freq + pulsePhase) * amp;
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              }).join(" ")}
              strokeWidth="1.5"
            />
          </svg>
          {selectedTree.status === "ALERT" && (
            <div className="absolute inset-0 bg-red-950/10 flex items-center justify-end px-3">
              <span className="flex items-center gap-1 text-[9px] font-mono text-red-400 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/40">
                <ShieldAlert className="w-3 h-3 text-red-500 animate-bounce" />
                Flutuação Crítica de Tensão
              </span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
