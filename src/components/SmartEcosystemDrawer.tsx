import React from "react";
import { 
  X, 
  Cpu, 
  Wifi, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Feather, 
  Sliders,
  Trees,
  TreePine,
  Sun,
  Sprout,
  Waves
} from "lucide-react";
import { ThemeDefinition, ThemeId, THEME_LIST } from "../themes";

interface SmartEcosystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeDefinition;
  onSelectTheme: (id: ThemeId) => void;
  onOpenSettings: () => void;
}

export const SmartEcosystemModal: React.FC<SmartEcosystemModalProps> = ({
  isOpen,
  onClose,
  theme,
  onSelectTheme,
  onOpenSettings
}) => {
  if (!isOpen) return null;

  const renderIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case "Trees": return <Trees className={className} />;
      case "TreePine": return <TreePine className={className} />;
      case "Sun": return <Sun className={className} />;
      case "Sprout": return <Sprout className={className} />;
      case "Waves": return <Waves className={className} />;
      default: return <Trees className={className} />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ecosystem-title"
    >
      <div 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 flex flex-col shadow-2xl relative transition-all duration-300"
        style={{
          backgroundColor: theme.colors.bgSurface,
          borderColor: theme.colors.borderMain,
          boxShadow: `0 0 35px ${theme.glowColor}`
        }}
      >
        {/* Header with Biome Background Banner */}
        <div className="relative h-44 sm:h-52 overflow-hidden rounded-t-[22px] border-b" style={{ borderColor: theme.colors.borderSubtle }}>
          <img 
            src={theme.bgImage} 
            alt={theme.name}
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Fechar painel do bioma"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Badges & Title */}
          <div className="absolute bottom-3 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span 
                  className="text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 shadow-sm"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.primaryText,
                    borderColor: theme.colors.borderMain
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: theme.colors.primaryText }} />
                  Ambiente Inteligente Ativo
                </span>
                <span className="text-[10px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                  {theme.biome}
                </span>
              </div>
              <h2 id="ecosystem-title" className="text-xl sm:text-2xl font-display font-black text-white tracking-wide flex items-center gap-2">
                {renderIcon(theme.iconName, "w-6 h-6 text-emerald-400")}
                <span>{theme.name} – {theme.environmentTitle}</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-emerald-300 bg-black/70 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                5 Sensores IoT • 5 Espécies
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Quick Biome Switcher Bar */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
                Alternar Ambiente Inteligente
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="text-[10px] font-mono font-bold hover:underline flex items-center gap-1 cursor-pointer"
                style={{ color: theme.colors.primary }}
              >
                <Sliders className="w-3 h-3" />
                Abrir Configurações
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {THEME_LIST.map((th) => {
                const isActive = th.id === theme.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => onSelectTheme(th.id)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      isActive 
                        ? "ring-2 scale-[1.02] shadow-md" 
                        : "opacity-75 hover:opacity-100 hover:scale-[1.01]"
                    }`}
                    style={{
                      backgroundColor: isActive ? th.colors.bgElevated : th.colors.bgCard,
                      borderColor: isActive ? th.colors.borderMain : th.colors.borderSubtle,
                      // @ts-ignore
                      "--tw-ring-color": th.colors.primary
                    }}
                  >
                    <div 
                      className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: th.colors.primary,
                        color: th.colors.primaryText
                      }}
                    >
                      {renderIcon(th.iconName, "w-3.5 h-3.5")}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold truncate leading-tight" style={{ color: th.colors.textPrimary }}>
                        {th.name}
                      </div>
                      <div className="text-[8px] font-mono truncate" style={{ color: th.colors.textMuted }}>
                        {isActive ? "Ativo" : "Toque"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 1: Dispositivos Inteligentes & Telemetria */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: theme.colors.borderSubtle }}>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryText }}
                >
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-display font-black uppercase tracking-wider" style={{ color: theme.colors.textPrimary }}>
                  Dispositivos Inteligentes & Sensores IoT
                </h3>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: theme.colors.bgElevated, borderColor: theme.colors.borderSubtle, color: theme.colors.textMuted }}>
                5 Unidades Conectadas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {theme.smartDevices.map((device, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl border flex flex-col justify-between gap-2 transition-all hover:border-emerald-500/50"
                  style={{
                    backgroundColor: theme.colors.bgCard,
                    borderColor: theme.colors.borderSubtle
                  }}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="text-[11px] font-bold leading-tight" style={{ color: theme.colors.textPrimary }}>
                      {device.name}
                    </span>
                    <span 
                      className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full border shrink-0 flex items-center gap-1"
                      style={{
                        backgroundColor: theme.colors.bgElevated,
                        borderColor: theme.colors.borderMain,
                        color: theme.colors.primary
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.colors.primary }} />
                      {device.status}
                    </span>
                  </div>
                  
                  <div className="text-[9px] font-mono" style={{ color: theme.colors.textMuted }}>
                    {device.type}
                  </div>

                  <div 
                    className="mt-1 pt-1.5 border-t text-[9px] font-mono flex items-center justify-between"
                    style={{ borderColor: theme.colors.borderSubtle }}
                  >
                    <span className="text-zinc-400">Telemetria:</span>
                    <span className="font-bold" style={{ color: theme.colors.accent }}>
                      {device.telemetry}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Animais Característicos do Bioma */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: theme.colors.borderSubtle }}>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryText }}
                >
                  <Feather className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-display font-black uppercase tracking-wider" style={{ color: theme.colors.textPrimary }}>
                  Fauna Característica Monitorada
                </h3>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: theme.colors.bgElevated, borderColor: theme.colors.borderSubtle, color: theme.colors.textMuted }}>
                5 Espécies Catalogadas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {theme.animals.map((animal, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl border flex flex-col justify-between gap-1.5 transition-all"
                  style={{
                    backgroundColor: theme.colors.bgCard,
                    borderColor: theme.colors.borderSubtle
                  }}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div>
                      <div className="text-[12px] font-bold" style={{ color: theme.colors.textPrimary }}>
                        {animal.name}
                      </div>
                      <div className="text-[9px] italic font-serif" style={{ color: theme.colors.textMuted }}>
                        {animal.scientificName}
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border" style={{ backgroundColor: theme.colors.bgApp, borderColor: theme.colors.borderSubtle, color: theme.colors.textMuted }}>
                      {animal.category}
                    </span>
                  </div>

                  <div 
                    className="mt-1 pt-1.5 border-t text-[9px] font-mono flex items-center gap-1.5"
                    style={{ borderColor: theme.colors.borderSubtle }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
                    <span className="text-zinc-400">Status:</span>
                    <span className="font-semibold" style={{ color: theme.colors.textSecondary }}>
                      {animal.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Efeitos Visuais & Iluminação */}
          <div 
            className="p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{
              backgroundColor: theme.colors.bgElevated,
              borderColor: theme.colors.borderSubtle
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.primaryText,
                  borderColor: theme.colors.borderMain
                }}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.textPrimary }}>
                  Efeitos Visuais do Ambiente: {theme.name}
                </div>
                <div className="text-[10px] font-mono mt-0.5" style={{ color: theme.colors.textMuted }}>
                  {theme.colorsDescription} • Partículas: {theme.particleType} • Iluminação imersiva
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-xl font-mono font-bold text-xs uppercase cursor-pointer border transition-transform hover:scale-105 active:scale-95 shrink-0"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.primaryText,
                borderColor: theme.colors.borderMain
              }}
            >
              Continuar Experiência
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
