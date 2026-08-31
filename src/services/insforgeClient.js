import { createClient } from '@insforge/sdk';

// InsForge Configuration (reads from environment variables or project instance)
const INSFORGE_URL = import.meta.env.VITE_INSFORGE_URL || 'https://64yaq72v.us-east.insforge.app';
const INSFORGE_ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY || 'anon_fdc360afbda63af54a67bf67d3197b8cf9ba5304110987fa85ca3033aec38fd5';

let insforgeInstance = null;

export const getInsforgeClient = () => {
  if (!INSFORGE_URL || !INSFORGE_ANON_KEY) return null;

  if (!insforgeInstance) {
    try {
      insforgeInstance = createClient({
        baseUrl: INSFORGE_URL,
        anonKey: INSFORGE_ANON_KEY,
        autoRefreshToken: false,
        persistSession: true,
      });
    } catch (e) {
      console.warn('[InsForge] Client initialization notice:', e);
    }
  }
  return insforgeInstance;
};

// --- AUTHENTICATION HELPERS ---

/**
 * Sign in with OAuth provider (Google or Apple)
 * @param {'google' | 'apple'} provider 
 */
export const signInWithOAuth = async (provider) => {
  const client = getInsforgeClient();
  if (!client) {
    // Offline / client-first simulated authentication
    return { provider, status: 'client_session' };
  }
  
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const redirectUrl = `${currentOrigin}/#auth-callback`;

  return await client.auth.signInWithOAuth({
    provider,
    redirectTo: redirectUrl
  });
};

const withTimeout = (promise, ms = 2000) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Network timeout')), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

export const emailToUUID = (email) => {
  let hash1 = 5381;
  let hash2 = 52711;
  const str = String(email || 'user@local.dev').toLowerCase().trim();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash1 = ((hash1 << 5) + hash1) ^ char;
    hash2 = ((hash2 << 5) + hash2) ^ char;
  }
  const h1 = (hash1 >>> 0).toString(16).padStart(8, '0');
  const h2 = (hash2 >>> 0).toString(16).padStart(8, '0');
  const h3 = ((hash1 ^ hash2) >>> 0).toString(16).padStart(8, '0');
  const h4 = ((hash1 + hash2) >>> 0).toString(16).padStart(8, '0');
  return `${h1}-${h2.slice(0, 4)}-4${h2.slice(4, 7)}-8${h3.slice(0, 3)}-${h4}${h3.slice(4, 8)}`;
};

/**
 * Sign in with Email & Password
 */
export const signInWithEmailPassword = async (email, password) => {
  const client = getInsforgeClient();
  const fallbackUser = {
    user: {
      id: emailToUUID(email),
      email,
      name: email.split('@')[0].toUpperCase()
    }
  };

  if (!client) return fallbackUser;

  try {
    const res = await withTimeout(client.auth.signInWithPassword({ email, password }), 2000);
    return res || fallbackUser;
  } catch (e) {
    return fallbackUser;
  }
};

/**
 * Sign up with Email & Password + Display Name
 */
export const signUpWithEmailPassword = async (email, password, name) => {
  const client = getInsforgeClient();
  const fallbackUser = {
    user: {
      id: emailToUUID(email),
      email,
      name: name || email.split('@')[0].toUpperCase()
    }
  };

  if (!client) return fallbackUser;

  try {
    const res = await withTimeout(client.auth.signUp({ email, password, options: { data: { full_name: name } } }), 2000);
    return res || fallbackUser;
  } catch (e) {
    return fallbackUser;
  }
};

/**
 * Sign out current user
 */
export const signOutCurrentUser = async () => {
  const client = getInsforgeClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.warn('[InsForge] Error during signOut:', e);
    }
  }
};

/**
 * Get current authenticated user
 */
export const getActiveUser = async () => {
  const client = getInsforgeClient();
  if (!client) return null;

  try {
    const res = await client.auth.getCurrentUser();
    const user = res?.data?.user || res?.user;
    if (user && user.id) {
      return user;
    }
    return null;
  } catch (e) {
    return null;
  }
};

// --- DATABASE & SYNC HELPERS ---

/**
 * Fetch study progress from InsForge for a given user
 */
export const fetchStudyProgressFromCloud = async (userId) => {
  const client = getInsforgeClient();
  if (!client || !userId) return null;

  try {
    const { data, error } = await client.database
      .from('user_study_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.warn('[InsForge] Error fetching study progress:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[InsForge] Exception fetching study progress:', err);
    return null;
  }
};

/**
 * Save / Upsert study progress in InsForge
 */
export const saveStudyProgressToCloud = async (userId, progressData) => {
  const client = getInsforgeClient();
  if (!client || !userId) return false;

  try {
    const payload = {
      user_id: userId,
      user_email: progressData.userEmail || null,
      user_name: progressData.userName || null,
      completed_topics: progressData.completedTopics || [],
      bookmarked_topics: progressData.bookmarkedTopics || [],
      mastered_flashcards: progressData.masteredFlashcards || [],
      difficult_flashcards: progressData.difficultFlashcards || [],
      failed_questions: progressData.failedQuestions || [],
      last_visited_topic: progressData.lastVisitedTopicId || '01',
      updated_at: new Date().toISOString()
    };

    const { error } = await client.database
      .from('user_study_progress')
      .upsert(payload, { onConflict: 'user_id' });

    if (error) {
      console.warn('[InsForge] Error saving study progress:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[InsForge] Exception saving study progress:', err);
    return false;
  }
};

/**
 * Record an exam attempt in InsForge
 */
export const recordExamAttemptToCloud = async (userId, examResult) => {
  const client = getInsforgeClient();
  if (!client || !userId) return false;

  try {
    const payload = {
      user_id: userId,
      mode: examResult.mode || 'oficial',
      score: examResult.score,
      total_questions: examResult.totalQuestions,
      passed: examResult.passed,
      wrong_topic_ids: examResult.wrongTopicIds || [],
      wrong_questions: examResult.wrongQuestions || [],
      time_spent_seconds: examResult.timeSpentSeconds || 0,
      created_at: new Date().toISOString()
    };

    const { error } = await client.database
      .from('exam_results')
      .insert(payload);

    if (error) {
      console.warn('[InsForge] Error saving exam result:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[InsForge] Exception saving exam result:', err);
    return false;
  }
};
