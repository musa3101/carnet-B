import React from 'react';
import { useProgress } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ConsultaRapidaModal } from './components/ConsultaRapidaModal';

// Views
import { HomeView } from './views/HomeView';
import { TemarioView } from './views/TemarioView';
import { TopicDetailView } from './views/TopicDetailView';
import { SenalesView } from './views/SenalesView';
import { VideoGuideView } from './views/VideoGuideView';
import { TrampasView } from './views/TrampasView';
import { FlashcardsView } from './views/FlashcardsView';
import { ExamenView } from './views/ExamenView';
import { RepasoView } from './views/RepasoView';
import { ProgresoView } from './views/ProgresoView';

export const App = () => {
  const { currentView } = useProgress();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'temario':
        return <TemarioView />;
      case 'topic':
        return <TopicDetailView />;
      case 'senales':
        return <SenalesView />;
      case 'video':
        return <VideoGuideView />;
      case 'trampas':
        return <TrampasView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'examen':
        return <ExamenView />;
      case 'repaso':
        return <RepasoView />;
      case 'progreso':
        return <ProgresoView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans selection:bg-sky-500 selection:text-white overscroll-none">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area with safe bottom spacing for mobile bar */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 main-content-pb">
        {renderView()}
      </main>

      {/* Footer (Desktop/Tablet) */}
      <footer className="hidden lg:block border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <p>CARNET B • Manual Digital & Guía Interactiva DGT 2026</p>
          <p className="text-slate-400">Basado en las 55.939 palabras y 36 capítulos del curso intensivo de Igor</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar with Safe Area */}
      <BottomNav />

      {/* Global Modals */}
      <GlobalSearchModal />
      <ConsultaRapidaModal />

    </div>
  );
};
