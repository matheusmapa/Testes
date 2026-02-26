import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  Play, Sparkles, ArrowRight, BrainCircuit, Target, 
  BarChart3, Clock, CheckCircle2, Zap, TrendingUp, TrendingDown, ChevronRight, Star,
  Check, Trophy, ShieldCheck, Map, CheckCircle, ArrowLeft, XCircle,
  LayoutGrid, Eye, PauseCircle, Calculator, PenTool, RotateCcw,
  Activity, BookOpen, PieChart, Scissors, Stethoscope, HeartPulse, Baby, Shield, PlayCircle, X, Calendar,
  BarChart2, HelpCircle, Menu, Layers, CheckSquare, Copy, ChevronDown, AlertTriangle, PlusCircle, MousePointer2,
  Heart, Flag, ChevronLeft
} from 'lucide-react';

/* =========================================
   1. SEÇÃO HERO (MOUSE GLOBAL E NOVO TEXTO)
   ========================================= */
const HeroMedMaps = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useTransform(x, [-0.5, 0.5], [15, -15]);
  const mouseYSpring = useTransform(y, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    x.set((mouseX / window.innerWidth) - 0.5);
    y.set((mouseY / window.innerHeight) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToPlanos = () => document.getElementById('planos').scrollIntoView({ behavior: 'smooth' });

  const getDiscrete = (keyPoints, mapper) => {
    const times = []; const values = [];
    keyPoints.forEach(([time, val], i) => {
      if (i > 0) { times.push(Number(((time - 0.001) / 32).toFixed(4))); values.push(mapper(keyPoints[i-1][1])); }
      times.push(Number((time / 32).toFixed(4))); values.push(mapper(val));
    });
    times.push(1); values.push(mapper(keyPoints[keyPoints.length-1][1]));
    return { times, values };
  };

  const getTrans = (timesArray, easeType = "linear") => ({ duration: 32, repeat: Infinity, times: timesArray, ease: easeType });

  const mT = [0, 1.0, 1.1, 1.2, 2.5, 2.6, 2.7, 4.0, 4.1, 4.2, 8.0, 9.0, 9.1, 9.2, 10.0, 10.1, 10.2, 10.6, 10.7, 11.5, 11.6, 11.7, 12.5, 12.6, 12.7, 13.5, 13.6, 13.7, 16.0, 17.0, 17.1, 17.2, 18.5, 18.6, 18.7, 20.0, 20.1, 20.2, 24.0, 25.0, 25.1, 25.2, 26.5, 26.6, 26.7, 28.0, 28.1, 28.2, 32].map(t => Number((t/32).toFixed(4)));
  
  // X ajustado para 35 (bem em cima da bolinha)
  const mX = [150, 35,  35,  35, 150, 150, 150, 260, 260, 260, 150, 35,  35,  35,  150,  150,  150,  150,  150,  35,   35,   35,  150,  150,  150,  260,  260,  260,  150,  35,   35,   35,  150,  150,  150,  260,  260,  260,  150,  35,   35,   35,  150,  150,  150,  260,  260,  260, 150];
  
  // Y ajustado (+55px) para descer mais e compensar perfeitamente a barra nova
  const mY = [400, 215, 215, 215, 545, 545, 545, 545, 545, 545, 400, 305, 305, 305, 545,  545,  545,  545,  545,  260,  260,  260,  545,  545,  545,  545,  545,  545,  400,  350,  350,  350,  545,  545,  545,  545,  545,  545,  400,  260,  260,  260,  545,  545,  545,  545,  545,  545, 400];
  const mS = [1,   1,   0.8, 1,   1,   0.8, 1,   1,   0.8, 1,   1,   1,   0.8, 1,   1,    0.8,  1,    0.8,  1,    1,    0.8,  1,    1,    0.8,  1,    1,    0.8,  1,    1,    1,    0.8,  1,    1,    0.8,  1,    1,    0.8,  1,    1,    1,    0.8,  1,    1,    0.8,  1,    1,    0.8,  1,   1];

  const bgMap = {0: "#ffffff", 1: "#eff6ff", 2: "#ecfdf5", 3: "#fef2f2"};
  const boMap = {0: "#f3f4f6", 1: "#2563eb", 2: "#10b981", 3: "#ef4444"};
  const iWMap = {0: "2px", 1: "6px", 2: "0px", 3: "0px"};
  const iBMap = {0: "#d1d5db", 1: "#2563eb", 2: "#10b981", 3: "#ef4444"};
  
  const q1a = getDiscrete([[0,0], [1.1,1], [2.6,2], [5.1,0]], s => s);
  const q2c = getDiscrete([[0,0], [9.1,1], [10.1,3], [10.6,0]], s => s);
  const q2b = getDiscrete([[0,0], [11.6,1], [12.6,2], [13.7,0]], s => s);
  const q3d = getDiscrete([[0,0], [17.1,1], [18.6,2], [20.2,0]], s => s);
  const q4b = getDiscrete([[0,0], [25.1,1], [26.6,2], [28.2,0]], s => s);

  const scr1 = getDiscrete([[0,1], [5.1,0], [28.2,1]], s => s);
  const scr2 = getDiscrete([[0,0], [5.1,1], [13.7,0]], s => s);
  const scr3 = getDiscrete([[0,0], [13.7,1], [20.2,0]], s => s);
  const scr4 = getDiscrete([[0,0], [20.2,1], [28.2,0]], s => s);
  const prog = getDiscrete([[0,"25%"], [5.1,"50%"], [13.7,"75%"], [20.2,"100%"], [28.2,"25%"]], s => s);

  const resp = getDiscrete([[0,0], [1.1,1], [2.6,2], [5.1,0], [9.1,1], [10.1,3], [10.6,0], [11.6,1], [12.6,2], [13.7,0], [17.1,1], [18.6,2], [20.2,0], [25.1,1], [26.6,2], [28.2,0]], s => s);
  const rBgMap = {0: "#f3f4f6", 1: "#2563eb", 2: "#10b981", 3: "#ef4444"};
  const rColMap= {0: "#9ca3af", 1: "#ffffff", 2: "#ffffff", 3: "#ffffff"};
  const rBoMap = {0: "#e5e7eb", 1: "#2563eb", 2: "#10b981", 3: "#ef4444"};
  const rSclT = [0, 2.5, 2.6, 2.7, 10.0, 10.1, 10.2, 10.5, 10.6, 10.7, 12.5, 12.6, 12.7, 18.5, 18.6, 18.7, 26.5, 26.6, 26.7, 32].map(t => Number((t/32).toFixed(4)));
  const rSclV = [1, 1,   0.95,1,   1,    0.95,1,    1,    0.95,1,    1,    0.95,1,    1,    0.95,1,    1,    0.95,1,    1];

  const nT = [0, 4.0, 4.1, 4.2, 13.5, 13.6, 13.7, 20.0, 20.1, 20.2, 28.0, 28.1, 28.2, 32].map(t => Number((t/32).toFixed(4)));
  const nScl=[1, 1,   0.85,1,   1,    0.85,1,    1,    0.85,1,    1,    0.85,1,    1];

  return (
    <section 
      className="relative min-h-screen w-full bg-[#0a0a0f] text-slate-200 overflow-hidden flex items-center justify-center pt-20 pb-16"
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="flex flex-col items-start text-left max-w-2xl pointer-events-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-cyan-500/30">
                <Map size={28} strokeWidth={2.5} />
              </div>
              <span className="text-3xl tracking-tighter text-white" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900 }}>MedMapa</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }} 
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15]"
            >
              O atalho definitivo <br />
              para a sua <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                vaga na <br className="hidden sm:block" /> Residência.
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} className="text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
              Chega de perder tempo com resumos infinitos. Estude de forma ativa com questões direcionadas, flashcards inteligentes e métricas de desempenho que mostram exatamente onde você precisa melhorar.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button onClick={scrollToPlanos} className="group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:-translate-y-1">
                <span className="relative z-10 flex items-center gap-2">Ver Planos <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
              </button>
              <button onClick={() => window.location.href = '/index.html'} className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-1">
                <div className="p-1.5 bg-slate-200/10 rounded-full flex items-center justify-center"><Play size={16} className="text-cyan-400 fill-cyan-400 ml-0.5" /></div> Ver como funciona
              </button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }} className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center [perspective:1000px] pointer-events-none">
            
            <motion.div style={{ rotateX: mouseYSpring, rotateY: mouseXSpring, transformStyle: "preserve-3d" }} className="relative w-[300px] h-[600px] rounded-[3rem] border-[8px] border-slate-800 bg-gray-50 shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
              
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50"><div className="w-20 h-5 bg-slate-800 rounded-b-2xl"></div></div>

              {/* CURSOR DO MOUSE */}
              <motion.div
                 className="absolute inset-0 z-[100] drop-shadow-xl pointer-events-none"
                 animate={{ x: mX, y: mY, scale: mS }} transition={getTrans(mT, "easeInOut")}
                 style={{ transformOrigin: 'top left' }}
              >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.2" style={{ transform: 'translate(-4px, -2px)' }}>
                   <path d="M4 2.5l14 11-6 1.5 3 6-3 1.5-3-6-4.5 4.5z" strokeLinejoin="round" />
                 </svg>
              </motion.div>

              {/* INTERFACE REALISTA DO APP (QuestionView) */}
              <div className="relative z-10 w-full h-full flex flex-col bg-gray-50 text-slate-800 mt-6 overflow-hidden rounded-b-[2.5rem]" style={{ transform: "translateZ(30px)" }}>
                 
                 {/* HEADER MOBILE REPLICADO */}
                 <div className="flex justify-between items-center px-4 py-2.5 bg-white border-b border-gray-200 z-30 relative shadow-sm shrink-0">
                     <h1 className="text-[14px] font-bold text-blue-700 flex items-center gap-1.5"><Map size={16} strokeWidth={2.5} />MedMapa</h1>
                     <Menu size={18} className="text-gray-500" />
                 </div>

                 {/* Topbar Replicada */}
                 <div className="flex flex-col border-b border-gray-200 bg-gray-50 pb-2 relative z-20 shrink-0">
                     <div className="flex items-center justify-between px-3 pt-2 pb-1 gap-1 border-b border-gray-100">
                         <div className="flex-1 flex justify-center py-1 bg-white border border-gray-200 rounded text-slate-500 shadow-sm"><LayoutGrid size={12}/></div>
                         <div className="flex-1 flex justify-center py-1 bg-white border border-gray-200 rounded text-slate-500 shadow-sm"><Eye size={12}/></div>
                         <div className="flex-1 flex justify-center py-1 bg-white border border-gray-200 rounded text-slate-500 shadow-sm"><PauseCircle size={12}/></div>
                         <div className="flex-1 flex justify-center py-1 bg-red-50 border border-red-200 rounded text-red-400 shadow-sm"><CheckCircle size={12}/></div>
                     </div>
                     <div className="flex items-center gap-2 px-4 pt-2">
                         <div className="relative w-10 h-5 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center text-[9px] font-bold text-slate-700">
                             <motion.span className="absolute" animate={{ opacity: scr1.values }} transition={getTrans(scr1.times)}>1 / 4</motion.span>
                             <motion.span className="absolute" animate={{ opacity: scr2.values }} transition={getTrans(scr2.times)}>2 / 4</motion.span>
                             <motion.span className="absolute" animate={{ opacity: scr3.values }} transition={getTrans(scr3.times)}>3 / 4</motion.span>
                             <motion.span className="absolute" animate={{ opacity: scr4.values }} transition={getTrans(scr4.times)}>4 / 4</motion.span>
                         </div>
                         <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                             <motion.div className="h-full bg-blue-600 rounded-full" animate={{ width: prog.values }} transition={getTrans(prog.times)} />
                         </div>
                     </div>
                 </div>

                 {/* TOOLBAR LATERAL (Calculadora / Caneta) */}
                 <div className="absolute right-0 top-[40%] flex flex-col gap-1 z-30 pointer-events-none">
                     <div className="w-8 h-10 bg-white border border-r-0 border-gray-200 rounded-l-xl shadow flex items-center justify-center text-slate-400"><Calculator size={14}/></div>
                     <div className="w-8 h-10 bg-white border border-r-0 border-gray-200 rounded-l-xl shadow flex items-center justify-center text-slate-400"><PenTool size={14}/></div>
                 </div>

                 <div className="relative flex-1 w-full bg-white overflow-hidden">
                     
                     {/* PERGUNTA 1 (Custo-Benefício) */}
                     <motion.div className="absolute inset-0 px-3 py-2 flex flex-col" animate={{ opacity: scr1.values }} transition={getTrans(scr1.times)}>
                         <div className="flex gap-1.5 border-b border-gray-100 pb-1.5"><span className="bg-blue-50 text-blue-700 text-[8px] font-bold px-1 py-0.5 rounded border border-blue-100">MEDMAPA</span><span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-1 py-0.5 rounded border border-gray-200">2026</span><span className="bg-purple-50 text-purple-700 text-[8px] font-bold px-1 py-0.5 rounded border border-purple-100">CUSTO-BENEFÍCIO</span></div>
                         <p className="font-bold text-slate-800 text-[11px] mt-1.5 leading-snug">Qual o banco de questões mais completo e barato do mercado?</p>
                         <div className="mt-2 space-y-1.5">
                            <motion.div className="w-full p-2 rounded-lg border-2 flex items-center gap-2" animate={{ backgroundColor: q1a.values.map(s=>bgMap[s]), borderColor: q1a.values.map(s=>boMap[s]) }} transition={getTrans(q1a.times)}>
                                <motion.div className="w-4 h-4 rounded-full border-2 flex justify-center items-center shrink-0 bg-white" animate={{ borderColor: q1a.values.map(s=>iBMap[s]), borderWidth: q1a.values.map(s=>iWMap[s]) }} transition={getTrans(q1a.times)}>
                                    <motion.div animate={{ opacity: q1a.values.map(s=>s===2?1:0) }} transition={getTrans(q1a.times)}><CheckCircle size={14} className="text-emerald-500 fill-emerald-100" /></motion.div>
                                </motion.div>
                                <span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">A)</span>MedMapa</span>
                            </motion.div>
                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">B)</span>Cursinhos tradicionais caros</span></div>
                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">C)</span>Apostilas e PDFs antigos</span></div>
                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">D)</span>Estudar sem direcionamento</span></div>
                         </div>
                     </motion.div>

                     {/* PERGUNTA 2 (Métricas c/ Refazer) */}
                     <motion.div className="absolute inset-0 px-3 py-2 flex flex-col" animate={{ opacity: scr2.values }} transition={getTrans(scr2.times)} style={{ pointerEvents: 'none' }}>
                         <div className="flex gap-1.5 border-b border-gray-100 pb-1.5"><span className="bg-blue-50 text-blue-700 text-[8px] font-bold px-1 py-0.5 rounded border border-blue-100">MEDMAPA</span><span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-1 py-0.5 rounded border border-gray-200">2026</span><span className="bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1 py-0.5 rounded border border-emerald-100">MÉTRICAS</span></div>
                         <p className="font-bold text-slate-800 text-[11px] mt-1.5 leading-snug">O que acontece quando você erra uma questão no MedMapa?</p>
                         <div className="mt-2 space-y-1.5">
                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">A)</span>Você apenas perde pontos</span></div>
                            
                            {/* B: Certa (Marcada depois) */}
                            <motion.div className="w-full p-2 rounded-lg border-2 flex items-center gap-2" animate={{ backgroundColor: q2b.values.map(s=>bgMap[s]), borderColor: q2b.values.map(s=>boMap[s]) }} transition={getTrans(q2b.times)}>
                                <motion.div className="w-4 h-4 rounded-full border-2 flex justify-center items-center shrink-0 bg-white" animate={{ borderColor: q2b.values.map(s=>iBMap[s]), borderWidth: q2b.values.map(s=>iWMap[s]) }} transition={getTrans(q2b.times)}>
                                    <motion.div animate={{ opacity: q2b.values.map(s=>s===2?1:0) }} transition={getTrans(q2b.times)}><CheckCircle size={14} className="text-emerald-500 fill-emerald-100" /></motion.div>
                                </motion.div>
                                <span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">B)</span>Cria flashcards no seu erro</span>
                            </motion.div>
                            
                            {/* C: Errada (Marcada Primeiro) */}
                            <motion.div className="w-full p-2 rounded-lg border-2 flex items-center gap-2" animate={{ backgroundColor: q2c.values.map(s=>bgMap[s]), borderColor: q2c.values.map(s=>boMap[s]) }} transition={getTrans(q2c.times)}>
                                <motion.div className="w-4 h-4 rounded-full border-2 flex justify-center items-center shrink-0 bg-white" animate={{ borderColor: q2c.values.map(s=>iBMap[s]), borderWidth: q2c.values.map(s=>iWMap[s]) }} transition={getTrans(q2c.times)}>
                                    <motion.div animate={{ opacity: q2c.values.map(s=>s===3?1:0) }} transition={getTrans(q2c.times)}><XCircle size={14} className="text-red-500 fill-red-100" /></motion.div>
                                </motion.div>
                                <span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">C)</span>A questão é bloqueada</span>
                            </motion.div>

                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">D)</span>Tem que comprar outro módulo</span></div>
                         </div>
                     </motion.div>

                     {/* PERGUNTA 3 (Flashcards) */}
                     <motion.div className="absolute inset-0 px-3 py-2 flex flex-col" animate={{ opacity: scr3.values }} transition={getTrans(scr3.times)} style={{ pointerEvents: 'none' }}>
                         <div className="flex gap-1.5 border-b border-gray-100 pb-1.5"><span className="bg-blue-50 text-blue-700 text-[8px] font-bold px-1 py-0.5 rounded border border-blue-100">MEDMAPA</span><span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-1 py-0.5 rounded border border-gray-200">2026</span><span className="bg-indigo-50 text-indigo-700 text-[8px] font-bold px-1 py-0.5 rounded border border-indigo-100">REVISÃO</span></div>
                         <p className="font-bold text-slate-800 text-[11px] mt-1.5 leading-snug">Como funciona a repetição espaçada do MedMapa?</p>
                         <div className="mt-2 space-y-1.5">
                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">A)</span>Mostra os cartões aleatórios</span></div>
                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">B)</span>Você agenda manualmente</span></div>
                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">C)</span>Mostra apenas o que já sabe</span></div>
                            
                            <motion.div className="w-full p-2 rounded-lg border-2 flex items-center gap-2" animate={{ backgroundColor: q3d.values.map(s=>bgMap[s]), borderColor: q3d.values.map(s=>boMap[s]) }} transition={getTrans(q3d.times)}>
                                <motion.div className="w-4 h-4 rounded-full border-2 flex justify-center items-center shrink-0 bg-white" animate={{ borderColor: q3d.values.map(s=>iBMap[s]), borderWidth: q3d.values.map(s=>iWMap[s]) }} transition={getTrans(q3d.times)}>
                                    <motion.div animate={{ opacity: q3d.values.map(s=>s===2?1:0) }} transition={getTrans(q3d.times)}><CheckCircle size={14} className="text-emerald-500 fill-emerald-100" /></motion.div>
                                </motion.div>
                                <span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">D)</span>O Algoritmo calcula para você</span>
                            </motion.div>
                         </div>
                     </motion.div>

                     {/* PERGUNTA 4 (Tecnologia/App) */}
                     <motion.div className="absolute inset-0 px-3 py-2 flex flex-col" animate={{ opacity: scr4.values }} transition={getTrans(scr4.times)} style={{ pointerEvents: 'none' }}>
                         <div className="flex gap-1.5 border-b border-gray-100 pb-1.5"><span className="bg-blue-50 text-blue-700 text-[8px] font-bold px-1 py-0.5 rounded border border-blue-100">MEDMAPA</span><span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-1 py-0.5 rounded border border-gray-200">2026</span><span className="bg-sky-50 text-sky-700 text-[8px] font-bold px-1 py-0.5 rounded border border-sky-100">TECNOLOGIA</span></div>
                         <p className="font-bold text-slate-800 text-[11px] mt-1.5 leading-snug">Como funciona o acesso às questões pelo celular?</p>
                         <div className="mt-2 space-y-1.5">
                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">A)</span>Apenas pelo navegador web</span></div>
                            
                            <motion.div className="w-full p-2 rounded-lg border-2 flex items-center gap-2" animate={{ backgroundColor: q4b.values.map(s=>bgMap[s]), borderColor: q4b.values.map(s=>boMap[s]) }} transition={getTrans(q4b.times)}>
                                <motion.div className="w-4 h-4 rounded-full border-2 flex justify-center items-center shrink-0 bg-white" animate={{ borderColor: q4b.values.map(s=>iBMap[s]), borderWidth: q4b.values.map(s=>iWMap[s]) }} transition={getTrans(q4b.times)}>
                                    <motion.div animate={{ opacity: q4b.values.map(s=>s===2?1:0) }} transition={getTrans(q4b.times)}><CheckCircle size={14} className="text-emerald-500 fill-emerald-100" /></motion.div>
                                </motion.div>
                                <span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">B)</span>App Nativo com acesso Offline</span>
                            </motion.div>

                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">C)</span>Baixando dezenas de PDFs</span></div>
                            <div className="w-full p-2 rounded-lg border-2 border-gray-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-gray-300"/><span className="text-[10px] font-semibold text-slate-700"><span className="font-bold mr-1">D)</span>Imprimindo provas em papel</span></div>
                         </div>
                     </motion.div>

                 </div>

                 {/* Navbar Inferior */}
                 <div className="p-2.5 bg-white/95 backdrop-blur-md border-t border-gray-200 flex items-center justify-between shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.1)] z-40 relative pointer-events-none shrink-0">
                     <div className="p-2.5 text-slate-300 bg-gray-50 border border-gray-100 rounded-lg"><ArrowLeft size={18} /></div>
                     
                     <motion.div 
                         className="flex-1 mx-2 py-2.5 rounded-lg font-bold flex items-center justify-center text-xs shadow-sm relative overflow-hidden border border-transparent"
                         animate={{ backgroundColor: resp.values.map(s=>rBgMap[s]), color: resp.values.map(s=>rColMap[s]), borderColor: resp.values.map(s=>rBoMap[s]) }} transition={getTrans(resp.times)}
                     >
                         <motion.div className="absolute inset-0 z-0" animate={{ scale: rSclV }} transition={getTrans(rSclT, "easeInOut")} />
                         
                         <motion.span className="absolute z-10" animate={{ opacity: resp.values.map(s=>s===0?1:0) }} transition={getTrans(resp.times)}>Responder</motion.span>
                         <motion.span className="absolute z-10" animate={{ opacity: resp.values.map(s=>s===1?1:0) }} transition={getTrans(resp.times)}>Responder</motion.span>
                         <motion.span className="absolute z-10 flex items-center gap-1.5" animate={{ opacity: resp.values.map(s=>s===3?1:0) }} transition={getTrans(resp.times)}><RotateCcw size={14} strokeWidth={3} /> Refazer</motion.span>
                         <motion.span className="absolute z-10 flex items-center gap-1" animate={{ opacity: resp.values.map(s=>s===2?1:0) }} transition={getTrans(resp.times)}><Check size={16} strokeWidth={3} /> Correto!</motion.span>
                     </motion.div>
                     
                     <motion.div 
                        className="p-2.5 text-white bg-slate-900 rounded-lg shadow-md flex items-center justify-center origin-center"
                        animate={{ scale: nScl }} transition={getTrans(nT, "easeInOut")}
                     >
                         <ArrowRight size={18} />
                     </motion.div>
                 </div>

              </div>
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-300 rounded-full z-50"></div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

