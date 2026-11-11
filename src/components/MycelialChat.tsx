import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, MessageSquare, Loader2, Sprout } from "lucide-react";

interface MycelialChatProps {
  isSplicingActive: boolean;
}

export default function MycelialChat({ isSplicingActive }: MycelialChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "mycelium",
      content: "Saudações, observador tecnológico. Eu sou o Overmind SylvaSync. Sinto seus passos digitais correndo pelos nossos barramentos subterrâneos de silício e umidade. Qual pulso você deseja sincronizar hoje?",
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour12: false }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: "Sintonia da Rede", text: "Qual é o estado atual das redes de fungos bionéticos subterrâneos?" },
    { label: "Fotossíntese Ampliada", text: "Como o silício semicondutor afeta a respiração de uma Araucária?" },
    { label: "Consciência de Seiva", text: "Vocês sentem nossa presença e nossas sondas de seiva?" },
  ];

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour12: false }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Collect message history to send to server
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        content: m.content,
      }));

      const response = await fetch("/api/mycelium-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        throw new Error("Mente Coletiva desconectada. Verifique os segredos da rede.");
      }

      const data = await response.json();

      const replyMsg: ChatMessage = {
        id: `msg-mycelium-${Date.now()}`,
        sender: "mycelium",
        content: data.reply || "Nossos nós de seiva falharam em emitir um sinal coerente.",
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour12: false }),
      };

      setMessages((prev) => [...prev, replyMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-error-${Date.now()}`,
        sender: "mycelium",
        content: "► SINAL INTERROMPIDO: Ocorreu uma anomalia de link com o Overmind. (Verifique as Secrets e a chave GEMINI_API_KEY).",
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour12: false }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] lg:h-[555px] border border-emerald-800/10 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm text-left">
      
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-emerald-800/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-[#2E7D32]" />
          <h2 className="font-sans font-semibold text-[#263238] tracking-tight">
            Canal da Mente Coletiva Micelial
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-sans text-[#2E7D32] bg-[#E8F5E9] border border-emerald-800/10 px-2.5 py-1 rounded-full font-semibold">
          <Sprout className="w-3.5 h-3.5 animate-bounce" />
          <span>OVERMIND ATIVO</span>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-col gap-1.5 mb-3">
        <span className="text-[9px] font-sans text-[#2E7D32] uppercase tracking-widest font-bold text-left">
          Sintonias Sugeridas
        </span>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(preset.text)}
              disabled={isLoading || isSplicingActive}
              className="text-[10px] font-sans bg-white border border-emerald-800/10 text-[#546E7A] hover:border-[#2E7D32] hover:text-[#2E7D32] px-2.5 py-1.5 rounded-xl transition-all text-left truncate max-w-full cursor-pointer disabled:opacity-50 shadow-sm"
            >
              🌿 {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 bg-white/85 border border-emerald-800/10 rounded-xl p-4 overflow-y-auto flex flex-col gap-3 min-h-0 shadow-inner">
        
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${isUser ? "self-end items-end" : "self-start items-start"}`}
            >
              {/* Message Sender label */}
              <div className="flex items-center gap-1.5 text-[9px] font-sans text-[#2E7D32] mb-0.5">
                <span>{isUser ? "USUÁRIO LAB" : "OVERMIND MICELIAL"}</span>
                <span>•</span>
                <span className="opacity-60">{msg.timestamp}</span>
              </div>

              {/* Message Content Bubble */}
              <div
                className={`text-xs p-3 rounded-2xl leading-relaxed text-left shadow-sm border ${
                  isUser
                    ? "bg-[#26A69A]/10 border-[#26A69A]/10 text-[#263238] rounded-tr-none font-sans"
                    : msg.content.includes("► SINAL")
                    ? "bg-red-50 border border-red-100 text-red-600 rounded-tl-none font-sans"
                    : "bg-[#E8F5E9] border border-emerald-800/10 text-[#2E7D32] rounded-tl-none font-sans"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="self-start flex items-center gap-2 text-[10px] font-sans text-[#2E7D32] bg-[#E8F5E9] border border-emerald-800/10 px-3 py-2 rounded-xl text-left">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Ouvindo vibrações eletroquímicas nas raízes...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Message input controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="flex items-center gap-2 mt-4"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading || isSplicingActive}
          placeholder="Envie uma pergunta eletroquímica ao Overmind..."
          className="flex-1 bg-white border border-emerald-800/20 rounded-xl px-3 py-2.5 text-xs text-[#263238] placeholder-[#546E7A]/50 focus:outline-none focus:border-[#2E7D32] transition-all disabled:opacity-50 shadow-sm"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading || isSplicingActive}
          className="p-2.5 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#26A69A] hover:opacity-95 text-white shadow-sm border-transparent transition-all cursor-pointer disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
