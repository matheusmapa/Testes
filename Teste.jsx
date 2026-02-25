import React, { useState } from 'react';
import { 
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  Brain,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Gift,
  Globe,
  Layout,
  MessageCircle,
  MonitorPlay,
  Plane,
  Play,
  Shield,
  Sparkles,
  Star,
  Users
} from 'lucide-react';

// ==========================================
// 1. Hero Section (A Primeira Dobra)
// ==========================================
const HeroSection = () => {
  return (
    <section className="bg-slate-900 text-white py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500 blur-[120px]"></div>
        <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-600 blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-8 inline-flex items-center justify-center bg-white/10 border border-white/20 px-6 py-2 rounded-full backdrop-blur-sm">
          <Brain className="w-5 h-5 text-blue-400 mr-2" />
          <span className="font-bold tracking-wider text-sm">ITR | Inglês em Tempo Recorde</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Inglês em tempo recorde <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Aprimore seu Inglês de uma vez por todas
          </span>
        </h1>

        <p className="text-lg md:text-2xl mb-10 text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Vou te mostrar o segredo para melhorar seu inglês e atingir a fluência de uma vez por todas. Nova metodologia, direto ao ponto, envolvendo técnicas de memorização que funcionam de verdade.
        </p>

        <button className="group bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold text-lg md:text-2xl py-5 px-8 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] transform transition-all duration-300 hover:scale-105 w-full md:w-auto flex items-center justify-center mx-auto">
          SIM, EU QUERO APRIMORAR MEU INGLÊS
          <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
};

// ==========================================
// 2. Seção de Benefícios
// ==========================================
const BenefitsSection = () => {
  const benefits = [
    { text: "Aprenda a pensar em inglês sem traduzir", icon: <Brain className="w-6 h-6 text-emerald-500" /> },
    { text: "Domine a conversação e escuta com confiança e naturalidade", icon: <MessageCircle className="w-6 h-6 text-emerald-500" /> },
    { text: "Memorize centenas de palavras em tempo recorde", icon: <Clock className="w-6 h-6 text-emerald-500" /> },
    { text: "Use um método testado e validado por alunos reais", icon: <CheckCircle className="w-6 h-6 text-emerald-500" /> },
    { text: "Aprenda no seu ritmo, sem complicações", icon: <Shield className="w-6 h-6 text-emerald-500" /> },
    { text: "Em uma semana você perceberá uma evolução inimaginável", icon: <Award className="w-6 h-6 text-emerald-500" /> }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-slate-800">
          O que você vai <span className="text-emerald-500">conquistar</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                {benefit.icon}
              </div>
              <p className="text-lg font-medium text-slate-700">
                {benefit.text.split(/(pensar em inglês sem traduzir|confiança e naturalidade|centenas de palavras em tempo recorde|método testado e validado por alunos reais|sem complicações)/).map((part, i) => 
                  ['pensar em inglês sem traduzir', 'confiança e naturalidade', 'centenas de palavras em tempo recorde', 'método testado e validado por alunos reais', 'sem complicações'].includes(part) ? 
                  <span key={i} className="text-emerald-600 font-bold">{part}</span> : part
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. Seção de Público-Alvo
// ==========================================
const TargetAudienceSection = () => {
  const targets = [
    "SE VOCÊ JÁ FEZ CURSO DE INGLÊS E DESISTIU",
    "SE VOCÊ ESTÁ FAZENDO INGLÊS E QUER ACELERAR SEUS RESULTADOS",
    "SE VOCÊ JÁ TERMINOU UM CURSO, MAS PERCEBE QUE TEM ALGUMAS LIMITAÇÕES",
    "SE VOCÊ NÃO APRENDEU INGLÊS ATÉ HOJE POR CONTA DE MÉTODOS EQUIVOCADOS",
    "SE VOCÊ QUER ATINGIR A FLUÊNCIA EM TEMPO RECORDE"
  ];

  return (
    <section className="py-20 px-4 bg-slate-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-slate-800">
          Esse curso é <span className="text-blue-500">para você</span>
        </h2>
        
        <div className="space-y-4 mb-12">
          {targets.map((target, index) => (
            <div key={index} className="flex items-center bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500 transform transition-transform hover:-translate-y-1">
              <CheckCircle className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0" />
              <p className="font-bold text-slate-700 text-sm md:text-base">{target}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="group bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold text-lg md:text-2xl py-5 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] transform transition-all duration-300 hover:scale-105 w-full md:w-auto inline-flex items-center justify-center">
            SIM, EU QUERO APRIMORAR MEU INGLÊS
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 4. Seção de Prova Social e Autoridade
// ==========================================
const SocialProofSection = () => {
  const quotes = [
    {
      name: "Bill Gates",
      role: "Fundador da Microsoft",
      quote: "Em um mundo que está cada vez mais conectado, quem domina o inglês sai na frente."
    },
    {
      name: "Warren Buffett",
      role: "O mais bem sucedido investidor do século XX",
      quote: "O melhor investimento que você pode fazer é em si mesmo. Quanto mais você aprende, mais você ganha."
    },
    {
      name: "Gustavo Kuerten (Guga)",
      role: "Maior tenista da história do Brasil",
      quote: "O inglês abriu portas na minha carreira internacional. Se eu não falasse, ia perder metade das oportunidades."
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Seção de Prints do WhatsApp */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-slate-800">
            Resultados de <span className="text-emerald-500">Alunos Reais</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Criando 8 espaços para os prints que você vai adicionar as imagens depois */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-slate-100 rounded-xl aspect-[9/16] flex flex-col items-center justify-center border border-slate-200 shadow-sm relative overflow-hidden group">
                <MessageCircle className="w-10 h-10 text-emerald-400 mb-2 opacity-50" />
                <span className="text-slate-400 font-medium text-sm">Print WhatsApp {item}</span>
                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Autoridades */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-slate-800">
            O que dizem os <span className="text-blue-500">Gigantes</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {quotes.map((item, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm relative transform transition-transform hover:-translate-y-2 hover:shadow-md">
                <Star className="w-8 h-8 text-yellow-400 absolute -top-4 -left-4 bg-white rounded-full p-1 shadow-sm" fill="currentColor" />
                <p className="text-slate-600 italic mb-6 relative z-10 leading-relaxed">
                  "{item.quote}"
                </p>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{item.name}</h4>
                  <p className="text-sm text-emerald-600 font-medium">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// 5. Seção de Composição do Produto
// ==========================================
const CourseCompositionSection = () => {
  const features = [
    { text: "Módulos direcionados para o seu nível de inglês atual", icon: <Layout className="w-6 h-6 text-blue-500" /> },
    { text: "Acesso imediato ao curso completo", icon: <Play className="w-6 h-6 text-blue-500" /> },
    { text: "Aulas curtas e práticas com direcionamento completo", icon: <Clock className="w-6 h-6 text-blue-500" /> },
    { text: "Material de apoio", icon: <BookOpen className="w-6 h-6 text-blue-500" /> },
    { text: "Suporte direto com o criador do método", icon: <Users className="w-6 h-6 text-blue-500" /> },
    { text: "Diversos Bônus", icon: <Gift className="w-6 h-6 text-blue-500" /> }
  ];

  return (
    <section className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
      {/* Efeitos de luz no fundo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Como o <span className="text-blue-400">ITR</span> é formado?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors group">
              <div className="bg-slate-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-slate-700 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <p className="text-lg font-medium text-slate-200 leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6. Seção da Estrutura dos Módulos
// ==========================================
const ModulesSection = () => {
  const modules = [
    { num: "0", title: "Comece por aqui", desc: "Apresentação detalhada de como funcionará o curso e a metodologia." },
    { num: "1", title: "A Base do Método", desc: "Todo o conhecimento e técnicas necessárias para iniciar o seu aprendizado da forma correta." },
    { num: "2", title: "Inglês Zero e Básico", desc: "Direcionamento específico para quem está começando do zero ou tem apenas a base." },
    { num: "3", title: "Inglês Intermediário", desc: "Direcionamento focado para quem já entende algo, mas trava na hora de evoluir." },
    { num: "4", title: "Inglês Avançado", desc: "Direcionamento para nível avançado com foco em destravar dificuldades específicas." },
    { num: "5", title: "O Próximo Nível", desc: "Mensagem final com um kit exclusivo de dicas práticas para aplicar no dia a dia." }
  ];

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm mb-2 block">Estrutura Completa</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
            Conheça os <span className="text-emerald-500">Módulos</span>
          </h2>
        </div>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {modules.map((mod, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Ícone central da timeline */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-bold text-sm">{mod.num}</span>
              </div>
              
              {/* Card do Módulo */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Módulo {mod.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{mod.title}</h3>
                <p className="text-slate-600 leading-relaxed">{mod.desc}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 7. Seção de Bônus e Visão de Futuro
// ==========================================
const BonusSection = () => {
  const bonuses = [
    { 
      title: "Módulo 6: Expansão", 
      desc: "Técnicas de memorização testadas para você aplicar em outras áreas da sua vida (estudos, trabalho, etc).", 
      icon: <Brain className="w-8 h-8 text-yellow-600" /> 
    },
    { 
      title: "IA Personalizada", 
      desc: "Acesso exclusivo a uma Inteligência Artificial treinada e personalizada para te ajudar a praticar o inglês 24/7.", 
      icon: <Bot className="w-8 h-8 text-yellow-600" /> 
    },
    { 
      title: "Comunidade VIP", 
      desc: "Acesso ao grupo fechado no WhatsApp para trocar experiências, tirar dúvidas e receber conteúdos exclusivos.", 
      icon: <Users className="w-8 h-8 text-yellow-600" /> 
    }
  ];

  return (
    <section className="py-24 px-4 bg-emerald-900 text-white relative overflow-hidden">
      {/* Elementos de fundo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-yellow-500/20 text-yellow-400 font-bold px-4 py-1.5 rounded-full mb-4 border border-yellow-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            PRESENTES EXCLUSIVOS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            Garantindo sua vaga hoje, <br className="hidden md:block" />
            você <span className="text-yellow-400">leva de bônus:</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {bonuses.map((bonus, index) => (
            <div key={index} className="bg-emerald-800/50 backdrop-blur-md border border-emerald-700 p-8 rounded-2xl transform transition-transform hover:-translate-y-2 hover:bg-emerald-800">
              <div className="bg-yellow-400/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-yellow-400/30">
                {bonus.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">{bonus.title}</h3>
              <p className="text-emerald-100 leading-relaxed">{bonus.desc}</p>
            </div>
          ))}
        </div>

        {/* Visão de Futuro (Aspiracional) */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 p-8 md:p-12 rounded-3xl border border-emerald-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10">
            <Globe className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Feche os olhos e imagine...
            </h3>
            <p className="text-lg md:text-xl text-emerald-100 leading-relaxed font-light italic mb-8">
              "Você fazendo a viagem dos sonhos conversando de forma fluente, podendo assistir conteúdos em inglês, filmes, séries e vídeos sem legenda, fazendo buscas na internet e dominando o mundo ao seu redor. Tudo isso por conta de uma nova metodologia que você decidiu aprender hoje."
            </p>
            <div className="flex gap-4 text-emerald-400">
              <Plane className="w-6 h-6" />
              <MonitorPlay className="w-6 h-6" />
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 8. Seção de Oferta e Preço
// ==========================================
const OfferSection = () => {
  return (
    <section className="py-24 px-4 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t-8 border-emerald-500 overflow-hidden">
          <div className="p-8 md:p-16 text-center">
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
              A hora de agir é <span className="text-emerald-500">agora</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Tenha acesso imediato a todo o método ITR, todos os módulos e todos os bônus exclusivos.
            </p>

            <div className="flex flex-col items-center justify-center mb-10">
              <p className="text-slate-400 font-medium text-lg line-through decoration-red-400 decoration-2 mb-2">
                De R$ 399,00
              </p>
              <div className="flex items-start justify-center gap-2">
                <span className="text-2xl font-bold text-slate-800 mt-2">por apenas</span>
                <span className="text-6xl md:text-8xl font-black text-emerald-500 tracking-tighter">
                  R$ 200
                </span>
              </div>
              <p className="text-slate-500 font-medium mt-4 bg-slate-100 px-4 py-1 rounded-full">
                Pagamento único e acesso vitalício
              </p>
            </div>

            <button className="group bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold text-xl md:text-3xl py-6 px-10 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] transform transition-all duration-300 hover:scale-105 w-full md:w-auto flex items-center justify-center mx-auto mb-6">
              SIM, EU QUERO APRIMORAR MEU INGLÊS
              <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-4 text-slate-500 text-sm font-medium">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-emerald-500" /> Compra Segura</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4 text-emerald-500" /> Garantia de 7 dias</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 9. Seção de FAQ (Dúvidas Frequentes)
// ==========================================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Minha rotina é corrida e não tenho tempo para me dedicar",
      a: "O acesso é vitalício e o conhecimento que passarei pode ser adaptado para diferentes rotinas."
    },
    {
      q: "Tenho zero conhecimento em inglês, esse curso serve para mim?",
      a: "Sim, ele vai te ajudar muito nessa jornada. Esse curso foi projetado para pessoas que já têm certo nível de contato, mas todas as técnicas de memorização e aprendizado são aplicadas para quem está iniciando, fazendo com que você aprenda em tempo recorde."
    },
    {
      q: "Tem certificado aprovado pelo MEC?",
      a: "Seu certificado será o seu resultado assustador que você terá em pouco tempo dominando a língua."
    },
    {
      q: "Quando vou receber o acesso ao meu curso?",
      a: "Logo após o pagamento você será redirecionado e receberá seu acesso imediato por e-mail."
    },
    {
      q: "A compra é segura?",
      a: "Sim, o pagamento é feito de forma 100% segura, com todas as suas informações protegidas."
    },
    {
      q: "Não tenho dinheiro, o que eu faço?",
      a: "Imagina que esse curso vai acelerar seu aprendizado em um nível absurdo, você vai economizar e muito em meses ou anos de aulas de inglês tradicionais. Lembre-se: TEMPO não tem preço."
    },
    {
      q: "E se eu não tiver resultado com o método?",
      a: "Eu garanto que você terá resultado. Mas se você for a primeira pessoa a não ter, eu quero sentar com você e conversar sobre tudo que aconteceu, porque meu objetivo é que todos tenham sucesso, sem ninguém ficar para trás."
    },
    {
      q: "Caso eu mude de ideia, posso realizar estorno?",
      a: "Sim! Você tem 7 dias para alinhar seus pensamentos e iniciar nesse novo mundo. Caso isso não aconteça, iremos reembolsar o valor integral do seu investimento."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-slate-800">
          Perguntas <span className="text-emerald-500">Frequentes</span>
        </h2>
        
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-emerald-500 shadow-md bg-emerald-50/30' : 'border-slate-200 bg-white hover:border-emerald-300'}`}
            >
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-bold pr-4 ${openIndex === index ? 'text-emerald-700' : 'text-slate-700'}`}>
                  {faq.q}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="group bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold text-lg md:text-2xl py-5 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] transform transition-all duration-300 hover:scale-105 w-full md:w-auto inline-flex items-center justify-center">
            SIM, EU QUERO APRIMORAR MEU INGLÊS
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 10. Seção do Mentor e Footer
// ==========================================
const MentorAndFooterSection = () => {
  return (
    <>
      <section className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
        {/* Fundo decorativo */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 skew-x-12 translate-x-20 opacity-50 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Espaço para a foto do Mentor */}
          <div className="w-full md:w-5/12">
            <div className="aspect-[4/5] bg-slate-700 rounded-3xl overflow-hidden relative shadow-2xl border-4 border-slate-800">
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 flex-col">
                <Users className="w-16 h-16 mb-4 opacity-50" />
                <span className="font-medium">Sua Foto Aqui</span>
              </div>
              {/* Quando tiver a foto, use a tag img abaixo */}
              {/* <img src="caminho-da-foto.jpg" alt="Ronaldo Durães" className="w-full h-full object-cover" /> */}
            </div>
            
            <div className="mt-8 text-center md:text-left">
              <h3 className="text-3xl font-extrabold text-white mb-2">Ronaldo Durães</h3>
              <p className="text-emerald-400 font-medium">Criador do Método ITR</p>
            </div>
          </div>

          {/* Texto da História */}
          <div className="w-full md:w-7/12 space-y-6 text-slate-300 leading-relaxed text-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Conheça o mentor que estará com você
            </h2>
            
            <p>
              Durante anos, tentei aprender inglês da forma tradicional: passei por quatro escolas, fiz aulas, exercícios, mas a sensação era sempre a mesma — era chato, difícil e parecia que eu não saía do lugar. Tudo mudou quando meu pai sugeriu que eu fizesse um curso de memorização. Foi aí que virei a chave.
            </p>
            
            <p className="font-bold text-emerald-400 text-xl border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-500/10 rounded-r-lg">
              Descobri que o problema nunca foi comigo — e sim com o método.
            </p>
            
            <p>
              A partir desse momento, mergulhei no universo da memorização e criei um plano passo a passo para aprimorar meu inglês de forma leve, natural e eficiente. Desenvolvi técnicas que me ajudaram a absorver centenas de palavras em tempo recorde — e mais importante: a manter tudo isso na minha memória de longo prazo.
            </p>
            
            <p>
              Compartilhei esse método com amigos e familiares, e os resultados foram incríveis! Todos relataram melhorias não só no inglês, mas também nos estudos, no trabalho e na vida pessoal. Hoje, eu transformei essa experiência em um curso prático e direto ao ponto.
            </p>

            <p className="font-medium text-white italic">
              É a metodologia que eu gostaria de ter conhecido anos atrás. Se você já tentou de tudo e ainda sente que o inglês é uma barreira, me deixa te mostrar um caminho diferente. Você não vai se arrepender.
            </p>

            <div className="pt-8 mt-8 border-t border-slate-700">
              <h4 className="text-2xl font-bold text-white mb-6 text-center md:text-left">
                Quantas oportunidades você já deixou passar? <span className="text-emerald-500">Faz essa ser diferente.</span>
              </h4>
              
              <button className="group bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold text-lg py-5 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] transform transition-all duration-300 hover:scale-105 w-full flex items-center justify-center">
                SIM, EU QUERO APRIMORAR MEU INGLÊS
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 px-4 text-center border-t border-slate-900">
        <p className="text-slate-500 font-medium">
          © {new Date().getFullYear()} Ronaldo Durães | Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL (Obrigatório no final do arquivo)
// ==========================================
export default function LandingPageITR() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <HeroSection />
      <BenefitsSection />
      <TargetAudienceSection />
      <SocialProofSection />
      <CourseCompositionSection />
      <ModulesSection />
      <BonusSection />
      <OfferSection />
      <FAQSection />
      <MentorAndFooterSection />
    </div>
  );
}
