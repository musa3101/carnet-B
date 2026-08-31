import React, { createContext, useContext, useState, useEffect } from 'react';
import carnetData from '../data/carnetData.json';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('carnet_theme');
    return saved || 'dark';
  });

  // Navigation state (7 core modules: home, temario, senales, preguntame, tests, flashcards, progreso, topic)
  const [currentView, setCurrentView] = useState('home');
  const [selectedTopicId, setSelectedTopicId] = useState('01');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);

  // User progress persisted in localStorage
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('carnet_completed_topics');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookmarkedTopics, setBookmarkedTopics] = useState(() => {
    const saved = localStorage.getItem('carnet_bookmarked_topics');
    return saved ? JSON.parse(saved) : [];
  });

  const [masteredFlashcards, setMasteredFlashcards] = useState(() => {
    const saved = localStorage.getItem('carnet_mastered_flashcards');
    return saved ? JSON.parse(saved) : [];
  });

  const [difficultFlashcards, setDifficultFlashcards] = useState(() => {
    const saved = localStorage.getItem('carnet_difficult_flashcards');
    return saved ? JSON.parse(saved) : [];
  });

  const [examHistory, setExamHistory] = useState(() => {
    const saved = localStorage.getItem('carnet_exam_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Stores array of failed question IDs / objects for "Test de Errores"
  const [failedQuestions, setFailedQuestions] = useState(() => {
    const saved = localStorage.getItem('carnet_failed_questions');
    return saved ? JSON.parse(saved) : [];
  });

  const [lastVisitedTopicId, setLastVisitedTopicId] = useState(() => {
    return localStorage.getItem('carnet_last_topic') || '01';
  });

  // Sync theme with HTML class
  useEffect(() => {
    localStorage.setItem('carnet_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Persist progress in localStorage
  useEffect(() => {
    localStorage.setItem('carnet_completed_topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('carnet_bookmarked_topics', JSON.stringify(bookmarkedTopics));
  }, [bookmarkedTopics]);

  useEffect(() => {
    localStorage.setItem('carnet_mastered_flashcards', JSON.stringify(masteredFlashcards));
  }, [masteredFlashcards]);

  useEffect(() => {
    localStorage.setItem('carnet_difficult_flashcards', JSON.stringify(difficultFlashcards));
  }, [difficultFlashcards]);

  useEffect(() => {
    localStorage.setItem('carnet_exam_history', JSON.stringify(examHistory));
  }, [examHistory]);

  useEffect(() => {
    localStorage.setItem('carnet_failed_questions', JSON.stringify(failedQuestions));
  }, [failedQuestions]);

  useEffect(() => {
    localStorage.setItem('carnet_last_topic', lastVisitedTopicId);
  }, [lastVisitedTopicId]);

  // Global keyboard shortcut for Search (CMD+K or CTRL+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Action helpers
  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleBookmark = (topicId) => {
    setBookmarkedTopics(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleFlashcardMastery = (cardId) => {
    setMasteredFlashcards(prev => {
      const isMastered = prev.includes(cardId);
      if (isMastered) return prev.filter(id => id !== cardId);
      setDifficultFlashcards(d => d.filter(id => id !== cardId));
      return [...prev, cardId];
    });
  };

  const toggleFlashcardDifficult = (cardId) => {
    setDifficultFlashcards(prev => {
      const isDiff = prev.includes(cardId);
      if (isDiff) return prev.filter(id => id !== cardId);
      setMasteredFlashcards(m => m.filter(id => id !== cardId));
      return [...prev, cardId];
    });
  };

  const recordExamAttempt = (result) => {
    setExamHistory(prev => [result, ...prev]);

    // Save failed questions for future review tests
    if (result.wrongQuestions && result.wrongQuestions.length > 0) {
      setFailedQuestions(prev => {
        const existingIds = new Set(prev.map(q => q.id));
        const newOnes = result.wrongQuestions.filter(q => !existingIds.has(q.id));
        return [...prev, ...newOnes];
      });
    }
  };

  const removeResolvedFailedQuestion = (questionId) => {
    setFailedQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const clearFailedQuestions = () => {
    setFailedQuestions([]);
  };

  const openTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setLastVisitedTopicId(topicId);
    setCurrentView('topic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const resetAllProgress = () => {
    if (window.confirm('¿Seguro que deseas reiniciar todo tu progreso de estudio?')) {
      setCompletedTopics([]);
      setBookmarkedTopics([]);
      setMasteredFlashcards([]);
      setDifficultFlashcards([]);
      setExamHistory([]);
      setFailedQuestions([]);
      setLastVisitedTopicId('01');
    }
  };

  // Calculate weak topics from exam history
  const weakTopics = (() => {
    const errorCounts = {};
    examHistory.forEach(attempt => {
      if (attempt.wrongTopicIds) {
        attempt.wrongTopicIds.forEach(id => {
          errorCounts[id] = (errorCounts[id] || 0) + 1;
        });
      }
    });
    return Object.entries(errorCounts)
      .map(([topicId, count]) => {
        const topic = carnetData.topics.find(t => t.id === topicId);
        return {
          topicId,
          title: topic ? topic.title : `Tema ${topicId}`,
          errorCount: count
        };
      })
      .sort((a, b) => b.errorCount - a.errorCount);
  })();

  const totalTopics = carnetData.topics.length;
  const progressPercentage = Math.round((completedTopics.length / totalTopics) * 100);

  return (
    <ProgressContext.Provider value={{
      carnetData,
      theme,
      toggleTheme,
      currentView,
      setCurrentView,
      selectedTopicId,
      setSelectedTopicId,
      openTopic,
      lastVisitedTopicId,
      completedTopics,
      toggleTopicCompletion,
      bookmarkedTopics,
      toggleBookmark,
      masteredFlashcards,
      toggleFlashcardMastery,
      difficultFlashcards,
      toggleFlashcardDifficult,
      examHistory,
      recordExamAttempt,
      failedQuestions,
      removeResolvedFailedQuestion,
      clearFailedQuestions,
      weakTopics,
      resetAllProgress,
      progressPercentage,
      searchModalOpen,
      setSearchModalOpen,
      queryModalOpen,
      setQueryModalOpen,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
