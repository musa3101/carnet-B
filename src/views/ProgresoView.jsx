import React from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Layers, 
  FileCheck2, 
  Trophy, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  ArrowRight,
  Sparkles,
  Award,
  Calendar
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const ProgresoView = () => {
  const { 
    carnetData, 
    completedTopics, 
    masteredFlashcards, 
    difficultFlashcards, 
    examHistory, 
    openTopic,
    resetAllProgress,
    progressPercentage
  } = useProgress();

  const totalTopics = carnetData.topics.length;
  const totalCards = carnetData.flashcards.length;

  const passedTests = examHistory.filter(e => e.passed).length;
  const totalTests = examHistory.length;

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#111827] via-[#101622] to-[#0B0F17] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Panel de Estudio y Rendimiento</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Tu Progreso de Preparación
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Métricas reales de lectura del temario, retención de flashcards y estadísticas de exámenes oficiales.
          </p>
        </div>

        <button
          onClick={resetAllProgress}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950/80 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/60 text-xs font-semibold transition-colors shrink-0 shadow-inner"
        >
          <Trash2 className="w-4 h-4" />
          <span>Reiniciar progreso</span>
        </button>
      </div>

      {/* 4 Bento Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Temario Mastery */}
        <div className="p-6 rounded-3xl bg-[#101622] border border-slate-800 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">Temario</span>
            <BookOpen className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{completedTopics.length}</span>
            <span className="text-xs text-slate-500 font-mono">/ {totalTopics} temas</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>
        </div>

        {/* Flashcards Mastered */}
        <div className="p-6 rounded-3xl bg-[#101622] border border-slate-800 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">Flashcards</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{masteredFlashcards.length}</span>
            <span className="text-xs text-slate-500 font-mono">/ {totalCards}</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.round((masteredFlashcards.length / totalCards) * 100)}%` }} 
            />
          </div>
        </div>

        {/* Tests Simulados */}
        <div className="p-6 rounded-3xl bg-[#101622] border border-slate-800 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">Simulacros</span>
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{totalTests}</span>
            <span className="text-xs text-slate-500 font-mono">tests hechos</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold block">
            {passedTests} aprobados ({totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%)
          </span>
        </div>

        {/* Tarjetas Difíciles */}
        <div className="p-6 rounded-3xl bg-[#101622] border border-slate-800 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">Por Reforzar</span>
            <Sparkles className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-400 font-mono">{difficultFlashcards.length}</span>
            <span className="text-xs text-slate-500 font-mono">difíciles</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Tarjetas marcadas
          </span>
        </div>

      </div>

      {/* Recent Exam History Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 space-y-4 shadow-md">
        <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Historial de Simulacros Realizados</span>
        </h3>

        {examHistory.length === 0 ? (
          <div className="text-center py-10 bg-slate-950/60 rounded-2xl border border-slate-800">
            <p className="text-xs text-slate-400">Aún no has realizado ningún simulacro de examen.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                  <th className="py-3 px-4">Fecha y Hora</th>
                  <th className="py-3 px-4">Modalidad</th>
                  <th className="py-3 px-4">Resultado</th>
                  <th className="py-3 px-4">Aciertos / Fallos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {examHistory.slice(0, 10).map((attempt, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{attempt.date} {attempt.time}</td>
                    <td className="py-3.5 px-4 font-semibold text-white capitalize">{attempt.mode === 'official' ? 'Examen Oficial (30 Qs)' : 'Entrenamiento Guiado'}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                        attempt.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {attempt.passed ? 'APROBADO' : 'NO APTO'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <span className="text-emerald-400 font-bold">{attempt.correct}</span> aciertos / <span className="text-rose-400 font-bold">{attempt.wrong}</span> fallos
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
