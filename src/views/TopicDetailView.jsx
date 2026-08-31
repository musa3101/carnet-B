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
  FileCheck2
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
    toggleBookmark
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
    return Array.from(new Set(matches)).slice(0, 6);
  };

  const keyNumbers = extractKeyNumbers(`${topic.queSaber} ${topic.verificacionDGT} ${topic.excepciones}`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowFullTranscript(false);
  }, [selectedTopicId]);

  return (
    <article className="space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <button
          onClick={() => setCurrentView('temario')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-[#101622] border border-slate-800 hover:border-slate-700 transition-colors group active:scale-98"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Índice del Temario</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(topic.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              isBookmarked 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' 
                : 'bg-[#101622] text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">{isBookmarked ? 'Guardado' : 'Guardar'}</span>
          </button>

          {/* Completed Toggle Button */}
          <button
            onClick={() => toggleTopicCompletion(topic.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              isCompleted 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'bg-[#101622] text-slate-300 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-400'
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            <span>{isCompleted ? 'Completado' : 'Marcar Leído'}</span>
          </button>
        </div>
      </div>

      {/* Chapter Editorial Header */}
      <header className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#111827] via-[#0E1524] to-[#0A0E18] border border-slate-800 shadow-xl space-y-4">
        
        {/* Eyebrow & Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30 uppercase tracking-widest">
              Capítulo {topic.id} de 36
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Bloque 0{topic.blockId}: {topic.blockName}
            </span>
          </div>

          {/* YouTube Video Link */}
          <a
            href={topic.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 text-xs font-mono font-bold hover:scale-102 transition-all shadow-sm"
            title="Abrir este punto exacto en el vídeo de Igor"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Igor: {topic.timestampStart}</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

        {/* H1 Main Chapter Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display leading-[1.12]">
          {topic.title}
        </h1>

        {/* Meta Bar */}
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Tiempo de lectura: {topic.duration}
          </span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">Verificación DGT 2026</span>
        </div>

        {/* View Layer Selector Filter (All, Igor Only, DGT Only) */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="p-1 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap gap-1 w-full sm:w-auto shadow-inner">
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
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </header>

      {/* 🔢 CIFRAS Y MEDIDAS CLAVE (Key Figures Quick Scanning Bar) */}
      {keyNumbers.length > 0 && (
        <section className="p-4 sm:p-5 rounded-3xl bg-amber-950/20 border border-amber-900/30 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono tracking-wider">
            <Hash className="w-3.5 h-3.5" />
            <span>Cifras y Datos Clave del Capítulo (Escanear Rápido)</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {keyNumbers.map((num, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs sm:text-sm shadow-sm"
              >
                {num}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 🎯 1. LO QUE TIENES QUE SABER (Conceptos Fundamentales) */}
      {(activeLayer === 'all' || activeLayer === 'dgt') && (
        <section className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Target className="w-4 h-4" />
            <span>🎯 1. Lo que Tienes que Saber (Conceptos Fundamentales)</span>
          </div>
          <div className="text-xs sm:text-base text-slate-200 leading-relaxed reading-prose whitespace-pre-line font-sans">
            {topic.queSaber}
          </div>
        </section>
      )}

      {/* 📖 2. LA EXPLICACIÓN PEDAGÓGICA DE IGOR */}
      {(activeLayer === 'all' || activeLayer === 'igor') && (
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-sky-950/25 via-[#101622] to-[#101622] border border-sky-900/40 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-widest font-mono">
              <Video className="w-4 h-4" />
              <span>📖 2. Explicación Pedagógica de Igor (Vídeo)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {topic.timestampStart} - {topic.timestampEnd}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-sky-500/20 text-xs sm:text-base text-slate-200 italic leading-relaxed reading-prose">
            «{topic.explicacionIgor}»
          </div>

          {/* Toggle Full Transcript */}
          <div>
            <button
              onClick={() => setShowFullTranscript(prev => !prev)}
              className="flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <span>{showFullTranscript ? 'Ocultar transcripción íntegra de la clase' : 'Ver transcripción literal íntegra del profesor'}</span>
              {showFullTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showFullTranscript && (
              <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed max-h-96 overflow-y-auto font-sans whitespace-pre-line animate-in fade-in duration-150">
                {topic.explicacionIgorCompleta}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ⚖️ 3. NORMATIVA Y VERIFICACIÓN OFICIAL DGT 2026 */}
      {(activeLayer === 'all' || activeLayer === 'dgt') && (
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-emerald-950/20 via-[#101622] to-[#101622] border border-emerald-900/40 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Scale className="w-4 h-4" />
            <span>⚖️ 3. Marco Legal y Verificación Normativa DGT 2026</span>
          </div>
          <p className="text-xs sm:text-base text-slate-200 leading-relaxed reading-prose">
            {topic.verificacionDGT}
          </p>
        </section>
      )}

      {/* 🔄 4. EXCEPCIONES A LA REGLA GENERAL */}
      {topic.excepciones && topic.excepciones.length > 5 && (
        <section className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/25 to-[#101622] border border-purple-900/40 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Sparkles className="w-4 h-4" />
            <span>🔄 4. Excepciones que Debes Conocer</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed reading-prose">
            {topic.excepciones}
          </p>
        </section>
      )}

      {/* 🚗 5. EJEMPLOS PRÁCTICOS EN TRÁFICO REAL */}
      {topic.ejemplos && (
        <section className="p-5 sm:p-7 rounded-3xl bg-[#101622] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Car className="w-4 h-4" />
            <span>🚗 5. Ejemplo Práctico en Conducción Real</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed reading-prose">
            {topic.ejemplos}
          </p>
        </section>
      )}

      {/* ⚠️ 6. TRAMPAS DE EXAMEN Y ERRORES FRECUENTES */}
      <section className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-rose-950/25 to-[#101622] border border-rose-900/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-widest font-mono">
            <AlertOctagon className="w-4 h-4" />
            <span>⚠️ 6. Trampas de Examen y Errores Frecuentes</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-rose-200 leading-relaxed reading-prose">
          {topic.trampas}
        </p>

        {matchingTrap && (
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-rose-800/40 space-y-1.5 text-xs">
            <span className="font-bold text-rose-300 uppercase tracking-widest font-mono text-[10px] block">
              Dilema del test:
            </span>
            <p className="text-white font-bold">"{matchingTrap.situation}"</p>
            <p className="text-slate-300 pt-1">
              <span className="text-rose-400 font-bold">Por qué confunde:</span> {matchingTrap.confusion}
            </p>
            <p className="text-emerald-300 font-bold pt-0.5">
              ✅ Respuesta correcta: {matchingTrap.correctAnswer}
            </p>
          </div>
        )}
      </section>

      {/* 🧠 7. CÓMO RECORDARLO (Mnemotécnias y Trucos de Igor) */}
      {topic.comoRecordarlo && (
        <section className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-950/25 to-[#101622] border border-amber-900/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest font-mono">
            <Lightbulb className="w-4 h-4" />
            <span>🧠 7. Cómo Recordarlo (Truco Mnemotécnico de Igor)</span>
          </div>
          <p className="text-xs sm:text-base font-bold text-amber-100 leading-relaxed reading-prose italic">
            «{topic.comoRecordarlo}»
          </p>
        </section>
      )}

      {/* 🎥 8. ACCESO DIRECTO AL VÍDEO DE IGOR */}
      <section className="p-5 sm:p-7 rounded-3xl bg-[#101622] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white">Escuchar la explicación de Igor</h4>
            <p className="text-xs text-slate-400">Timestamp: {topic.timestampStart} ({topic.duration})</p>
          </div>
        </div>

        <a
          href={topic.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all text-center"
        >
          <span>Saltar a {topic.timestampStart} en YouTube</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </section>

      {/* Keywords Tag Cloud */}
      <section className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1.5 tracking-wider">
          <Tag className="w-3.5 h-3.5" /> Índice Semántico y Términos Asociados
        </span>
        <div className="flex flex-wrap gap-1.5">
          {topic.keywords.map((kw, i) => (
            <span
              key={i}
              className="text-[10px] sm:text-[11px] px-2 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Chapter Prev / Next Navigation Bar */}
      <nav className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {prevTopic ? (
          <button
            onClick={() => openTopic(prevTopic.id)}
            className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#101622] hover:bg-slate-800 active:scale-98 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all text-left group"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400 group-hover:-translate-x-1 transition-transform shrink-0" />
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] text-slate-500 block uppercase font-mono tracking-widest">Anterior</span>
              <span className="line-clamp-1 truncate">{prevTopic.id}. {prevTopic.title}</span>
            </div>
          </button>
        ) : <div className="flex-1" />}

        {nextTopic && (
          <button
            onClick={() => openTopic(nextTopic.id)}
            className="flex-1 flex items-center justify-end gap-2.5 px-4 py-3 rounded-2xl bg-[#101622] hover:bg-slate-800 active:scale-98 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all text-right group"
          >
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] text-slate-500 block uppercase font-mono tracking-widest">Siguiente</span>
              <span className="line-clamp-1 truncate">{nextTopic.id}. {nextTopic.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        )}
      </nav>

    </article>
  );
};
