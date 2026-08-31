import React, { useState } from 'react';
import { 
  Video, 
  Search, 
  Play, 
  Clock, 
  ExternalLink, 
  BookOpen, 
  Sparkles,
  CheckCircle2,
  Circle,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const VideoGuideView = () => {
  const { carnetData, openTopic, completedTopics, toggleTopicCompletion } = useProgress();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const chapters = carnetData.videoChapters;
  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  const filteredChapters = chapters.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return c.title.toLowerCase().includes(q) || c.snippet.toLowerCase().includes(q);
  });

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0E1A1A] via-[#101622] to-[#0B0F17] border border-cyan-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <Video className="w-3.5 h-3.5" />
            <span>Biblioteca Sincronizada del Curso</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Curso Intensivo de Igor (2026)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            36 capítulos sincronizados con el vídeo completo de 4h 57m 57s. Accede en un clic a la explicación de cualquier tema.
          </p>
        </div>

        <a
          href="https://www.youtube.com/watch?v=Sx2prUxQbaM"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-xl shadow-red-500/20 transition-all shrink-0"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Ver en YouTube Oficial</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Video Player & Active Chapter Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Embed Player & Info (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* YouTube Embed Container */}
          <div className="relative rounded-3xl overflow-hidden bg-black border border-slate-800 shadow-2xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${carnetData.metadata.videoId}?start=${currentChapter.startTime}&autoplay=0&rel=0`}
              title={currentChapter.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Current Chapter Info Card */}
          <div className="p-6 rounded-3xl bg-[#101622] border border-slate-800 space-y-4 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Capítulo {currentChapter.index} de 36
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {formatTime(currentChapter.startTime)} ({currentChapter.duration})
                </span>
              </div>

              <button
                onClick={() => openTopic(currentChapter.topicId)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-bold transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Leer Apunte del Tema</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {currentChapter.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
              «{currentChapter.snippet}»
            </p>
          </div>

        </div>

        {/* Right Column: 36 Chapter List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Chapter Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en los capítulos del curso..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#101622] border border-slate-800 rounded-2xl text-xs text-white placeholder:text-slate-500 outline-none focus:border-cyan-500/60 transition-colors shadow-inner"
            />
          </div>

          {/* Chapter Items List */}
          <div className="max-h-[600px] overflow-y-auto space-y-2 pr-1">
            {filteredChapters.map((ch) => {
              const isSelected = ch.index === currentChapter.index;
              const isCompleted = completedTopics.includes(ch.topicId);

              return (
                <div
                  key={ch.index}
                  onClick={() => setActiveChapterIndex(ch.index - 1)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-950/25 border-cyan-500/50 shadow-md'
                      : 'bg-[#101622] hover:bg-[#131b2b] border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isSelected 
                        ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}>
                      {ch.index < 10 ? `0${ch.index}` : ch.index}
                    </div>

                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                        {ch.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        {formatTime(ch.startTime)} • {ch.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTopicCompletion(ch.topicId);
                      }}
                      className={`p-1 rounded-lg transition-colors ${
                        isCompleted ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'
                      }`}
                      title={isCompleted ? 'Completado' : 'Pendiente'}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    </button>

                    <a
                      href={ch.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-slate-500 hover:text-cyan-400 transition-colors"
                      title="Abrir directamente en YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
