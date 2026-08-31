import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layers, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  Zap, 
  Compass, 
  SlidersHorizontal,
  Flame,
  Volume2,
  Table,
  Gauge,
  Wine,
  Ruler,
  Calculator
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const FlashcardsView = () => {
  const { 
    carnetData, 
    openTopic, 
    masteredFlashcards, 
    toggleFlashcardMastery, 
    difficultFlashcards, 
    toggleFlashcardDifficult 
  } = useProgress();

  const [activeTab, setActiveTab] = useState('cards'); // 'cards', 'tables'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tableSubTab, setTableSubTab] = useState('velocidades');

  const categories = [
    { id: 'all', label: 'Todas las tarjetas', icon: '🗂️' },
    { id: 'velocidades', label: 'Velocidades', icon: '⚡' },
    { id: 'alcohol', label: 'Alcoholemia', icon: '🍷' },
    { id: 'puntos', label: 'Puntos y Sanciones', icon: '🎟️' },
    { id: 'distancias', label: 'Distancias', icon: '📏' },
    { id: 'senales', label: 'Señales', icon: '🚦' },
    { id: 'adas', label: 'Sistemas ADAS', icon: '🛡️' },
    { id: 'pas', label: 'Primeros Auxilios PAS', icon: '🚑' },
    { id: 'itv', label: 'ITV y Mantenimiento', icon: '🔧' },
    { id: 'trampas', label: 'Preguntas Trampa', icon: '⚠️' },
    { id: 'dificiles', label: 'Pendientes de repaso', icon: '🔥' },
  ];

  // Filter flashcards
  const filteredCards = useMemo(() => {
    let list = carnetData.flashcards;

    if (selectedCategory === 'dificiles') {
      list = list.filter(c => difficultFlashcards.includes(c.id));
      if (list.length === 0) list = carnetData.flashcards.slice(0, 10);
    } else if (selectedCategory !== 'all') {
      list = list.filter(c => c.category === selectedCategory);
    }

    return list;
  }, [carnetData, selectedCategory, difficultFlashcards]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isCurrentMastered = currentCard ? masteredFlashcards.includes(currentCard.id) : false;
  const isCurrentDifficult = currentCard ? difficultFlashcards.includes(currentCard.id) : false;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'cards') return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredCards, activeTab]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  const rData = carnetData.repasoRapido;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#181024] via-[#101622] to-[#0B0F17] border border-purple-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Sistema de Repaso y Retención 3D</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Flashcards y Tablas de Repaso
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
            Memoriza los datos numéricos, excepciones y trampas del examen con tarjetas interactivas y tablas de consulta rápida.
          </p>
        </div>

        {/* Global mastery metric */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 font-mono text-xs shadow-inner">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Retención</span>
            <span className="text-xl font-bold text-amber-400">
              {masteredFlashcards.length} / {carnetData.flashcards.length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
            {Math.round((masteredFlashcards.length / carnetData.flashcards.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Main Tab Switcher: Cards 3D vs Tablas Maestras */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('cards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'cards'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Mazo de Flashcards 3D</span>
        </button>

        <button
          onClick={() => setActiveTab('tables')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tables'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Tablas de Cifras (5 Min)</span>
        </button>
      </div>

      {/* TAB 1: 3D FLASHCARDS DECK */}
      {activeTab === 'cards' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                      : 'bg-[#101622] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3D Flipping Card Container */}
          {currentCard && (
            <div className="perspective-1000">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative w-full min-h-[320px] sm:min-h-[380px] rounded-3xl p-6 sm:p-10 cursor-pointer transition-transform duration-500 transform-style-3d shadow-2xl flex flex-col justify-between select-none ${
                  isFlipped ? 'rotate-y-180 bg-gradient-to-br from-[#1A132F] via-[#12192C] to-[#0D1220] border-2 border-purple-500/50' : 'bg-gradient-to-br from-[#12192C] via-[#101624] to-[#0A0E18] border-2 border-slate-800 hover:border-sky-500/40'
                }`}
              >
                {/* FRONT FACE */}
                <div className={`space-y-4 ${isFlipped ? 'hidden' : 'block'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/20 uppercase tracking-widest">
                      Tarjeta {currentIndex + 1} de {filteredCards.length} • {currentCard.category}
                    </span>

                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      <span>Toca para girar</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-3xl font-black text-white font-display pt-6 sm:pt-10 leading-snug">
                    {currentCard.front}
                  </h3>

                  <p className="text-xs text-slate-400 pt-4 font-sans">
                    Intenta responder mentalmente antes de voltear la tarjeta.
                  </p>
                </div>

                {/* BACK FACE */}
                <div className={`space-y-4 rotate-y-180 ${isFlipped ? 'block' : 'hidden'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-widest">
                      Respuesta Oficial DGT
                    </span>
                    <span className="text-xs text-purple-300 font-mono">
                      Tema {currentCard.topicId}
                    </span>
                  </div>

                  <div className="pt-4 sm:pt-6 space-y-3">
                    <p className="text-xl sm:text-3xl font-black text-white font-display leading-snug">
                      {currentCard.back}
                    </p>

                    {currentCard.hint && (
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-purple-500/30 text-xs sm:text-sm text-purple-200">
                        <span className="font-bold text-amber-400">💡 Truco de Igor:</span> {currentCard.hint}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom Controls */}
                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] hidden sm:inline">
                    Espacio para voltear • Flechas para avanzar
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openTopic(currentCard.topicId);
                    }}
                    className="text-sky-400 hover:underline font-bold text-xs flex items-center gap-1 ml-auto"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ver Tema {currentCard.topicId}</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Action Row: Mastery Buttons & Navigation */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            
            {/* Mark State Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  toggleFlashcardDifficult(currentCard.id);
                  handleNext();
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all active:scale-95 ${
                  isCurrentDifficult
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25'
                    : 'bg-[#101622] text-rose-400 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/40'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>❌ Tengo que repasarlo</span>
              </button>

              <button
                onClick={() => {
                  toggleFlashcardMastery(currentCard.id);
                  handleNext();
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all active:scale-95 ${
                  isCurrentMastered
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                    : 'bg-[#101622] text-emerald-400 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>✅ Ya me lo sé</span>
              </button>
            </div>

            {/* Prev / Next Card Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-[#101622] hover:bg-slate-800 border border-slate-800 text-xs font-bold text-white transition-colors active:scale-95 flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNext}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 border border-sky-500 text-xs font-bold text-white transition-colors active:scale-95 shadow-md shadow-sky-500/20 flex items-center justify-center gap-1"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: TABLAS MAESTRAS EN 5 MINUTOS */}
      {activeTab === 'tables' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Subtabs for tables */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'velocidades', label: '⚡ Velocidades', icon: Gauge },
              { id: 'alcohol', label: '🍷 Alcoholemia', icon: Wine },
              { id: 'puntos', label: '🎟️ Puntos y Sanciones', icon: Layers },
              { id: 'distancias', label: '📏 Distancias y Medidas', icon: Ruler },
              { id: 'formulas', label: '🧮 Fórmulas', icon: Calculator }
            ].map((sub) => {
              const Icon = sub.icon;
              const isSel = tableSubTab === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setTableSubTab(sub.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                    isSel
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                      : 'bg-[#101622] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>

          {/* Table Display */}
          {tableSubTab === 'velocidades' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-amber-400" />
                <span>Tabla Maestra de Velocidades Genéricas (km/h)</span>
              </h3>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                      <th className="py-3 px-4">Tipo de Vía</th>
                      <th className="py-3 px-4 text-sky-400">Turismos / Motos</th>
                      <th className="py-3 px-4 text-amber-400">Buses / Mixtos</th>
                      <th className="py-3 px-4 text-rose-400">Camiones / Remolques</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {rData.velocidades.map((v, i) => (
                      <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-white">{v.via}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-sky-300">{v.turismoMoto}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-300">{v.busesMixtos}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-rose-300">{v.camionesRemolque}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200 space-y-1 leading-relaxed">
                <p className="font-bold">⚠️ Recuerda para el examen:</p>
                <p>• En carreteras convencionales <strong>YA NO SE PERMITE superar en 20 km/h</strong> para adelantar.</p>
                <p>• La velocidad mínima en autopistas y autovías es de <strong>60 km/h</strong>.</p>
              </div>
            </div>
          )}

          {tableSubTab === 'alcohol' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Wine className="w-5 h-5 text-rose-400" />
                <span>Tasas Máximas de Alcoholemia</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {rData.alcohol.map((a, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-200 block">{a.tipo}</span>
                    <div className="pt-2 border-t border-slate-800 space-y-1.5 font-mono">
                      <p className="text-xs text-slate-400">
                        Aire: <span className="font-bold text-rose-400 text-sm">{a.aire}</span>
                      </p>
                      <p className="text-xs text-slate-400">
                        Sangre: <span className="font-bold text-rose-400 text-sm">{a.sangre}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tableSubTab === 'puntos' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Permiso por Puntos y Sanciones Clave</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rData.puntos.map((p, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">{p.concepto}</span>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-500/20">
                      {p.valor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tableSubTab === 'distancias' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Ruler className="w-5 h-5 text-emerald-400" />
                <span>Distancias y Medidas Obligatorias</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rData.distancias.map((d, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">{d.concepto}</span>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                      {d.valor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tableSubTab === 'formulas' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                <span>Fórmulas de Reacción, Frenado y Detención</span>
              </h3>

              <div className="space-y-3">
                {rData.formulas.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-cyan-400 uppercase font-mono">{f.nombre}</span>
                    <p className="text-sm sm:text-base font-black text-white font-mono bg-[#101622] p-3.5 rounded-xl border border-slate-800">
                      {f.formula}
                    </p>
                    <p className="text-xs text-slate-400">{f.detalle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
