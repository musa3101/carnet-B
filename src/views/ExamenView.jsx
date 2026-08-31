import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileCheck2 as FileCheck2Icon, 
  Clock as ClockIcon, 
  CheckCircle2 as CheckIcon, 
  XCircle as XIcon, 
  RotateCcw as RotateIcon, 
  BookOpen as BookIcon, 
  ArrowRight as ArrowRightIcon, 
  ArrowLeft as ArrowLeftIcon, 
  Sparkles as SparklesIcon, 
  Trophy as TrophyIcon, 
  Flag as FlagIcon,
  AlertOctagon,
  Target,
  Zap,
  Layers,
  Trash2
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const ExamenView = () => {
  const { 
    carnetData, 
    openTopic, 
    recordExamAttempt, 
    failedQuestions, 
    removeResolvedFailedQuestion,
    clearFailedQuestions 
  } = useProgress();

  // Modes: 'official' (30 Qs), 'topic' (by topic), 'quick' (10 Qs), 'errors' (repeat failed), 'trampas' (25 traps)
  const [testMode, setTestMode] = useState('official');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('01');
  const [isTestActive, setIsTestActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qIndex]: optionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // Generate test questions based on active mode
  const testQuestions = useMemo(() => {
    let pool = [...carnetData.examQuestions];

    if (testMode === 'topic') {
      pool = pool.filter(q => q.topicId === selectedTopicFilter);
      if (pool.length === 0) pool = carnetData.examQuestions.slice(0, 10);
    } else if (testMode === 'quick') {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 10);
    } else if (testMode === 'errors') {
      if (failedQuestions.length > 0) {
        return [...failedQuestions].sort(() => Math.random() - 0.5);
      }
      return pool.slice(0, 10);
    } else if (testMode === 'trampas') {
      // Map traps into question format
      return carnetData.trampas.map((tr, idx) => ({
        id: `trap_${tr.id}`,
        topicId: tr.topicId,
        topicTitle: `Trampa de Examen: ${tr.category}`,
        question: tr.situation,
        options: [
          `A) ${tr.correctAnswer}`,
          `B) ${tr.confusion}`,
          `C) Depende exclusivamente de la señalización complementaria`
        ],
        correctIndex: 0,
        explanation: `${tr.confusion} -> ${tr.correctAnswer}. ${tr.mnemonic || ''}`,
        isTrap: true
      }));
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 30);
  }, [carnetData, testMode, selectedTopicFilter, failedQuestions, isTestActive]);

  // Timer countdown
  useEffect(() => {
    if (!isTestActive || isFinished) return;
    if (timeLeft <= 0) {
      handleFinishTest();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isTestActive, isFinished, timeLeft]);

  const handleStartTest = (mode = testMode) => {
    setTestMode(mode);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setCurrentQuestionIndex(0);
    const duration = mode === 'quick' ? 10 * 60 : 30 * 60;
    setTimeLeft(duration);
    setIsFinished(false);
    setIsTestActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (optionIndex) => {
    if (isFinished) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const toggleFlag = (idx) => {
    setFlaggedQuestions(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleFinishTest = () => {
    setIsFinished(true);
    setIsTestActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let correct = 0;
    let wrong = 0;
    const wrongTopicIds = [];
    const wrongQuestions = [];

    testQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct++;
        // If question was previously in failed list, remove it
        if (testMode === 'errors') {
          removeResolvedFailedQuestion(q.id);
        }
      } else {
        wrong++;
        wrongQuestions.push(q);
        if (q.topicId && !wrongTopicIds.includes(q.topicId)) {
          wrongTopicIds.push(q.topicId);
        }
      }
    });

    const isPassed = testMode === 'quick' ? wrong <= 1 : wrong <= 3;

    if (isPassed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    recordExamAttempt({
      date: new Date().toLocaleDateString('es-ES'),
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      mode: testMode,
      total: testQuestions.length,
      correct,
      wrong,
      passed: isPassed,
      wrongTopicIds,
      wrongQuestions
    });
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQ = testQuestions[currentQuestionIndex];
  const isCurrentAnswered = userAnswers[currentQuestionIndex] !== undefined;
  const isCurrentFlagged = flaggedQuestions.includes(currentQuestionIndex);

  // Landing Test Setup Screen
  if (!isTestActive && !isFinished) {
    return (
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
        
        {/* Header Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0E1A16] via-[#101622] to-[#0B0F17] border border-emerald-900/40 space-y-3 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <FileCheck2Icon className="w-3.5 h-3.5" />
              <span>Simulador de Tests Oficial DGT 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
              Banco de Exámenes y Tests
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl">
              Elige tu modalidad de entrenamiento: simulacro oficial de 30 preguntas, tests por temas, test rápido de 10 preguntas o repetición de tus preguntas falladas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 font-mono text-xs shadow-inner text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Banco de preguntas</span>
            <span className="text-xl font-bold text-emerald-400">100% Original DGT</span>
          </div>
        </div>

        {/* 5 Test Mode Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          
          {/* 1. Simulacro Oficial */}
          <div
            onClick={() => setTestMode('official')}
            className={`p-5 rounded-3xl border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
              testMode === 'official'
                ? 'bg-emerald-950/25 border-emerald-500 shadow-lg shadow-emerald-500/10'
                : 'bg-[#101622] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Modo Real DGT
                </span>
                <ClockIcon className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">Simulacro Oficial (30 Qs)</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                30 preguntas variadas, 30 minutos de tiempo y máximo de 3 fallos para el APTO.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 pt-3 mt-3 border-t border-slate-800/80 block">
              30 preguntas • 30 min
            </span>
          </div>

          {/* 2. Test por Tema */}
          <div
            onClick={() => setTestMode('topic')}
            className={`p-5 rounded-3xl border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
              testMode === 'topic'
                ? 'bg-sky-950/25 border-sky-500 shadow-lg shadow-sky-500/10'
                : 'bg-[#101622] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                  Por Capítulo
                </span>
                <BookIcon className="w-4 h-4 text-sky-400" />
              </div>
              <h3 className="text-base font-bold text-white">Test por Tema Específico</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Evalúa y refuerza tus conocimientos de cualquiera de los 36 temas del manual.
              </p>
            </div>
            <span className="text-[11px] font-bold text-sky-400 pt-3 mt-3 border-t border-slate-800/80 block">
              Seleccionar tema
            </span>
          </div>

          {/* 3. Test Rápido Express */}
          <div
            onClick={() => setTestMode('quick')}
            className={`p-5 rounded-3xl border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
              testMode === 'quick'
                ? 'bg-amber-950/25 border-amber-500 shadow-lg shadow-amber-500/10'
                : 'bg-[#101622] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  Rápido
                </span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white">Test Express (10 Qs)</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Test corto de 10 preguntas de alta frecuencia para cuando tienes poco tiempo.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-400 pt-3 mt-3 border-t border-slate-800/80 block">
              10 preguntas • 10 min
            </span>
          </div>

          {/* 4. Test de Errores (Preguntas Falladas) */}
          <div
            onClick={() => setTestMode('errors')}
            className={`p-5 rounded-3xl border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
              testMode === 'errors'
                ? 'bg-rose-950/25 border-rose-500 shadow-lg shadow-rose-500/10'
                : 'bg-[#101622] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  {failedQuestions.length} Falladas
                </span>
                <Target className="w-4 h-4 text-rose-400" />
              </div>
              <h3 className="text-base font-bold text-white">Test de Preguntas Falladas</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Repite únicamente las preguntas que has fallado en tus simulacros hasta dominarlas.
              </p>
            </div>
            <span className="text-[11px] font-bold text-rose-400 pt-3 mt-3 border-t border-slate-800/80 block">
              {failedQuestions.length > 0 ? `Repasar ${failedQuestions.length} fallos` : 'Sin errores pendientes'}
            </span>
          </div>

          {/* 5. Test de Trampas DGT */}
          <div
            onClick={() => setTestMode('trampas')}
            className={`p-5 rounded-3xl border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
              testMode === 'trampas'
                ? 'bg-purple-950/25 border-purple-500 shadow-lg shadow-purple-500/10'
                : 'bg-[#101622] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  25 Trampas
                </span>
                <AlertOctagon className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-base font-bold text-white">Test de 25 Trampas DGT</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                El test más difícil: las 25 preguntas trampa donde más alumnos suspenden el examen.
              </p>
            </div>
            <span className="text-[11px] font-bold text-purple-400 pt-3 mt-3 border-t border-slate-800/80 block">
              25 preguntas trampa
            </span>
          </div>

        </div>

        {/* Topic selector if in topic mode */}
        {testMode === 'topic' && (
          <div className="p-5 rounded-3xl bg-[#101622] border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-300 block">
              Selecciona el tema que quieres evaluar:
            </label>
            <select
              value={selectedTopicFilter}
              onChange={(e) => setSelectedTopicFilter(e.target.value)}
              className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs sm:text-sm text-white outline-none focus:border-sky-500 font-sans"
            >
              {carnetData.topics.map(t => (
                <option key={t.id} value={t.id}>
                  Tema {t.id}: {t.title} ({t.blockName})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={() => handleStartTest(testMode)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 active:scale-98 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
        >
          <SparklesIcon className="w-5 h-5" />
          <span>Comenzar Test ({testMode === 'quick' ? '10 Qs' : testMode === 'trampas' ? '25 Trampas' : testMode === 'errors' ? `${failedQuestions.length || 10} Falladas` : '30 Qs'})</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>

      </div>
    );
  }

  // Finished Test Screen: Results & Detailed Review
  if (isFinished) {
    let correctCount = 0;
    let wrongCount = 0;
    testQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) correctCount++;
      else wrongCount++;
    });

    const isPassed = testMode === 'quick' ? wrongCount <= 1 : wrongCount <= 3;

    return (
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
        
        {/* Outcome Banner */}
        <div className={`p-6 sm:p-10 rounded-3xl border shadow-2xl text-center space-y-4 ${
          isPassed 
            ? 'bg-emerald-950/25 border-emerald-500/40' 
            : 'bg-rose-950/25 border-rose-500/40'
        }`}>
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            {isPassed ? (
              <div className="w-full h-full bg-emerald-500 text-white rounded-2xl flex items-center justify-center">
                <TrophyIcon className="w-8 h-8" />
              </div>
            ) : (
              <div className="w-full h-full bg-rose-500 text-white rounded-2xl flex items-center justify-center">
                <XIcon className="w-8 h-8" />
              </div>
            )}
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-display">
            {isPassed ? '¡APROBADO! 🎉' : 'NO APTO ❌'}
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
            {isPassed 
              ? `¡Excelente resultado! Has completado la prueba con solo ${wrongCount} fallos (dentro del límite oficial DGT).`
              : `Has tenido ${wrongCount} fallos. El límite oficial es de 3. Revisa abajo las correcciones para no volver a cometer los mismos errores.`
            }
          </p>

          {/* Metric Badges */}
          <div className="flex justify-center gap-3 pt-1">
            <div className="px-5 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono">
              <span className="text-xs text-slate-400 block font-sans">Aciertos</span>
              <span className="text-2xl font-bold text-emerald-400">{correctCount}</span>
            </div>
            <div className="px-5 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono">
              <span className="text-xs text-slate-400 block font-sans">Fallos</span>
              <span className={`text-2xl font-bold ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                {wrongCount}
              </span>
            </div>
            <div className="px-5 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono">
              <span className="text-xs text-slate-400 block font-sans">Total</span>
              <span className="text-2xl font-bold text-white">{testQuestions.length}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
            <button
              onClick={() => handleStartTest(testMode)}
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-800"
            >
              <RotateIcon className="w-4 h-4 text-sky-400" />
              <span>Hacer otro test</span>
            </button>

            {failedQuestions.length > 0 && (
              <button
                onClick={() => handleStartTest('errors')}
                className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-98 text-white font-bold text-xs transition-colors shadow-lg shadow-rose-500/20"
              >
                Repetir {failedQuestions.length} falladas
              </button>
            )}

            <button
              onClick={() => setIsFinished(false)}
              className="px-5 py-3 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 active:scale-98 font-bold text-xs transition-colors"
            >
              Cambiar de modo
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <BookIcon className="w-5 h-5 text-sky-400" />
            <span>Revisión y Justificación Razonada de Respuestas</span>
          </h3>

          <div className="space-y-3.5">
            {testQuestions.map((q, idx) => {
              const selectedOpt = userAnswers[idx];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={idx}
                  className={`p-5 sm:p-6 rounded-3xl border space-y-3 ${
                    isCorrect 
                      ? 'bg-[#101622] border-slate-800' 
                      : 'bg-rose-950/20 border-rose-900/50 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className={`w-7 h-7 rounded-xl text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <span className="text-xs font-bold shrink-0">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-mono">
                          <CheckIcon className="w-4 h-4" /> <span className="hidden sm:inline">Correcta</span>
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1 font-mono">
                          <XIcon className="w-4 h-4" /> <span className="hidden sm:inline">Fallada</span>
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2 pl-10 text-xs sm:text-sm">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      const isRealAnswer = q.correctIndex === oIdx;

                      return (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-2xl border ${
                            isRealAnswer
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-bold'
                              : isChosen && !isRealAnswer
                              ? 'bg-rose-950/40 border-rose-500/60 text-rose-300 line-through'
                              : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                          }`}
                        >
                          {opt}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation card */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm space-y-1.5 ml-10">
                    <p className="text-slate-300 leading-relaxed">
                      <span className="font-bold text-sky-400">💡 Razonamiento Oficial DGT / Igor:</span> {q.explanation}
                    </p>
                    {q.topicId && (
                      <button
                        onClick={() => openTopic(q.topicId)}
                        className="text-sky-400 hover:underline font-bold text-xs flex items-center gap-1 pt-1"
                      >
                        <BookIcon className="w-3.5 h-3.5" />
                        <span>Repasar en Tema {q.topicId}: {q.topicTitle}</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // Active Exam Interface
  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto animate-in fade-in duration-150">
      
      {/* Top Header Bar during Exam */}
      <div className="p-3 sm:p-5 rounded-2xl bg-[#101622]/95 border border-slate-800 flex items-center justify-between gap-2 sticky top-16 sm:top-20 z-30 shadow-xl backdrop-blur-xl">
        
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/30">
            {currentQuestionIndex + 1}/{testQuestions.length}
          </span>
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            Respondidas: {answeredCount}/{testQuestions.length}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Flag Question */}
          <button
            onClick={() => toggleFlag(currentQuestionIndex)}
            className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 active:scale-95 ${
              isCurrentFlagged 
                ? 'bg-amber-500 text-slate-950 shadow-sm' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
            title="Marcar pregunta"
          >
            <FlagIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{isCurrentFlagged ? 'Marcada' : 'Dudosa'}</span>
          </button>

          {/* Timer Display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-amber-300">
            <ClockIcon className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          <button
            onClick={handleFinishTest}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-500/20"
          >
            Finalizar
          </button>
        </div>

      </div>

      {/* Quick Jump Grid */}
      <div className="p-3 rounded-2xl bg-[#101622] border border-slate-800 flex flex-wrap gap-1.5 justify-center shadow-inner">
        {testQuestions.map((_, idx) => {
          const isAnswered = userAnswers[idx] !== undefined;
          const isCurrent = currentQuestionIndex === idx;
          const isFlagged = flaggedQuestions.includes(idx);

          return (
            <button
              key={idx}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`w-7 h-7 rounded-xl text-xs font-mono font-bold transition-all relative active:scale-95 ${
                isCurrent
                  ? 'bg-sky-500 text-white ring-2 ring-sky-400 scale-105 shadow-md'
                  : isFlagged
                  ? 'bg-amber-500 text-slate-950 ring-1 ring-amber-400'
                  : isAnswered
                  ? 'bg-slate-700 text-slate-200 border border-slate-600'
                  : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-slate-300'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Question Card */}
      {currentQ && (
        <div className="p-5 sm:p-8 rounded-3xl bg-[#101622] border border-slate-800 shadow-xl space-y-5">
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider truncate">
              Tema {currentQ.topicId}: {currentQ.topicTitle}
            </span>
            {currentQ.isTrap && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                Trampa DGT
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          {/* 3 Selectable Options */}
          <div className="space-y-3 pt-1">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = userAnswers[currentQuestionIndex] === oIdx;

              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 text-xs sm:text-sm active:scale-99 ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-500 text-white font-bold shadow-md shadow-sky-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                    isSelected ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-700 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + oIdx)}
                  </div>
                  <span className="leading-snug">{opt.substring(3)}</span>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Next / Prev Question Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#101622] hover:bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 border border-slate-800 transition-colors active:scale-95"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        {currentQuestionIndex < testQuestions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(testQuestions.length - 1, prev + 1))}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white text-xs font-bold transition-colors shadow-md shadow-sky-500/20"
          >
            <span>Siguiente</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleFinishTest}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold transition-colors shadow-lg shadow-emerald-500/20"
          >
            <span>Corregir Test</span>
            <CheckIcon className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
