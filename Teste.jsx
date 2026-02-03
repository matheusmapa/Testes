import React, { useState } from 'react';
import { Search, BookOpen, AlertCircle, CheckCircle, Loader2, ExternalLink, Key, Eye, EyeOff, Globe } from 'lucide-react';

export default function App() {
  const [question, setQuestion] = useState('');
  const [userApiKey, setUserApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [sources, setSources] = useState([]);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!userApiKey.trim()) {
      setError('Por favor, insira sua Chave de API (API Key) para continuar.');
      return;
    }

    if (!question.trim()) {
      setError('Por favor, cole o texto da questão.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setSources([]);

    try {
      // Prompt ajustado para forçar formatação resumida e escolha inteligente
      const systemPrompt = `Você é um verificador de questões de residência médica.
      Sua missão: Identificar a origem da questão usando a Pesquisa Google.
      
      CRITÉRIOS DE ESCOLHA:
      - Se a questão apareceu em múltiplas provas, escolha a ORIGINAL ou a MAIS RECENTE (priorize a prova principal sobre simulados).

      REGRAS DE FORMATAÇÃO DE NOME (CRÍTICO):
      - Resuma nomes longos para o formato: "UF - Nome Curto / Sigla".
      - Exemplo Ruim: "Secretaria da Saúde do Estado da Bahia (SESAB) - Processo Unificado"
      - Exemplo Bom: "BA - SUS Bahia"
      - Exemplo Bom: "SP - USP São Paulo"
      - Exemplo Bom: "Nacional - ENARE"

      FORMATO FINAL DA RESPOSTA (Entregue APENAS isso):
      [Nome da Instituição Resumido]
      [Ano]

      Não escreva nada além dessas duas linhas.`;

      // Definido fixo para gemini-2.5-pro como solicitado
      const modelName = 'gemini-2.5-pro';

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${userApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `QUESTÃO PARA IDENTIFICAR:\n${question}` }]
            }],
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            tools: [{ google_search: {} }] 
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Falha na comunicação com o modelo ${modelName}. Verifique sua chave.`);
      }

      const data = await response.json();
      
      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;
      
      const groundingMetadata = candidate?.groundingMetadata;
      const foundSources = groundingMetadata?.groundingChunks?.map(chunk => ({
        title: chunk.web?.title || 'Fonte Web',
        uri: chunk.web?.uri
      })).filter(source => source.uri) || [];

      const uniqueSources = Array.from(new Map(foundSources.map(item => [item.uri, item])).values());

      setResult(text);
      setSources(uniqueSources);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocorreu um erro ao tentar identificar a questão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Verificador MED</h1>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                Modelo: Gemini 2.5 Pro <span className="text-slate-300">|</span> 
                <span className="flex items-center gap-1 text-teal-600 font-bold">
                   <Globe className="w-3 h-3" /> Busca Google Ativa
                </span>
              </p>
            </div>
          </div>
          <div className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-medium border border-slate-200">
            Powered by Google AI
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        
        {/* API Key Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <label htmlFor="api-key" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4 text-slate-400" />
            Sua Google API Key
          </label>
          <div className="relative">
            <input
              id="api-key"
              type={showApiKey ? "text" : "password"}
              value={userApiKey}
              onChange={(e) => setUserApiKey(e.target.value)}
              placeholder="Cole sua chave AI Studio aqui (Ex: AIzaSy...)"
              className="w-full pl-4 pr-12 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-mono text-sm"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Usando modelo: <strong>gemini-2.5-pro</strong> com busca na web.
          </p>
        </section>

        {/* Input Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500">
          <label htmlFor="question-input" className="block text-sm font-semibold text-slate-700 mb-2">
            Cole a questão aqui
          </label>
          <textarea
            id="question-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ex: Mulher, 32 anos, comparece à emergência com dor em fossa ilíaca direita..."
            className="w-full h-48 p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none text-base leading-relaxed"
          />
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Busca Google Habilitada
            </p>
            <button
              onClick={handleAnalyze}
              disabled={loading || !question.trim() || !userApiKey.trim()}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all
                ${loading || !question.trim() || !userApiKey.trim()
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg active:scale-95'}
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Pesquisando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Verificar Origem
                </>
              )}
            </button>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-teal-50 px-6 py-3 border-b border-teal-100 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <h2 className="font-semibold text-teal-900">Resultado da Análise</h2>
              </div>
              
              <div className="p-6 text-center">
                {/* Estilo ajustado para destacar as duas linhas */}
                <div className="inline-block text-left">
                  <div className="whitespace-pre-wrap text-2xl font-bold text-slate-800 leading-tight">
                    {result}
                  </div>
                </div>
              </div>
            </div>

            {/* Sources / Grounding */}
            {sources.length > 0 && (
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Fontes Encontradas
                </h3>
                <div className="grid gap-2">
                  {sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-teal-300 hover:shadow-sm transition-all group"
                    >
                      <div className="bg-slate-100 p-2 rounded-md group-hover:bg-teal-50 transition-colors">
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate group-hover:text-teal-700">
                          {source.title}
                        </p>
                        <p className="text-xs text-slate-400 truncate font-mono">
                          {new URL(source.uri).hostname}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
