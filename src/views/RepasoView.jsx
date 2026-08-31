import React, { useState } from 'react';
import { 
  Zap, 
  Gauge, 
  Wine, 
  Layers, 
  Ruler, 
  Calculator, 
  Lightbulb, 
  ShieldAlert,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const RepasoView = () => {
  const { carnetData, openTopic } = useProgress();
  const [activeTab, setActiveTab] = useState('velocidades'); // velocidades, alcohol, puntos, distancias, formulas, mnemotecnias

  const tabs = [
    { id: 'velocidades', label: '⚡ Velocidades', icon: Gauge },
    { id: 'alcohol', label: '🍷 Alcoholemia', icon: Wine },
    { id: 'puntos', label: '🎟️ Puntos y Sanciones', icon: Layers },
    { id: 'distancias', label: '📏 Distancias y Medidas', icon: Ruler },
    { id: 'formulas', label: '🧮 Fórmulas Reacción/Frenado', icon: Calculator },
    { id: 'mnemotecnias', label: '🧠 Trucos de Igor', icon: Lightbulb },
  ];

  const rData = carnetData.repasoRapido;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#191024] via-[#101622] to-[#0B0F17] border border-purple-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>Compendio Maestro Express</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Repaso Rápido (5 Minutos)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
            La chuleta imprescindible para antes del examen con todas las tablas maestras de velocidades, alcohol, distancias y fórmulas.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-bold font-mono shrink-0 shadow-sm">
          Actualizado DGT 2026
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-102 font-black'
                  : 'bg-[#101622] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="space-y-6">
        
        {/* 1. Velocidades */}
        {activeTab === 'velocidades' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-amber-400" />
                <span>Tabla Maestra de Velocidades Genéricas (km/h)</span>
              </h3>
              <button
                onClick={() => openTopic("06")}
                className="text-xs text-sky-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Ver Tema 06</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                    <th className="py-3.5 px-4">Tipo de Vía</th>
                    <th className="py-3.5 px-4 text-sky-400">Turismos / Motos</th>
                    <th className="py-3.5 px-4 text-amber-400">Buses / Mixtos</th>
                    <th className="py-3.5 px-4 text-rose-400">Camiones / Remolques</th>
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

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200 space-y-1.5 leading-relaxed">
              <p className="font-bold">⚠️ Recuerda para el examen:</p>
              <p>• En carreteras convencionales <strong>YA NO SE PERMITE superar en 20 km/h</strong> el límite para adelantar.</p>
              <p>• La velocidad mínima en autopistas y autovías es de <strong>60 km/h</strong> para todos los vehículos.</p>
              <p>• Los patinetes (VMP) tienen un límite de <strong>25 km/h</strong> y los ciclomotores de <strong>45 km/h</strong>.</p>
            </div>
          </div>
        )}

        {/* 2. Alcoholemia */}
        {activeTab === 'alcohol' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Wine className="w-5 h-5 text-rose-400" />
                <span>Tasas Máximas de Alcoholemia</span>
              </h3>
              <button
                onClick={() => openTopic("28")}
                className="text-xs text-sky-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Ver Tema 28</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {rData.alcohol.map((a, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block">{a.tipo}</span>
                  <div className="pt-2 border-t border-slate-800 space-y-1.5 font-mono">
                    <p className="text-xs text-slate-400">
                      Aire espirado: <span className="font-bold text-rose-400 text-sm">{a.aire}</span>
                    </p>
                    <p className="text-xs text-slate-400">
                      Sangre: <span className="font-bold text-rose-400 text-sm">{a.sangre}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1 leading-relaxed">
              <p>• La curva de alcoholemia alcanza su concentración máxima en sangre entre <strong>30 y 90 minutos</strong> tras beber.</p>
              <p>• La negativa a someterse a las pruebas legalmente establecidas constituye un <strong>delito penal</strong>.</p>
            </div>
          </div>
        )}

        {/* 3. Puntos */}
        {activeTab === 'puntos' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Permiso por Puntos y Sanciones</span>
              </h3>
              <button
                onClick={() => openTopic("19")}
                className="text-xs text-sky-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Ver Tema 19</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

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

        {/* 4. Distancias */}
        {activeTab === 'distancias' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Ruler className="w-5 h-5 text-emerald-400" />
                <span>Distancias y Medidas Obligatorias</span>
              </h3>
            </div>

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

        {/* 5. Fórmulas */}
        {activeTab === 'formulas' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                <span>Fórmulas de Reacción, Frenado y Detención</span>
              </h3>
              <button
                onClick={() => openTopic("23")}
                className="text-xs text-sky-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Ver Tema 23</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

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

        {/* 6. Mnemotécnias */}
        {activeTab === 'mnemotecnias' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>Mnemotécnias y Trucos de Memoria de Igor</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rData.mnemotecnias.map((m, i) => (
                <div key={i} className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">{m.titulo}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                      {m.acronimo}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    «{m.significado}»
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