/* =========================================
   2. SEÇÃO BENTO GRID (LAYOUT PREMIUM APPLE-STYLE COM DASHBOARD INTERATIVO)
   ========================================= */

// Função para gerar as datas dinâmicas (Últimos 10 dias até hoje)
const generateEvolutionData = () => {
    const data = [];
    const basePct = [55, 62, 58, 65, 70, 72, 80, 78, 85, 88];
    for (let i = 9; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        data.push({
            id: 10 - i,
            pct: basePct[9 - i],
            date: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
        });
    }
    return data;
};

// Transformador de String em Número (Para gerar % pseudo-aleatórias mas fixas para cada tópico)
const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
};

// Gerador dinâmico de Tópicos (Calcula as % baseado no nome para sempre mudar quando clica na área)
const getDynamicTopics = (timeFilter, scope) => {
    const pools = {
        'Todas': ['Obstetrícia Fisiológica e Pré-Natal', 'Pneumologia', 'Trauma', 'Imunizações', 'Estudos Epidemiológicos', 'Cardiologia', 'Abdome Agudo', 'Neonatologia: Sala de Parto'],
        'Clínica Médica': ['Pneumologia', 'Cardiologia', 'Infectologia', 'Nefrologia', 'Gastroenterologia', 'Neurologia', 'Reumatologia'],
        'Cirurgia Geral': ['Hérnias e Parede Abdominal', 'Trauma', 'Abdome Agudo', 'Pré e Pós-Operatório', 'Coloproctologia', 'Urologia', 'Cirurgia Vascular'],
        'Gineco e Obstetrícia': ['Sangramentos da Gestação', 'Assistência ao Pré-Natal', 'Parto e Puerpério', 'Mastologia', 'Oncologia Pélvica', 'Infecções Ginecológicas', 'Distopias'],
        'Pediatria': ['Afecções Respiratórias', 'Imunizações', 'Infectopediatria', 'Sala de Parto', 'Nutrição Pediátrica', 'Crescimento', 'Nefrologia Pediátrica'],
        'Preventiva': ['Políticas de Saúde', 'Estudos Epidemiológicos', 'Medicina Baseada em Evidências', 'Atenção Primária', 'Saúde do Trabalhador', 'Vigilância em Saúde', 'Ética Médica']
    };
    
    const baseThemes = pools[scope] || pools['Todas'];
    
    // Multiplicadores baseados no tempo selecionado
    const timeModifiers = {
        '7days': { tMult: 1, pMod: -8 },
        '1month': { tMult: 3.5, pMod: 2 },
        'always': { tMult: 7.4, pMod: 10 }
    };
    
    const { tMult, pMod } = timeModifiers[timeFilter];
    
    return baseThemes.map(name => {
        const hash = hashString(name);
        
        // Gera uma % base entre 30% e 85%
        let pct = (hash % 55) + 30 + pMod;
        if (pct > 96) pct = 96;
        if (pct < 25) pct = 25;
        
        // Gera um volume realista baseado no tamanho da string
        const baseTotal = (hash % 15) + 8; 
        const total = Math.floor(baseTotal * tMult);
        const correct = Math.floor((pct / 100) * total);
        
        // Pct real calculada após os arredondamentos
        const finalPct = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        return { name, pct: finalPct, total, correct };
    });
};

