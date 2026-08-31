import React from 'react';
import { 
  BookOpen, 
  Search, 
  Video, 
  AlertOctagon, 
  Layers, 
  FileCheck2, 
  Zap, 
  BarChart3, 
  Moon, 
  Sun, 
  Sparkles,
  AlertTriangle,
  Bot
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { UserMenu } from './UserMenu';

export const Navbar = () => {
  const { 
    currentView, 
    setCurrentView, 
    theme, 
    toggleTheme, 
    progressPercentage, 
    setSearchModalOpen,
    setQueryModalOpen,
    completedTopics,
    failedQuestions
  } = useProgress();

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Sparkles },
    { id: 'temario', label: 'Temario', icon: BookOpen, badge: `${completedTopics.length}/36` },
    { id: 'senales', label: 'Señales', icon: AlertTriangle },
    { id: 'examen', label: 'Tests', icon: FileCheck2, badge: failedQuestions.length > 0 ? `${failedQuestions.length} falladas` : null },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'video', label: 'Curso Igor', icon: Video },
    { id: 'progreso', label: 'Progreso', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0B0F17]/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#0B0F17] rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
                <span className="text-base sm:text-xl font-black bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent font-display">
                  B
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight text-white font-display">carnetb-mnxt</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  DGT 2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium hidden md:block">Manual Digital & Curso Igor</p>
            </div>
          </div>

          {/* Desktop Navigation Links (7 Modules) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || (item.id === 'temario' && currentView === 'topic');
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-900 text-slate-400 font-mono border border-slate-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Quick Ask AI Professor Trigger (Hidden on small mobile since it's on bottom bar) */}
            <button
              onClick={() => setQueryModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-950/80 to-indigo-950/80 text-purple-200 border border-purple-600/50 hover:border-purple-400 hover:scale-102 transition-all shadow-md shadow-purple-900/20 shrink-0"
              title="Pregúntale al Profesor Musa (Tutor Virtual de Teórica)"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Profesor Musa</span>
              <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-300 border border-purple-400/40 hidden md:inline">
                TUTOR
              </span>
            </button>

            {/* Global Search Bar Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs bg-[#101622] border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500/50 transition-all group shadow-sm shrink-0"
              aria-label="Buscar en el temario"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors" />
              <span className="hidden md:inline text-slate-400">Buscar...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Progress Gauge Pill */}
            <div 
              onClick={() => setCurrentView('progreso')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101622] border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors"
              title="Progreso global del temario"
            >
              <div className="w-10 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-200 font-mono">{progressPercentage}%</span>
            </div>

            {/* User Profile & Multi-account Switcher */}
            <UserMenu />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-850 transition-colors border border-transparent hover:border-slate-800 shrink-0"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
