import { AppSettings } from '../types';
import { 
  Settings as SettingsIcon, Play, Monitor, Volume2, 
  Type, Gauge, Palette, RotateCcw, Info
} from 'lucide-react';

interface SettingsPageProps {
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
}

export default function SettingsPage({ settings, setSettings }: SettingsPageProps) {
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings({ ...settings, [key]: value });
  };

  const resetSettings = () => {
    setSettings({
      autoplay: true,
      quality: '720p',
      playbackSpeed: 1,
      subtitles: false,
      subtitleSize: 'medium',
      theme: 'dark',
      volume: 80,
    });
  };

  return (
    <div className="min-h-screen p-6 lg:p-10 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon size={28} className="text-[#e94560]" />
          <h1 className="text-3xl font-bold text-white">Настройки</h1>
        </div>
        <p className="text-[#a0a0c0]">Настройте воспроизведение и интерфейс под себя</p>
      </div>

      <div className="space-y-6">
        {/* Playback Settings */}
        <section className="bg-[#1a1a3e] rounded-2xl p-6 border border-[#252550]">
          <div className="flex items-center gap-2 mb-5">
            <Play size={20} className="text-[#e94560]" />
            <h2 className="text-lg font-semibold text-white">Воспроизведение</h2>
          </div>

          <div className="space-y-5">
            {/* Autoplay */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Автовоспроизведение</p>
                <p className="text-[#a0a0c0] text-sm">Автоматически начинать воспроизведение</p>
              </div>
              <button
                onClick={() => updateSetting('autoplay', !settings.autoplay)}
                className={`tv-focusable w-14 h-7 rounded-full transition-all relative ${
                  settings.autoplay ? 'bg-[#e94560]' : 'bg-[#252550]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-all ${
                  settings.autoplay ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Quality */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Качество видео</p>
                <p className="text-[#a0a0c0] text-sm">Выберите предпочитаемое качество</p>
              </div>
              <select
                value={settings.quality}
                onChange={(e) => updateSetting('quality', e.target.value)}
                className="tv-focusable px-4 py-2 bg-[#252550] border border-[#353570] rounded-lg text-white text-sm focus:border-[#e94560] focus:outline-none cursor-pointer"
              >
                <option value="480p">480p</option>
                <option value="720p">720p HD</option>
                <option value="1080p">1080p Full HD</option>
                <option value="auto">Авто</option>
              </select>
            </div>

            {/* Playback Speed */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Скорость воспроизведения</p>
                <p className="text-[#a0a0c0] text-sm">Стандартная скорость по умолчанию</p>
              </div>
              <select
                value={settings.playbackSpeed}
                onChange={(e) => updateSetting('playbackSpeed', parseFloat(e.target.value))}
                className="tv-focusable px-4 py-2 bg-[#252550] border border-[#353570] rounded-lg text-white text-sm focus:border-[#e94560] focus:outline-none cursor-pointer"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x (Нормальная)</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 size={18} className="text-[#a0a0c0]" />
                <div>
                  <p className="text-white font-medium">Громкость</p>
                  <p className="text-[#a0a0c0] text-sm">Стандартный уровень громкости</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={settings.volume}
                  onChange={(e) => updateSetting('volume', parseInt(e.target.value))}
                  className="tv-focusable w-32 h-2 bg-[#252550] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e94560]"
                />
                <span className="text-white text-sm w-10 text-right">{settings.volume}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Subtitles */}
        <section className="bg-[#1a1a3e] rounded-2xl p-6 border border-[#252550]">
          <div className="flex items-center gap-2 mb-5">
            <Type size={20} className="text-[#e94560]" />
            <h2 className="text-lg font-semibold text-white">Субтитры</h2>
          </div>

          <div className="space-y-5">
            {/* Subtitles toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Показывать субтитры</p>
                <p className="text-[#a0a0c0] text-sm">Включить субтитры при воспроизведении</p>
              </div>
              <button
                onClick={() => updateSetting('subtitles', !settings.subtitles)}
                className={`tv-focusable w-14 h-7 rounded-full transition-all relative ${
                  settings.subtitles ? 'bg-[#e94560]' : 'bg-[#252550]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-all ${
                  settings.subtitles ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Subtitle size */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Размер субтитров</p>
                <p className="text-[#a0a0c0] text-sm">Размер текста субтитров на экране</p>
              </div>
              <select
                value={settings.subtitleSize}
                onChange={(e) => updateSetting('subtitleSize', e.target.value as 'small' | 'medium' | 'large')}
                className="tv-focusable px-4 py-2 bg-[#252550] border border-[#353570] rounded-lg text-white text-sm focus:border-[#e94560] focus:outline-none cursor-pointer"
              >
                <option value="small">Маленький</option>
                <option value="medium">Средний</option>
                <option value="large">Большой</option>
              </select>
            </div>
          </div>
        </section>

        {/* Display */}
        <section className="bg-[#1a1a3e] rounded-2xl p-6 border border-[#252550]">
          <div className="flex items-center gap-2 mb-5">
            <Palette size={20} className="text-[#e94560]" />
            <h2 className="text-lg font-semibold text-white">Оформление</h2>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Тема интерфейса</p>
                <p className="text-[#a0a0c0] text-sm">Выберите цветовую схему</p>
              </div>
              <select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value as 'dark' | 'amoled')}
                className="tv-focusable px-4 py-2 bg-[#252550] border border-[#353570] rounded-lg text-white text-sm focus:border-[#e94560] focus:outline-none cursor-pointer"
              >
                <option value="dark">Тёмная</option>
                <option value="amoled">AMOLED (чёрная)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Navigation Help */}
        <section className="bg-[#1a1a3e] rounded-2xl p-6 border border-[#252550]">
          <div className="flex items-center gap-2 mb-5">
            <Monitor size={20} className="text-[#e94560]" />
            <h2 className="text-lg font-semibold text-white">Управление</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-[#252550] rounded-xl">
              <kbd className="px-2 py-1 bg-[#0f0f23] rounded text-xs text-white font-mono">←→↑↓</kbd>
              <span className="text-[#a0a0c0] text-sm">Навигация по интерфейсу</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#252550] rounded-xl">
              <kbd className="px-2 py-1 bg-[#0f0f23] rounded text-xs text-white font-mono">OK/Enter</kbd>
              <span className="text-[#a0a0c0] text-sm">Выбрать / Воспроизвести</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#252550] rounded-xl">
              <kbd className="px-2 py-1 bg-[#0f0f23] rounded text-xs text-white font-mono">Esc/Back</kbd>
              <span className="text-[#a0a0c0] text-sm">Назад</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#252550] rounded-xl">
              <kbd className="px-2 py-1 bg-[#0f0f23] rounded text-xs text-white font-mono">Space</kbd>
              <span className="text-[#a0a0c0] text-sm">Пауза / Воспроизведение</span>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={resetSettings}
            className="tv-focusable px-5 py-3 bg-[#252550] text-white rounded-xl hover:bg-[#353570] transition-colors flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Сбросить настройки
          </button>
          <div className="flex items-center gap-2 text-[#a0a0c0] text-sm">
            <Info size={14} />
            <span>Настройки сохраняются автоматически</span>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-[#1a1a3e] rounded-2xl p-6 border border-[#252550] text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e94560] to-[#c73e54] flex items-center justify-center mx-auto mb-3">
            <Gauge size={28} className="text-white" />
          </div>
          <h3 className="text-white font-bold text-lg">Дунхуа ТВ</h3>
          <p className="text-[#a0a0c0] text-sm mt-1">Версия 1.0 • TV Edition</p>
          <p className="text-[#a0a0c0] text-xs mt-2">
            Оптимизировано для Android TV • dunhuatv.ru
          </p>
        </div>
      </div>
    </div>
  );
}