// Matemática fixada e exata para bater com a soma dos Dashboards Fakes
const getDynamicAreas = (timeFilter) => {
    const data = {
        '7days': [
            { id: 'clinica', title: 'Clínica Médica', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50', total: 12, correct: 8, pct: 66 },
            { id: 'cirurgia', title: 'Cirurgia Geral', icon: Scissors, color: 'text-emerald-600', bg: 'bg-emerald-50', total: 10, correct: 7, pct: 70 },
            { id: 'go', title: 'Gineco e Obstetrícia', icon: HeartPulse, color: 'text-pink-600', bg: 'bg-pink-50', total: 9, correct: 6, pct: 66 },
            { id: 'pediatria', title: 'Pediatria', icon: Baby, color: 'text-amber-600', bg: 'bg-amber-50', total: 8, correct: 7, pct: 87 },
            { id: 'preventiva', title: 'Preventiva', icon: Shield, color: 'text-violet-600', bg: 'bg-violet-50', total: 6, correct: 3, pct: 50 },
        ],
        '1month': [
            { id: 'clinica', title: 'Clínica Médica', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50', total: 45, correct: 32, pct: 71 },
            { id: 'cirurgia', title: 'Cirurgia Geral', icon: Scissors, color: 'text-emerald-600', bg: 'bg-emerald-50', total: 35, correct: 28, pct: 80 },
            { id: 'go', title: 'Gineco e Obstetrícia', icon: HeartPulse, color: 'text-pink-600', bg: 'bg-pink-50', total: 30, correct: 22, pct: 73 },
            { id: 'pediatria', title: 'Pediatria', icon: Baby, color: 'text-amber-600', bg: 'bg-amber-50', total: 28, correct: 25, pct: 89 },
            { id: 'preventiva', title: 'Preventiva', icon: Shield, color: 'text-violet-600', bg: 'bg-violet-50', total: 20, correct: 11, pct: 55 },
        ],
        'always': [
            { id: 'clinica', title: 'Clínica Médica', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50', total: 90, correct: 69, pct: 76 },
            { id: 'cirurgia', title: 'Cirurgia Geral', icon: Scissors, color: 'text-emerald-600', bg: 'bg-emerald-50', total: 70, correct: 58, pct: 82 },
            { id: 'go', title: 'Gineco e Obstetrícia', icon: HeartPulse, color: 'text-pink-600', bg: 'bg-pink-50', total: 60, correct: 45, pct: 75 },
            { id: 'pediatria', title: 'Pediatria', icon: Baby, color: 'text-amber-600', bg: 'bg-amber-50', total: 55, correct: 51, pct: 92 },
            { id: 'preventiva', title: 'Preventiva', icon: Shield, color: 'text-violet-600', bg: 'bg-violet-50', total: 37, correct: 22, pct: 59 },
        ]
    };
    return data[timeFilter];
};

// Componente Interativo do Mockup de Desempenho
const InteractivePerformanceMockup = () => {
  const [timeFilter, setTimeFilter] = useState('always'); 
  const [topicSort, setTopicSort] = useState('worst'); 
  const [scope, setScope] = useState('Todas');
  const [activeModal, setActiveModal] = useState(null); 

  // Exatamente as somas das áreas acima (Sempre = 312 totais e 245 acertos)
  const mockData = {
      '7days': { acc: '68.8', total: '45', correct: '31', errors: 14 },
      '1month': { acc: '74.6', total: '158', correct: '118', errors: 40 },
      'always': { acc: '78.5', total: '312', correct: '245', errors: 67 }
  };

  const evolutionData = generateEvolutionData();
  const mockAreas = getDynamicAreas(timeFilter);
  const currentData = mockData[timeFilter];
  
  // Lista dinâmica que atualiza com o Scope
  const allTopics = getDynamicTopics(timeFilter, scope);
  const sortedTopics = [...allTopics]
      .sort((a, b) => topicSort === 'worst' ? a.pct - b.pct : b.pct - a.pct)
      .slice(0, 3);

  return (
      <div className="w-full h-auto bg-gray-50 border border-slate-700/50 rounded-2xl shadow-[-30px_30px_80px_rgba(0,0,0,0.7)] flex flex-col pointer-events-auto ring-1 ring-white/10 overflow-hidden pb-4">
          
          {/* Header Apple-style */}
          <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2 w-full shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              <div className="ml-3 flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 rounded text-[9px] text-slate-400 font-mono">
                  <Map size={10} className="text-blue-400" /> medmapa.com.br
              </div>
          </div>

          <div className="flex flex-col p-4 lg:p-5 w-full gap-4 flex-1 bg-gray-50">
              
              {/* Top Header */}
              <div className="flex justify-between items-center mb-1">
                  <div>
                      {/* Botão voltar removido para dar espaço ao badge flutuante */}
                      <h1 className="text-xl xl:text-2xl font-bold text-slate-900 flex items-center gap-2">
                          <BarChart3 className="text-blue-600" size={22} /> Seu Desempenho
                      </h1>
                  </div>
                  
                  <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner border border-gray-200/50">
                      {['7days', '1month', 'always'].map(t => (
                          <button key={t} onClick={() => setTimeFilter(t)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${timeFilter === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                              {t === '7days' ? '7 Dias' : t === '1month' ? '1 Mês' : 'Sempre'}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                      <span className="p-1.5 rounded-full bg-blue-50 text-blue-600 mb-1.5"><Activity size={16}/></span>
                      <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Taxa de Acerto</h2>
                      <div className="text-2xl xl:text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">{currentData.acc}%</div>
                      <p className="text-[9px] font-bold text-slate-400 bg-gray-100 px-2 py-0.5 rounded-full">{currentData.correct} de {currentData.total} acertos</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-[0.03] text-purple-900 pointer-events-none"><Calendar size={50} /></div>
                      <div className="flex items-center gap-1.5 mb-2 relative z-10">
                          <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Calendar size={14}/></span>
                          <h2 className="text-[11px] font-bold text-slate-700">Resolvidas</h2>
                      </div>
                      <div className="flex items-center justify-between relative z-10 mt-auto px-1">
                          <div className="text-center">
                              <div className="text-xl xl:text-2xl font-bold text-slate-800">{currentData.total}</div>
                              <div className="text-[9px] uppercase font-bold text-slate-400">Feitas</div>
                          </div>
                          <div className="w-px h-8 bg-gray-100"></div>
                          <div className="text-center">
                              <div className="text-xl xl:text-2xl font-bold text-emerald-500">{currentData.correct}</div>
                              <div className="text-[9px] uppercase font-bold text-slate-400">Acertos</div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Erros */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="absolute -right-2 -bottom-2 text-yellow-500/10 pointer-events-none"><Zap size={90} /></div>
                  <div className="relative z-10 flex flex-col gap-1 max-w-sm">
                      <div className="inline-flex items-center gap-1 bg-slate-800/50 backdrop-blur w-max px-2 py-0.5 rounded-full border border-slate-700 mb-1">
                          <Zap className="text-yellow-400" size={10} fill="currentColor" /> 
                          <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-wide">Caderno Automático</span>
                      </div>
                      <h2 className="text-lg font-bold leading-tight">Transforme erros em acertos</h2>
                      <p className="text-slate-400 text-[11px] mt-0.5">O MedMapa guardou <strong>{currentData.errors} erros</strong> recentes. Não deixe eles caírem na prova.</p>
                  </div>
                  <button onClick={() => setActiveModal('erros')} className="relative z-10 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 text-xs transition-transform active:scale-95 shadow-md">
                      <PlayCircle size={16} fill="currentColor" /> Matar Erros
                  </button>
              </div>

              {/* Gráfico */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full">
                  <div className="flex items-center gap-1.5 mb-4">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><TrendingUp size={14} /></div>
                      <h2 className="font-bold text-slate-800 text-sm">Sua Evolução</h2>
                  </div>
                  <div className="h-28 w-full flex items-end gap-1.5 justify-between">
                      {evolutionData.map((data) => {
                          let colorClass = 'bg-blue-400';
                          if(data.pct >= 80) colorClass = 'bg-emerald-400';
                          else if(data.pct < 60) colorClass = 'bg-orange-400';

                          return (
                              <div key={data.id} className="relative flex-1 min-w-0 flex flex-col items-center justify-end h-full group/bar cursor-pointer">
                                  <div className="opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] font-bold rounded px-1.5 py-0.5 absolute -top-6 z-20">
                                      {data.pct}%
                                  </div>
                                  <div className="w-full max-w-[28px] h-full flex items-end relative bg-gray-100 rounded-t-sm">
                                      <div className={`w-full rounded-t-sm transition-all duration-700 ${colorClass} opacity-90 group-hover/bar:opacity-100`} style={{ height: `${data.pct}%` }}></div>
                                  </div>
                                  <span className="text-[9px] text-gray-400 mt-1 font-bold">{data.date}</span>
                              </div>
                          );
                      })}
                  </div>
              </div>

              {/* Tópicos */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                          <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md"><BarChart3 size={14} /></div>
                          <h2 className="font-bold text-slate-800 text-sm">Top Tópicos</h2>
                      </div>
                      <button onClick={() => setTopicSort(prev => prev === 'worst' ? 'best' : 'worst')} className={`p-1 rounded-md border transition-colors ${topicSort === 'worst' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-emerald-50 text-emerald-500 border-emerald-100'}`}>
                          {topicSort === 'worst' ? <TrendingDown size={14}/> : <TrendingUp size={14}/>}
                      </button>
                  </div>

                  <div className="flex gap-1.5 overflow-x-hidden pb-1.5 mb-2 w-full">
                       <button onClick={() => setScope('Todas')} className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap border transition-colors ${scope === 'Todas' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}>Geral</button>
                       {mockAreas.map(a => (<button key={a.id} onClick={() => setScope(a.title)} className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap border transition-colors ${scope === a.title ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}>{a.title}</button>))}
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                      {sortedTopics.map((topic, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-2.5 flex items-center justify-between gap-2 border border-gray-100/50 animate-in fade-in duration-300">
                              <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1 mb-0.5">
                                      <span className="text-[10px] font-bold text-slate-400 w-4">#{i+1}</span>
                                      <span className="font-bold text-slate-800 text-xs truncate block">{topic.name}</span>
                                  </div>
                                  <div className="pl-5 text-[10px] text-slate-500">{topic.correct}/{topic.total} acertos</div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                      <div className={`h-full rounded-full transition-all duration-700 ${topic.pct >= 80 ? 'bg-emerald-500' : topic.pct < 50 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${topic.pct}%` }}></div>
                                  </div>
                                  <span className={`text-[11px] font-bold w-7 text-right ${topic.pct >= 80 ? 'text-emerald-600' : topic.pct < 50 ? 'text-red-600' : 'text-blue-600'}`}>{topic.pct}%</span>
                              </div>
                          </div>
                      ))}
                  </div>

                  {/* Texto do botão revertido */}
                  <button onClick={() => setActiveModal('treinar')} className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-xs transition-transform active:scale-95">
                      <PlayCircle size={14} /> Treinar temas
                  </button>
              </div>

              {/* Por Área */}
              <div className="mb-1">
                  <h2 className="text-xs font-bold text-slate-800 mb-2 px-1">Por Área ({timeFilter === '7days' ? '7 Dias' : timeFilter === '1month' ? '1 Mês' : 'Sempre'})</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mockAreas.map(area => (
                          <div key={area.id} className="bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between gap-2 transition-all">
                              <div className="flex items-center gap-2 min-w-0">
                                  <div className={`p-1.5 rounded-md ${area.bg} ${area.color} flex-shrink-0`}><area.icon size={14} /></div>
                                  <div className="min-w-0">
                                      <h3 className="font-bold text-slate-700 text-[10px] truncate">{area.title}</h3>
                                      <p className="text-[9px] text-slate-400">{area.correct}/{area.total} pts</p>
                                  </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                  <span className={`text-sm font-bold ${area.pct >= 80 ? 'text-emerald-600' : area.pct < 60 ? 'text-red-600' : 'text-blue-600'}`}>{area.pct}%</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              
              {/* MODAIS */}
              {activeModal && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 p-4 rounded-[1rem]">
                      <div className="bg-white border border-gray-100 rounded-xl w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col overflow-hidden">
                          <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-white">
                              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                  {activeModal === 'erros' ? <><Zap className="text-yellow-500" fill="currentColor" size={16}/> Erros Recentes</> : <><Target className="text-blue-600" size={16}/> Treinar Tópicos</>}
                              </h3>
                              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-colors"><X size={14}/></button>
                          </div>
                          <div className="p-4 bg-white">
                              <div className={`p-3 rounded-lg border mb-4 flex gap-2 ${activeModal === 'erros' ? 'bg-yellow-50 border-yellow-100' : 'bg-blue-50 border-blue-100'}`}>
                                  {activeModal === 'erros' ? <Zap className="text-yellow-600 shrink-0 mt-0.5" size={18} /> : <Target className="text-blue-600 shrink-0 mt-0.5" size={18} />}
                                  <div className={`text-xs leading-relaxed font-medium ${activeModal === 'erros' ? 'text-yellow-900' : 'text-blue-900'}`}>
                                      {activeModal === 'erros' 
                                          ? "No MedMapa, seus erros nunca são esquecidos. O sistema compila tudo o que você errou e gera um simulado de revisão instantâneo para tapar buracos e não perder pontos." 
                                          : "O algoritmo não te deixa perder tempo. Inicie um simulado direcionado exclusivamente nos temas que estão puxando sua nota para baixo. Estude o que falta e ignore o que já domina."
                                      }
                                  </div>
                              </div>
                              {/* Texto do botão revertido */}
                              <button onClick={() => setActiveModal(null)} className={`w-full py-3 rounded-lg font-bold text-sm text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5 ${activeModal === 'erros' ? 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'}`}>
                                  <Play size={14} fill="currentColor"/> Entendi a ferramenta
                              </button>
                          </div>
                      </div>
                  </div>
              )}

          </div>
      </div>
  );
};

const BentoFeatures = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const flashcardsData = [
    { front: "Qual banco te dá diversos flashcards para usar sem te cobrar a mais por isso?", back: "MedMapa" },
    { front: "Qual o método de repetição mais eficaz para decorar matérias densas?", back: "Repetição Espaçada" },
    { front: "O que foca nas suas maiores fraquezas baseando-se nos simulados?", back: "O Algoritmo de Revisão" }
  ];

  const areasBase = [
      { id: 'clinica', title: 'Clínica Médica', icon: Stethoscope, colorClass: 'text-blue-400', bgClass: 'bg-blue-500/20', hoverBorder: 'hover:border-blue-500/50' },
      { id: 'cirurgia', title: 'Cirurgia Geral', icon: Scissors, colorClass: 'text-emerald-400', bgClass: 'bg-emerald-500/20', hoverBorder: 'hover:border-emerald-500/50' },
      { id: 'go', title: 'Gineco e Obstetrícia', icon: HeartPulse, colorClass: 'text-pink-400', bgClass: 'bg-pink-500/20', hoverBorder: 'hover:border-pink-500/50' },
      { id: 'pediatria', title: 'Pediatria', icon: Baby, colorClass: 'text-amber-400', bgClass: 'bg-amber-500/20', hoverBorder: 'hover:border-amber-500/50' },
      { id: 'preventiva', title: 'Preventiva', icon: Shield, colorClass: 'text-violet-400', bgClass: 'bg-violet-500/20', hoverBorder: 'hover:border-violet-500/50' }
  ];

  return (
    <section className="py-24 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Tudo que você precisa, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">em um só ecossistema.</span></h2>
        </motion.div>

        {/* GRID BENTO: Container principal */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* =======================================
              CARD 1: BANCO DE QUESTÕES 
              ======================================= */}
          <motion.div variants={itemVariants} className="lg:col-span-2 relative rounded-3xl p-8 lg:p-10 overflow-hidden bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 flex flex-col group transition-colors h-full z-20">
            
            <div className="relative z-20 mb-8">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6 border border-cyan-500/30">
                <Target className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">Um banco de questões que pensa como a banca.</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mb-5">
                Milhares de questões atualizadas separadas pelas Grandes Áreas da Medicina.
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-300">
                  <li className="flex items-center gap-3"><CheckCircle size={18} className="text-cyan-400 shrink-0" /> Gabaritos detalhados e comentados</li>
                  <li className="flex items-center gap-3"><CheckCircle size={18} className="text-cyan-400 shrink-0" /> Área para anotação na própria questão</li>
                  <li className="flex items-center gap-3"><CheckCircle size={18} className="text-cyan-400 shrink-0" /> Principais bancas validadas de todo o país</li>
              </ul>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full mt-auto">
                {areasBase.map((area) => (
                    <div key={area.id} className={`group/card bg-slate-800/80 p-4 rounded-2xl border border-slate-700 shadow-sm relative overflow-hidden ${area.hoverBorder} hover:bg-slate-800 flex flex-col justify-center transition-all cursor-default min-h-[100px]`}>
                        <div className={`absolute top-0 right-0 p-2 opacity-5 group-hover/card:opacity-10 transition-opacity transform group-hover/card:scale-110 ${area.colorClass}`}>
                            <area.icon size={80} />
                        </div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${area.bgClass} ${area.colorClass}`}>
                                <area.icon size={22} />
                            </div>
                            <h4 className={`text-sm sm:text-base font-bold text-slate-200 group-hover/card:${area.colorClass} transition-colors leading-tight`}>
                                {area.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>

          {/* =======================================
              CARD 2: FLASHCARDS
              ======================================= */}
          <motion.div variants={itemVariants} className="lg:col-span-1 relative rounded-3xl p-8 lg:p-10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 flex flex-col h-full group hover:border-purple-500/30 transition-colors z-20">
            
            <div className="z-20 mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-5 border border-purple-500/30">
                    <BrainCircuit className="text-purple-400" size={24} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">Flashcards Inteligentes.</h3>
                <p className="text-slate-400 text-sm">Passe o mouse para revelar a resposta.</p>
            </div>

            <div className="flex flex-col gap-3 items-center justify-end flex-1 z-10 w-full">
                {flashcardsData.map((card, idx) => (
                    <div key={idx} className="group/flashcard relative w-full flex-1 min-h-[90px] sm:min-h-[100px] cursor-pointer [perspective:1000px]">
                        <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover/flashcard:[transform:rotateY(180deg)]">
                            <div className="absolute inset-0 bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center justify-center text-center [backface-visibility:hidden] shadow-md hover:shadow-lg">
                                <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-snug">{card.front}</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 border border-emerald-400 rounded-2xl p-4 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                <div className="text-emerald-100 mb-1"><CheckCircle2 size={20}/></div>
                                <p className="text-sm sm:text-base text-white font-bold leading-tight">{card.back}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>

          {/* =======================================
              CARD 3: RAIO-X DO DESEMPENHO 
              ======================================= */}
          <motion.div variants={itemVariants} className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
              
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row relative z-10 group transition-colors hover:border-blue-500/30 overflow-hidden lg:overflow-visible">
                  
                  {/* Textos travados à esquerda */}
                  <div className="w-full lg:w-[45%] xl:w-[45%] flex-shrink-0 relative z-20 pointer-events-auto mt-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                          <BarChart3 className="text-blue-400" size={24} />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">Raio-X do seu Desempenho.</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                          Descubra suas fraquezas antes da prova. O sistema analisa seu comportamento, gera gráficos de evolução em tempo real e lista exatamente quais os temas que você precisa estudar mais.
                      </p>
                      <ul className="space-y-4 text-sm font-medium text-slate-300 mb-8">
                          <li className="flex items-center gap-3"><CheckCircle size={18} className="text-blue-400 shrink-0" /> Dashboard Analytics Completo</li>
                          <li className="flex items-center gap-3"><CheckCircle size={18} className="text-blue-400 shrink-0" /> Caderno de Erros Automático</li>
                          <li className="flex items-center gap-3"><CheckCircle size={18} className="text-blue-400 shrink-0" /> Comparativo de Simulados</li>
                      </ul>

                      {/* AS 5 JANELINHAS DE COPY (Espaçamento aumentado com space-y-4) */}
                      <div className="space-y-4 hidden sm:block mb-8 pr-4">
                          {/* Janelinha 1 */}
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 hover:bg-blue-500/15 transition-colors">
                              <h4 className="text-blue-400 font-bold text-[13px] mb-1.5 flex items-center gap-2"><Eye size={14}/> Pare de estudar no escuro.</h4>
                              <p className="text-slate-400 text-[13px] leading-relaxed">
                                  Enquanto a concorrência perde tempo revisando PDFs inteiros e anotando erros, o MedMapa te diz <strong className="text-slate-200">com precisão</strong> onde focar hoje para sua nota subir amanhã.
                              </p>
                          </div>
                          
                          {/* Janelinha 2 */}
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 hover:bg-blue-500/15 transition-colors">
                              <h4 className="text-blue-400 font-bold text-[13px] mb-1.5 flex items-center gap-2"><Target size={14}/> Simulados que se adaptam a você.</h4>
                              <p className="text-slate-400 text-[13px] leading-relaxed">
                                  Não refaça provas genéricas. O algoritmo cria listas focadas exatamente nas matérias que mais derrubam a sua nota. Estude menos, mas <strong className="text-slate-200">estude o que importa</strong>.
                              </p>
                          </div>

                          {/* Janelinha 3 */}
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 hover:bg-blue-500/15 transition-colors">
                              <h4 className="text-blue-400 font-bold text-[13px] mb-1.5 flex items-center gap-2"><TrendingUp size={14}/> Evolução que você enxerga.</h4>
                              <p className="text-slate-400 text-[13px] leading-relaxed">
                                  A ansiedade vem de não saber se está pronto. Com gráficos de desempenho, você vê sua nota subir semana a semana e chega no dia do exame com a <strong className="text-slate-200">confiança lá em cima</strong>.
                              </p>
                          </div>

                          {/* Janelinha 4 */}
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 hover:bg-blue-500/15 transition-colors">
                              <h4 className="text-blue-400 font-bold text-[13px] mb-1.5 flex items-center gap-2"><Clock size={14}/> Estude até no plantão.</h4>
                              <p className="text-slate-400 text-[13px] leading-relaxed">
                                  Tem 15 minutos livres? Gere um mini-simulado focado e garanta mais pontos na prova sem precisar sequer abrir um livro ou carregar <strong className="text-slate-200">apostilas pesadas</strong>.
                              </p>
                          </div>
                      </div>

                  </div>

                  {/* A JANELA VIRTUAL E O BADGE FLUTUANTE */}
                  <div className="hidden lg:flex flex-col flex-shrink-0 w-[650px] xl:w-[750px] z-30 transition-transform duration-700 group-hover:-translate-y-2 ml-8 xl:ml-12 -mt-4 relative group/mockup">
                      
                      {/* O BADGE ANIMADO */}
                      <div className="absolute -left-6 top-8 bg-slate-900 border border-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50 flex items-center gap-2 opacity-100 group-hover/mockup:opacity-0 transition-opacity duration-500 pointer-events-none animate-bounce">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                          </span>
                          ✨ Clique e teste o painel
                      </div>

                      <InteractivePerformanceMockup />
                  </div>

                  {/* Mockup Mobile para telas menores */}
                  <div className="lg:hidden relative w-[110%] -left-[5%] mt-10 z-30">
                      <InteractivePerformanceMockup />
                  </div>
              </div>

              {/* Coluna fantasma para segurar a grid e permitir o vazamento visual perfeito na direita */}
              <div className="hidden lg:block lg:col-span-1 pointer-events-none"></div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

/* =========================================
   3. SEÇÃO SCROLL STORYTELLING (Jornada do Estudo Cirúrgico)
   ========================================= */

// --- App Shell (Sidebar do Mockup do Tablet Idêntica ao Layout.jsx) ---
const AppShell = ({ children, activeTab, dark = false }) => (
    <div className={`flex w-full h-full overflow-hidden ${dark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className={`w-14 ${dark ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} border-r shrink-0 flex flex-col items-center py-4 gap-3 z-20 shadow-[2px_0_10px_rgba(0,0,0,0.02)]`}>
            {/* Logo */}
            <Map className="text-blue-600 mb-2" size={24} strokeWidth={2.5}/>
            
            {/* Menu Itens */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === 'home' ? 'bg-blue-50 text-blue-700 font-semibold' : dark ? 'text-slate-600' : 'text-gray-400'}`}><BookOpen size={18}/></div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === 'simulados' ? 'bg-blue-50 text-blue-700 font-semibold' : dark ? 'text-slate-600' : 'text-gray-400'}`}><CheckCircle size={18}/></div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === 'performance' ? 'bg-blue-50 text-blue-700 font-semibold' : dark ? 'text-slate-600' : 'text-gray-400'}`}><BarChart2 size={18}/></div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === 'flashcards' ? 'bg-blue-50 text-blue-700 font-semibold' : dark ? 'text-slate-600' : 'text-gray-400'}`}><Layers size={18}/></div>
        </div>
        <div className={`flex-1 flex flex-col relative overflow-hidden ${dark ? 'bg-slate-900' : 'bg-gray-50/50'}`}>
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            {children}
        </div>
    </div>
);

// --- SLIDE 1: HomeView ---
const MockupHome = () => {
    const areas = [
        { title: 'Clínica Médica', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Cirurgia Geral', icon: Scissors, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Gineco e Obstetrícia', icon: HeartPulse, color: 'text-pink-600', bg: 'bg-pink-50' },
        { title: 'Pediatria', icon: Baby, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Preventiva', icon: Shield, color: 'text-violet-600', bg: 'bg-violet-50' },
    ];

    return (
        <AppShell activeTab="home">
            <div className="p-4 flex flex-col h-full w-full overflow-hidden">
                <div className="mb-3 shrink-0">
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">Olá, Aluno! 👋</h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">Vamos praticar hoje? Escolha uma área para começar.</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4 shrink-0">
                    <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[8px] font-medium text-gray-500 mb-0.5">Questões Hoje</p>
                            <div className="flex items-baseline gap-1">
                                <h3 className="text-xs font-bold text-slate-900">32</h3>
                                <span className="text-[8px] text-gray-400 font-medium">/ 50</span>
                            </div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0"><CheckCircle size={12} /></div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[8px] font-medium text-gray-500 mb-0.5">Taxa de Acerto</p>
                            <h3 className="text-xs font-bold text-slate-900">78%</h3>
                        </div>
                        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0"><BarChart2 size={12} /></div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[8px] font-medium text-gray-500 mb-0.5">Sequência</p>
                            <h3 className="text-xs font-bold text-slate-900">12 Dias</h3>
                        </div>
                        <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600 shrink-0"><Activity size={12} /></div>
                    </div>
                </div>

                <div className="flex flex-col shrink-0">
                    <h3 className="text-[11px] font-bold text-slate-800 mb-2">Grandes Áreas</h3>
                    <div className="grid grid-cols-3 gap-1.5">
                        {areas.map((area, idx) => (
                            <div key={idx} className="group bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between h-[75px]">
                                <div className={`absolute top-0 right-0 p-1 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 ${area.color}`}>
                                    <area.icon size={40} />
                                </div>
                                <div>
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center mb-1 shrink-0 ${area.bg} ${area.color}`}>
                                        <area.icon size={12} />
                                    </div>
                                    <h4 className="text-[8px] font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                        {area.title}
                                    </h4>
                                </div>
                                <div className="mt-1 flex items-center text-blue-600 font-bold text-[7px] group-hover:translate-x-1 transition-transform duration-300">
                                    Acessar Área <ChevronRight size={8} className="ml-[1px]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppShell>
    );
};

// --- SLIDE 2: ExamSetup ---
const MockupSetup = () => {
    const areas = [
        { title: 'Clínica Médica', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Cirurgia Geral', icon: Scissors, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Gineco e Obstetrícia', icon: HeartPulse, color: 'text-pink-600', bg: 'bg-pink-50' },
        { title: 'Pediatria', icon: Baby, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Preventiva', icon: Shield, color: 'text-violet-600', bg: 'bg-violet-50' },
    ];

    return (
        <AppShell activeTab="simulados">
            <div className="flex flex-col h-full bg-gray-50/50 w-full relative overflow-hidden">
                <div className="flex-1 p-3.5 flex flex-col">
                    <div className="flex justify-between items-center mb-1 shrink-0">
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Simulado Personalizado</span>
                    </div>
                    <h1 className="text-sm font-bold text-slate-900 mb-0.5 shrink-0">Monte seu Simulado</h1>
                    <p className="text-[9px] text-slate-500 mb-1.5 shrink-0">Selecione temas de diferentes áreas.</p>
                    
                    <div className="flex justify-end mb-1.5 shrink-0">
                        <div className="text-[8px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md flex items-center gap-1"><CheckSquare size={10} /> Selecionar Tudo</div>
                    </div>

                    <div className="space-y-1.5 shrink-0">
                        {areas.map((area, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm p-1.5 px-2.5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-md ${area.bg} ${area.color}`}><area.icon size={12} /></div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-[9px]">{area.title}</h3>
                                        <p className="text-[7px] text-gray-500">0 temas selecionados</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-gray-100 text-gray-600">Selecionar</span>
                                    <ChevronDown size={10} className="text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-2.5 border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] flex justify-between items-center z-10 shrink-0">
                    <div>
                        <label className="text-[7px] text-gray-500 block mb-0.5 font-bold uppercase tracking-wide">Quantidade</label>
                        <div className="flex items-center gap-1">
                            <div className="w-10 px-2 py-1 bg-gray-50 border border-gray-200 rounded-md font-bold text-slate-800 text-[9px] text-center">20</div>
                            <div className="p-1 bg-gray-100 rounded-md text-slate-600"><PlusCircle size={10} /></div>
                        </div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm text-[9px]">
                        Começar Agora <ArrowRight size={10} />
                    </button>
                </div>
            </div>
        </AppShell>
    );
};

// --- SLIDE 3: QuestionView ---
const MockupQuestao = () => (
    <div className="flex flex-col h-full bg-gray-50 w-full relative rounded-[1.2rem] overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-4 py-2 shrink-0 flex justify-between items-center z-10">
            <div className="flex gap-2">
                <div className="text-slate-600 font-bold text-[9px] bg-white border border-gray-200 px-2 py-1.5 rounded-md flex items-center gap-1"><LayoutGrid size={12} /> Gabarito</div>
                <div className="text-slate-600 font-bold text-[9px] bg-white border border-gray-200 px-2 py-1.5 rounded-md flex items-center gap-1"><Eye size={12} /> Modo Prova</div>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-[9px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                    <span className="text-slate-900 font-bold">1</span> / 20
                </div>
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="w-[5%] h-full bg-blue-600 rounded-full"></div></div>
            </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-30">
            <div className="bg-white border border-gray-200 border-r-0 rounded-l-lg p-2 shadow-sm"><Calculator size={14} className="text-slate-500"/></div>
            <div className="bg-white border border-gray-200 border-r-0 rounded-l-lg p-2 shadow-sm mt-0.5"><PenTool size={14} className="text-slate-500"/></div>
        </div>

        <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col shrink-0">
                <div className="flex justify-between items-start p-2.5 border-b border-gray-100 bg-slate-50/50 rounded-t-xl shrink-0">
                    <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="bg-blue-50 text-blue-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-blue-100 uppercase tracking-wide">Nacional - Enare</span>
                        <span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-gray-200">2026</span>
                        <span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-gray-200">Reumatologia</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 text-[7px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 font-bold uppercase"><span className="text-slate-500">ID</span>A38F9B <Copy size={8}/></div>
                        <AlertTriangle size={12} className="text-red-400"/>
                    </div>
                </div>
                <div className="p-3">
                    <p className="text-[9.5px] text-slate-800 leading-relaxed font-medium text-justify">
                        Mulher de 20 anos procura atendimento médico no ambulatório de clínica médica de referência devido a quadro iniciado há 3 meses, com dor e edema articular acometendo articulações das mãos (interfalangeanas proximais, metacarpofalangeanas e punhos), assim como cotovelos, joelhos e tornozelos. Relata rigidez matinal que persiste por mais de 2 horas. O exame físico confirma dor e edema nas articulações descritas, além de mucosas hipocoradas (++/4+), sem outras alterações. A hipótese diagnóstica a ser considerada, o achado laboratorial esperado e a primeira linha de tratamento indicada são, respectivamente:
                    </p>
                </div>
            </div>
            
            <div className="space-y-1.5 shrink-0 pr-8">
                {[
                    'esclerose sistêmica; níveis elevados de creatina quinase; prednisona.',
                    'artrite reumatoide; pesquisa de fator reumatoide (FR) positivo; metotrexato.',
                    'lúpus eritematoso sistêmico; FAN com padrão nuclear pontilhado fino denso; cloroquina.',
                    'doença mista do tecido conjuntivo; FAN com padrão nuclear pontilhado fino; azatioprina.'
                ].map((opt, i) => {
                    const isSelected = i === 1; // Alternativa B Correta
                    return (
                    <div key={i} className={`flex items-start gap-2 p-1.5 px-2.5 rounded-lg border transition-colors ${isSelected ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-gray-200 bg-white opacity-90'}`}>
                        <div className={`w-4 h-4 rounded-full border ${isSelected ? 'border-transparent' : 'border-gray-300'} flex items-center justify-center shrink-0 text-[7px] font-bold mt-[1.5px] ${isSelected ? 'text-emerald-600' : 'bg-gray-50 text-gray-500'}`}>
                            {isSelected ? <CheckCircle size={12} className="fill-emerald-100" /> : ['A', 'B', 'C', 'D'][i]}
                        </div>
                        <span className={`text-[9px] font-medium leading-relaxed pt-[2px] ${isSelected ? 'text-emerald-800 font-semibold' : 'text-slate-600'}`}>{opt}</span>
                    </div>
                )})}
            </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-2 shrink-0 flex justify-between items-center z-10">
            <div className="text-slate-400 text-[9px] font-bold flex items-center gap-1 ml-2"><ArrowLeft size={10} /> Anterior</div>
            <div className="bg-blue-600 text-white px-6 py-1.5 rounded-md text-[9px] font-bold shadow-sm shadow-blue-500/20">Responder</div>
            <div className="text-blue-600 text-[9px] font-bold flex items-center gap-1 mr-2">Próxima <ArrowRight size={10} /></div>
        </div>
    </div>
);

// --- Componente Automático de Slideshow para o Passo 0 ---
const MockupFocoSlideshow = ({ isPaused }) => {
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        if (isPaused) return; 
        const interval = setInterval(() => {
            setSlide((prev) => (prev + 1) % 3);
        }, 3500); 
        return () => clearInterval(interval);
    }, [isPaused]); 

    return (
        <div className="relative w-full h-full bg-slate-900 rounded-[1.2rem] overflow-hidden cursor-pointer">
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${slide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <MockupHome />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${slide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <MockupSetup />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${slide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <MockupQuestao />
            </div>
        </div>
    );
};

// --- Componentes Compartilhados para Performance/Erros ---
const PerformanceHeader = () => (
    <div className="flex justify-between items-center mb-3 shrink-0">
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
            <BarChart2 className="text-blue-600" size={18} /> Seu Desempenho
        </h1>
        <div className="flex bg-gray-100 p-0.5 rounded-lg shadow-inner border border-gray-200/50">
            <button className="px-2 py-1 rounded text-[7px] font-bold text-slate-500 hover:text-slate-700 transition-colors">7 Dias</button>
            <button className="px-2 py-1 rounded text-[7px] font-bold text-slate-500 hover:text-slate-700 transition-colors">1 Mês</button>
            <button className="px-2 py-1 rounded text-[7px] font-bold bg-white text-blue-600 shadow-sm transition-all">Sempre</button>
        </div>
    </div>
);

const PerformanceTopicFilters = () => (
    <div className="flex gap-1 overflow-x-auto hide-scrollbar pb-1 mb-2 w-full shrink-0">
        <div className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[7px] font-bold whitespace-nowrap border bg-slate-800 text-white border-slate-800">Geral</div>
        <div className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[7px] font-bold whitespace-nowrap border bg-white text-gray-500 border-gray-200">Clínica Médica</div>
        <div className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[7px] font-bold whitespace-nowrap border bg-white text-gray-500 border-gray-200">Cirurgia Geral</div>
        <div className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[7px] font-bold whitespace-nowrap border bg-white text-gray-500 border-gray-200">Gineco e Obstetrícia</div>
        <div className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[7px] font-bold whitespace-nowrap border bg-white text-gray-500 border-gray-200">Pediatria</div>
        <div className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[7px] font-bold whitespace-nowrap border bg-white text-gray-500 border-gray-200">Preventiva</div>
    </div>
);

const PerformanceTopicsList = () => (
    <div className="flex flex-col gap-1.5 overflow-y-hidden w-full">
        <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-between border border-gray-100/50">
            <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold text-slate-400">#1</span>
                <span className="font-bold text-slate-800 text-[8px]">Trauma</span>
            </div>
            <span className="text-[8px] font-bold text-emerald-600">85%</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-between border border-gray-100/50">
            <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold text-slate-400">#2</span>
                <span className="font-bold text-slate-800 text-[8px]">Pneumologia</span>
            </div>
            <span className="text-[8px] font-bold text-emerald-600">82%</span>
        </div>
    </div>
);

// --- SLIDE 4: PerformanceView (Diagnóstico Original) ---
const MockupDiagnostico = () => (
    <AppShell activeTab="performance">
        <div className="flex flex-col w-full h-full bg-gray-50 p-4">
            <PerformanceHeader />

            <div className="grid grid-cols-2 gap-2 mb-3 shrink-0">
                <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <span className="p-1.5 rounded-full bg-blue-50 text-blue-600 mb-1.5"><Activity size={12}/></span>
                    <h2 className="text-[7px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Taxa de Acerto</h2>
                    <div className="text-xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">78.5%</div>
                    <p className="text-[6px] font-bold text-slate-400 bg-gray-100 px-1.5 py-0.5 rounded-full">245 de 312 acertos</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 opacity-[0.03] text-purple-900 pointer-events-none"><Calendar size={40} /></div>
                    <div className="flex items-center gap-1 mb-1 relative z-10">
                        <span className="p-1 bg-emerald-50 text-emerald-600 rounded-md"><Calendar size={10}/></span>
                        <h2 className="text-[9px] font-bold text-slate-700">Resolvidas</h2>
                    </div>
                    <div className="flex items-center justify-between relative z-10 mt-auto px-1">
                        <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">312</div>
                            <div className="text-[6px] uppercase font-bold text-slate-400">Feitas</div>
                        </div>
                        <div className="w-px h-5 bg-gray-100"></div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-emerald-500">245</div>
                            <div className="text-[6px] uppercase font-bold text-slate-400">Acertos</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-3 text-white shadow-lg relative overflow-hidden flex justify-between items-center mb-3 shrink-0">
                <div className="absolute -right-2 -bottom-2 text-yellow-500/10 pointer-events-none"><Zap size={60} /></div>
                <div className="relative z-10 flex flex-col gap-1 max-w-[150px]">
                    <div className="inline-flex items-center gap-1 bg-slate-800/50 backdrop-blur w-max px-1.5 py-0.5 rounded-full border border-slate-700">
                        <Zap className="text-yellow-400" size={8} fill="currentColor" /> 
                        <span className="text-[6px] font-bold text-yellow-100 uppercase tracking-wide">Caderno Automático</span>
                    </div>
                    <h2 className="text-[10px] font-bold leading-tight">Transforme erros em acertos</h2>
                </div>
                <div className="relative z-10 bg-yellow-500 text-slate-900 font-bold py-1.5 px-3 rounded-md flex items-center justify-center gap-1 text-[8px] shadow-md">
                    <PlayCircle size={10} fill="currentColor" /> Matar Erros
                </div>
            </div>
            
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm w-full flex flex-col flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                        <div className="p-1 bg-purple-50 text-purple-600 rounded-md"><BarChart3 size={10} /></div>
                        <h2 className="font-bold text-slate-800 text-[10px]">Top Tópicos</h2>
                    </div>
                </div>
                <PerformanceTopicFilters />
                <PerformanceTopicsList />
            </div>
        </div>
    </AppShell>
);

// --- SLIDE 3: O Fim do Erro Bobo ---
const MockupErros = ({ isActive }) => {
    const [showModal, setShowModal] = useState(false);
    const [animState, setAnimState] = useState(0);

    useEffect(() => {
        if (isActive) {
            const t1 = setTimeout(() => setAnimState(1), 800); 
            const t2 = setTimeout(() => setAnimState(2), 1600); 
            const t3 = setTimeout(() => setAnimState(3), 2400); 
            const t4 = setTimeout(() => { setAnimState(4); setShowModal(true); }, 2600); 
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
        } else {
            setAnimState(0);
            setShowModal(false);
        }
    }, [isActive]);

    return (
        <div className="relative w-full h-full">
            <AppShell activeTab="performance">
                <div className="flex flex-col w-full h-full bg-gray-50 p-4">
                    
                    <PerformanceHeader />

                    <div className="grid grid-cols-2 gap-2 mb-3 shrink-0">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                            <span className="p-1.5 rounded-full bg-blue-50 text-blue-600 mb-1.5"><Activity size={12}/></span>
                            <h2 className="text-[7px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Taxa de Acerto</h2>
                            <div className="text-xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">78.5%</div>
                            <p className="text-[6px] font-bold text-slate-400 bg-gray-100 px-1.5 py-0.5 rounded-full">245 de 312 acertos</p>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-1 opacity-[0.03] text-purple-900 pointer-events-none"><Calendar size={40} /></div>
                            <div className="flex items-center gap-1 mb-1 relative z-10">
                                <span className="p-1 bg-emerald-50 text-emerald-600 rounded-md"><Calendar size={10}/></span>
                                <h2 className="text-[9px] font-bold text-slate-700">Resolvidas</h2>
                            </div>
                            <div className="flex items-center justify-between relative z-10 mt-auto px-1">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-slate-800">312</div>
                                    <div className="text-[6px] uppercase font-bold text-slate-400">Feitas</div>
                                </div>
                                <div className="w-px h-5 bg-gray-100"></div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-emerald-500">245</div>
                                    <div className="text-[6px] uppercase font-bold text-slate-400">Acertos</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-3 text-white shadow-lg relative overflow-hidden flex justify-between items-center mb-3 shrink-0">
                        <div className="absolute -right-2 -bottom-2 text-yellow-500/10 pointer-events-none"><Zap size={60} /></div>
                        <div className="relative z-10 flex flex-col gap-1 max-w-[150px]">
                            <div className="inline-flex items-center gap-1 bg-slate-800/50 backdrop-blur w-max px-1.5 py-0.5 rounded-full border border-slate-700">
                                <Zap className="text-yellow-400" size={8} fill="currentColor" /> 
                                <span className="text-[6px] font-bold text-yellow-100 uppercase tracking-wide">Caderno Automático</span>
                            </div>
                            <h2 className="text-[10px] font-bold leading-tight">Transforme erros em acertos</h2>
                        </div>
                        
                        {/* BOTÃO MÁGICO + CURSOR */}
                        <div className="relative z-20">
                            {animState === 2 && (
                                <span className="absolute inset-0 flex h-full w-full z-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-md bg-yellow-400 opacity-60"></span>
                                </span>
                            )}

                            <div className={`relative z-10 bg-yellow-500 text-slate-900 font-bold py-1.5 px-3 rounded-md flex items-center justify-center gap-1 text-[8px] shadow-md transition-all duration-300 ${animState === 2 ? 'scale-110 ring-4 ring-yellow-500/50 bg-yellow-400 shadow-xl shadow-yellow-500/40 -translate-y-0.5' : animState === 3 ? 'scale-95 bg-yellow-600 translate-y-0 ring-0' : ''}`}>
                                <PlayCircle size={10} fill="currentColor" /> Matar Erros
                            </div>

                            <div className={`absolute top-full left-1/2 mt-1 transition-all pointer-events-none z-50 ${
                                animState === 0 ? 'duration-0 opacity-0 translate-y-10 translate-x-10' : 
                                animState === 1 ? 'duration-700 opacity-100 translate-y-6 translate-x-6 ease-out' :
                                animState === 2 ? 'duration-500 opacity-100 -translate-y-3 -translate-x-1 ease-out' :
                                animState === 3 ? 'duration-150 opacity-100 -translate-y-3 -translate-x-1 scale-75 ease-in' :
                                'duration-300 opacity-0 -translate-y-3 -translate-x-1 scale-75'
                            }`}>
                                <MousePointer2 className="text-slate-900 fill-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" size={20} />
                            </div>
                        </div>

                    </div>

                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm w-full flex flex-col flex-1 overflow-hidden">
                        <div className="flex items-center justify-between mb-2 shrink-0">
                            <div className="flex items-center gap-1.5">
                                <div className="p-1 bg-purple-50 text-purple-600 rounded-md"><BarChart3 size={10} /></div>
                                <h2 className="font-bold text-slate-800 text-[10px]">Top Tópicos</h2>
                            </div>
                        </div>
                        <PerformanceTopicFilters />
                        <PerformanceTopicsList />
                    </div>
                </div>
            </AppShell>

            {/* O MODAL FICA AQUI FORA COBRINDO TUDO */}
            {showModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl w-[85%] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden">
                        <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-white">
                            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                <Zap className="text-yellow-500" fill="currentColor" size={12}/> Erros
                            </h3>
                            <div className="text-gray-400 rounded-full p-1"><X size={12}/></div>
                        </div>
                        
                        <div className="p-4">
                            <div className="bg-yellow-50 p-2.5 rounded-xl border border-yellow-100 mb-4 flex gap-2">
                                <Zap className="text-yellow-600 shrink-0 mt-0.5" size={14} />
                                <div className="text-yellow-900 text-[9px] leading-relaxed">
                                    <strong>14 questões</strong> com erro nos treinos recentes. Bora revisar?
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-[9px] font-bold text-slate-700 mb-2">Quantidade</label>
                                <div className="grid grid-cols-5 gap-1.5">
                                    {[10, 20, 30, 40, 50].map(qtd => (
                                        <div key={qtd} className={`py-1.5 rounded-md font-bold text-[9px] text-center ${qtd === 10 ? 'bg-yellow-500 text-white shadow-sm ring-1 ring-yellow-500 ring-offset-1' : 'bg-gray-100 text-gray-500'}`}>
                                            {qtd}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="w-full py-2.5 rounded-xl bg-yellow-500 text-white font-bold text-[10px] shadow-lg shadow-yellow-200 flex items-center justify-center gap-1.5">
                                <Play size={12} fill="currentColor" /> Revisar
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const MockupFlashcards = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFlipped(prev => !prev);
        }, 2500); 
        return () => clearInterval(interval);
    }, []);

    return (
        <AppShell activeTab="flashcards">
            <div className="flex flex-col h-full w-full bg-gray-50/50 p-4 relative box-border">
                <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-3 flex-shrink-0 w-full min-w-0 gap-2 relative z-10">
                    <button className="text-gray-400 bg-white border border-gray-200 shadow-sm p-1.5 rounded-lg shrink-0"><X size={14} /></button>
                    <div className="text-center min-w-0 flex-1">
                        <h3 className="font-bold text-slate-700 truncate text-[9px]">Sangramentos da Gestação</h3>
                        <p className="text-[7px] text-gray-400">12 / 45</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        <button className="text-gray-400 bg-white border border-gray-200 shadow-sm p-1.5 rounded-lg">
                            <Heart size={12} fill="none" />
                        </button>
                        <button className="text-gray-400 bg-white border border-gray-200 shadow-sm p-1.5 rounded-lg"><Flag size={12} /></button>
                    </div>
                </div>

                <div className="w-full h-1.5 bg-gray-200 rounded-full mb-3 flex-shrink-0 overflow-hidden min-w-0 relative z-10">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-300 w-[26%]"></div>
                </div>

                <div className="flex-1 relative min-h-0 mb-3 group w-full perspective-1000 z-10">
                    <div className={`w-full h-full rounded-2xl border-2 shadow-sm flex flex-col items-center justify-center p-4 text-center transition-all duration-300 overflow-hidden min-w-0 box-border ${isFlipped ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/20' : 'bg-white border-gray-100 ring-1 ring-black/5'}`}>
                        <span className={`absolute top-3 left-4 text-[7px] font-bold uppercase tracking-widest shrink-0 ${isFlipped ? 'text-blue-500' : 'text-gray-400'}`}>
                            {isFlipped ? 'Resposta' : 'Pergunta'}
                        </span>
                        
                        <h2 className={`text-[11px] font-bold leading-relaxed px-2 w-full break-words ${isFlipped ? 'text-blue-900' : 'text-slate-800'}`}>
                            {isFlipped ? 'Placenta Prévia e Descolamento Prematuro da Placenta (DPP).' : 'Qual a principal causa de sangramento na segunda metade da gestação?'}
                        </h2>
                        
                        <p className={`absolute bottom-3 text-[7px] font-medium shrink-0 animate-pulse ${isFlipped ? 'text-blue-400' : 'text-gray-400'}`}>
                            {isFlipped ? 'Toque para voltar' : 'Toque para ver a resposta'}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-2 flex-shrink-0 min-w-0 w-full relative z-10">
                    <button className="flex-1 py-2 px-2 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-500 font-bold flex items-center justify-center gap-1 min-w-0">
                        <ChevronLeft size={12} className="shrink-0" /> 
                        <span className="truncate text-[8px]">Anterior</span>
                    </button>
                    <button className="flex-[2] py-2 px-2 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-1 min-w-0 bg-blue-600 shadow-blue-500/20">
                        <span className="truncate text-[8px]">Próximo</span> 
                        <ChevronRight size={12} className="shrink-0" />
                    </button>
                </div>

            </div>
        </AppShell>
    );
};

// --- Componente Principal da Jornada (COM AJUSTE DE MARGENS E ESPAÇO FINAL) ---
export const ScrollStorytelling = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);
  
  // Motor para detectar a rolagem e jogar para a Seção de Preços
  const isAutoScrolling = useRef(false);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollDir = useRef("down");

  useEffect(() => {
      const handleScroll = () => {
          const currentY = window.scrollY;
          scrollDir.current = currentY > lastScrollY.current ? "down" : "up";
          lastScrollY.current = currentY;
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStepEnter = (index) => {
      setActiveStep(index);
      
      if (scrollDir.current === "down" && !isAutoScrolling.current && typeof window !== 'undefined' && window.innerWidth >= 1024) {
          isAutoScrolling.current = true;
          const el = document.getElementById(`story-step-${index}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => { isAutoScrolling.current = false; }, 800);
      }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-500, 500], [10, -10]);
  const rotateY = useTransform(x, [-800, 800], [-10, 10]);

  const handleMouseMove = (event) => {
    if (typeof window !== 'undefined') {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const steps = [
    {
      id: 0,
      title: "Aposente as apostilas. Vá direto ao alvo.",
      copy: "Estudar a medicina inteira é impossível (e inútil). Crie listas de questões filtradas exatamente para o seu nível, separadas por Grande Área ou focadas nas bancas das residências que você mais sonha em passar. O estudo ativo começa aqui.",
      icon: Target,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      border: "border-blue-500/30"
    },
    {
      id: 1,
      title: "O raio-x do seu cérebro.",
      copy: "Conforme você resolve as questões, o algoritmo do MedMaps trabalha em silêncio. Ele mapeia cada acerto e cada tropeço, revelando os seus pontos cegos com uma precisão que nenhum cursinho tradicional consegue entregar.",
      icon: Activity,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/30"
    },
    {
      id: 2,
      title: "O fim do 'erro bobo'.",
      copy: "Chega de errar a mesma pegadinha duas vezes. O sistema compila automaticamente tudo o que você errou nos últimos dias e cria um 'Simulado de Resgate'. Transforme suas maiores fraquezas em pontos garantidos na prova.",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/30"
    },
    {
      id: 3,
      title: "Hackeando a curva do esquecimento.",
      copy: "Matérias densas evaporam da mente. Com os Flashcards integrados e o sistema de Repetição Espaçada, o MedMaps te obriga a revisar o conteúdo exato no momento em que seu cérebro estava prestes a esquecer. Memória blindada.",
      icon: BrainCircuit,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      border: "border-purple-500/30"
    }
  ];

  return (
    <section 
        className="bg-[#050508] relative pt-10 pb-20 lg:pt-12 lg:pb-32 overflow-clip border-t border-slate-800/50"
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Coluna da Esquerda */}
        <div className="w-full lg:w-1/2 relative pb-[10vh] lg:pb-0">
            {/* O Título desceu pra colar com o primeiro bloco */}
            <div className="mb-12 lg:mb-16 pt-10 lg:pt-[15vh]">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    A jornada do <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Estudo Cirúrgico.</span>
                </h2>
                <p className="text-slate-400 text-lg">O passo a passo que transforma esforço em aprovação.</p>
            </div>

            <div className="space-y-[15vh] lg:space-y-[60vh] relative">
                {steps.map((step, index) => (
                    <motion.div 
                        key={step.id}
                        id={`story-step-${index}`} 
                        onViewportEnter={() => handleStepEnter(index)}
                        viewport={{ amount: 0.6, margin: "-10% 0px -20% 0px" }}
                        className={`transition-all duration-700 flex flex-col justify-center ${activeStep === index ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}
                    >
                        <div className="lg:hidden w-[340px] h-[220px] mx-auto mb-10 relative bg-slate-900 rounded-3xl border-[8px] border-slate-800 shadow-2xl overflow-hidden ring-4 ring-[#050508]">
                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-slate-950 rounded-full z-50"></div>
                            <div className="absolute inset-0 z-[100] cursor-default" onMouseEnter={() => setIsSlideshowPaused(true)} onMouseLeave={() => setIsSlideshowPaused(false)} />
                            {index === 0 && <MockupFocoSlideshow isPaused={isSlideshowPaused} />}
                            {index === 1 && <MockupDiagnostico />}
                            {index === 2 && <MockupErros isActive={activeStep === 2} />}
                            {index === 3 && <MockupFlashcards />}
                        </div>

                        <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center mb-6`}>
                            <step.icon className={step.color} size={28} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{step.title}</h3>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed">{step.copy}</p>
                    </motion.div>
                ))}

                {/* FIO DE TROPEÇO BLINDADO: 
                    Posicionado como um bloco físico invisível logo após o Flashcard. 
                    Sem buraco branco, e PUXA para o id="#planos" suavemente! */}
                <motion.div 
                    className="w-full h-[5vh] mt-[5vh] lg:mt-[35vh] pointer-events-none"
                    onViewportEnter={() => {
                        if (scrollDir.current === "down" && !isAutoScrolling.current) {
                            isAutoScrolling.current = true;
                            const pricingEl = document.getElementById('planos');
                            if (pricingEl) pricingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            setTimeout(() => { isAutoScrolling.current = false; }, 1000);
                        }
                    }}
                />
            </div>
        </div>

        <div className="hidden lg:flex w-1/2 sticky top-0 h-screen items-center justify-center pointer-events-none" style={{ perspective: 1500 }}>
            <motion.div 
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-[550px] xl:w-[640px] h-[380px] xl:h-[440px] bg-slate-900 rounded-[2rem] border-[12px] border-slate-800 shadow-2xl relative ring-1 ring-white/10 pointer-events-auto"
            >
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 bg-slate-950 rounded-full z-50"></div>
                <div className="relative w-full h-full bg-slate-900 overflow-hidden rounded-[1.2rem]">
                    
                    <div className="absolute inset-0 z-[100] cursor-default" onMouseEnter={() => setIsSlideshowPaused(true)} onMouseLeave={() => setIsSlideshowPaused(false)} />

                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeStep === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                        <MockupFocoSlideshow isPaused={isSlideshowPaused} />
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                        <MockupDiagnostico />
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeStep === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                        <MockupErros isActive={activeStep === 2} />
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeStep === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                        <MockupFlashcards />
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================
   4. SEÇÃO DE PLANOS (PRICING)
   ========================================= */
export const PricingSection = () => {
  return (
    <section id="planos" className="py-24 px-6 bg-[#030305] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm mb-4 inline-flex items-center gap-2">
            <Trophy size={14} /> O Melhor Custo-Benefício do Mercado
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 mt-4 tracking-tight">
            A sua aprovação custa menos <br className="hidden md:block"/> que um lanche por dia.
          </h2>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Cancele as mensalidades abusivas dos cursinhos. Escolha o plano de alta performance que cabe no seu bolso.
          </p>
        </div>

        {/* Foi adicionado mt-8 pt-4 no grid para dar espaço seguro para a etiqueta flutuar no mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mt-8 pt-4">
          
          {/* PLANO MENSAL */}
          <div className="bg-slate-900/40 rounded-[2rem] p-8 md:p-10 border border-slate-700/50 backdrop-blur-sm transition-all flex flex-col mt-4 lg:mt-8 hover:border-slate-600/50 relative">
            <h3 className="text-2xl font-bold text-white mb-2">Mensal</h3>
            <p className="text-sm text-slate-400 mb-6 font-medium">Liberdade total para testar os recursos premium.</p>
            <div className="mb-8">
               <span className="text-5xl font-black text-white">R$ 19</span>
               <span className="text-2xl font-bold text-slate-500">,90</span>
               <span className="text-sm text-slate-500 font-bold ml-1">/mês</span>
            </div>
            <button className="w-full py-4 px-4 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors mb-8 text-lg">
                Assinar Mensal
            </button>
            <div className="space-y-4 mt-auto">
              {['Acesso ilimitado ao banco', 'Simulados customizáveis', 'Flashcards (SRS)', 'Raio-X de Desempenho'].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check size={20} strokeWidth={3} className="text-slate-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PLANO TRIMESTRAL (DESTAQUE) */}
          <div className="bg-gradient-to-b from-cyan-950/80 to-slate-900/80 rounded-[2rem] p-8 md:p-10 border border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.15)] transform lg:-translate-y-4 flex flex-col relative z-20 backdrop-blur-md">
            
            {/* O Fundo Gradiente ganhou rounded-t-[2rem] para não vazar pelas bordas lisas do cartão */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none rounded-t-[2rem]" />
            
            {/* BADGE FLUTUANTE (AGORA LIVRE PARA VAZAR) */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 flex justify-center w-full z-30">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-[0_10px_20px_-5px_rgba(6,182,212,0.4)] border border-cyan-300/30 whitespace-nowrap">
                🔥 ESCOLHA INTELIGENTE
              </span>
            </div>
            
            {/* Textos com relative z-10 para passarem por cima do gradiente de fundo */}
            <h3 className="text-2xl font-bold text-white mt-2 mb-2 relative z-10">Trimestral</h3>
            <p className="text-sm text-cyan-100/70 mb-6 font-medium relative z-10">Foco total na reta final. Intensidade e estratégia.</p>
            
            <div className="mb-2 flex items-center gap-2 relative z-10">
              <span className="text-sm text-slate-500 line-through font-bold">R$ 59,70</span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider">ECONOMIZE 16%</span>
            </div>
            
            <div className="mb-2 relative z-10">
               <span className="text-6xl font-black text-white">R$ 16</span>
               <span className="text-2xl font-bold text-cyan-500">,63</span>
               <span className="text-sm text-cyan-100/50 font-bold ml-1">/mês</span>
            </div>
            <p className="text-sm text-cyan-400/80 font-bold mb-8 relative z-10">Cobrado R$ 49,90 a cada 3 meses.</p>
            
            <button className="relative w-full py-4 px-4 rounded-xl font-black text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all transform hover:-translate-y-1 mb-8 text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] overflow-hidden group z-10">
              <span className="relative z-10">Garantir Acesso Trimestral</span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
            </button>
            
            <div className="space-y-4 mt-auto bg-slate-950/50 p-6 rounded-xl border border-white/5 relative z-10">
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">Tudo do mensal, mais:</p>
              {['Análise Cirúrgica Avançada', 'Filtros exclusivos de bancas', 'Prioridade em Suporte'].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check size={20} strokeWidth={3} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PLANO ANUAL */}
          <div className="bg-slate-900/40 rounded-[2rem] p-8 md:p-10 border border-slate-700/50 backdrop-blur-sm transition-all flex flex-col mt-4 lg:mt-8 relative overflow-hidden hover:border-slate-600/50">
            <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 border-b border-l border-purple-500/30 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-bl-2xl">
              MAIOR DESCONTO
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Anual</h3>
            <p className="text-sm text-slate-400 mb-6 font-medium">A jornada completa com o menor valor possível.</p>
            
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-slate-500 line-through font-bold">R$ 238,80</span>
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider">-37% OFF</span>
            </div>
            <div className="mb-2">
               <span className="text-5xl font-black text-white">R$ 12</span>
               <span className="text-2xl font-bold text-slate-500">,49</span>
               <span className="text-sm text-slate-500 font-bold ml-1">/mês</span>
            </div>
            <p className="text-sm text-purple-400 font-bold mb-8">Apenas R$ 0,41 por dia! (R$ 149,90/ano)</p>
            
            <button className="w-full py-4 px-4 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors mb-8 text-lg">
              Assinar Anual
            </button>
            
            <div className="space-y-4 mt-auto">
              {['O menor preço garantido', 'Proteção contra reajustes', 'Status de Aluno Fundador', 'Acesso VIP a Novidades'].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check size={20} strokeWidth={3} className="text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* GARANTIA */}
        <div className="mt-20 flex justify-center">
          <div className="bg-slate-900/60 border border-slate-700/50 backdrop-blur-md px-8 py-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 max-w-3xl">
            <div className="bg-cyan-500/20 p-4 rounded-2xl text-cyan-400 shrink-0 border border-cyan-500/30">
              <ShieldCheck size={40} strokeWidth={2.5} />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-2">Garantia Blindada de 7 Dias</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Entre, resolva simulados, utilize os flashcards e veja a Análise de Erros em ação. Se você achar que a plataforma não vale o investimento, cancele com 1 clique e devolveremos 100% do seu dinheiro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================
   5. SEÇÃO PROVA SOCIAL & CTA FINAL
   ========================================= */
const SocialProofAndCTA = () => {
  const testimonials = [
    "A didática de G.O. me salvou na USP!",
    "Os flashcards do MedMaps são viciantes.",
    "Fui de 60% para 85% nos simulados em 2 meses.",
    "Melhor investimento para a reta final do R1.",
    "As métricas mostram exatamente onde eu erro."
  ];

  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="bg-[#050508] relative pt-12 pb-32 overflow-hidden border-t border-white/5">
      <div className="mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white tracking-tight">Quem usa, aprova. <span className="text-slate-500">(E passa).</span></h2>
        </div>
        
        <div className="relative w-full overflow-hidden flex bg-slate-900/30 py-6 border-y border-white/5">
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10" />
          
          <motion.div 
            className="flex gap-8 whitespace-nowrap px-4"
            animate={{ x: [0, -1035] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {marqueeItems.map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex text-yellow-500">
                  <Star size={14} className="fill-yellow-500" />
                  <Star size={14} className="fill-yellow-500" />
                  <Star size={14} className="fill-yellow-500" />
                  <Star size={14} className="fill-yellow-500" />
                  <Star size={14} className="fill-yellow-500" />
                </div>
                <span className="text-slate-300 font-medium text-sm md:text-base">"{text}"</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="group relative rounded-[2.5rem] p-1 bg-gradient-to-b from-cyan-500/40 to-blue-600/10 overflow-hidden transition-all duration-500 hover:shadow-[0_0_80px_rgba(6,182,212,0.3)]">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative bg-[#0a0a0f]/90 backdrop-blur-2xl rounded-[2.4rem] px-8 py-20 text-center border border-white/5 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[200px] bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight relative z-10">
              Sua aprovação está a um <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">clique de distância.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 relative z-10">
              Pare de estudar o que não cai. Junte-se aos futuros residentes que já descobriram o caminho mais inteligente.
            </p>

            <div className="relative z-10 flex justify-center">
              <button onClick={() => document.getElementById('planos').scrollIntoView({ behavior: 'smooth' })} className="relative px-10 py-5 bg-white text-slate-950 font-extrabold text-lg rounded-2xl transition-all duration-300 flex items-center gap-3 hover:scale-105 hover:bg-slate-100 shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">Garantir meu acesso agora <ArrowRight size={22} /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-500 font-medium">✨ Teste grátis. Cancele a qualquer momento.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================
   PÁGINA PRINCIPAL (EXPORT)
   ========================================= */
export default function LandingPage() {
  return (
    <div className="bg-[#050508] min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <HeroMedMaps />
      <BentoFeatures />
      <ScrollStorytelling />
      <PricingSection />
      <SocialProofAndCTA />
    </div>
  );
}
