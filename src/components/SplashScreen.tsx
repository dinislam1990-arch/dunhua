import { useState, useEffect } from 'react';
import { Tv } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0f0f23] flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#e94560] to-[#c73e54] flex items-center justify-center shadow-2xl shadow-[#e94560]/30 animate-pulse">
          <Tv size={48} className="text-white" />
        </div>
        <div className="absolute -inset-4 rounded-[2rem] bg-[#e94560]/10 animate-ping" style={{ animationDuration: '2s' }} />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-2">Дунхуа ТВ</h1>
      <p className="text-[#a0a0c0] text-lg mb-8">Android TV Edition</p>

      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-[#252550] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#e94560] to-[#ff6b81] rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[#a0a0c0] text-sm mt-3">Загрузка каталога...</p>

      {/* Footer */}
      <p className="absolute bottom-8 text-[#a0a0c0] text-xs">
        dunhuatv.ru • Оптимизировано для Smart TV
      </p>
    </div>
  );
}
