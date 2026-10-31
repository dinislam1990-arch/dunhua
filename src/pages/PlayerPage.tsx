import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { seriesData } from '../data/series';
import { AppSettings } from '../types';
import { 
  ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipForward, SkipBack, Settings, List, X, ChevronLeft, ChevronRight
} from 'lucide-react';

interface PlayerPageProps {
  settings: AppSettings;
}

export default function PlayerPage({ settings }: PlayerPageProps) {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const series = seriesData.find(s => s.slug === slug);
  const initialEpisode = parseInt(searchParams.get('ep') || '1');
  
  const [currentEpisode, setCurrentEpisode] = useState(initialEpisode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(settings.volume / 100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(settings.playbackSpeed);
  const [showSettings, setShowSettings] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const cursorTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Demo video
  const demoVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  // Initialize video settings
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [volume, playbackSpeed]);

  // Auto-play
  useEffect(() => {
    if (settings.autoplay && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentEpisode, settings.autoplay]);

  // Cursor hide on inactivity
  const resetCursorTimeout = useCallback(() => {
    setCursorVisible(true);
    if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
    cursorTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !showEpisodes && !showSettings) {
        setCursorVisible(false);
      }
    }, 3000);
  }, [isPlaying, showEpisodes, showSettings]);

  // Show controls temporarily
  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    resetCursorTimeout();
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !showEpisodes && !showSettings) {
        setShowControls(false);
      }
    }, 4000);
  }, [isPlaying, showEpisodes, showSettings, resetCursorTimeout]);

  // TV Remote / Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      showControlsTemporarily();

      switch (e.key) {
        case ' ':
        case 'MediaPlayPause':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
        case 'MediaFastForward':
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowLeft':
        case 'MediaRewind':
          e.preventDefault();
          skipBackward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          adjustVolume(0.05);
          break;
        case 'ArrowDown':
          e.preventDefault();
          adjustVolume(-0.05);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
        case 'n':
        case 'N':
          nextEpisode();
          break;
        case 'p':
        case 'P':
          prevEpisode();
          break;
        case 'Escape':
        case 'GoBack':
          if (showEpisodes || showSettings) {
            setShowEpisodes(false);
            setShowSettings(false);
          } else if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            navigate(-1);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, showEpisodes, showSettings, volume, currentEpisode]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const adjustVolume = (delta: number) => {
    const newVol = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (videoRef.current) videoRef.current.volume = newVol;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (videoRef.current) videoRef.current.volume = vol;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !isMuted;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
    }
  };

  const nextEpisode = () => {
    if (series && currentEpisode < series.episodes.length) {
      setCurrentEpisode(currentEpisode + 1);
    }
  };

  const prevEpisode = () => {
    if (currentEpisode > 1) setCurrentEpisode(currentEpisode - 1);
  };

  const cycleSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const idx = speeds.indexOf(playbackSpeed);
    setPlaybackSpeed(speeds[(idx + 1) % speeds.length]);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!series) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Сериал не найден</h2>
          <button onClick={() => navigate('/catalog')} className="tv-btn px-8 py-4 bg-[var(--tv-accent)] text-white rounded-xl text-lg font-bold">
            В каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`h-screen flex flex-col bg-black relative ${!cursorVisible ? 'hide-cursor' : ''}`}
      onMouseMove={showControlsTemporarily}
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== 'BUTTON' && !(e.target as HTMLElement).closest('button')) {
          togglePlay();
        }
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={demoVideoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextEpisode}
        playsInline
      />

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="tv-btn w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--tv-accent)] transition-all backdrop-blur-sm"
                aria-label="Назад"
              >
                <ArrowLeft size={22} className="text-white" />
              </button>
              <div>
                <h2 className="text-white font-bold text-xl">{series.title}</h2>
                <p className="text-white/60 text-sm">Серия {currentEpisode} из {series.episodes.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setShowEpisodes(!showEpisodes); setShowSettings(false); }}
                className={`tv-btn px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  showEpisodes ? 'bg-[var(--tv-accent)] text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <List size={18} /> Серии
              </button>
              <button
                onClick={() => { setShowSettings(!showSettings); setShowEpisodes(false); }}
                className={`tv-btn px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  showSettings ? 'bg-[var(--tv-accent)] text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Settings size={18} /> Настройки
              </button>
            </div>
          </div>
        </div>

        {/* Center controls */}
        <div className="absolute inset-0 flex items-center justify-center gap-10">
          <button
            onClick={skipBackward}
            className="tv-btn w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm"
            aria-label="Назад 10 секунд"
          >
            <SkipBack size={28} className="text-white" />
          </button>
          <button
            onClick={togglePlay}
            className="tv-btn w-24 h-24 rounded-full bg-[var(--tv-accent)] flex items-center justify-center hover:bg-[var(--tv-accent-light)] transition-all shadow-2xl shadow-[var(--tv-accent)]/40"
            aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
          >
            {isPlaying ? <Pause size={40} className="text-white" /> : <Play size={40} className="text-white ml-1" />}
          </button>
          <button
            onClick={skipForward}
            className="tv-btn w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm"
            aria-label="Вперёд 10 секунд"
          >
            <SkipForward size={28} className="text-white" />
          </button>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          {/* Progress bar */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="progress-bar w-full"
              style={{
                background: `linear-gradient(to right, var(--tv-accent) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.15) ${(currentTime / (duration || 1)) * 100}%)`
              }}
            />
            <div className="flex justify-between text-sm text-white/70 mt-1.5 font-medium">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={prevEpisode} disabled={currentEpisode <= 1} className="tv-btn text-white/80 hover:text-white disabled:opacity-30 transition-colors" aria-label="Предыдущая серия">
                <ChevronLeft size={24} />
              </button>
              <span className="text-white font-semibold text-lg">Серия {currentEpisode}</span>
              <button onClick={nextEpisode} disabled={currentEpisode >= series.episodes.length} className="tv-btn text-white/80 hover:text-white disabled:opacity-30 transition-colors" aria-label="Следующая серия">
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              {/* Volume */}
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="tv-btn text-white/80 hover:text-white transition-colors" aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}>
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
                <input
                  type="range"
                  min={0} max={1} step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="progress-bar w-24"
                />
              </div>
              {/* Speed */}
              <button onClick={cycleSpeed} className="tv-btn px-3 py-1.5 rounded-lg text-sm font-bold text-white bg-white/10 hover:bg-white/20 transition-colors">
                {playbackSpeed}x
              </button>
              {/* Quality */}
              <span className="px-3 py-1.5 rounded-lg text-sm font-bold text-white/60 bg-white/5">
                {settings.quality}
              </span>
              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="tv-btn text-white/80 hover:text-white transition-colors" aria-label="Полный экран">
                {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Panel */}
      {showEpisodes && (
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[var(--tv-surface)]/98 backdrop-blur-xl border-l border-[var(--tv-border)] overflow-hidden animate-slide-right z-50 flex flex-col">
          <div className="p-5 border-b border-[var(--tv-border)] flex items-center justify-between flex-shrink-0">
            <h3 className="text-white font-bold text-xl">Все серии</h3>
            <button onClick={() => setShowEpisodes(false)} className="tv-btn w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--tv-accent)] transition-all">
              <X size={18} className="text-white" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-5 gap-2">
              {series.episodes.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => { setCurrentEpisode(ep.number); setShowEpisodes(false); }}
                  className={`tv-btn aspect-square rounded-xl flex items-center justify-center text-base font-bold transition-all ${
                    currentEpisode === ep.number
                      ? 'bg-[var(--tv-accent)] text-white shadow-lg'
                      : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)] hover:bg-[var(--tv-card-hover)] hover:text-white'
                  }`}
                  tabIndex={0}
                >
                  {ep.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[var(--tv-surface)]/98 backdrop-blur-xl border-l border-[var(--tv-border)] overflow-hidden animate-slide-right z-50 flex flex-col">
          <div className="p-5 border-b border-[var(--tv-border)] flex items-center justify-between flex-shrink-0">
            <h3 className="text-white font-bold text-xl">Настройки плеера</h3>
            <button onClick={() => setShowSettings(false)} className="tv-btn w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--tv-accent)] transition-all">
              <X size={18} className="text-white" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Speed */}
            <div>
              <p className="text-white font-semibold mb-3">Скорость</p>
              <div className="grid grid-cols-3 gap-2">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`tv-btn py-2.5 rounded-xl text-sm font-bold transition-all ${
                      playbackSpeed === speed ? 'bg-[var(--tv-accent)] text-white' : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)] hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
            {/* Quality */}
            <div>
              <p className="text-white font-semibold mb-3">Качество</p>
              <div className="grid grid-cols-2 gap-2">
                {['480p', '720p', '1080p', 'Авто'].map(q => (
                  <button
                    key={q}
                    onClick={() => {}}
                    className={`tv-btn py-2.5 rounded-xl text-sm font-bold transition-all ${
                      settings.quality === q.toLowerCase() || (q === 'Авто' && settings.quality === 'auto')
                        ? 'bg-[var(--tv-accent)] text-white' 
                        : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)] hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            {/* Subtitles */}
            <div>
              <p className="text-white font-semibold mb-3">Субтитры</p>
              <div className="grid grid-cols-2 gap-2">
                <button className={`tv-btn py-2.5 rounded-xl text-sm font-bold transition-all ${!settings.subtitles ? 'bg-[var(--tv-accent)] text-white' : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)]'}`}>
                  Выкл
                </button>
                <button className={`tv-btn py-2.5 rounded-xl text-sm font-bold transition-all ${settings.subtitles ? 'bg-[var(--tv-accent)] text-white' : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)]'}`}>
                  Вкл
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Series info bar at bottom (visible when controls hidden) */}
      {!showControls && (
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl px-5 py-3">
            <p className="text-white font-bold">{series.title}</p>
            <p className="text-white/60 text-sm">Серия {currentEpisode}</p>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-white/60 text-sm">{formatTime(currentTime)} / {formatTime(duration)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
