import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[WIT System Error]:", error, errorInfo);
  }

  handleReset = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage?.clear();
        window.location.reload();
      }
    } catch (_) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-mono select-none">
          <div className="max-w-md w-full bg-zinc-950 border-2 border-white rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-4 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <div className="bg-white text-black px-3 py-1 rounded-md text-xs font-black tracking-widest uppercase">
              WIT • Assistente Virtual
            </div>
            
            <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
              Recuperação do Sistema
            </h1>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ocorreu uma pequena instabilidade temporária no carregamento dos dados da interface.
            </p>

            {this.state.error && (
              <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-[11px] text-zinc-300 text-left font-mono overflow-x-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white rounded-xl text-xs font-bold uppercase cursor-pointer transition-all"
              >
                Recarregar
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 bg-white hover:bg-zinc-200 border-2 border-white text-black rounded-xl text-xs font-black uppercase cursor-pointer shadow-sm transition-all"
              >
                Resetar Dados
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    </StrictMode>,
  );
}
