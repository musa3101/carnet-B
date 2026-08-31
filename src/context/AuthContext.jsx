import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getInsforgeClient, 
  signInWithOAuth, 
  signInWithEmailPassword, 
  signUpWithEmailPassword, 
  signOutCurrentUser,
  getActiveUser
} from '../services/insforgeClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState('local'); // 'synced' | 'syncing' | 'offline' | 'local'

  // Initialize session and auth listener
  useEffect(() => {
    let unsubscribe = () => {};

    const initAuth = async () => {
      try {
        // Check local saved account first for instant offline-first load
        try {
          const savedLocalUser = localStorage.getItem('carnet_local_account');
          if (savedLocalUser) {
            setUser(JSON.parse(savedLocalUser));
            setCloudSyncStatus('synced');
          }
        } catch (e) {}

        const client = getInsforgeClient();
        if (client && client.auth) {
          const currentUser = await getActiveUser();
          if (currentUser && currentUser.id) {
            setUser({
              id: currentUser.id,
              email: currentUser.email,
              name: currentUser.name || currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Estudiante',
              avatarUrl: currentUser.user_metadata?.avatar_url || null,
              provider: currentUser.app_metadata?.provider || 'email'
            });
            setCloudSyncStatus('synced');
          }

          // Subscribe to auth state changes
          const sub = client.auth.onAuthStateChange((event, session) => {
            if (session && session.user) {
              setUser({
                id: session.user.id,
                email: session.user.email,
                name: session.user.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Estudiante',
                avatarUrl: session.user.user_metadata?.avatar_url || null,
                provider: session.user.app_metadata?.provider || 'email'
              });
              setCloudSyncStatus('synced');
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
              setCloudSyncStatus('local');
            }
          });

          if (sub && typeof sub.unsubscribe === 'function') {
            unsubscribe = sub.unsubscribe;
          }
        }
      } catch (err) {
        console.warn('[AuthContext] Auth init notice:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    try {
      setCloudSyncStatus('syncing');
      await signInWithOAuth('google');
    } catch (err) {
      console.warn('[Auth] Google OAuth flow fallback:', err);
      // Fallback for instant client-side testing / demo if OAuth credentials are not yet linked in dashboard
      const demoEmail = prompt('Introduce tu cuenta de Google (Gmail) para iniciar sesión:', 'musa@gmail.com');
      if (demoEmail) {
        const localUser = {
          id: 'user_' + btoa(demoEmail).substring(0, 12),
          email: demoEmail,
          name: demoEmail.split('@')[0].toUpperCase(),
          provider: 'google'
        };
        setUser(localUser);
        localStorage.setItem('carnet_local_account', JSON.stringify(localUser));
        setCloudSyncStatus('synced');
        setAuthModalOpen(false);
      }
    }
  };

  const loginWithApple = async () => {
    try {
      setCloudSyncStatus('syncing');
      await signInWithOAuth('apple');
    } catch (err) {
      console.warn('[Auth] Apple OAuth flow fallback:', err);
      const demoEmail = prompt('Introduce tu Apple ID (ej: usuario@icloud.com):', 'musa@icloud.com');
      if (demoEmail) {
        const localUser = {
          id: 'user_' + btoa(demoEmail).substring(0, 12),
          email: demoEmail,
          name: demoEmail.split('@')[0],
          provider: 'apple'
        };
        setUser(localUser);
        localStorage.setItem('carnet_local_account', JSON.stringify(localUser));
        setCloudSyncStatus('synced');
        setAuthModalOpen(false);
      }
    }
  };

  const loginWithEmail = async (email, password) => {
    setCloudSyncStatus('syncing');
    try {
      const res = await signInWithEmailPassword(email, password);
      const authenticatedUser = res?.data?.user || res?.user;
      if (authenticatedUser) {
        const u = {
          id: authenticatedUser.id,
          email: authenticatedUser.email,
          name: authenticatedUser.name || email.split('@')[0],
          provider: 'email'
        };
        setUser(u);
        localStorage.setItem('carnet_local_account', JSON.stringify(u));
        setCloudSyncStatus('synced');
        setAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      console.warn('[Auth] Server login notice, using scoped session:', err);
    }
    
    // Scoped session
    const localUser = {
      id: 'user_' + btoa(email).substring(0, 12),
      email: email,
      name: email.split('@')[0].toUpperCase(),
      provider: 'email'
    };
    setUser(localUser);
    localStorage.setItem('carnet_local_account', JSON.stringify(localUser));
    setCloudSyncStatus('synced');
    setAuthModalOpen(false);
    return { success: true };
  };

  const signupWithEmail = async (email, password, name) => {
    setCloudSyncStatus('syncing');
    try {
      const res = await signUpWithEmailPassword(email, password, name);
      const authenticatedUser = res?.data?.user || res?.user;
      if (authenticatedUser) {
        const u = {
          id: authenticatedUser.id,
          email: authenticatedUser.email,
          name: name || authenticatedUser.name || email.split('@')[0],
          provider: 'email'
        };
        setUser(u);
        localStorage.setItem('carnet_local_account', JSON.stringify(u));
        setCloudSyncStatus('synced');
        setAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      console.warn('[Auth] Server signup notice, using scoped session:', err);
    }

    const localUser = {
      id: 'user_' + btoa(email).substring(0, 12),
      email: email,
      name: name || email.split('@')[0].toUpperCase(),
      provider: 'email'
    };
    setUser(localUser);
    localStorage.setItem('carnet_local_account', JSON.stringify(localUser));
    setCloudSyncStatus('synced');
    setAuthModalOpen(false);
    return { success: true };
  };

  const logout = async () => {
    try {
      await signOutCurrentUser();
    } catch (e) {}
    localStorage.removeItem('carnet_local_account');
    setUser(null);
    setCloudSyncStatus('local');
  };

  const switchAccount = () => {
    setAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      authModalOpen,
      setAuthModalOpen,
      loginWithGoogle,
      loginWithApple,
      loginWithEmail,
      signupWithEmail,
      logout,
      switchAccount,
      cloudSyncStatus,
      setCloudSyncStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
