import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  BookOpen, 
  Video, 
  Scale, 
  AlertOctagon, 
  ExternalLink,
  ArrowRight,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Lightbulb,
  Car,
  ShieldCheck,
  Bot,
  User,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { TUTOR_QA_DATABASE } from '../data/tutorKnowledge';

export const ConsultaRapidaModal = () => {
  const { queryModalOpen, setQueryModalOpen, carnetData, openTopic } = useProgress();
  
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'tutor',
      text: '¡Hola! Soy Musa, tu Profesor Virtual de Teórica. He memorizado las 55.939 palabras del curso de Igor y toda la normativa oficial DGT 2026.\n\nPregúntame cualquier duda que tengas (por escrito o con tu voz 🎙️): diferencias entre autopista y autovía, velocidades, rotondas, luces antiniebla, tasas de alcohol, señales o trucos de examen.',
      timestamp: 'Ahora'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Global keydown handler for Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && queryModalOpen) {
        e.preventDefault();
        setQueryModalOpen(false);
        stopSpeaking();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [queryModalOpen, setQueryModalOpen]);

  // Initialize Speech Recognition (Web Speech API)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'es-ES';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
          handleSendMessage(transcript);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleVoiceInput = () => {
    try {
      if (!recognitionRef.current) {
        alert('Tu navegador no soporta entrada de voz directa. Puedes escribir tu duda en el campo de texto.');
        return;
      }
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        stopSpeaking();
        setIsListening(true);
        recognitionRef.current.start();
      }
    } catch (err) {
      console.warn('Error with voice input:', err);
      setIsListening(false);
    }
  };

  const stopSpeaking = () => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (err) {
      console.warn('Error stopping speech:', err);
    }
    setIsSpeaking(false);
  };

  const speakText = (text) => {
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      stopSpeaking();
      
      // Clean text for speech
      const cleanText = text
        .replace(/[*#_`•]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/🎓|⚖️|🧠|⚠️|✅|💡|🚗|📌|🔄|📱|💺|📡|🔥|🚴|❌/g, '')
        .substring(0, 300);

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 1.05;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis not available or blocked:', err);
      setIsSpeaking(false);
    }
  };

  // High-Precision Knowledge Matching & Synthesis
  const generateTutorResponse = (query) => {
    const q = query.toLowerCase().trim();
    const queryTokens = q.split(/[\s,?.!¿¡]+/).filter(w => w.length > 2);

    // 1. FIRST PRIORITY: Check Dedicated Specialized Knowledge Base
    let bestSpecialized = null;
    let maxSpecializedScore = 0;

    TUTOR_QA_DATABASE.forEach(item => {
      let score = 0;
      item.keywords.forEach(kw => {
        if (q.includes(kw.toLowerCase())) score += 5;
      });
      queryTokens.forEach(t => {
        if (item.keywords.some(k => k.toLowerCase() === t)) score += 3;
        if (item.questionMatch.toLowerCase().includes(t)) score += 2;
      });

      if (score > maxSpecializedScore) {
        maxSpecializedScore = score;
        bestSpecialized = item;
      }
    });

    // If strong match in specialized QA base (score >= 6)
    if (bestSpecialized && maxSpecializedScore >= 6) {
      const topic = carnetData.topics.find(t => t.id === bestSpecialized.topicId) || carnetData.topics[0];
      const trap = carnetData.trampas.find(tr => tr.topicId === bestSpecialized.topicId);

      let responseText = `${bestSpecialized.explicacionIgor}\n\n`;
      responseText += `⚖️ **Verificación Oficial DGT 2026:**\n${bestSpecialized.normaDGT}\n\n`;
      if (bestSpecialized.trucoMemoria) {
        responseText += `🧠 **Truco Mnemotécnico de Igor:**\n${bestSpecialized.trucoMemoria}\n\n`;
      }
      if (bestSpecialized.trampaExamen) {
        responseText += `⚠️ **Trampa de Examen Típica:**\n${bestSpecialized.trampaExamen}`;
      }

      return {
        text: responseText,
        topic,
        trap,
        followUps: bestSpecialized.followUps || [
          "¿Cuáles son las velocidades máximas y mínimas?",
          "¿Cómo se circula en una glorieta?",
          "¿Cuándo es obligatoria la luz antiniebla?"
        ]
      };
    }

    // 2. SECOND PRIORITY: Match Topics in Carnet Data
    let matchedTopic = null;
    let maxTopicScore = -1;

    carnetData.topics.forEach(t => {
      let score = 0;
      queryTokens.forEach(term => {
        if (t.title.toLowerCase().includes(term)) score += 6;
        if (t.synonyms.toLowerCase().includes(term)) score += 4;
        if (t.queSaber.toLowerCase().includes(term)) score += 3;
        if (t.verificacionDGT.toLowerCase().includes(term)) score += 4;
        if (t.trampas.toLowerCase().includes(term)) score += 3;
      });

      if (score > maxTopicScore) {
        maxTopicScore = score;
        matchedTopic = t;
      }
    });

    if (matchedTopic && maxTopicScore >= 3) {
      const matchedTrap = carnetData.trampas.find(tr => tr.topicId === matchedTopic.id);

      let responseText = `Sobre este concepto en el examen teórico del Permiso B:\n\n`;
      responseText += `📌 **Puntos Clave del Tema:**\n${matchedTopic.queSaber}\n\n`;
      responseText += `⚖️ **Regla Oficial DGT 2026:**\n${matchedTopic.verificacionDGT}\n\n`;
      
      if (matchedTopic.comoRecordarlo) {
        responseText += `🧠 **Truco de Memoria de Igor:**\n«${matchedTopic.comoRecordarlo}»\n\n`;
      }

      if (matchedTopic.trampas) {
        responseText += `⚠️ **Trampa Frecuente:**\n${matchedTopic.trampas}`;
      }

      return {
        text: responseText,
        topic: matchedTopic,
        trap: matchedTrap,
        followUps: [
          `¿Qué excepciones hay en el Tema ${matchedTopic.id}?`,
          `¿Qué preguntas suelen caer sobre ${matchedTopic.title}?`,
          `Ver explicación de Igor en el vídeo`
        ]
      };
    }

    // 3. FALLBACK: Comprehensive General Study Guidance
    return {
      text: `Para el examen teórico del Permiso B 2026, aquí tienes las reglas maestras fundamentales:\n\n• **Velocidades:** 120 km/h en autopistas/autovías (mín. 60 km/h), 90 km/h en carreteras convencionales (sin margen de +20 para adelantar) y 30 km/h en vías urbanas de un solo carril.\n• **Alcohol:** Menores tasa 0,0 g/l; noveles y profesionales 0,15 mg/l en aire (0,30 en sangre); conductores generales 0,25 mg/l en aire (0,50 en sangre).\n• **Prioridad:** Ceder a la derecha por norma general; en glorietas tienen preferencia los que ya circulan dentro del anillo.\n\n¿Quieres que profundicemos en algún tema en concreto?`,
      topic: carnetData.topics[0],
      followUps: [
        "¿Cuál es la diferencia entre autopista y autovía?",
        "¿Cuáles son las velocidades máximas y mínimas?",
        "¿Cómo se circula en una rotonda y cómo se sale?",
        "¿Cuándo es obligatoria la luz antiniebla trasera?"
      ]
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateTutorResponse(query);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: responseData.text,
        topic: responseData.topic,
        trap: responseData.trap,
        followUps: responseData.followUps,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 350);
  };

  const handleClearChat = () => {
    stopSpeaking();
    setMessages([
      {
        id: 'welcome_new',
        sender: 'tutor',
        text: '¡Listo! He reiniciado nuestra sesión. ¿Qué tema o duda del teórico quieres que repasemos ahora?',
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  if (!queryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-2xl bg-black/85 animate-in fade-in duration-150">
      
      {/* Backdrop click outside */}
      <div className="fixed inset-0" onClick={() => {
        setQueryModalOpen(false);
        stopSpeaking();
      }} />

      {/* Main Professor Studio Card */}
      <div className={`relative w-full bg-[#0E1424] border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col transition-all duration-200 ${
        isFullScreen ? 'max-w-6xl h-[96vh]' : 'max-w-3xl h-[88vh]'
      }`}>
        
        {/* Professor Studio Header */}
        <header className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-purple-950/90 via-[#12192c] to-[#101626] border-b border-purple-900/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-[1.5px] shadow-lg shadow-purple-500/25">
                <div className="w-full h-full bg-[#0E1424] rounded-[14px] flex items-center justify-center text-purple-300">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0E1424] absolute -bottom-0.5 -right-0.5 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">Profesor Musa</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Tutor IA • DGT 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Tu profesor particular para resolver dudas y darte trucos de examen</p>
            </div>
          </div>

          {/* Action buttons on header */}
          <div className="flex items-center gap-1.5">
            
            {/* Clear Chat */}
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reiniciar conversación"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Toggle Full Screen */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="hidden sm:inline-flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isFullScreen ? 'Reducir tamaño' : 'Pantalla completa'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={() => {
                setQueryModalOpen(false);
                stopSpeaking();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Cerrar (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Chat Messages Scrolling Area */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 -webkit-overflow-scrolling-touch bg-gradient-to-b from-[#0E1424] to-[#0A0D18]">
          
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 sm:gap-3 ${isTutor ? 'items-start' : 'items-start flex-row-reverse'} animate-in fade-in duration-150`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  isTutor 
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' 
                    : 'bg-sky-600/30 text-sky-300 border border-sky-500/40'
                }`}>
                  {isTutor ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[90%] sm:max-w-[84%] space-y-3 ${
                  isTutor ? 'text-left' : 'text-left'
                }`}>
                  
                  {/* Speech Bubble */}
                  <div className={`p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-lg ${
                    isTutor
                      ? 'bg-[#131B2F] border border-slate-700/80 text-slate-100 font-normal'
                      : 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-medium shadow-sky-500/15'
                  }`}>
                    {msg.text}

                    {/* Audio read-aloud button for tutor */}
                    {isTutor && msg.id !== 'welcome' && (
                      <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
                        <button
                          onClick={() => speakText(msg.text)}
                          className="flex items-center gap-1.5 text-[11px] font-bold text-purple-300 hover:text-purple-200 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isSpeaking ? 'Leyendo en voz alta...' : 'Escuchar explicación (Voz)'}</span>
                        </button>
                        {isSpeaking && (
                          <button
                            onClick={stopSpeaking}
                            className="text-[10px] text-rose-400 hover:underline font-bold"
                          >
                            Detener voz
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Attached Topic Link Card */}
                  {msg.topic && (
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                            Tema {msg.topic.id}
                          </span>
                          <span className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-none">
                            {msg.topic.title}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            openTopic(msg.topic.id);
                            setQueryModalOpen(false);
                            stopSpeaking();
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 rounded-xl text-xs font-bold transition-all shrink-0"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Abrir tema</span>
                        </button>
                      </div>

                      {/* Video jump reference */}
                      <div className="flex items-center justify-between pt-1 text-xs border-t border-slate-800">
                        <span className="text-slate-400 font-mono text-[11px]">
                          Minuto en vídeo: {msg.topic.timestampStart}
                        </span>
                        <a
                          href={msg.topic.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 font-bold text-[11px] flex items-center gap-1 hover:underline font-mono"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Ver clase de Igor</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Attached Trap Alert Card */}
                  {msg.trap && (
                    <div className="p-3.5 rounded-2xl bg-rose-950/25 border border-rose-900/50 space-y-1 shadow-md">
                      <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px] uppercase font-mono tracking-wider">
                        <AlertOctagon className="w-3.5 h-3.5" />
                        <span>⚠️ Trampa de Examen Relacionada</span>
                      </div>
                      <p className="text-xs text-rose-200 font-medium">{msg.trap.situation}</p>
                      <p className="text-xs text-emerald-300 font-bold mt-1">
                        ✅ Respuesta correcta: {msg.trap.correctAnswer}
                      </p>
                    </div>
                  )}

                  {/* Follow-up Quick Action Chips */}
                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                        Preguntas de seguimiento sugeridas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.followUps.map((chip, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => handleSendMessage(chip)}
                            className="text-left px-3 py-1.5 rounded-xl bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 border border-purple-800/40 text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5"
                          >
                            <span>{chip}</span>
                            <ArrowRight className="w-3 h-3 text-purple-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 font-mono block">
                    {msg.timestamp}
                  </span>

                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3 animate-in fade-in">
              <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#131B2F] border border-slate-700 text-slate-400 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                <span className="font-mono text-[11px] text-purple-300">El profesor está respondiendo a tu pregunta...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Category Topics when only welcome is shown */}
        {messages.length === 1 && (
          <div className="px-4 sm:px-6 py-2.5 bg-slate-950/70 border-t border-slate-800/80 overflow-x-auto scrollbar-none shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 whitespace-nowrap">
                Preguntas frecuentes:
              </span>
              {[
                { label: '🛣️ Autopista vs Autovía', q: '¿Cuál es la diferencia entre una autopista y una autovía?' },
                { label: '🛑 Parada vs Estacionamiento', q: '¿Qué diferencia hay entre parada, estacionamiento y detención?' },
                { label: '⚡ Adelantar 20 km/h', q: '¿Se puede superar la velocidad en 20 km/h para adelantar en carretera convencional?' },
                { label: '🔄 Rotondas y Prioridad', q: '¿Quién tiene prioridad en una rotonda y cómo se debe salir?' },
                { label: '💡 Luces Antiniebla', q: '¿Cuándo es obligatoria la luz antiniebla trasera y delantera?' },
                { label: '🍷 Tasas de Alcohol', q: '¿Cuáles son las tasas máximas de alcohol para menores, noveles y generales?' },
                { label: '📱 Móvil y Puntos', q: '¿Cuántos puntos se pierden por usar el móvil al volante?' }
              ].map((cat, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(cat.q)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-purple-950/40 text-slate-300 hover:text-purple-200 border border-slate-800 text-xs font-semibold whitespace-nowrap transition-all active:scale-95"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar & Voice Controls */}
        <footer className="p-3 sm:p-4 bg-[#0B0F1B] border-t border-slate-800/90 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Microphone Voice Input Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-3 rounded-2xl border transition-all active:scale-95 shrink-0 ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse shadow-lg shadow-rose-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-purple-300 border-slate-800 hover:border-purple-500/50'
              }`}
              title={isListening ? 'Escuchando... Toca para enviar' : 'Hablar por micrófono'}
            >
              {isListening ? <Mic className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? "Escuchando tu pregunta..." : "Pregúntale al Profesor Musa (ej: '¿Diferencia entre autopista y autovía?')..."}
              className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-purple-500 rounded-2xl px-4 py-3 text-base sm:text-sm text-white placeholder:text-slate-500 outline-none transition-all shadow-inner"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() && !isListening}
              className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl font-bold transition-all shadow-lg shadow-purple-500/20 active:scale-95 shrink-0"
              title="Enviar consulta"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </footer>

      </div>
    </div>
  );
};
