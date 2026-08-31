import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Video, 
  Scale, 
  Sparkles, 
  AlertOctagon, 
  Lightbulb, 
  Car, 
  Clock, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  BookOpen,
  Target,
  Hash,
  Share2,
  FileCheck2,
  Bot,
  Flame,
  HelpCircle
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const TopicDetailView = () => {
  const { 
    carnetData, 
    selectedTopicId, 
    openTopic, 
    setCurrentView,
    completedTopics, 
    toggleTopicCompletion,
    bookmarkedTopics, 
    toggleBookmark,
    setQueryModalOpen
  } = useProgress();

  const [activeLayer, setActiveLayer] = useState('all'); // 'all', 'igor', 'dgt'
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  const topic = carnetData.topics.find(t => t.id === selectedTopicId) || carnetData.topics[0];
  const isCompleted = completedTopics.includes(topic.id);
  const isBookmarked = bookmarkedTopics.includes(topic.id);

  // Prev and next topic navigation
  const currentIndex = carnetData.topics.findIndex(t => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? carnetData.topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < carnetData.topics.length - 1 ? carnetData.topics[currentIndex + 1] : null;

  // Matching trap if any
  const matchingTrap = carnetData.trampas.find(tr => tr.topicId === topic.id);

  // Key numbers extraction for quick scan cards
  const extractKeyNumbers = (text) => {
    if (!text) return [];
    const matches = text.match(/\b\d+([,.]\d+)?\s*(km\/h|m|metros|cm|segundos|s|puntos|g\/l|mg\/l|kg|toneladas|años|meses|horas|%)\b/gi) || [];
    return Array.from(new Set(matches)).slice(0, 8);
  };

  const keyNumbers = extractKeyNumbers(`${topic.queSaber} ${topic.verificacionDGT} ${topic.excepciones}`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowFullTranscript(false);
  }, [selectedTopicId]);

  return (
    <article className="space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Quick Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <button
          onClick={() => setCurrentView('temario')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl bg-[#0D1527] border border-slate-700/80 hover:border-cyan-400/60 transition-colors group active:scale-98 cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Índice de los 36 Capítulos</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Ask AI About this Topic */}
          <button
            onClick={() => setQueryModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-purple-950/40 text-purple-300 border border-purple-500/40 hover:bg-purple-900/50 transition-all cursor-pointer shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="hidden sm:inline">Duda con Musa</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(topic.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
              isBookmarked 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' 
                : 'bg-[#0D1527] text-slate-400 border border-slate-700/80 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">{isBookmarked ? 'Guardado' : 'Guardar'}</span>
          </button>

          {/* Completed Toggle Button */}
          <button
            onClick={() => toggleTopicCompletion(topic.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
              isCompleted 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                : 'bg-[#0D1527] text-slate-200 border border-slate-700/80 hover:border-emerald-500/50 hover:text-emerald-400'
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            <span>{isCompleted ? 'Completado' : 'Marcar Leído'}</span>
          </button>
        </div>
      </div>

      {/* Chapter Editorial Header */}
      <header className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#111A33] via-[#0E1528] to-[#0A0F1D] border border-slate-700/80 shadow-2xl space-y-4 relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Eyebrow & Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest">
              Capítulo {topic.id} de 36
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Bloque 0{topic.blockId}: {topic.blockName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-[#090E1A] px-2.5 py-1 rounded-lg border border-slate-700">
            <Clock className="w-3.5 h-3.5" />
            <span>Vídeo: {topic.timestampStart} - {topic.timestampEnd}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight leading-tight relative z-10">
          {topic.title}
        </h1>

        {/* Subtitle / Key Focus */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans relative z-10">
          {topic.description || topic.synonyms}
        </p>

        {/* Layer Tabs */}
        <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="p-1 rounded-2xl bg-[#090E1A] border border-slate-700 flex flex-wrap gap-1 w-full sm:w-auto shadow-inner">
            {[
              { id: 'all', label: '📖 Guía Completa', icon: BookOpen },
              { id: 'igor', label: '🎥 Explicación de Igor', icon: Video },
              { id: 'dgt', label: '⚖️ Verificación DGT', icon: Scale }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeLayer === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLayer(tab.id)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-sky-500/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <a 
            href={`https://www.youtube.com/watch?v=M57bE6iHk4A&t=${topic.timestampStart.split(':')[0]}m`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 transition-colors"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Ver minuto {topic.timestampStart} en YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </header>

      {/* 🔢 CIFRAS Y MEDIDAS CLAVE (Key Figures Highlight Bar) */}
      {keyNumbers.length > 0 && (
        <section className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#1F1406]/90 to-[#0A0F1D] border border-amber-500/40 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase font-mono tracking-wider">
            <Hash className="w-4 h-4 text-amber-400" />
            <span>Cifras, Medidas y Datos Clave del Capítulo</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {keyNumbers.map((num, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-[#090E1A] border border-amber-500/40 text-amber-300 font-mono font-bold text-xs sm:text-sm shadow-md"
              >
                {num}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 🎯 1. LO QUE TIENES QUE SABER (Conceptos Fundamentales) */}
      {(activeLayer === 'all' || activeLayer === 'dgt') && (
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D1E3A]/90 via-[#0B152A]/95 to-[#080D1A] border border-blue-500/40 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Target className="w-4 h-4 text-blue-300" />
            <span>🎯 1. Lo que Tienes que Saber (Conceptos Fundamentales)</span>
          </div>
          <div className="text-xs sm:text-base text-slate-200 leading-relaxed reading-prose whitespace-pre-line font-sans">
            {topic.queSaber}
          </div>
        </section>
      )}

      {/* 📖 2. LA EXPLICACIÓN PEDAGÓGICA DE IGOR (Vídeo) */}
      {(activeLayer === 'all' || activeLayer === 'igor') && (
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#072633]/90 via-[#081A24]/95 to-[#080D1A] border border-cyan-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">
              <Video className="w-4 h-4 text-cyan-300" />
              <span>📖 2. Explicación Pedagógica de Igor (Vídeo)</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {topic.timestampStart} - {topic.timestampEnd}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#090E1A]/90 border border-cyan-500/30 text-xs sm:text-base text-cyan-100 italic leading-relaxed reading-prose shadow-inner">
            «{topic.explicacionIgor}»
          </div>

          {/* Toggle Full Transcript */}
          <div>
            <button
              onClick={() => setShowFullTranscript(prev => !prev)}
              className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>{showFullTranscript ? 'Ocultar transcripción íntegra de la clase' : 'Ver transcripción literal íntegra del profesor'}</span>
              {showFullTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showFullTranscript && (
              <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-[#090E1A] border border-slate-700 text-xs text-slate-300 leading-relaxed max-h-96 overflow-y-auto font-sans whitespace-pre-line animate-in fade-in duration-150 custom-scrollbar">
                {topic.explicacionIgorCompleta}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ⚖️ 3. NORMATIVA Y VERIFICACIÓN OFICIAL DGT 2026 */}
      {(activeLayer === 'all' || activeLayer === 'dgt') && (
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#062B1B]/90 via-[#071B12]/95 to-[#080D1A] border border-emerald-500/40 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Scale className="w-4 h-4 text-emerald-300" />
            <span>⚖️ 3. Marco Legal y Verificación Normativa DGT 2026</span>
          </div>
          <p className="text-xs sm:text-base text-slate-200 leading-relaxed reading-prose font-sans">
            {topic.verificacionDGT}
          </p>
        </section>
      )}

      {/* 🧠 4. TRUCO DE MEMORIA / MNEMOTÉCNIA DE IGOR */}
      {topic.comoRecordarlo && (
        <section className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1F1240]/90 via-[#150D2A]/95 to-[#080D1A] border border-indigo-500/40 space-y-2 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Lightbulb className="w-4 h-4 text-indigo-300" />
            <span>🧠 4. Tip Mnemotécnico para Memorizar</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#090E1A]/90 border border-indigo-500/30 text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
            «{topic.comoRecordarlo}»
          </div>
        </section>
      )}

      {/* 🔄 5. EXCEPCIONES A LA REGLA GENERAL */}
      {topic.excepciones && topic.excepciones.length > 5 && (
        <section className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#140C24]/90 to-[#0A0F1D] border border-purple-500/40 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>🔄 5. Excepciones que Debes Conocer para el Examen</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed reading-prose font-sans">
            {topic.excepciones}
          </p>
        </section>
      )}

      {/* 🚗 6. EJEMPLOS PRÁCTICOS EN CONDUCCIÓN REAL */}
      {topic.ejemplos && (
        <section className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-cyan-950/30 via-[#0B1526]/90 to-[#0A0F1D] border border-cyan-500/40 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Car className="w-4 h-4 text-cyan-300" />
            <span>🚗 6. Ejemplo Práctico en Tráfico Real</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed reading-prose font-sans">
            {topic.ejemplos}
          </p>
        </section>
      )}

      {/* ⚠️ 7. TRAMPAS DE EXAMEN Y ERRORES FRECUENTES */}
      <section className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#330B1B]/90 via-[#1E0913]/95 to-[#080D1A] border border-rose-500/40 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-widest font-mono">
          <AlertOctagon className="w-4 h-4 text-rose-300" />
          <span>⚠️ 7. Trampas de Examen y Errores Frecuentes (DGT)</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#090E1A]/90 border border-rose-500/30 text-xs sm:text-sm text-rose-200 leading-relaxed reading-prose">
          {topic.trampas || (matchingTrap ? matchingTrap.trampa : 'Presta especial atención a los enunciados negativos ("no", "salvo", "excepto") en las preguntas sobre este tema.')}
        </div>
      </section>

      {/* Chapter Bottom Navigation & Next Chapter Footer */}
      <footer className="pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevTopic ? (
          <button
            onClick={() => openTopic(prevTopic.id)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#0D1527] hover:bg-[#111A33] border border-slate-700/80 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Tema {prevTopic.id}: {prevTopic.title.substring(0, 20)}...</span>
          </button>
        ) : <div />}

        {nextTopic ? (
          <button
            onClick={() => openTopic(nextTopic.id)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-sky-500/25 transition-all cursor-pointer"
          >
            <span>Siguiente: Tema {nextTopic.id}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentView('examen')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs sm:text-sm font-bold shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>¡Temario Finalizado! Hacer Test Final</span>
          </button>
        )}
      </footer>

    </article>
  );
};
