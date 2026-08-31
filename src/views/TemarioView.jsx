import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  Layers, 
  Video, 
  Bookmark, 
  Sparkles 
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const TemarioView = () => {
  const { 
    carnetData, 
    openTopic, 
    completedTopics, 
    toggleTopicCompletion,
    bookmarkedTopics,
    toggleBookmark
  } = useProgress();

  const [selectedBlockId, setSelectedBlockId] = useState(null); // null = all
  const [filterStatus, setFilterStatus] = useState('all'); // all, completed, pending, bookmarked
  const [searchQuery, setSearchQuery] = useState('');

  // Filter topics
  const filteredTopics = useMemo(() => {
    return carnetData.topics.filter(t => {
      // Block filter
      if (selectedBlockId && t.blockId !== selectedBlockId) return false;
      
      // Status filter
      const isCompleted = completedTopics.includes(t.id);
      const isBookmarked = bookmarkedTopics.includes(t.id);
      if (filterStatus === 'completed' && !isCompleted) return false;
      if (filterStatus === 'pending' && isCompleted) return false;
      if (filterStatus === 'bookmarked' && !isBookmarked) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          t.title.toLowerCase().includes(q) ||
          t.synonyms.toLowerCase().includes(q) ||
          t.queSaber.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [carnetData, selectedBlockId, filterStatus, searchQuery, completedTopics, bookmarkedTopics]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-5 sm:p-10 rounded-3xl bg-gradient-to-b from-[#111827] via-[#101622] to-[#0B0F17] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-2xl">
        <div className="space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-2 text-sky-400 text-[10px] sm:text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Índice del Manual</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Los 36 Capítulos del Temario
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
            Estructurado en 8 bloques con las 55.939 palabras del curso de Igor y verificación legal de la DGT 2026.
          </p>
        </div>

        {/* Global progress metric */}
        <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 shadow-inner self-start md:self-auto">
          <div className="text-left md:text-right">
            <span className="text-[10px] sm:text-[11px] text-slate-400 block font-mono uppercase tracking-wider">Temas leídos</span>
            <span className="text-lg sm:text-xl font-black text-white font-mono">
              {completedTopics.length} / 36
            </span>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs sm:text-sm font-mono">
            {Math.round((completedTopics.length / 36) * 100)}%
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="space-y-3 sm:space-y-4">
        
        {/* Search input and status pills */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tema (ej. 'alcohol', 'velocidades', 'luces')..."
              className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 bg-[#101622] border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500/60 transition-colors shadow-inner"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Todos (36)' },
              { id: 'pending', label: 'Pendientes' },
              { id: 'completed', label: 'Completados' },
              { id: 'bookmarked', label: 'Guardados' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                  filterStatus === f.id
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'bg-[#101622] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Blocks Filter Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedBlockId(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
              selectedBlockId === null
                ? 'bg-white text-slate-950 font-black shadow-sm'
                : 'bg-[#101622] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todos
          </button>
          {carnetData.blocks.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBlockId(b.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 active:scale-95 ${
                selectedBlockId === b.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm font-bold'
                  : 'bg-[#101622] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>0{b.id}:</span>
              <span>{b.title}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredTopics.map((t) => {
          const isCompleted = completedTopics.includes(t.id);
          const isBookmarked = bookmarkedTopics.includes(t.id);

          return (
            <div
              key={t.id}
              className={`group relative p-4 sm:p-6 rounded-3xl bg-[#101622] hover:bg-[#131b2b] border transition-all duration-150 flex flex-col justify-between shadow-md ${
                isCompleted 
                  ? 'border-emerald-500/30 bg-emerald-950/10' 
                  : 'border-slate-800/90 hover:border-sky-500/50 hover:shadow-lg'
              }`}
            >
              <div>
                
                {/* Card Top Row */}
                <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/20">
                      Capítulo {t.id}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {t.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Bookmark Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(t.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors active:scale-90 ${
                        isBookmarked 
                          ? 'text-amber-400 bg-amber-500/10' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isBookmarked ? 'Guardado en favoritos' : 'Guardar tema'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    {/* Completed Checkmark Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTopicCompletion(t.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors active:scale-90 ${
                        isCompleted 
                          ? 'text-emerald-400 bg-emerald-500/10' 
                          : 'text-slate-500 hover:text-emerald-400'
                      }`}
                      title={isCompleted ? 'Marcar como pendiente' : 'Marcar como completado'}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Topic Title */}
                <h3 
                  onClick={() => openTopic(t.id)}
                  className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
                >
                  {t.title}
                </h3>

                {/* Block Name */}
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-1">
                  {t.blockName}
                </p>

                {/* Key takeaway preview */}
                <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed font-sans">
                  {t.verificacionDGT}
                </p>

              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono">
                  {t.timestampStart}
                </span>

                <button
                  onClick={() => openTopic(t.id)}
                  className="flex items-center gap-1 text-xs font-bold text-sky-400 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all active:scale-95"
                >
                  <span>Abrir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12 bg-[#101622] rounded-3xl border border-slate-800">
          <p className="text-sm font-bold text-slate-300">No hay temas que coincidan con la búsqueda</p>
          <button
            onClick={() => {
              setSelectedBlockId(null);
              setFilterStatus('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-xl text-xs font-bold transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}

    </div>
  );
};
