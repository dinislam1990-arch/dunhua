import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { seriesData } from '../data/series';
import { Play, Star, Clock, Calendar, ArrowLeft, List, Info, ExternalLink, ChevronRight } from 'lucide-react';

export default function DetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const series = seriesData.find(s => s.slug === slug);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [activeTab, setActiveTab] = useState<'episodes' | 'info'>('episodes');
  const episodesRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Auto-focus play button on mount (TV behavior)
    setTimeout(() => playButtonRef.current?.focus(), 100);
  }, []);

  if (!series) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-4">Сериал не найден</h2>
          <button 
            onClick={() => navigate('/catalog')}
            className="tv-btn px-8 py-4 bg-[var(--tv-accent)] text-white rounded-xl text-lg font-semibold hover:bg-[var(--tv-accent-light)]"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Background */}
      <div className="relative h-[55vh] min-h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={series.poster}
            alt={series.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--tv-bg)] via-[var(--tv-bg)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--tv-bg)] via-[var(--tv-bg)]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--tv-bg)]/60 via-transparent to-transparent" />
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="tv-btn absolute top-6 left-6 z-20 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-[var(--tv-accent)] transition-all backdrop-blur-sm"
          aria-label="Назад"
        >
          <ArrowLeft size={22} className="text-white" />
        </button>

        {/* Hero Content */}
        <div className="relative h-full flex items-end pb-10 px-10">
          <div className="flex items-end gap-8 w-full max-w-7xl">
            {/* Poster */}
            <div className="hidden lg:block animate-scale-in">
              <img
                src={series.poster}
                alt={series.title}
                className="w-44 h-64 rounded-2xl object-cover shadow-2xl border-2 border-white/10"
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 animate-fade-in-up">
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 hero-text leading-tight">
                {series.title}
              </h1>
              
              {/* Meta */}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <span className="rating-badge text-base px-3 py-1">
                  <Star size={14} fill="currentColor" /> {series.rating}
                </span>
                <span className="text-white/80 text-lg font-medium">{series.age}</span>
                <span className="text-white/60 flex items-center gap-1.5">
                  <Clock size={16} /> {series.duration}
                </span>
                <span className="text-white/60 flex items-center gap-1.5">
                  <Calendar size={16} /> {series.year}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                  series.status === 'ongoing' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {series.status === 'ongoing' ? '● Онгоинг' : '✓ Завершён'}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-5">
                {series.genres.map(g => (
                  <span key={g} className="px-3 py-1.5 bg-white/10 text-white/80 text-sm rounded-lg backdrop-blur-sm border border-white/5">
                    {g}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-white/70 text-base max-w-2xl line-clamp-3 leading-relaxed hero-text">
                {series.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  ref={playButtonRef}
                  onClick={() => navigate(`/player/${series.slug}`)}
                  className="tv-btn px-10 py-4 bg-[var(--tv-accent)] hover:bg-[var(--tv-accent-light)] text-white font-bold rounded-xl flex items-center gap-3 text-lg shadow-lg shadow-[var(--tv-accent)]/30 transition-all"
                >
                  <Play size={24} fill="white" />
                  Смотреть
                </button>
                <a
                  href={`https://dunhuatv.ru/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tv-btn px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl flex items-center gap-2 backdrop-blur-sm transition-all"
                >
                  <ExternalLink size={18} />
                  На сайте
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-10 py-8 -mt-6 relative z-10">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('episodes')}
            className={`tv-btn px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'episodes'
                ? 'bg-[var(--tv-accent)] text-white'
                : 'bg-[var(--tv-surface)] text-[var(--tv-text-secondary)] hover:text-white'
            }`}
          >
            <List size={18} />
            Серии ({series.episodes.length})
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`tv-btn px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'info'
                ? 'bg-[var(--tv-accent)] text-white'
                : 'bg-[var(--tv-surface)] text-[var(--tv-text-secondary)] hover:text-white'
            }`}
          >
            <Info size={18} />
            Информация
          </button>
        </div>

        {/* Episodes Tab */}
        {activeTab === 'episodes' && (
          <div className="animate-fade-in">
            <div ref={episodesRef} className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
              {series.episodes.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => setSelectedEpisode(ep.number)}
                  className={`tv-item aspect-square rounded-xl flex items-center justify-center text-lg font-bold transition-all ${
                    selectedEpisode === ep.number
                      ? 'bg-[var(--tv-accent)] text-white shadow-lg shadow-[var(--tv-accent)]/30'
                      : 'bg-[var(--tv-card)] text-[var(--tv-text-secondary)] hover:bg-[var(--tv-card-hover)] hover:text-white'
                  }`}
                  tabIndex={0}
                >
                  {ep.number}
                </button>
              ))}
            </div>

            {/* Watch selected episode */}
            <div className="mt-6 flex items-center justify-between bg-[var(--tv-surface)] rounded-2xl p-5 border border-[var(--tv-border)]">
              <div>
                <p className="text-white font-bold text-xl">Серия {selectedEpisode}</p>
                <p className="text-[var(--tv-text-secondary)] text-sm mt-1">
                  {series.duration} • {series.year}
                </p>
              </div>
              <button
                onClick={() => navigate(`/player/${series.slug}?ep=${selectedEpisode}`)}
                className="tv-btn px-8 py-3.5 bg-[var(--tv-accent)] hover:bg-[var(--tv-accent-light)] text-white font-bold rounded-xl flex items-center gap-2 transition-all"
              >
                <Play size={20} fill="white" />
                Воспроизвести
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-[var(--tv-surface)] rounded-2xl p-6 border border-[var(--tv-border)]">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Info size={20} className="text-[var(--tv-accent)]" />
                Описание
              </h3>
              <p className="text-[var(--tv-text-secondary)] leading-relaxed text-base">
                {series.description}
              </p>
            </div>
            <div className="bg-[var(--tv-surface)] rounded-2xl p-6 border border-[var(--tv-border)]">
              <h3 className="text-white font-bold text-lg mb-4">Детали</h3>
              <div className="space-y-4">
                {[
                  ['Рейтинг', `${series.rating}/10`],
                  ['Возраст', series.age],
                  ['Длительность серии', series.duration],
                  ['Год', series.year.toString()],
                  ['Всего серий', series.totalEpisodes?.toString() || '—'],
                  ['Статус', series.status === 'ongoing' ? 'Выходит' : 'Завершён'],
                  ['Жанры', series.genres.join(', ')],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-[var(--tv-border)] last:border-0">
                    <span className="text-[var(--tv-text-secondary)]">{label}</span>
                    <span className="text-white font-medium text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
