import React, { useState, useEffect } from "react";
import { TreePine, Cpu, Sparkles } from "lucide-react";

interface HeaderProps {
  isSynthPlaying: boolean;
  onToggleSynth: () => void;
}

export default function Header({ isSynthPlaying, onToggleSynth }: HeaderProps) {
  const [sysTime, setSysTime] = useState("");

  // Update real system clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSysTime(now.toLocaleTimeString("pt-BR", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative border-b border-emerald-800/10 bg-white/70 backdrop-blur-md px-6 py-4 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Branding Title with Solarpunk style */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-[#E8F5E9] to-[#26A69A]/10 border border-[#66BB6A]/20 shadow-sm">
            <TreePine className="absolute w-7 h-7 text-[#2E7D32]" />
            <Cpu className="absolute w-4 h-4 text-[#26A69A] opacity-80" style={{ transform: "translate(6px, 6px)" }} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold tracking-tight text-[#2E7D32]">
                RAÍZES <span className="text-[#26A69A]">DIGITAIS</span>
              </h1>
              <span className="text-[10px] font-sans px-2 py-0.5 rounded-full border border-emerald-800/10 bg-[#E8F5E9] text-[#2E7D32] font-semibold shadow-sm">
                SOLARPUNK OS
              </span>
            </div>
            <p className="font-sans text-[9px] text-[#546E7A] tracking-wider uppercase">
              Portal Eco-Tecnológico de Interação
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Links from Solarpunk design */}
        <div className="hidden md:flex gap-6 lg:gap-8 text-[11px] font-sans font-medium uppercase tracking-wider text-[#546E7A]">
          <span className="text-[#2E7D32] font-semibold border-b-2 border-[#2E7D32] pb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#26A69A]" />
            <span>Biosfera</span>
          </span>
          <span className="hover:text-[#2E7D32] cursor-pointer transition-colors pb-1">Conexões</span>
          <span className="hover:text-[#2E7D32] cursor-pointer transition-colors pb-1">Interações</span>
          <span className="hover:text-[#2E7D32] cursor-pointer transition-colors pb-1">Laboratório</span>
        </div>

        {/* Actions & Local Time */}
        <div className="flex items-center gap-4">
          {/* Bio-Resonance Ambient Sound Toggle */}
          <button
            onClick={onToggleSynth}
            id="btn-resonance"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] uppercase font-sans font-medium tracking-wider transition-all duration-300 cursor-pointer ${
              isSynthPlaying
                ? "bg-gradient-to-r from-[#2E7D32] to-[#26A69A] text-white border-transparent shadow-sm hover:opacity-95"
                : "bg-[#E8F5E9]/50 border-emerald-800/10 text-[#2E7D32] hover:bg-[#E8F5E9]"
            }`}
          >
            <div className="relative w-2 h-2 rounded-full">
              {isSynthPlaying ? (
                <>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              )}
            </div>
            <span>{isSynthPlaying ? "SINTONIA ON" : "ATIVAR RESSONÂNCIA"}</span>
          </button>

          {/* Clock Widget */}
          <div className="flex flex-col items-end text-xs font-sans border-l border-emerald-800/10 pl-4 text-left">
            <span className="text-[#2E7D32] font-semibold">{sysTime || "--:--:--"}</span>
            <span className="text-[9px] text-[#546E7A] tracking-wider uppercase font-medium">CONEXÃO ATIVA</span>
          </div>
        </div>

      </div>
    </header>
  );
}
