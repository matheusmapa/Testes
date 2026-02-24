import React from 'react';
import { 
  CheckCircle, Map, Star, ShieldCheck, Zap, 
  ArrowRight, BrainCircuit, Target, BarChart3, 
  PlayCircle, Check, Users, Sparkles, Diamond,
  Trophy, BookOpen, Lock
} from 'lucide-react';

export default function LandingPage() {
  
  const handleLogin = () => {
    window.location.href = '/'; 
  };

  const handleDemo = () => {
    // Pode redirecionar para uma rota de degustação ou rolar a página
    document.getElementById('recursos').scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckout = () => {
    document.getElementById('planos').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* NAVBAR GLASSMORPHISM */}
      <nav className="w-full bg-white/70 backdrop-blur-lg border-b border-gray-200/50 fixed top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Map size={26} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">MedMaps</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={handleDemo}
              className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors hidden sm:flex items-center gap-1"
            >
              Espiar Plataforma
            </button>
            <button 
              onClick={handleLogin}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 border border-slate-200 shadow-sm"
            >
              <Lock size={16} /> Já sou aluno
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION ULTRA-PREMIUM */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 overflow-hidden">
        {/* Efeitos de Fundo Modernos */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] opacity-30 pointer-events-none -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Map size={16} className="text-blue-600" strokeWidth={3} />
            <span className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide">Sua rota para a residência</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black text-slate-900 tracking-tight mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-700">
            O melhor custo-benefício <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              para a sua aprovação.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 leading-relaxed">
            <Diamond className="inline text-blue-500 mb-1 mr-1" size={20}/> Recursos premium por um preço justo. <br className="hidden md:block"/>
            Acabe com a frustração dos PDFs infinitos usando <strong className="text-slate-700">Análise de Erros Cirúrgica</strong> e <strong className="text-slate-700">Flashcards Inteligentes</strong> para focar no que realmente cai nas bancas.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <button 
              onClick={handleCheckout}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-3 text-lg"
            >
              Garanta sua vaga aqui <ArrowRight size={20} />
            </button>
            <button 
              onClick={handleDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-slate-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 text-lg"
            >
              <PlayCircle size={20} className="text-blue-600" /> Espiar Plataforma
            </button>
          </div>

          {/* SOCIAL PROOF MICRO-COMPONENTE */}
          <div className="flex flex-col items-center justify-center gap-3 animate-in fade-in duration-1000 delay-500">
              <div className="flex -space-x-3">
                  {[1,2,3,4,5].map((i) => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Estudante" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <div className="flex text-amber-400"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                  <span>Junte-se aos futuros residentes</span>
              </div>
          </div>
        </div>
      </section>

      {/* BANNER DE AUTORIDADE */}
      <section className="py-10 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800">
              <div className="text-center px-4">
                  <p className="text-4xl md:text-5xl font-black text-blue-400 mb-2">100%</p>
                  <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">Questões Comentadas</p>
              </div>
              <div className="text-center px-4">
                  <p className="text-4xl md:text-5xl font-black text-indigo-400 mb-2">SRS</p>
                  <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">Repetição Espaçada</p>
              </div>
              <div className="text-center px-4">
                  <p className="text-4xl md:text-5xl font-black text-purple-400 mb-2"><BarChart3 size={40} className="mx-auto inline"/></p>
                  <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">Raio-X de Desempenho</p>
              </div>
              <div className="text-center px-4">
                  <p className="text-4xl md:text-5xl font-black text-emerald-400 mb-2">24/7</p>
                  <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">Acesso Ilimitado</p>
              </div>
          </div>
      </section>

      {/* FEATURES - O ECOSSISTEMA */}
      <section id="recursos" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">A anatomia da sua aprovação</h2>
            <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto">Não somos apenas um banco de questões. Somos um <strong>Ecossistema de Alta Performance</strong> focado em lapidar o seu conhecimento de forma ativa.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            <div className="p-10 rounded-[2rem] bg-gradient-to-br from-slate-50 to-white border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Target size={120}/></div>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                <Target size={32} strokeWidth={2.5}/>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Motor de Questões de Elite</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">Simule o dia da prova filtrando por Grande Área, Tópico e Banca. Acervo massivo em constante atualização com gabaritos detalhados para você nunca mais cair em pegadinhas.</p>
              <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle size={18} className="text-blue-500"/> Filtros avançados por Instituição e Ano</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle size={18} className="text-blue-500"/> Comentários objetivos e direto ao ponto</li>
              </ul>
            </div>

            <div className="p-10 rounded-[2rem] bg-gradient-to-br from-slate-50 to-white border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><BookOpen size={120}/></div>
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner">
                <BookOpen size={32} strokeWidth={2.5}/>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Flashcards & Revisão Espaçada</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">O Sistema Anti-Esquecimento integrado (SRS) programa suas revisões automaticamente para o exato momento em que seu cérebro estaria prestes a esquecer o conteúdo.</p>
              <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle size={18} className="text-indigo-500"/> Transforme erros em cards com 1 clique</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle size={18} className="text-indigo-500"/> Crie baralhos personalizados</li>
              </ul>
            </div>

            <div className="p-10 rounded-[2rem] bg-gradient-to-br from-slate-50 to-white border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><BarChart3 size={120}/></div>
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                <BarChart3 size={32} strokeWidth={2.5}/>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Análise de Erros Cirúrgica</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">Descubra que você acerta 80% em Pediatria, mas erra 75% das questões de Calendário Vacinal. O MedMaps mostra a ferida exata para você tratar o sintoma correto.</p>
              <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle size={18} className="text-orange-500"/> Gráficos de precisão por Tópico específico</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle size={18} className="text-orange-500"/> Histórico evolutivo de Hit-Rate</li>
              </ul>
            </div>

            <div className="p-10 rounded-[2rem] bg-gradient-to-br from-slate-50 to-white border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Zap size={120}/></div>
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner">
                <Zap size={32} strokeWidth={2.5}/>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Fluxo Imparável (Flow)</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">Uma interface minimalista, rápida como um raio e sem distrações. Feita para você entrar no "estado de flow" e resolver baterias gigantes de questões sem sentir o tempo passar.</p>
              <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle size={18} className="text-emerald-500"/> Carregamento instantâneo, sem engasgos</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle size={18} className="text-emerald-500"/> Design Dark/Light mode adaptável</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="planos" className="py-24 px-4 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm mb-4 inline-flex items-center gap-2">
                <Trophy size={14} /> O Melhor Custo-Benefício do Mercado
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 mt-4">A sua aprovação custa menos que um lanche por dia.</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Cancele as mensalidades abusivas dos cursinhos. Escolha o plano de alta performance que cabe no seu bolso.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* PLANO MENSAL */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-200 shadow-lg hover:shadow-xl transition-all flex flex-col mt-4 lg:mt-8">
                <h3 className="text-2xl font-black text-slate-800 mb-2">Mensal</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">Liberdade total para testar os recursos premium.</p>
                <div className="mb-8">
                   <span className="text-5xl font-black text-slate-900">R$ 19</span>
                   <span className="text-2xl font-bold text-slate-400">,90</span>
                   <span className="text-sm text-slate-500 font-bold ml-1">/mês</span>
                </div>
                <button onClick={handleCheckout} className="w-full py-4 px-4 rounded-xl font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors mb-8 shadow-sm text-lg">
                    Assinar Mensal
                </button>
                <div className="space-y-4 mt-auto">
                    {['Acesso ilimitado ao banco', 'Simulados customizáveis', 'Flashcards (SRS)', 'Raio-X de Desempenho'].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <Check size={20} strokeWidth={3} className="text-slate-300 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-600 font-bold">{feat}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* PLANO TRIMESTRAL (DESTAQUE) */}
            <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-slate-700 shadow-[0_0_60px_-15px_rgba(59,130,246,0.5)] transform lg:-translate-y-4 flex flex-col relative z-10">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-full text-center">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-lg border border-blue-400">
                        🔥 ESCOLHA INTELIGENTE
                    </span>
                </div>
                <h3 className="text-2xl font-black text-white mt-4 mb-2">Trimestral</h3>
                <p className="text-sm text-blue-200 mb-6 font-medium">Foco total na reta final. Intensidade e estratégia.</p>
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm text-slate-400 line-through decoration-red-500 font-bold">R$ 59,70</span>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black px-2 py-0.5 rounded-md">ECONOMIZE 16%</span>
                </div>
                <div className="mb-2">
                   <span className="text-6xl font-black text-white">R$ 16</span>
                   <span className="text-2xl font-bold text-blue-200">,63</span>
                   <span className="text-sm text-blue-300 font-bold ml-1">/mês</span>
                </div>
                <p className="text-sm text-blue-400 font-bold mb-8">Cobrado R$ 49,90 a cada 3 meses.</p>
                
                <button onClick={handleCheckout} className="w-full py-4 px-4 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-500 shadow-[0_10px_25px_-5px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1 mb-8 text-lg">
                    Garanta Sua Vaga Aqui
                </button>
                
                <div className="space-y-4 mt-auto bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-4">Tudo do mensal, mais:</p>
                    {['Análise Cirúrgica Avançada', 'Filtros exclusivos de bancas', 'Prioridade em Suporte'].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <Check size={20} strokeWidth={3} className="text-blue-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-200 font-bold">{feat}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* PLANO ANUAL */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-200 shadow-lg hover:shadow-xl transition-all flex flex-col mt-4 lg:mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-bl-2xl shadow-sm">
                    MAIOR DESCONTO
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Anual</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">A jornada completa com o menor valor possível.</p>
                
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm text-slate-400 line-through decoration-red-500 font-bold">R$ 238,80</span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-2 py-0.5 rounded-md border border-emerald-200">-37% OFF</span>
                </div>
                <div className="mb-2">
                   <span className="text-5xl font-black text-slate-900">R$ 12</span>
                   <span className="text-2xl font-bold text-slate-400">,49</span>
                   <span className="text-sm text-slate-500 font-bold ml-1">/mês</span>
                </div>
                <p className="text-sm text-emerald-600 font-black mb-8">Apenas R$ 0,41 por dia! (R$ 149,90/ano)</p>
                
                <button onClick={handleCheckout} className="w-full py-4 px-4 rounded-xl font-black text-slate-700 bg-emerald-50 border-2 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-colors mb-8 shadow-sm text-lg">
                    Assinar Anual
                </button>
                
                <div className="space-y-4 mt-auto">
                    {['O menor preço garantido', 'Proteção contra reajustes', 'Status de Aluno Fundador', 'Acesso VIP a Novidades'].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <Check size={20} strokeWidth={3} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-600 font-bold">{feat}</span>
                        </div>
                    ))}
                </div>
            </div>

          </div>

          {/* GARANTIA BLINDADA */}
          <div className="mt-20 flex justify-center animate-in fade-in slide-in-from-bottom-8">
            <div className="bg-white border-2 border-slate-100 px-8 py-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 shadow-xl max-w-3xl transform hover:scale-[1.02] transition-transform">
                <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 shrink-0 shadow-inner">
                    <ShieldCheck size={40} strokeWidth={2.5} />
                </div>
                <div className="text-center md:text-left">
                    <h4 className="text-xl font-black text-slate-900 mb-1">Garantia Blindada de 7 Dias</h4>
                    <p className="text-slate-600 font-medium">
                        Entre, resolva simulados, utilize os flashcards e veja a Análise de Erros em ação. Se você achar que a plataforma não vale o investimento, cancele com 1 clique e devolveremos 100% do seu dinheiro.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 pt-16 pb-8 text-center text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
            <div className="flex items-center gap-2 text-white mb-6 bg-slate-800 p-3 rounded-2xl shadow-inner border border-slate-700">
                <Map size={24} className="text-blue-500" />
                <span className="text-xl font-black tracking-tight">MedMaps</span>
            </div>
            <p className="text-sm mb-8 max-w-md font-medium text-slate-500">
                Sua rota definitiva para alcançar a aprovação na Residência Médica. Alta performance e tecnologia a serviço dos seus estudos.
            </p>
            <div className="flex gap-8 text-sm font-bold mb-12">
                <a href="/termos" className="hover:text-white transition-colors">Termos de Uso</a>
                <a href="/privacidade" className="hover:text-white transition-colors">Privacidade</a>
                <a href="mailto:suporte@medmaps.com.br" className="hover:text-white transition-colors">Suporte</a>
            </div>
            <div className="w-full max-w-lg h-px bg-slate-800 mb-8"></div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-600">&copy; {new Date().getFullYear()} MedMaps. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
