import { useState, useEffect } from 'react';
import { Tv } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[var(--tv-bg)] flex flex-col items-center justify-center z-50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--tv-bg)] via-[#0d0d2b] to-[var(--tv-bg)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(233,69,96,0.05),transparent_60%)]" />
      
      {/* Content */}
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-10">
          <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-[var(--tv-accent)] to-[#c73e54] flex items-center justify-center shadow-2xl shadow-[var(--tv-accent)]/30">
            <Tv size={56} className="text-white" />
          </div>
          {/* Glow ring */}
          <div className="absolute -inset-6 rounded-[2.5rem] border-2 border-[var(--tv-accent)]/20 animate-pulse" style={{ animationDuration: '2s' }} />
          <div className="absolute -inset-12 rounded-[3rem] border border-[var(--tv-accent)]/10 animate-pulse" style={{ animationDuration: '3s' }} />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-black text-white mb-3 tracking-tight">Дунхуа ТВ</h1>
        <p className="text-[var(--tv-text-secondary)] text-xl font-medium mb-10">Android TV Edition</p>

        {/* Progress */}
        <div className="w-80 h-2 bg-[var(--tv-card)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--tv-accent)] to-[var(--tv-accent-light)] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[var(--tv-text-secondary)] text-sm mt-4 font-medium">
          {progress < 30 ? 'Загрузка каталога...' : progress < 60 ? 'Подготовка интерфейса...' : progress < 90 ? 'Почти готово...' : 'Запуск...'}
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-10 text-center">
        <p className="text-[var(--tv-text-dim)] text-sm">dunhuatv.ru • Оптимизировано для Smart TV</p>
      </div>
    </div>
  );
}
