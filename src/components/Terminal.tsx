import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Send, ChevronRight, Activity, Cpu } from "lucide-react";
import { Cyberdeck, DataNode, BioPlant, TerminalLog } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface TerminalProps {
  cyberdeck: Cyberdeck;
  setCyberdeck: React.Dispatch<React.SetStateAction<Cyberdeck>>;
  nodes: DataNode[];
  setNodes: React.Dispatch<React.SetStateAction<DataNode[]>>;
  plants: BioPlant[];
  addCredits: (amount: number) => void;
}

export default function Terminal({
  cyberdeck,
  setCyberdeck,
  nodes,
  setNodes,
  plants,
  addCredits
}: TerminalProps) {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: "1", type: "info", text: "SYSTEM DIAGNOSTICS: RAÍZES_DIGITAIS CORE v3.8.5", timestamp: "10:21:40" },
    { id: "2", type: "info", text: "BIO-NEURAL SYNCING: ESTÁVEL [98%]", timestamp: "10:21:41" },
    { id: "3", type: "success", text: "FIREWALL FÚNGICO ATIVO E MONITORANDO TRÁFEGO CORPORATIVO.", timestamp: "10:21:41" },
    { id: "4", type: "warning", text: "Digite 'help' ou 'ajuda' para listar os comandos de acesso à grade.", timestamp: "10:21:42" }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (text: string, type: TerminalLog["type"] = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        type,
        text,
        timestamp: time
      }
    ]);
  };

  const handleCommand = async (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    addLog(`netrunner@raizes_digitais:~# ${trimmed}`, "input");
    setInput("");

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    setIsProcessing(true);

    // Artificial latency for feel
    await new Promise((r) => setTimeout(r, 400));

    switch (command) {
      case "help":
      case "ajuda":
        addLog("=== COMANDOS DISPONÍVEIS NA GRADE RAÍZES DIGITAIS ===", "info");
        addLog("  help / ajuda          - Exibe esta lista de diretrizes.", "info");
        addLog("  info                  - Manifesto da aliança bio-hacker Raízes Digitais.", "info");
        addLog("  scan                  - Escaneia a área local em busca de nós de dados e sinais.", "info");
        addLog("  nodes                 - Exibe a tabela de nós de dados corporativos identificados.", "info");
        addLog("  grafts                - Exibe seus implantes botânicos ativos no deck neural.", "info");
        addLog("  sync [id_planta]      - Sincroniza uma planta adquirida no seu deck neural.", "info");
        addLog("  hack [id_no]          - Tenta decifrar o nó de dados. Implantes de silício aceleram o bypass.", "info");
        addLog("  flora [pergunta]      - Consulta o Oráculo de Flora para obter profecias/respostas via IA.", "info");
        addLog("  clear / limpar        - Purga o buffer de logs deste terminal.", "info");
        break;

      case "info":
        addLog("=== RAÍZES DIGITAIS MANIFESTO ===", "success");
        addLog("Nós somos as Raízes Digitais. Em um mundo onde as corporações controlam a fibra óptica fria,", "info");
        addLog("nós plantamos a semente da rebelião usando bio-tecnologia botânica hibridizada.", "info");
        addLog("A clorofila é a nossa fiação; o DNA vegetal é o nosso armazenamento frio criptografado.", "info");
        addLog("Cultivamos a vida para libertar os dados e hackear a infraestrutura monopolista.", "info");
        break;

      case "scan":
        addLog("Iniciando varredura espectral de clorofila...", "info");
        await new Promise((r) => setTimeout(r, 1000));
        addLog(`>> Varredura Completa. Sinais biológicos identificados: ${plants.length} espécies.`, "success");
        addLog(`>> Redes corporativas criptografadas interceptadas: ${nodes.filter(n => n.status === "Criptografado").length} nós detectados.`, "warning");
        break;

      case "nodes":
        addLog("=== RELATÓRIO DE IMPULSOS DE DADOS CORPORATIVOS ===", "info");
        nodes.forEach((node) => {
          const statusText = node.status === "Ativo" ? "DECRIPTADO" : node.status === "Criptografado" ? "BLOQUEADO" : "OFFLINE";
          addLog(`[ID: ${node.id}] ${node.name} (${node.district}) | Seg: ${node.securityLevel} | Cap: ${node.dataCapacity} | Status: ${statusText} | Progresso: ${node.decryptionProgress}%`, 
            node.status === "Ativo" ? "success" : node.status === "Criptografado" ? "warning" : "error"
          );
        });
        break;

      case "grafts":
        addLog("=== SLOTS DE BIO-IMPLANTES NEURAIS (DECK SYNC) ===", "info");
        if (cyberdeck.grafts.length === 0) {
          addLog("Nenhum implante vegetal ativo no momento. Visite o catálogo e sincronize uma espécie.", "warning");
        } else {
          cyberdeck.grafts.forEach((id) => {
            const plant = plants.find((p) => p.id === id);
            if (plant) {
              addLog(`[CONECTADO] ${plant.name} | +${plant.oxygenProduction}% Oxigênio | Datastream: ${plant.datastreamCapacity}TB | Raridade: ${plant.rarity}`, "success");
            }
          });
          const totalCapacity = cyberdeck.grafts.reduce((acc, id) => acc + (plants.find((p) => p.id === id)?.datastreamCapacity || 0), 0);
          addLog(`Largura de Banda de Clorofila Total: ${totalCapacity} TB/s`, "info");
        }
        break;

      case "sync":
        if (!args) {
          addLog("Erro: Especifique o ID da planta. Exemplo: sync p2", "error");
        } else {
          const plant = plants.find((p) => p.id === args);
          if (!plant) {
            addLog(`Erro: Planta com ID [${args}] não catalogada na base de dados.`, "error");
          } else {
            // Check if user already synced it
            if (cyberdeck.grafts.includes(plant.id)) {
              addLog(`Aviso: ${plant.name} já está fundido à sua sinapse neural.`, "warning");
            } else {
              setCyberdeck((prev) => ({
                ...prev,
                grafts: [...prev.grafts, plant.id],
                syncStability: Math.min(100, prev.syncStability + 5),
                heatLevel: Math.max(0, prev.heatLevel - 8) // moss or plants cool the deck
              }));
              addLog(`[SINCRONIZAÇÃO SUCEDIDA] ${plant.name} hibridizado com seu deck neural com sucesso!`, "success");
              addLog(`>> Efeitos ativados: ${plant.effects.join(", ")}`, "info");
            }
          }
        }
        break;

      case "hack":
        if (!args) {
          addLog("Erro: Especifique o ID do nó de dados. Exemplo: hack n1", "error");
        } else {
          const node = nodes.find((n) => n.id === args);
          if (!node) {
            addLog(`Erro: Nó com ID [${args}] não encontrado no mapa de calor da rede.`, "error");
          } else if (node.status === "Ativo") {
            addLog(`O nó ${node.name} já foi decifrado e seu payload de dados foi integrado.`, "success");
          } else if (node.status === "Inativo") {
            addLog(`O nó ${node.name} está offline no momento. Ative-o primeiro.`, "warning");
          } else {
            addLog(`Conectando eletrodos de seiva ao barramento de dados de ${node.name}...`, "info");
            
            // Calculate hack speed boost based on active grafts
            const totalGraftsBonus = cyberdeck.grafts.length;
            const delayTime = Math.max(200, 800 - totalGraftsBonus * 120);

            addLog("Injetando script bio-mímico de desvio de segurança...", "warning");
            for (let progress = 10; progress <= 100; progress += 15) {
              const currentProg = Math.min(progress, 100);
              await new Promise((r) => setTimeout(r, delayTime));
              addLog(`Decodificando chaves: [${"=".repeat(currentProg / 10)}${" ".repeat(10 - currentProg / 10)}] ${currentProg}%`, "info");
            }

            // Successfully hacked
            setNodes((prev) =>
              prev.map((n) =>
                n.id === node.id
                  ? { ...n, status: "Ativo", decryptionProgress: 100 }
                  : n
              )
            );

            // Update cyberdeck stats
            setCyberdeck((prev) => ({
              ...prev,
              hackedNodesCount: prev.hackedNodesCount + 1,
              heatLevel: Math.min(100, prev.heatLevel + 25) // heating up
            }));

            addCredits(node.reward);
            addLog(`[NÓ DECIFRADO COM SUCESSO] Payload baixado: ${node.dataCapacity}`, "success");
            addLog(`>> Créditos corporativos desviados para a aliança: +${node.reward} CR.`, "success");
          }
        }
        break;

      case "flora":
        if (!args) {
          addLog("O Oráculo de Flora aguarda sua pergunta. Exemplo: flora o que é a clorofila sintética?", "warning");
        } else {
          addLog("Transmitindo onda cerebral via canal de esporos...", "info");
          addLog("Aguardando resposta do Oráculo botânico de IA...", "warning");
          
          try {
            const response = await fetch("/api/oracle", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ question: args })
            });

            if (!response.ok) {
              throw new Error("Sinal corrompido durante a transmissão.");
            }

            const data = await response.json();
            
            // Log response with a stylized typing effect (or complete print)
            addLog("=== RESPOSTA DO ORÁCULO DE FLORA ===", "success");
            
            // Split by lines to print nicely
            const lines = data.response.split("\n");
            lines.forEach((line: string) => {
              if (line.trim()) {
                addLog(line, "info");
              }
            });
          } catch (error: any) {
            addLog(`Erro de Comunicação: ${error.message || "Ruído insolúvel na frequência vegetal."}`, "error");
          }
        }
        break;

      case "clear":
      case "limpar":
        setLogs([]);
        break;

      default:
        addLog(`Comando '${command}' não reconhecido pelo terminal. Digite 'help' para diretrizes de rede.`, "error");
        break;
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input;
      if (cmd) {
        handleCommand(cmd);
      }
    }
  };

  return (
    <div
      id="terminal_panel"
      className="bg-white border border-emerald-800/10 shadow-sm overflow-hidden flex flex-col h-[400px] font-sans text-xs rounded-2xl relative"
    >
      {/* Terminal Header */}
      <div className="bg-[#E8F5E9]/50 px-4 py-3 flex items-center justify-between border-b border-emerald-800/10 text-[#546E7A] select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-[#2E7D32]" />
          <span className="font-semibold text-[10px] tracking-wider text-[#2E7D32] font-sans uppercase">Console de Conexões // Raízes v3.8</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-[#26A69A] animate-pulse" />
            <span className="text-[9px] text-[#2E7D32] font-semibold">REDE ATIVA</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#66BB6A]" />
          </div>
        </div>
      </div>

      {/* Terminal Logs */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 select-text custom-scrollbar bg-white/80">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`leading-relaxed break-words border-l-2 pl-2 ${
                log.type === "input"
                  ? "border-[#26A69A] text-[#26A69A] font-semibold"
                  : log.type === "success"
                  ? "border-[#2E7D32] text-[#2E7D32] font-semibold"
                  : log.type === "warning"
                  ? "border-amber-600 text-amber-600"
                  : log.type === "error"
                  ? "border-red-500 text-red-600"
                  : "border-emerald-800/10 text-[#546E7A]"
              }`}
            >
              <span className="text-[#546E7A]/50 mr-2 text-[10px] font-sans font-normal">[{log.timestamp}]</span>
              {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isProcessing && (
          <div className="flex items-center gap-2 text-amber-600 pl-2 border-l-2 border-amber-500 animate-pulse">
            <Cpu className="w-3 h-3 animate-spin" />
            <span>Processando dados de bioritmo fúngico...</span>
          </div>
        )}
        <div ref={logEndRef} />
      </div>

      {/* Terminal Input Bar */}
      <div className="bg-white p-3 border-t border-emerald-800/10 flex items-center gap-2 shadow-sm">
        <ChevronRight className="w-4 h-4 text-[#2E7D32] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          placeholder="netrunner@raizes_digitais:~# insira comandos como 'scan', 'nodes' ou 'flora o que somos?'"
          className="flex-1 bg-transparent border-none outline-none text-[#263238] placeholder:text-[#546E7A]/40 font-sans text-xs focus:ring-0 focus:border-none"
        />
        <button
          onClick={() => {
            if (input) handleCommand(input);
          }}
          disabled={isProcessing || !input}
          className="text-[#546E7A] hover:text-[#2E7D32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
