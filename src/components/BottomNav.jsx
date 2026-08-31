import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Video, 
  AlertTriangle, 
  Layers, 
  FileCheck2,
  Bot
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const BottomNav = () => {
  const { currentView, setCurrentView, setQueryModalOpen } = useProgress();

  const tabs = [
    { id: 'home', label: 'Inicio', icon: Sparkles },
    { id: 'temario', label: 'Temario', icon: BookOpen },
    { id: 'senales', label: 'Señales', icon: AlertTriangle },
    { id: 'examen', label: 'Tests', icon: FileCheck2 },
    { id: 'flashcards', label: 'Cards', icon: Layers },
    { id: 'tutor', label: 'Profesor', icon: Bot, isAction: true },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl bg-[#0B0F17]/95 border-t border-slate-800/90 px-1 py-1.5 safe-bottom shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = !tab.isAction && (currentView === tab.id || (tab.id === 'temario' && currentView === 'topic'));
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.isAction) {
                  setQueryModalOpen(true);
                } else {
                  setCurrentView(tab.id);
                }
              }}
              className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] py-1 px-1.5 rounded-2xl transition-all active:scale-95 ${
                tab.isAction
                  ? 'text-purple-400 font-bold'
                  : isActive
                  ? 'text-sky-400 bg-sky-500/10 font-bold scale-105 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${tab.isAction ? 'text-purple-400' : isActive ? 'text-sky-400' : 'text-slate-400'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight font-medium leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
