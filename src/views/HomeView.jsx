import React from 'react';
import { 
  BookOpen, 
  Search, 
  Video, 
  AlertOctagon, 
  Layers, 
  FileCheck2, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Lightbulb, 
  Play,
  AlertTriangle,
  RotateCcw,
  Target,
  Trophy,
  Bot
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const HomeView = () => {
  const { 
    carnetData, 
    setCurrentView, 
    openTopic, 
    lastVisitedTopicId, 
    completedTopics, 
    progressPercentage,
    setSearchModalOpen,
    setQueryModalOpen,
    failedQuestions,
    weakTopics,
    examHistory,
    masteredFlashcards
  } = useProgress();

  const lastTopic = carnetData.topics.find(t => t.id === lastVisitedTopicId) || carnetData.topics[0];
  const featuredTrick = carnetData.repasoRapido.mnemotecnias[0];

  const totalTests = examHistory.length;
  const passedTests = examHistory.filter(e => e.passed).length;

  const dashboardModules = [
    {
      id: 'temario',
      eyebrow: 'Módulo 01',
      title: 'El Manual Digital',
      desc: '36 capítulos estructurados con las 55.939 palabras y la doble capa pedagógica y jurídica.',
      icon: BookOpen,
      badge: `${completedTopics.length}/36 Leídos`,
      gradient: 'from-blue-600/20 via-sky-500/10 to-transparent',
      borderColor: 'hover:border-sky-500/50',
      textColor: 'text-sky-400'
    },
    {
      id: 'senales',
      eyebrow: 'Módulo 02',
      title: 'Biblioteca de Señales',
      desc: 'Catálogo visual oficial DGT con señales de peligro, prohibición, obligación y nuevas 2026.',
      icon: AlertTriangle,
      badge: 'Catálogo Visual',
      gradient: 'from-amber-600/20 via-yellow-500/10 to-transparent',
      borderColor: 'hover:border-amber-500/50',
      textColor: 'text-amber-400'
    },
    {
      id: 'examen',
      eyebrow: 'Módulo 03',
      title: 'Simulador de Tests',
      desc: 'Simulacros oficiales de 30 Qs, test por temas, test rápido y repetición de falladas.',
      icon: FileCheck2,
      badge: failedQuestions.length > 0 ? `${failedQuestions.length} Falladas` : 'Test Oficial DGT',
      gradient: 'from-emerald-600/20 via-teal-500/10 to-transparent',
      borderColor: 'hover:border-emerald-500/50',
      textColor: 'text-emerald-400'
    },
    {
      id: 'flashcards',
      eyebrow: 'Módulo 04',
      title: 'Flashcards de Repaso',
      desc: 'Memoriza con rotación 3D: velocidades, tasas de alcohol, distancias, puntos y fórmulas.',
      icon: Layers,
      badge: `${masteredFlashcards.length}/${carnetData.flashcards.length} Dominadas`,
      gradient: 'from-purple-600/20 via-indigo-500/10 to-transparent',
      borderColor: 'hover:border-purple-500/50',
      textColor: 'text-purple-400'
    },
    {
      id: 'video',
      eyebrow: 'Módulo 05',
      title: 'Curso de Igor (5h)',
      desc: 'Navegación interactiva por los 36 capítulos del vídeo con timestamps sincronizados.',
      icon: Video,
      badge: '04h 57m 57s',
      gradient: 'from-cyan-600/20 via-teal-500/10 to-transparent',
      borderColor: 'hover:border-cyan-500/50',
      textColor: 'text-cyan-400'
    },
    {
      id: 'trampas',
      eyebrow: 'Módulo 06',
      title: '25 Trampas de Examen',
      desc: 'Detector de confusiones típicas de la DGT: qué te preguntan, por qué falla el 80% y truco.',
      icon: AlertOctagon,
      badge: '25 Preguntas',
      gradient: 'from-rose-600/20 via-pink-500/10 to-transparent',
      borderColor: 'hover:border-rose-500/50',
      textColor: 'text-rose-400'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Header & Continue Studying Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#12192B] via-[#0E1422] to-[#0B0F17] border border-slate-800/90 p-5 sm:p-8 md:p-10 shadow-2xl">
        
        {/* Atmospheric ambient lighting */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-16 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          
          {/* Eyebrow & Status */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-sky-400 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Centro de Estudio Personal • DGT 2026</span>
            </div>

            <span className="text-xs font-mono text-slate-400">
              Vídeo de Igor (4h 57m) • 55.939 palabras
            </span>
          </div>

          {/* Main Title & Value Proposition */}
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-display leading-[1.12]">
              Tu Centro de Preparación del <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">Permiso B</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              El manual digital interactivo basado en las clases de Igor con verificación jurídica oficial de la DGT. Todo estructurado para memorizar en tiempo récord y aprobar a la primera.
            </p>
          </div>

          {/* Search Trigger Bar */}
          <div 
            onClick={() => setSearchModalOpen(true)}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-sky-500/60 transition-all cursor-pointer flex items-center justify-between group shadow-inner active:scale-98"
          >
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 min-w-0">
              <Search className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-200 transition-colors font-medium truncate">
                Buscar tema, señal, norma o duda (ej: 'autopista autovía', 'antiniebla', 'rotonda')...
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-1 rounded-lg border border-sky-500/20 shrink-0">
              ⌘K
            </span>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
            
            {/* Quick Resume Button */}
            <button
              onClick={() => openTopic(lastTopic.id)}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-xl shadow-sky-500/20 transition-all"
            >
              <span>Continuar: Tema {lastTopic.id} ({lastTopic.title.substring(0, 24)}...)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Test Simulation Button */}
            <button
              onClick={() => setCurrentView('examen')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 active:scale-98 text-emerald-300 border border-emerald-800/50 font-bold text-xs sm:text-sm transition-all"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Hacer Test DGT</span>
            </button>

            {/* Ask AI Professor Button */}
            <button
              onClick={() => setQueryModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 hover:from-purple-900/60 hover:to-indigo-900/60 active:scale-98 text-purple-200 border border-purple-600/50 font-bold text-xs sm:text-sm transition-all shadow-md shadow-purple-950/40"
            >
              <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Pregúntale al Profesor</span>
            </button>

          </div>

          {/* Quick Metrics Bar in Hero Footer */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Temario leído</span>
              <span className="text-base sm:text-lg font-bold text-white">{completedTopics.length} / 36 ({progressPercentage}%)</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Simulacros</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400">{passedTests} aptos ({totalTests} tests)</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Flashcards</span>
              <span className="text-base sm:text-lg font-bold text-amber-400">{masteredFlashcards.length} dominadas</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Falladas por repasar</span>
              <span className="text-base sm:text-lg font-bold text-rose-400">{failedQuestions.length} preguntas</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Where You Fail Most (Personal AI Weak Topic Diagnosis) */}
      {weakTopics.length > 0 && (
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-rose-950/25 via-[#101622] to-[#101622] border border-rose-900/40 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Target className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">Temas donde más estás fallando</h3>
                <p className="text-[11px] text-slate-400">Diagnóstico automático según tus últimos simulacros de examen</p>
              </div>
            </div>

            {failedQuestions.length > 0 && (
              <button
                onClick={() => setCurrentView('examen')}
                className="text-xs font-bold text-rose-300 hover:text-white px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/30 transition-colors"
              >
                Repetir {failedQuestions.length} falladas
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {weakTopics.slice(0, 3).map((w) => (
              <div
                key={w.topicId}
                onClick={() => openTopic(w.topicId)}
                className="p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] font-mono font-bold text-rose-400">Tema {w.topicId}</span>
                  <h4 className="text-xs font-bold text-white truncate">{w.title}</h4>
                </div>
                <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded shrink-0">
                  {w.errorCount} fallos
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Bento Grid: 6 Modular Study Pillars */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-black text-white font-display tracking-tight">
            Módulos de Estudio
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
            Selecciona la herramienta que mejor se adapte a tu ritmo de estudio de hoy
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {dashboardModules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => setCurrentView(m.id)}
                className={`group relative p-5 sm:p-6 rounded-3xl bg-[#101622] hover:bg-[#131c2d] active:scale-98 border border-slate-800/90 ${m.borderColor} transition-all duration-150 cursor-pointer shadow-lg flex flex-col justify-between overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 group-hover:border-slate-700 transition-colors">
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${m.textColor}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                      {m.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-slate-500 block mb-0.5">
                    {m.eyebrow}
                  </span>
                  
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {m.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white">
                  <span className="cta-button text-[10px] text-slate-400 group-hover:text-sky-300">Acceder ahora</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Igor's Featured Mnemonic Trick */}
      {featuredTrick && (
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-950/25 via-[#101622] to-[#101622] border border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  Mnemotécnia de Igor
                </span>
                <span className="text-xs font-bold text-amber-200">{featuredTrick.titulo} ({featuredTrick.acronimo})</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 italic leading-relaxed">
                «{featuredTrick.significado}»
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('flashcards')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors shrink-0 text-center"
          >
            Ver más trucos
          </button>
        </div>
      )}

    </div>
  );
};
