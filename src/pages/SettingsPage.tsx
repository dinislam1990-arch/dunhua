import { AppSettings } from '../types';
import { Settings as SettingsIcon, Play, Monitor, Volume2, Type, Palette, RotateCcw, Info, Tv, Keyboard } from 'lucide-react';

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
    <div className="min-h-screen p-8 lg:p-12 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--tv-accent)] to-[#c73e54] flex items-center justify-center shadow-lg shadow-[var(--tv-accent)]/20">
            <SettingsIcon size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white">Настройки</h1>
            <p className="text-[var(--tv-text-secondary)] text-lg">Настройте воспроизведение и интерфейс</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Playback */}
        <section className="bg-[var(--tv-surface)] rounded-2xl p-8 border border-[var(--tv-border)]">
          <div className="flex items-center gap-3 mb-6">
            <Play size={24} className="text-[var(--tv-accent)]" />
            <h2 className="text-2xl font-bold text-white">Воспроизведение</h2>
          </div>

          <div className="space-y-6">
            {/* Autoplay */}
            <SettingRow
              title="Автовоспроизведение"
              description="Автоматически начинать воспроизведение при открытии серии"
            >
              <button
                onClick={() => updateSetting('autoplay', !settings.autoplay)}
                className={`toggle-switch ${settings.autoplay ? 'on' : 'off'}`}
                tabIndex={0}
                role="switch"
                aria-checked={settings.autoplay}
                onKeyDown={(e) => e.key === 'Enter' && updateSetting('autoplay', !settings.autoplay)}
              >
                <div className="toggle-knob" />
              </button>
            </SettingRow>

            {/* Quality */}
            <SettingRow
              title="Качество видео"
              description="Предпочитаемое качество по умолчанию"
            >
              <div className="flex gap-2">
                {['480p', '720p', '1080p', 'Авто'].map(q => (
                  <button
                    key={q}
                    onClick={() => updateSetting('quality', q === 'Авто' ? 'auto' : q.toLowerCase())}
                    className={`tv-btn px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                      settings.quality === (q === 'Авто' ? 'auto' : q.toLowerCase())
                        ? 'bg-[var(--tv-accent)] text-white'
                        : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)] hover:text-white border border-[var(--tv-border)]'
                    }`}
                    tabIndex={0}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </SettingRow>

            {/* Speed */}
            <SettingRow
              title="Скорость воспроизведения"
              description="Стандартная скорость по умолчанию"
            >
              <div className="flex gap-2">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => updateSetting('playbackSpeed', speed)}
                    className={`tv-btn px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      settings.playbackSpeed === speed
                        ? 'bg-[var(--tv-accent)] text-white'
                        : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)] hover:text-white border border-[var(--tv-border)]'
                    }`}
                    tabIndex={0}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </SettingRow>

            {/* Volume */}
            <SettingRow
              title="Громкость"
              description="Стандартный уровень громкости"
            >
              <div className="flex items-center gap-4">
                <Volume2 size={20} className="text-[var(--tv-text-secondary)]" />
                <input
                  type="range"
                  min={0} max={100}
                  value={settings.volume}
                  onChange={(e) => updateSetting('volume', parseInt(e.target.value))}
                  className="progress-bar w-48"
                />
                <span className="text-white font-bold text-lg w-12 text-right">{settings.volume}%</span>
              </div>
            </SettingRow>
          </div>
        </section>

        {/* Subtitles */}
        <section className="bg-[var(--tv-surface)] rounded-2xl p-8 border border-[var(--tv-border)]">
          <div className="flex items-center gap-3 mb-6">
            <Type size={24} className="text-[var(--tv-accent)]" />
            <h2 className="text-2xl font-bold text-white">Субтитры</h2>
          </div>

          <div className="space-y-6">
            <SettingRow
              title="Показывать субтитры"
              description="Включить субтитры при воспроизведении"
            >
              <button
                onClick={() => updateSetting('subtitles', !settings.subtitles)}
                className={`toggle-switch ${settings.subtitles ? 'on' : 'off'}`}
                tabIndex={0}
                role="switch"
                aria-checked={settings.subtitles}
                onKeyDown={(e) => e.key === 'Enter' && updateSetting('subtitles', !settings.subtitles)}
              >
                <div className="toggle-knob" />
              </button>
            </SettingRow>

            <SettingRow
              title="Размер субтитров"
              description="Размер текста субтитров"
            >
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => updateSetting('subtitleSize', size)}
                    className={`tv-btn px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                      settings.subtitleSize === size
                        ? 'bg-[var(--tv-accent)] text-white'
                        : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)] hover:text-white border border-[var(--tv-border)]'
                    }`}
                    tabIndex={0}
                  >
                    {size === 'small' ? 'Маленький' : size === 'medium' ? 'Средний' : 'Большой'}
                  </button>
                ))}
              </div>
            </SettingRow>
          </div>
        </section>

        {/* Theme */}
        <section className="bg-[var(--tv-surface)] rounded-2xl p-8 border border-[var(--tv-border)]">
          <div className="flex items-center gap-3 mb-6">
            <Palette size={24} className="text-[var(--tv-accent)]" />
            <h2 className="text-2xl font-bold text-white">Оформление</h2>
          </div>

          <SettingRow
            title="Тема интерфейса"
            description="Цветовая схема приложения"
          >
            <div className="flex gap-2">
              <button
                onClick={() => updateSetting('theme', 'dark')}
                className={`tv-btn px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-[var(--tv-accent)] text-white'
                    : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)] hover:text-white border border-[var(--tv-border)]'
                }`}
                tabIndex={0}
              >
                Тёмная
              </button>
              <button
                onClick={() => updateSetting('theme', 'amoled')}
                className={`tv-btn px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                  settings.theme === 'amoled'
                    ? 'bg-[var(--tv-accent)] text-white'
                    : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)] hover:text-white border border-[var(--tv-border)]'
                }`}
                tabIndex={0}
              >
                AMOLED
              </button>
            </div>
          </SettingRow>
        </section>

        {/* Controls Help */}
        <section className="bg-[var(--tv-surface)] rounded-2xl p-8 border border-[var(--tv-border)]">
          <div className="flex items-center gap-3 mb-6">
            <Keyboard size={24} className="text-[var(--tv-accent)]" />
            <h2 className="text-2xl font-bold text-white">Управление (пульт / клавиатура)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { keys: '← → ↑ ↓', desc: 'Навигация по интерфейсу' },
              { keys: 'OK / Enter', desc: 'Выбрать / Воспроизвести' },
              { keys: 'Esc / Back', desc: 'Назад / Закрыть' },
              { keys: 'Space', desc: 'Пауза / Воспроизведение' },
              { keys: '→ (в плеере)', desc: 'Перемотка +10 сек' },
              { keys: '← (в плеере)', desc: 'Перемотка -10 сек' },
              { keys: '↑ ↓ (в плеере)', desc: 'Громкость' },
              { keys: 'F', desc: 'Полный экран' },
              { keys: 'M', desc: 'Вкл/Выкл звук' },
              { keys: 'N / P', desc: 'Следующая / Предыдущая серия' },
            ].map((item, i) => (
              <div key={i} className="tv-item flex items-center gap-4 p-4 bg-[var(--tv-card)] rounded-xl cursor-default" tabIndex={0}>
                <kbd className="px-3 py-1.5 bg-[var(--tv-bg)] rounded-lg text-sm text-white font-mono font-bold border border-[var(--tv-border)] whitespace-nowrap">
                  {item.keys}
                </kbd>
                <span className="text-[var(--tv-text-secondary)] text-base">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-6 flex-wrap">
          <button
            onClick={resetSettings}
            className="tv-btn px-6 py-4 bg-[var(--tv-card)] text-white rounded-xl hover:bg-[var(--tv-card-hover)] transition-colors flex items-center gap-2 text-base font-semibold border border-[var(--tv-border)]"
            tabIndex={0}
          >
            <RotateCcw size={18} />
            Сбросить настройки
          </button>
          <div className="flex items-center gap-2 text-[var(--tv-text-secondary)]">
            <Info size={16} />
            <span className="text-sm">Настройки сохраняются автоматически</span>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-[var(--tv-surface)] rounded-2xl p-8 border border-[var(--tv-border)] text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--tv-accent)] to-[#c73e54] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[var(--tv-accent)]/20">
            <Tv size={36} className="text-white" />
          </div>
          <h3 className="text-white font-black text-2xl">Дунхуа ТВ</h3>
          <p className="text-[var(--tv-text-secondary)] text-base mt-2">Версия 2.0 • TV Edition</p>
          <p className="text-[var(--tv-text-dim)] text-sm mt-2">
            Оптимизировано для Android TV • dunhuatv.ru
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[var(--tv-border)] last:border-0">
      <div className="flex-1 mr-6">
        <p className="text-white font-semibold text-lg">{title}</p>
        <p className="text-[var(--tv-text-secondary)] text-sm mt-0.5">{description}</p>
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
}
