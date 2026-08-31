import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  BookOpen, 
  Bot, 
  Layers, 
  CheckCircle2,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/BrandLogo';

export const LoginGateView = () => {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor completa tu email y contraseña');
      return;
    }

    setLoading(true);
    try {
      if (authMode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password, name);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#080D1A] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden text-slate-100 selection:bg-cyan-500 selection:text-white">
      
      {/* Rich Multi-Color Ambient Glows (Eliminates full-black look) */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-cyan-600/20 via-sky-600/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-600/25 via-purple-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Card Container with Rich Glassmorphism */}
      <div className="w-full max-w-md bg-gradient-to-b from-[#0F172A]/95 to-[#0D1527]/95 border border-slate-700/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/30 relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" />
          </div>

          <div>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xs mx-auto">
              Inicia sesión para entrar a tu panel de estudio del <strong className="text-cyan-300 font-semibold">Permiso B</strong> con el Profesor Musa.
            </p>
          </div>
        </div>

        {/* Google Fast Login Button (Apple ID removed per user request) */}
        <div className="space-y-3">
          
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-white/5 active:scale-98 cursor-pointer hover:shadow-cyan-500/10"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continuar con Google (Gmail)</span>
          </button>

        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-700/60 w-full" />
          <span className="bg-[#0F172A] px-3 text-[10px] uppercase font-mono text-slate-400 shrink-0">o con tu email</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {authMode === 'signup' && (
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Tu Nombre (ej: Musa)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              placeholder="tu-email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/25 active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            <span>{loading ? 'Entrando...' : authMode === 'login' ? 'Entrar a la Plataforma' : 'Crear Cuenta'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {authMode === 'login' 
              ? '¿No tienes cuenta todavía? Regístrate gratis' 
              : '¿Ya tienes una cuenta? Inicia sesión aquí'}
          </button>
        </div>

        {/* Multi-user benefit cards */}
        <div className="pt-4 border-t border-slate-700/60 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dispositivo recordado automáticamente para entrar directo</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Aislamiento 100% de datos (progreso individual en InsForge)</span>
          </div>
        </div>

      </div>

      {/* Subtle Footer */}
      <div className="mt-8 text-center text-xs text-slate-400 font-mono relative z-10">
        carnetb-mnxt • Manual Digital & Tests DGT 2026
      </div>

    </div>
  );
};
