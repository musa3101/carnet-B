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
  Minimize2,
  MessageSquare,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  History,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { TUTOR_QA_DATABASE } from '../data/tutorKnowledge';
import { BrandLogo } from './BrandLogo';

const DEFAULT_CONVERSATIONS = [
  {
    id: 'conv_parada_estacionamiento',
    title: 'Diferencia Parada vs Estacionamiento',
    createdAt: Date.now() - 3600000 * 4,
    messages: [
      {
        id: 'msg_1',
        sender: 'user',
        text: '¿Cuál es la diferencia exacta entre parada y estacionamiento?',
        timestamp: '15:20'
      },
      {
        id: 'msg_2',
        sender: 'tutor',
        text: '¡Muy buena pregunta para el examen! Aquí tienes la diferencia clave:\n\n⏱️ **La Regla de Oro de los 2 Minutos:**\n• **PARADA:** Inmovilización voluntaria de menos de 2 minutos SIN que el conductor abandone el vehículo (puedes bajarte siempre que estés al lado y listo para moverlo).\n• **ESTACIONAMIENTO:** Inmovilización que NO sea parada ni detención (dura 2 minutos o más, O el conductor abandona el vehículo).\n\n⚠️ **Trampa DGT Frecuente:** Si te bajas del coche 30 segundos a comprar tabaco y te alejas, NO es parada aunque dure menos de 2 minutos: es estacionamiento porque has abandonado el puesto.',
        timestamp: '15:20',
        topicId: 12
      }
    ]
  },
  {
    id: 'conv_velocidades_2026',
    title: 'Velocidades Máximas y Mínimas 2026',
    createdAt: Date.now() - 3600000 * 2,
    messages: [
      {
        id: 'msg_3',
        sender: 'user',
        text: '¿A qué velocidad puede ir un turismo en autovía y carretera?',
        timestamp: '17:45'
      },
      {
        id: 'msg_4',
        sender: 'tutor',
        text: 'Estas son las velocidades oficiales para Turismos y Motos en la DGT 2026:\n\n🚗 **Autopista / Autovía:**\n• Máxima: **120 km/h** | Mínima: **60 km/h**\n\n🛣️ **Carretera Convencional:**\n• Máxima: **90 km/h** | Mínima: **45 km/h**\n• ⚠️ *Recuerda:* Ya NO existe el margen de +20 km/h para adelantar.\n\n🏙️ **Vías Urbanas:**\n• 1 carril por sentido: **30 km/h** | Plataforma única: **20 km/h** | 2 o más carriles: **50 km/h**.',
        timestamp: '17:45',
        topicId: 10
      }
    ]
  }
];

