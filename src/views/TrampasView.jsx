import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Search, 
  Lightbulb, 
  CheckCircle2, 
  BookOpen, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const TrampasView = () => {
  const { carnetData, openTopic } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedIds, setRevealedIds] = useState([]);

  const categories = ['all', 'Velocidades', 'Alcoholemia', 'Prioridades', 'Carriles Especiales', 'Alumbrado', 'Maniobras', 'Seguridad Pasiva', 'Mecánica Básica', 'Primeros Auxilios'];

  const toggleReveal = (id) => {
    setRevealedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredTraps = carnetData.trampas.filter(tr => {
    if (selectedCategory !== 'all' && tr.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        tr.situation.toLowerCase().includes(q) ||
        tr.correctAnswer.toLowerCase().includes(q) ||
        tr.confusion.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#16111B] via-[#101622] to-[#0B0F17] border border-rose-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Detector de Fallos Frecuentes DGT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Las 25 Preguntas Trampa del Examen
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
            Preguntas redactadas para confundir al alumno. Descubre el motivo del error, la norma oficial y la mnemotécnica para no fallar.
          </p>
        </div>

        <button
          onClick={() => {
            if (revealedIds.length === carnetData.trampas.length) {
              setRevealedIds([]);
            } else {
              setRevealedIds(carnetData.trampas.map(t => t.id));
            }
          }}
          className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 transition-all shrink-0 shadow-sm"
        >
          {revealedIds.length === carnetData.trampas.length ? 'Ocultar todas las trampas' : 'Desplegar todas las soluciones (25)'}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por pregunta o tema (ej. 'doble fila', 'ciclomotor', 'airbag', 'menor')..."
            className="w-full pl-11 pr-4 py-3 bg-[#101622] border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-rose-500/60 transition-colors shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-[#101622] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? `Todas (${carnetData.trampas.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Traps Accordion List */}
      <div className="space-y-4">
        {filteredTraps.map((tr) => {
          const isRevealed = revealedIds.includes(tr.id);

          return (
            <div
              key={tr.id}
              className={`p-6 rounded-3xl bg-[#101622] border transition-all duration-200 shadow-md space-y-4 ${
                isRevealed ? 'border-rose-900/60 bg-[#131722]' : 'border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Question Row */}
              <div 
                onClick={() => toggleReveal(tr.id)}
                className="flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {tr.id < 10 ? `0${tr.id}` : tr.id}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 inline-block mb-1.5">
                      {tr.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {tr.situation}
                    </h3>
                  </div>
                </div>

                <button className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-950/60 border border-slate-800 shrink-0 mt-1">
                  {isRevealed ? <ChevronUp className="w-4 h-4 text-rose-400" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Revealable Solution & Explanation */}
              {isRevealed && (
                <div className="space-y-4 pt-4 border-t border-slate-800/80 animate-in fade-in duration-150">
                  
                  {/* Step 1: Why it confuses */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-xs sm:text-sm space-y-1">
                    <span className="font-bold text-rose-400 uppercase tracking-widest text-[11px] font-mono flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" /> ¿Por qué falla la mayoría en el examen?
                    </span>
                    <p className="text-slate-300 leading-relaxed pt-1">
                      {tr.confusion}
                    </p>
                  </div>

                  {/* Step 2: Correct Answer */}
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-xs sm:text-sm space-y-1">
                    <span className="font-bold text-emerald-400 uppercase tracking-widest text-[11px] font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ✅ Respuesta Oficial Correcta:
                    </span>
                    <p className="text-emerald-200 font-semibold leading-relaxed pt-1">
                      {tr.correctAnswer}
                    </p>
                  </div>

                  {/* Step 3: Mnemonic / Igor's Trick */}
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs sm:text-sm space-y-1">
                    <span className="font-bold text-amber-400 uppercase tracking-widest text-[11px] font-mono flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" /> 🧠 Mnemotécnica de Igor para recordarlo:
                    </span>
                    <p className="text-amber-100 font-medium italic leading-relaxed pt-1">
                      «{tr.mnemonic}»
                    </p>
                  </div>

                  {/* Reference to Study Topic & Timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <button
                      onClick={() => openTopic(tr.topicId)}
                      className="text-sky-400 hover:text-sky-300 flex items-center gap-1.5 font-bold hover:underline"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Ver explicación en Tema {tr.topicId}: {tr.topicTitle}</span>
                    </button>

                    <span className="text-[11px] font-mono text-slate-400">
                      Timestamp en vídeo: {tr.timestamp}
                    </span>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
