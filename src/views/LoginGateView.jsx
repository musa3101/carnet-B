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

export const LoginGateView = () => {
  const { loginWithGoogle, loginWithApple, loginWithEmail, signupWithEmail } = useAuth();
  
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
    <div className="min-h-screen w-full bg-[#0B0F17] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden text-slate-100">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Card Container */}
      <div className="w-full max-w-md bg-[#0F1422]/90 border border-slate-800/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 via-sky-400 to-cyan-300 p-[1.5px] mx-auto shadow-xl shadow-sky-500/25">
            <div className="w-full h-full bg-[#0B0F17] rounded-[14px] flex items-center justify-center">
              <span className="text-2xl font-black bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent font-display">
                B
              </span>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-[10px] uppercase font-mono font-bold tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              <span>DGT 2026 • Plataforma Oficial</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              carnetb-mnxt
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xs mx-auto">
              Inicia sesión con tu cuenta para acceder a tu progreso personalizado, simuladores y tutor IA.
            </p>
          </div>
        </div>

        {/* OAuth Fast Login Buttons */}
        <div className="space-y-2.5">
          
          {/* Google Button */}
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continuar con Google (Gmail)</span>
          </button>

          {/* Apple Button */}
          <button
            type="button"
            onClick={loginWithApple}
            className="w-full py-3 px-4 rounded-2xl bg-black hover:bg-slate-950 text-white border border-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.71-11.71-14.01-6.19-9.5-11-20.3-14.42-32.4-3.43-12.1-5.14-23.75-5.14-34.94 0-14.6 3.6-26.68 10.81-36.25 7.21-9.57 16.32-14.42 27.33-14.54 4.89 0 10.51 1.25 16.85 3.76 6.34 2.5 10.3 3.82 11.88 3.94 1.8.12 5.92-1.28 12.37-4.2 6.45-2.92 12.26-4.26 17.43-4.02 13.49.65 24.36 5.6 32.61 14.86-11.88 7.18-17.73 16.92-17.55 29.21.18 9.8 4.02 17.92 11.53 24.36 7.51 6.43 16.29 10.15 26.33 11.16-2.29 6.86-5.06 13.62-8.31 20.29zM119.22 31.85c0-7.29 2.67-14.15 8.01-20.57 5.34-6.42 12.02-10.42 20.04-12-0.12 1.41-.02 3.03.3 4.86-.54 7.29-3.26 14.08-8.16 20.37-4.9 6.29-11.44 10.31-19.63 12.06-.36-1.42-.56-3.01-.56-4.72z" />
            </svg>
            <span>Continuar con Apple ID</span>
          </button>

        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-[#0F1422] px-3 text-[10px] uppercase font-mono text-slate-500 shrink-0">o con tu email</span>
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500 transition-colors"
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
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20 active:scale-98 disabled:opacity-50 cursor-pointer"
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
            className="text-xs text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
          >
            {authMode === 'login' 
              ? '¿No tienes cuenta todavía? Regístrate gratis' 
              : '¿Ya tienes una cuenta? Inicia sesión aquí'}
          </button>
        </div>

        {/* Multi-user benefit cards */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Aislamiento 100% de datos (progreso y fallos individuales)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Sincronización instantánea en la nube con PostgreSQL</span>
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
