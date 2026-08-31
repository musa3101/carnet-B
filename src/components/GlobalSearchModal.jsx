import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  AlertOctagon, 
  Video, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  CornerDownLeft 
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const GlobalSearchModal = () => {
  const { searchModalOpen, setSearchModalOpen, openTopic, setCurrentView, carnetData } = useProgress();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Global keydown handler for Escape & shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && searchModalOpen) {
        e.preventDefault();
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  // Search logic
  const searchResults = useMemo(() => {
    if (!query || query.trim().length < 2) return null;
    const q = query.toLowerCase().trim();

    // 1. Match Topics
    const matchedTopics = carnetData.topics.filter(t => {
      return (
        t.title.toLowerCase().includes(q) ||
        t.synonyms.toLowerCase().includes(q) ||
        t.queSaber.toLowerCase().includes(q) ||
        t.verificacionDGT.toLowerCase().includes(q) ||
        t.trampas.toLowerCase().includes(q) ||
        t.comoRecordarlo.toLowerCase().includes(q)
      );
    }).slice(0, 5);

    // 2. Match Traps
    const matchedTraps = carnetData.trampas.filter(t => {
      return (
        t.situation.toLowerCase().includes(q) ||
        t.correctAnswer.toLowerCase().includes(q) ||
        t.confusion.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }).slice(0, 3);

    // 3. Match Video Chapters
    const matchedVideo = carnetData.videoChapters.filter(v => {
      return (
        v.title.toLowerCase().includes(q) ||
        v.snippet.toLowerCase().includes(q)
      );
    }).slice(0, 3);

    // 4. Match Flashcards
    const matchedCards = carnetData.flashcards.filter(c => {
      return (
        c.front.toLowerCase().includes(q) ||
        c.back.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }).slice(0, 2);

    const totalCount = matchedTopics.length + matchedTraps.length + matchedVideo.length + matchedCards.length;

    return {
      topics: matchedTopics,
      traps: matchedTraps,
      video: matchedVideo,
      flashcards: matchedCards,
      totalCount
    };
  }, [query, carnetData]);

  if (!searchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-2 sm:pt-16 px-2 sm:px-4 backdrop-blur-xl bg-black/85 animate-in fade-in duration-150">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={() => setSearchModalOpen(false)} />

      {/* Search Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0F1523] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        
        {/* Search Header Bar */}
        <div className="flex items-center px-3.5 sm:px-6 py-3 border-b border-slate-800 bg-slate-950/90">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0 mr-2.5 sm:mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar: 'antiniebla', 'rotonda', '1,5m', 'V16'..."
            className="w-full bg-transparent text-white placeholder:text-slate-500 text-base outline-none font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setSearchModalOpen(false)}
            className="px-2.5 py-1 text-xs font-mono font-bold text-slate-300 bg-slate-800 rounded-xl border border-slate-700 hover:bg-slate-700 active:scale-95"
          >
            Cerrar
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-5 -webkit-overflow-scrolling-touch">
          
          {/* Default suggestion tags when query is empty */}
          {!query && (
            <div className="space-y-3">
              <div>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Búsquedas más consultadas
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    "Luces antiniebla",
                    "Glorietas y rotondas",
                    "Tasas de alcoholemia",
                    "1,5 metros ciclistas",
                    "Eliminación 20 km/h",
                    "Señal V-16",
                    "Móvil 6 puntos",
                    "Menores 135 cm SRI",
                    "Sistemas ADAS",
                    "Protocolo PAS",
                    "ITV plazos",
                    "Efecto submarino"
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1.5 rounded-xl text-xs bg-slate-850 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 border border-slate-750 hover:border-sky-500/40 transition-all font-medium active:scale-95"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {searchResults && searchResults.totalCount === 0 && (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-slate-300">No encontramos resultados para "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Prueba con palabras clave como 'velocidad', 'alcohol', 'rotonda' o 'luces'.</p>
            </div>
          )}

          {searchResults && searchResults.totalCount > 0 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* 1. Topics Results */}
              {searchResults.topics.length > 0 && (
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-sky-400 mb-2 flex items-center gap-1.5 font-mono">
                    <BookOpen className="w-3.5 h-3.5" /> Temas del Manual ({searchResults.topics.length})
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {searchResults.topics.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          openTopic(t.id);
                          setSearchModalOpen(false);
                        }}
                        className="group p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-850 active:bg-slate-800 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 font-bold border border-sky-500/20">
                              Tema {t.id}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                              {t.title}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 mt-1 font-sans">
                            {t.verificacionDGT}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Traps Results */}
              {searchResults.traps.length > 0 && (
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-rose-400 mb-2 flex items-center gap-1.5 font-mono">
                    <AlertOctagon className="w-3.5 h-3.5" /> Trampas de Examen ({searchResults.traps.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.traps.map((tr) => (
                      <div
                        key={tr.id}
                        onClick={() => {
                          setCurrentView('trampas');
                          setSearchModalOpen(false);
                        }}
                        className="group p-3 rounded-2xl bg-rose-950/20 hover:bg-rose-950/30 active:bg-rose-950/40 border border-rose-900/40 hover:border-rose-500/40 cursor-pointer transition-all"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-rose-200 line-clamp-1">{tr.situation}</span>
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 shrink-0">
                            {tr.category}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-300 mt-1 line-clamp-1">
                          <span className="text-emerald-400 font-bold">Respuesta:</span> {tr.correctAnswer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Video Chapters & Timestamps */}
              {searchResults.video.length > 0 && (
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-1.5 font-mono">
                    <Video className="w-3.5 h-3.5" /> Capítulos de Igor ({searchResults.video.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.video.map((v) => (
                      <a
                        key={v.index}
                        href={v.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-850 active:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-all"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-cyan-400">{v.duration}</span>
                            <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 truncate">{v.title}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-cyan-400 shrink-0 font-semibold group-hover:underline">
                          <span>Ver</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Flashcards */}
              {searchResults.flashcards.length > 0 && (
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-2 flex items-center gap-1.5 font-mono">
                    <Zap className="w-3.5 h-3.5" /> Flashcards ({searchResults.flashcards.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {searchResults.flashcards.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setCurrentView('flashcards');
                          setSearchModalOpen(false);
                        }}
                        className="p-3 rounded-2xl bg-amber-950/20 border border-amber-900/30 hover:border-amber-500/40 cursor-pointer transition-all"
                      >
                        <p className="text-xs font-bold text-amber-200 line-clamp-1">{c.front}</p>
                        <p className="text-[11px] text-slate-300 font-semibold mt-1 truncate">➔ {c.back}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer Info */}
        <div className="px-4 sm:px-6 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono">
          <span>36 temas • 25 trampas • 55.939 palabras</span>
          <span className="hidden sm:inline">ESC para cerrar</span>
        </div>

      </div>
    </div>
  );
};
