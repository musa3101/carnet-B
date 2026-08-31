import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import carnetData from '../data/carnetData.json';
import { useAuth } from './AuthContext';
import { 
  fetchStudyProgressFromCloud, 
  saveStudyProgressToCloud, 
  recordExamAttemptToCloud 
} from '../services/insforgeClient';

const ProgressContext = createContext(null);

// Safe localStorage helpers (prevents crashes in Safari Private Mode or corrupted JSON)
const safeGetJSON = (key, fallback) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const item = localStorage.getItem(key);
    if (!item || item === 'undefined' || item === 'null') return fallback;
    return JSON.parse(item);
  } catch (e) {
    console.warn(`[Storage] Failed to read ${key}:`, e);
    return fallback;
  }
};

const safeSetJSON = (key, value) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.warn(`[Storage] Failed to write ${key}:`, e);
  }
};

const safeGetStr = (key, fallback) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    return localStorage.getItem(key) || fallback;
  } catch (e) {
    return fallback;
  }
};

export const ProgressProvider = ({ children }) => {
  const { user, setCloudSyncStatus } = useAuth();
  const userId = user?.id || 'guest';

  // Theme state
  const [theme, setTheme] = useState(() => safeGetStr('carnet_theme', 'dark'));

  // Navigation state (7 core modules: home, temario, senales, preguntame, tests, flashcards, progreso, topic)
  const [currentView, setCurrentView] = useState('home');
  const [selectedTopicId, setSelectedTopicId] = useState('01');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);

  // User progress scoped by user ID
  const [completedTopics, setCompletedTopics] = useState(() => safeGetJSON(`carnet_${userId}_completed_topics`, []));
  const [bookmarkedTopics, setBookmarkedTopics] = useState(() => safeGetJSON(`carnet_${userId}_bookmarked_topics`, []));
  const [masteredFlashcards, setMasteredFlashcards] = useState(() => safeGetJSON(`carnet_${userId}_mastered_flashcards`, []));
  const [difficultFlashcards, setDifficultFlashcards] = useState(() => safeGetJSON(`carnet_${userId}_difficult_flashcards`, []));
  const [examHistory, setExamHistory] = useState(() => safeGetJSON(`carnet_${userId}_exam_history`, []));
  const [failedQuestions, setFailedQuestions] = useState(() => safeGetJSON(`carnet_${userId}_failed_questions`, []));
  const [lastVisitedTopicId, setLastVisitedTopicId] = useState(() => safeGetStr(`carnet_${userId}_last_topic`, '01'));

  // Track initial cloud sync
  const isInitialMount = useRef(true);
  const syncTimeoutRef = useRef(null);

  // When user switches, load user-specific data from localStorage and Cloud
  useEffect(() => {
    const currentScopeId = user?.id || 'guest';
    
    // 1. Load from local scoped storage first for instant UI
    const localCompleted = safeGetJSON(`carnet_${currentScopeId}_completed_topics`, []);
    const localBookmarked = safeGetJSON(`carnet_${currentScopeId}_bookmarked_topics`, []);
    const localMastered = safeGetJSON(`carnet_${currentScopeId}_mastered_flashcards`, []);
    const localDifficult = safeGetJSON(`carnet_${currentScopeId}_difficult_flashcards`, []);
    const localExam = safeGetJSON(`carnet_${currentScopeId}_exam_history`, []);
    const localFailed = safeGetJSON(`carnet_${currentScopeId}_failed_questions`, []);
    const localLast = safeGetStr(`carnet_${currentScopeId}_last_topic`, '01');

    setCompletedTopics(localCompleted);
    setBookmarkedTopics(localBookmarked);
    setMasteredFlashcards(localMastered);
    setDifficultFlashcards(localDifficult);
    setExamHistory(localExam);
    setFailedQuestions(localFailed);
    setLastVisitedTopicId(localLast);

    // 2. If authenticated, fetch latest from InsForge Cloud
    if (user?.id) {
      setCloudSyncStatus('syncing');
      fetchStudyProgressFromCloud(user.id).then(cloudData => {
        if (cloudData) {
          if (Array.isArray(cloudData.completed_topics)) setCompletedTopics(cloudData.completed_topics);
          if (Array.isArray(cloudData.bookmarked_topics)) setBookmarkedTopics(cloudData.bookmarked_topics);
          if (Array.isArray(cloudData.mastered_flashcards)) setMasteredFlashcards(cloudData.mastered_flashcards);
          if (Array.isArray(cloudData.difficult_flashcards)) setDifficultFlashcards(cloudData.difficult_flashcards);
          if (Array.isArray(cloudData.failed_questions)) setFailedQuestions(cloudData.failed_questions);
          if (cloudData.last_visited_topic) setLastVisitedTopicId(cloudData.last_visited_topic);
          setCloudSyncStatus('synced');
        } else {
          // First time cloud user -> push initial local data to cloud
          saveStudyProgressToCloud(user.id, {
            userEmail: user.email,
            userName: user.name,
            completedTopics: localCompleted,
            bookmarkedTopics: localBookmarked,
            masteredFlashcards: localMastered,
            difficultFlashcards: localDifficult,
            failedQuestions: localFailed,
            lastVisitedTopicId: localLast
          }).then(() => setCloudSyncStatus('synced'));
        }
      }).catch(() => {
        setCloudSyncStatus('local');
      });
    } else {
      setCloudSyncStatus('local');
    }
  }, [user?.id]);

  // Sync theme with HTML class
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('carnet_theme', theme);
      }
    } catch (e) {}
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Persist progress to local user storage
  useEffect(() => {
    safeSetJSON(`carnet_${userId}_completed_topics`, completedTopics);
  }, [completedTopics, userId]);

  useEffect(() => {
    safeSetJSON(`carnet_${userId}_bookmarked_topics`, bookmarkedTopics);
  }, [bookmarkedTopics, userId]);

  useEffect(() => {
    safeSetJSON(`carnet_${userId}_mastered_flashcards`, masteredFlashcards);
  }, [masteredFlashcards, userId]);

  useEffect(() => {
    safeSetJSON(`carnet_${userId}_difficult_flashcards`, difficultFlashcards);
  }, [difficultFlashcards, userId]);

  useEffect(() => {
    safeSetJSON(`carnet_${userId}_exam_history`, examHistory);
  }, [examHistory, userId]);

  useEffect(() => {
    safeSetJSON(`carnet_${userId}_failed_questions`, failedQuestions);
  }, [failedQuestions, userId]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(`carnet_${userId}_last_topic`, lastVisitedTopicId);
      }
    } catch (e) {}
  }, [lastVisitedTopicId, userId]);

  // Cloud Sync Debounce for Authenticated Users
  useEffect(() => {
    if (!user?.id) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    syncTimeoutRef.current = setTimeout(() => {
      setCloudSyncStatus('syncing');
      saveStudyProgressToCloud(user.id, {
        userEmail: user.email,
        userName: user.name,
        completedTopics,
        bookmarkedTopics,
        masteredFlashcards,
        difficultFlashcards,
        failedQuestions,
        lastVisitedTopicId
      }).then((ok) => {
        if (ok) setCloudSyncStatus('synced');
      });
    }, 1500);

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [completedTopics, bookmarkedTopics, masteredFlashcards, difficultFlashcards, failedQuestions, lastVisitedTopicId, user?.id]);

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

    // Save to InsForge Cloud in background if user is logged in
    if (user?.id) {
      recordExamAttemptToCloud(user.id, result);
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
    if (window.confirm('¿Seguro que deseas reiniciar todo tu progreso de estudio de esta cuenta?')) {
      setCompletedTopics([]);
      setBookmarkedTopics([]);
      setMasteredFlashcards([]);
      setDifficultFlashcards([]);
      setExamHistory([]);
      setFailedQuestions([]);
      setLastVisitedTopicId('01');
      if (user?.id) {
        saveStudyProgressToCloud(user.id, {
          userEmail: user.email,
          userName: user.name,
          completedTopics: [],
          bookmarkedTopics: [],
          masteredFlashcards: [],
          difficultFlashcards: [],
          failedQuestions: [],
          lastVisitedTopicId: '01'
        });
      }
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
