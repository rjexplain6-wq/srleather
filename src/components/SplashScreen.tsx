import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  const LOGO_URL = 'https://i.ibb.co.com/VWPSZgVT/1000244284.jpg';
  const SPLASH_BG_URL = 'https://i.ibb.co.com/C5R4vDMV/file-00000000ff888211ba0b6468e26946dd.png';

  useEffect(() => {
    // Smooth progress simulation for 2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 90);

    const timer = setTimeout(() => {
      handleDismiss();
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      id="sr-splash-screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-10 select-none transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(18, 26, 21, 0.78), rgba(18, 26, 21, 0.90)), url("${SPLASH_BG_URL}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#121A15',
      }}
    >
      {/* Top Brand Pill */}
      <div className="w-full flex justify-between items-center max-w-lg pt-4 animate-fade-in">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#C49A6C] text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
          <span>Pure Artisanal Leather</span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white/70 hover:text-white text-xs font-medium px-3 py-1 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 transition-colors flex items-center gap-1.5"
        >
          <span>Skip</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Centered Logo & Brand Presentation */}
      <div className="flex flex-col items-center text-center max-w-md my-auto space-y-5 px-4 animate-fade-in">
        {/* Brand Logo Avatar */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#C49A6C] to-[#8B5E34] opacity-80 blur-md group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-[#19231D] border-2 border-[#C49A6C] shadow-2xl overflow-hidden flex items-center justify-center">
            <img
              src={LOGO_URL}
              alt="SR Leather Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAF8F5] drop-shadow-md">
            SR LEATHER
          </h1>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#C49A6C] font-semibold">
            Carry Quality, Carry Confidence
          </p>
          <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed pt-1">
            Handcrafted luxury leather goods sculpted from genuine full-grain hides.
          </p>
        </div>
      </div>

      {/* Bottom Progress & Quick Enter Action */}
      <div className="w-full max-w-sm space-y-4 pb-4">
        {/* Progress Bar */}
        <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="bg-gradient-to-r from-[#C49A6C] to-[#E5C39E] h-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={handleDismiss}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C49A6C] to-[#A07040] hover:from-[#D4AA7C] hover:to-[#B5804E] text-[#19231D] font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transition-transform duration-200 active:scale-95"
        >
          <span>শপে প্রবেশ করুন / Enter Store</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