export const ConsultaRapidaModal = () => {
  const { queryModalOpen, setQueryModalOpen, carnetData, openTopic } = useProgress();
  const { user } = useAuth();

  // Conversations State (Saved per user in localStorage)
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem('carnet_tutor_conversations');
      return saved ? JSON.parse(saved) : DEFAULT_CONVERSATIONS;
    } catch (e) {
      return DEFAULT_CONVERSATIONS;
    }
  });

  const [activeConvId, setActiveConvId] = useState(() => {
    return conversations.length > 0 ? conversations[0].id : 'new';
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Active conversation object
  const activeConversation = conversations.find(c => c.id === activeConvId) || {
    id: 'current',
    title: 'Nueva Consulta',
    messages: [
      {
        id: 'welcome',
        sender: 'tutor',
        text: `¡Hola ${user?.name || 'Estudiante'}! Soy Musa, tu Profesor Virtual del Permiso B.\n\nHe memorizado las 55.939 palabras del temario y toda la normativa DGT 2026. Pregúntame cualquier duda o elige uno de los temas rápidos abajo.`,
        timestamp: 'Ahora'
      }
    ]
  };

  // Sync conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('carnet_tutor_conversations', JSON.stringify(conversations));
    } catch (e) {}
  }, [conversations]);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation.messages, isTyping]);

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

  // Speech Recognition (Web Speech API)
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
  }, [activeConvId]);

  const toggleVoiceInput = () => {
    try {
      if (!recognitionRef.current) {
        alert('Tu navegador no tiene activado el reconocimiento de voz. Puedes escribir tu duda en el campo de texto.');
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
      console.warn('Voice recognition notice:', err);
      setIsListening(false);
    }
  };

  const stopSpeaking = () => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    } catch (e) {}
  };

  const speakText = (text) => {
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      if (isSpeaking) {
        stopSpeaking();
        return;
      }

      stopSpeaking();
      const cleanText = text
        .replace(/[*#_`•]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/🎓|⚖️|🧠|⚠️|✅|💡|🚗|📌|🔄|📱|💺|📡|🔥|🚴|❌/g, '')
        .substring(0, 320);

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 1.02;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setIsSpeaking(false);
    }
  };

  // High-Precision Knowledge Matching
  const generateTutorResponse = (query) => {
    const q = query.toLowerCase().trim();
    const queryTokens = q.split(/[\s,?.!¿¡]+/).filter(w => w.length > 2);

    // 1. Priority QA Match
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

    if (bestSpecialized && maxSpecializedScore >= 5) {
      const topic = carnetData.topics.find(t => t.id === bestSpecialized.topicId) || carnetData.topics[0];
      const trap = carnetData.trampas.find(tr => tr.topicId === bestSpecialized.topicId);

      let responseText = `${bestSpecialized.explicacionIgor}\n\n`;
      responseText += `⚖️ **Verificación Oficial DGT 2026:**\n${bestSpecialized.normaDGT}\n\n`;
      if (bestSpecialized.trucoMemoria) {
        responseText += `🧠 **Truco Mnemotécnico de Igor:**\n${bestSpecialized.trucoMemoria}\n\n`;
      }
      if (bestSpecialized.trampaExamen) {
        responseText += `⚠️ **Trampa Típica DGT:**\n${bestSpecialized.trampaExamen}`;
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

    // 2. Topic Keyword Match
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

      let responseText = `Sobre este concepto en el Permiso B:\n\n`;
      responseText += `📌 **Puntos Clave del Tema ${matchedTopic.id}:**\n${matchedTopic.queSaber}\n\n`;
      responseText += `⚖️ **Regla Oficial DGT 2026:**\n${matchedTopic.verificacionDGT}\n\n`;
      
      if (matchedTopic.comoRecordarlo) {
        responseText += `🧠 **Truco de Memoria:**\n«${matchedTopic.comoRecordarlo}»\n\n`;
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

    // 3. Fallback
    return {
      text: `Para el examen teórico del Permiso B 2026, aquí tienes las reglas maestras fundamentales:\n\n• **Velocidades:** 120 km/h en autopistas/autovías (mín. 60 km/h), 90 km/h en carreteras convencionales (sin margen de +20) y 30 km/h en vías urbanas de un carril.\n• **Alcohol:** Menores 0,0 g/l; noveles y profesionales 0,15 mg/l en aire (0,30 en sangre); conductores generales 0,25 mg/l en aire (0,50 en sangre).\n• **Prioridad:** Ceder el paso a la derecha por norma general; en glorietas tienen preferencia los que circulan dentro del anillo.\n\n¿Quieres que profundicemos en algún tema en concreto?`,
      topic: carnetData.topics[0],
      followUps: [
        "¿Cuál es la diferencia entre autopista y autovía?",
        "¿Cuáles son las velocidades máximas y mínimas?",
        "¿Cómo se circula en una rotonda y cómo se sale?",
        "¿Cuándo es obligatoria la luz antiniebla trasera?"
      ]
    };
  };

  // Start New Conversation
  const handleNewConversation = () => {
    const newId = 'conv_' + Date.now();
    const newConv = {
      id: newId,
      title: 'Nueva Consulta',
      createdAt: Date.now(),
      messages: [
        {
          id: 'welcome_' + newId,
          sender: 'tutor',
          text: `¡Hola! Soy Musa, tu Profesor Virtual del Permiso B. ¿En qué te puedo ayudar hoy?`,
          timestamp: 'Ahora'
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(newId);
    setInputText('');
  };

  // Delete Conversation
  const handleDeleteConversation = (e, id) => {
    e.stopPropagation();
    const filtered = conversations.filter(c => c.id !== id);
    setConversations(filtered);
    if (activeConvId === id) {
      if (filtered.length > 0) {
        setActiveConvId(filtered[0].id);
      } else {
        handleNewConversation();
      }
    }
  };

  // Send Message
  const handleSendMessage = (textToSend = null) => {
    const raw = textToSend || inputText;
    if (!raw.trim() || isTyping) return;

    const userQuery = raw.trim();
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: userQuery,
      timestamp: timeString
    };

    // Update conversation title if it was "Nueva Consulta"
    const currentConv = conversations.find(c => c.id === activeConvId);
    let updatedTitle = currentConv ? currentConv.title : userQuery.substring(0, 30);
    if (updatedTitle === 'Nueva Consulta') {
      updatedTitle = userQuery.length > 32 ? userQuery.substring(0, 32) + '...' : userQuery;
    }

    // Add user message immediately
    setConversations(prev => {
      const exists = prev.some(c => c.id === activeConvId);
      if (!exists) {
        return [{
          id: activeConvId,
          title: updatedTitle,
          createdAt: Date.now(),
          messages: [userMessage]
        }, ...prev];
      }
      return prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            title: updatedTitle,
            messages: [...c.messages, userMessage]
          };
        }
        return c;
      });
    });

    setInputText('');
    setIsTyping(true);

    // Generate response smoothly
    setTimeout(() => {
      const responseData = generateTutorResponse(userQuery);
      const tutorMessage = {
        id: 'tutor_' + Date.now(),
        sender: 'tutor',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topic: responseData.topic,
        trap: responseData.trap,
        followUps: responseData.followUps
      };

      setConversations(prev => {
        return prev.map(c => {
          if (c.id === activeConvId) {
            return {
              ...c,
              messages: [...c.messages, tutorMessage]
            };
          }
          return c;
        });
      });

      setIsTyping(false);
    }, 450);
  };

  const quickPrompts = [
    { label: '🛑 Parada vs Estacionamiento', query: '¿Diferencia entre parada y estacionamiento?' },
    { label: '🏎️ Velocidades 2026', query: '¿Cuáles son las velocidades máximas y mínimas en autovía y carretera?' },
    { label: '🔄 Glorietas y Rotondas', query: '¿Cómo se circula en una glorieta y por qué carril se sale?' },
    { label: '🌫️ Luces Antiniebla', query: '¿Cuándo es obligatoria la luz antiniebla delantera y trasera?' },
    { label: '🍺 Tasas de Alcohol', query: '¿Cuáles son las tasas de alcohol para noveles y conductores generales?' }
  ];

  if (!queryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      
      {/* Modal Container */}
      <div 
        className={`w-full ${isFullScreen ? 'h-full max-w-full rounded-none' : 'max-w-6xl h-[92vh] max-h-[850px] rounded-3xl'} bg-[#0B101D] border border-slate-700/80 shadow-2xl flex flex-col md:flex-row overflow-hidden text-slate-100 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ========================================================= */}
        {/* 1. LEFT SIDEBAR: ChatGPT-Style Conversation History       */}
        {/* ========================================================= */}
        <aside 
          className={`${sidebarOpen ? 'w-full md:w-72 sm:w-80' : 'w-0 hidden md:hidden'} transition-all duration-200 border-r border-slate-800 bg-[#080D19] flex flex-col shrink-0 z-20`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <BrandLogo size="sm" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* New Chat Action Button */}
          <div className="p-3">
            <button
              onClick={handleNewConversation}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Consulta</span>
            </button>
          </div>

          {/* Conversation History List */}
          <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1.5 custom-scrollbar">
            <div className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
              <History className="w-3 h-3" />
              <span>Historial de Consultas</span>
            </div>

            {conversations.map((c) => {
              const isActive = c.id === activeConvId;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveConvId(c.id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`group p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-950/70 to-indigo-950/70 text-white font-bold border border-cyan-500/40 shadow-sm' 
                      : 'hover:bg-slate-900/80 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="truncate">{c.title || 'Consulta sin título'}</span>
                  </div>

                  <button
                    onClick={(e) => handleDeleteConversation(e, c.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 text-slate-400 transition-opacity"
                    title="Eliminar consulta"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-slate-300">Profesor Musa IA</span>
            </div>
            <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/20">
              DGT 2026
            </span>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* 2. MAIN CHAT AREA                                         */}
        {/* ========================================================= */}
        <main className="flex-1 flex flex-col h-full bg-[#0B101D] relative overflow-hidden">
          
          {/* Background Watermark Speed Shield (Center Branded Watermark) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none">
            <svg className="w-[450px] h-[450px] text-cyan-400" viewBox="0 0 32 32" fill="none">
              <path d="M16 3L27 7.5V15.5C27 22.2 22.3 28.2 16 29.5C9.7 28.2 5 22.2 5 15.5V7.5L16 3Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 18C11.5 15 13.5 13.5 16 13.5C18.5 13.5 20.5 15 21 18" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="18" r="2.5" fill="currentColor" />
            </svg>
          </div>

          {/* Top Bar */}
          <header className="px-4 sm:px-6 py-3 border-b border-slate-800 bg-[#0B101D]/90 backdrop-blur-md flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors"
                title={sidebarOpen ? 'Ocultar historial' : 'Ver historial'}
              >
                {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/20">
                  <div className="w-full h-full bg-[#0B101D] rounded-[10px] flex items-center justify-center text-cyan-300">
                    <Bot className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-none">
                      Profesor Musa
                    </h3>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Tutor Oficial • 55.939 palabras y Normativa 2026</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="hidden sm:flex p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition-colors cursor-pointer"
                title={isFullScreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setQueryModalOpen(false);
                  stopSpeaking();
                }}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition-colors cursor-pointer"
                title="Cerrar (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Messages Canvas */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 relative z-10 custom-scrollbar">
            {activeConversation.messages.map((msg) => {
              const isTutor = msg.sender === 'tutor';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isTutor ? '' : 'flex-row-reverse'} animate-fadeIn`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    isTutor 
                      ? 'bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white' 
                      : 'bg-gradient-to-tr from-sky-500 to-cyan-400 text-slate-900'
                  }`}>
                    {isTutor ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[88%] sm:max-w-2xl rounded-2xl p-4 sm:p-5 shadow-lg ${
                    isTutor 
                      ? 'bg-gradient-to-b from-[#11192E] to-[#0D1527] border border-slate-700/80 text-slate-200' 
                      : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-medium ml-auto'
                  }`}>
                    
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-75">
                        {isTutor ? 'Profesor Musa' : user?.name || 'Tú'}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono opacity-60">{msg.timestamp}</span>
                        {isTutor && (
                          <button
                            onClick={() => speakText(msg.text)}
                            className="p-1 rounded hover:bg-slate-700/50 text-cyan-300 transition-colors"
                            title={isSpeaking ? 'Detener lectura' : 'Escuchar respuesta con voz'}
                          >
                            {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {msg.text}
                    </div>

                    {/* Quick Link Card for Topic */}
                    {msg.topic && (
                      <div className="mt-3.5 pt-3 border-t border-slate-700/70 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="text-[11px] font-bold text-cyan-300 truncate">
                            Tema {msg.topic.id}: {msg.topic.title}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setQueryModalOpen(false);
                            stopSpeaking();
                            openTopic(msg.topic.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold border border-cyan-500/30 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Abrir en Manual</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Follow-up Question Chips */}
                    {msg.followUps && msg.followUps.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap gap-1.5">
                        {msg.followUps.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(chip)}
                            className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-[10px] font-medium transition-colors cursor-pointer text-left"
                          >
                            💬 {chip}
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-3 animate-fadeIn">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="bg-[#11192E] border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-cyan-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Profesor Musa está consultando la normativa DGT...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Area: Suggestions & Input Bar */}
          <footer className="p-3 sm:p-4 border-t border-slate-800 bg-[#080D19] z-10 shrink-0 space-y-2.5">
            
            {/* Quick Prompts Carousel */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  className="px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-[11px] text-slate-300 hover:text-cyan-300 font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-[#0E1528] border border-slate-700/80 rounded-2xl p-1.5 focus-within:border-cyan-400 transition-colors shadow-inner"
            >
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-2.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                  isListening 
                    ? 'bg-rose-500 text-white animate-pulse' 
                    : 'bg-slate-800/80 text-slate-300 hover:text-cyan-300'
                }`}
                title={isListening ? 'Escuchando... pulsa para parar' : 'Dictar tu duda por voz'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                placeholder="Pregúntale a Musa (ej: '¿cuándo poner antiniebla trasera?', '¿glorietas?')..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder:text-slate-400 px-2 min-w-0"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-md"
                title="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </footer>

        </main>

      </div>
    </div>
  );
};
