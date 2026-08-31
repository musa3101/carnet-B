import React from 'react';

export const BrandLogo = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: { container: 'w-7 h-7', icon: 'w-4 h-4', text: 'text-sm' },
    md: { container: 'w-9 h-9 sm:w-10 sm:h-10', icon: 'w-5 h-5 sm:w-6 sm:h-6', text: 'text-base sm:text-lg' },
    lg: { container: 'w-14 h-14 sm:w-16 sm:h-16', icon: 'w-8 h-8 sm:w-9 sm:h-9', text: 'text-2xl sm:text-3xl' },
    xl: { container: 'w-20 h-20', icon: 'w-12 h-12', text: 'text-4xl' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Emblem Icon */}
      <div className={`${currentSize.container} rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 p-[1.5px] shadow-lg shadow-sky-500/25 relative group-hover:scale-105 transition-all duration-300 shrink-0`}>
        <div className="w-full h-full bg-[#0A101D] rounded-[14px] flex items-center justify-center relative overflow-hidden">
          
          {/* Inner ambient shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-transparent opacity-80" />
          
          {/* Stylized Modern Driving Speed Shield SVG */}
          <svg className={`${currentSize.icon} text-cyan-300 relative z-10`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M16 3L27 7.5V15.5C27 22.2 22.3 28.2 16 29.5C9.7 28.2 5 22.2 5 15.5V7.5L16 3Z" 
              stroke="url(#shield-grad)" 
              strokeWidth="2.2" 
              strokeLinejoin="round" 
            />
            {/* Speed Curves */}
            <path 
              d="M11 18C11.5 15 13.5 13.5 16 13.5C18.5 13.5 20.5 15 21 18" 
              stroke="#38BDF8" 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            {/* Steering Wheel Central Arc / B Permiso */}
            <circle cx="16" cy="18" r="2.2" fill="#F8FAFC" />
            <path 
              d="M16 11V13M12.5 21.5L14.2 19.5M19.5 21.5L17.8 19.5" 
              stroke="#38BDF8" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
            />
            <defs>
              <linearGradient id="shield-grad" x1="5" y1="3" x2="27" y2="29.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.5" stopColor="#6366F1" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>

        </div>
      </div>

      {/* Brand Text */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-white font-display ${currentSize.text}`}>
            carnetb<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">-mnxt</span>
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.2 rounded-md bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30">
            DGT 2026
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium hidden md:block">
          Manual Digital & Academia DGT
        </p>
      </div>
    </div>
  );
};
