import React, { useState, useMemo } from 'react';
import { 
  Search, 
  AlertTriangle, 
  Scale, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  X, 
  Filter, 
  AlertOctagon, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { SENALES_DATABASE, SENALES_CATEGORIES } from '../data/senalesData';
import { TrafficSignIcon } from '../components/TrafficSignIcon';
import { useProgress } from '../context/ProgressContext';

export const SenalesView = () => {
  const { openTopic } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSignal, setSelectedSignal] = useState(null);

  // Filter signals
  const filteredSignals = useMemo(() => {
    return SENALES_DATABASE.filter((sig) => {
      // Category filter
      if (selectedCategory !== 'todas') {
        if (selectedCategory === 'nuevas_2026') {
          if (sig.category !== 'nuevas_2026') return false;
        } else if (sig.category !== selectedCategory) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          sig.code.toLowerCase().includes(q) ||
          sig.name.toLowerCase().includes(q) ||
          sig.description.toLowerCase().includes(q) ||
          sig.explicacionIgor.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#161226] via-[#101622] to-[#0B0F17] border border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Biblioteca Visual Oficial DGT 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Señales de Tráfico y Circulación
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
            Catálogo completo con las señales clásicas y las nuevas incorporaciones DGT (P-35 trenzado, R-118 patinetes, R-120 ZBE y P-21b mayores).
          </p>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 font-mono text-xs shadow-inner">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Catálogo activo</span>
            <span className="text-lg font-bold text-white">{filteredSignals.length} Señales</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold">
            🚦
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código (R-1, P-35...) o concepto ('patinete', 'velocidad', 'ceda', 'stop', 'bici')..."
            className="w-full pl-11 pr-4 py-3 bg-[#101622] border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-amber-500/60 transition-colors shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SENALES_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
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

      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredSignals.map((sig) => {
          return (
            <div
              key={sig.code}
              onClick={() => setSelectedSignal(sig)}
              className="group p-5 rounded-3xl bg-[#101622] hover:bg-[#131b2b] border border-slate-800/90 hover:border-amber-500/50 transition-all duration-150 cursor-pointer shadow-md flex flex-col justify-between"
            >
              <div>
                
                {/* Top Row */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-amber-300">
                    {sig.code}
                  </span>
                  <div className="p-2 rounded-2xl bg-slate-950/80 border border-slate-800/80 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                    <TrafficSignIcon code={sig.code} shape={sig.shape} colorScheme={sig.colorScheme} size={48} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {sig.name}
                </h3>

                {/* Description Preview */}
                <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed font-sans">
                  {sig.description}
                </p>

                {/* Igor's Advice Quote */}
                <div className="mt-3 p-3 rounded-2xl bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200 italic line-clamp-2">
                  «{sig.explicacionIgor}»
                </div>

              </div>

              {/* Action Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 text-[11px] font-mono">
                  Tema {sig.topicId}
                </span>

                <span className="flex items-center gap-1 text-amber-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver detalle</span>
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {filteredSignals.length === 0 && (
        <div className="text-center py-16 bg-[#101622] rounded-3xl border border-slate-800">
          <p className="text-base font-bold text-slate-300">No encontramos señales que coincidan con tu búsqueda</p>
          <button
            onClick={() => {
              setSelectedCategory('todas');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold transition-colors"
          >
            Restablecer filtros
          </button>
        </div>
      )}

      {/* Signal Detail Modal */}
      {selectedSignal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xl bg-black/85 animate-in fade-in duration-150">
          
          <div className="fixed inset-0" onClick={() => setSelectedSignal(null)} />

          <div className="relative w-full max-w-xl bg-[#0F1523] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-amber-950/80 via-[#101622] to-[#101622] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
                  <TrafficSignIcon code={selectedSignal.code} shape={selectedSignal.shape} colorScheme={selectedSignal.colorScheme} size={44} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                    {selectedSignal.code} • DGT 2026
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {selectedSignal.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedSignal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              
              {/* Official Meaning */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" /> Significado Normativo Oficial
                </span>
                <p className="text-slate-200 leading-relaxed pt-1">
                  {selectedSignal.description}
                </p>
              </div>

              {/* Igor's Pedagogical Explanation */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-1">
                <span className="text-amber-300 font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> La Explicación del Profesor Igor
                </span>
                <p className="text-slate-200 italic leading-relaxed pt-1">
                  «{selectedSignal.explicacionIgor}»
                </p>
              </div>

              {/* Exam Trap Alert */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-1">
                <span className="text-rose-400 font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" /> ⚠️ Ojo con esta pregunta trampa
                </span>
                <p className="text-rose-200 font-medium leading-relaxed pt-1">
                  {selectedSignal.trampaExamen}
                </p>
              </div>

              {/* Jump to Topic Button */}
              <button
                onClick={() => {
                  openTopic(selectedSignal.topicId);
                  setSelectedSignal(null);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-98"
              >
                <BookOpen className="w-4 h-4" />
                <span>Estudiar en el Tema {selectedSignal.topicId} del Manual</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
