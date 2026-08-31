import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  Cloud, 
  CloudCheck, 
  ChevronDown, 
  Users, 
  LogIn, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserMenu = () => {
  const { user, isAuthenticated, setAuthModalOpen, logout, cloudSyncStatus } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => setAuthModalOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 hover:border-sky-400 transition-all shadow-sm active:scale-95 shrink-0"
        title="Iniciar sesión con Google o Apple ID"
      >
        <LogIn className="w-3.5 h-3.5 text-sky-400" />
        <span className="hidden sm:inline">Entrar</span>
        <span className="text-[10px] font-mono font-normal text-slate-400 hidden md:inline">Cuenta</span>
      </button>
    );
  }

  // Get user initials
  const initials = user.name ? user.name.substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="relative shrink-0" ref={menuRef}>
      
      {/* Active User Avatar Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen(prev => !prev);
        }}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all active:scale-95 shadow-sm group"
        title={`Conectado como ${user.name || user.email}`}
      >
        <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
          {initials}
        </div>
        
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-white leading-tight truncate max-w-[90px]">
            {user.name || user.email?.split('@')[0]}
          </span>
          <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Nube
          </span>
        </div>

        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-[#0F1422] border border-slate-800 shadow-2xl p-4 z-50 text-slate-100 animate-fadeIn space-y-3">
          
          {/* User Profile Header */}
          <div className="pb-3 border-b border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Cuenta Activa</span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 capitalize">
                {user.provider || 'Google'}
              </span>
            </div>
            <p className="text-sm font-bold text-white truncate">{user.name || 'Estudiante'}</p>
            <p className="text-xs text-slate-400 truncate font-mono">{user.email}</p>
          </div>

          {/* Sync Status Info */}
          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-850 flex items-center gap-2 text-xs">
            <Cloud className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-[11px] text-slate-300">
              <p className="font-semibold text-emerald-300">Sincronizado en la nube</p>
              <p className="text-[10px] text-slate-400">Tus datos están aislados y seguros</p>
            </div>
          </div>

          {/* Action: Switch Account */}
          <button
            onClick={() => {
              setDropdownOpen(false);
              setAuthModalOpen(true);
            }}
            className="w-full py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2.5 transition-colors text-left"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>Cambiar de Usuario</span>
          </button>

          {/* Action: Logout */}
          <button
            onClick={() => {
              setDropdownOpen(false);
              logout();
            }}
            className="w-full py-2.5 px-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-semibold flex items-center gap-2.5 transition-colors text-left"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Cerrar Sesión</span>
          </button>

        </div>
      )}

    </div>
  );
};
