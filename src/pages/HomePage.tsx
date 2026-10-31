import { useNavigate } from 'react-router-dom';
import { seriesData, newsData } from '../data/series';
import SeriesCard from '../components/SeriesCard';
import { TrendingUp, Sparkles, Clock, ArrowRight, Play, Star } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  const heroButtonRef = useRef<HTMLButtonElement>(null);

  const topRated = [...seriesData].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const newSeries = seriesData.filter(s => s.year >= 2025).slice(0, 8);
  const latestEpisodes = seriesData.filter(s => s.status === 'ongoing').slice(0, 6);
  const featured = seriesData[1]; // Окутывая небеса (highest rated)

  useEffect(() => {
    // Auto-focus hero button for TV
    setTimeout(() => heroButtonRef.current?.focus(), 200);
  }, []);

  return (
    <div className="min-h-screen pb-10">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[480px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featured.poster}
            alt={featured.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--tv-bg)] via-[var(--tv-bg)]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--tv-bg)] via-transparent to-[var(--tv-bg)]/40" />
        </div>
        
        <div className="relative h-full flex items-center px-12 lg:px-16">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-[var(--tv-gold)]" />
              <span className="text-[var(--tv-gold)] text-sm font-bold uppercase tracking-wider">Рекомендуем к просмотру</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-5 leading-tight hero-text">
              {featured.title}
            </h1>
            <div className="flex items-center gap-4 mb-5 flex-wrap">
              <span className="rating-badge text-base px-3 py-1.5">
                <Star size={14} fill="currentColor" /> {featured.rating}
              </span>
              <span className="text-white/80 text-lg">{featured.age}</span>
              <span className="text-white/60">{featured.duration}</span>
              <span className="text-white/60">{featured.year}</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-bold border border-green-500/30">
                ● Онгоинг
              </span>
            </div>
            <p className="text-white/70 text-lg mb-8 line-clamp-3 max-w-2xl hero-text leading-relaxed">
              {featured.description}
            </p>
            <div className="flex items-center gap-4">
              <button
                ref={heroButtonRef}
                onClick={() => navigate(`/details/${featured.slug}`)}
                className="tv-btn px-10 py-4 bg-[var(--tv-accent)] hover:bg-[var(--tv-accent-light)] text-white font-bold rounded-xl flex items-center gap-3 text-lg shadow-lg shadow-[var(--tv-accent)]/30 transition-all"
              >
                <Play size={24} fill="white" />
                Смотреть
              </button>
              <button
                onClick={() => navigate('/catalog')}
                className="tv-btn px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all border border-white/10"
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="px-8 lg:px-12 space-y-10 -mt-8 relative z-10">
        
        {/* Latest Episodes Row */}
        <section>
          <RowHeader 
            icon={<Clock size={22} className="text-[var(--tv-accent)]" />}
            title="Новые серии"
            subtitle="Последние обновления"
          />
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
            {latestEpisodes.map((series, i) => (
              <div key={series.id} className={`animate-fade-in-up stagger-${i + 1} snap-start`}>
                <SeriesCard series={series} size="wide" />
              </div>
            ))}
          </div>
        </section>

        {/* Top Rated Row */}
        <section>
          <RowHeader 
            icon={<TrendingUp size={22} className="text-[var(--tv-gold)]" />}
            title="Топ рейтинга"
            subtitle="Самые популярные дунхуа"
          />
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
            {topRated.map((series, i) => (
              <div key={series.id} className={`animate-fade-in-up stagger-${i + 1} snap-start`}>
                <SeriesCard series={series} />
              </div>
            ))}
          </div>
        </section>

        {/* New Series Row */}
        <section>
          <RowHeader 
            icon={<Sparkles size={22} className="text-[var(--tv-accent)]" />}
            title="Новинки 2025-2026"
            subtitle="Свежие релизы"
          />
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
            {newSeries.map((series, i) => (
              <div key={series.id} className={`animate-fade-in-up stagger-${i + 1} snap-start`}>
                <SeriesCard series={series} />
              </div>
            ))}
          </div>
        </section>

        {/* Quick News */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-white">Последние новости</h2>
            <button 
              onClick={() => navigate('/news')}
              className="tv-btn text-[var(--tv-text-secondary)] hover:text-white text-sm flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
            >
              Все новости <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsData.slice(0, 3).map((news, i) => (
              <div 
                key={news.id} 
                className={`tv-item animate-fade-in-up stagger-${i + 1} bg-[var(--tv-surface)] rounded-2xl p-5 border border-[var(--tv-border)] cursor-pointer`}
                tabIndex={0}
              >
                <p className="text-xs text-[var(--tv-text-secondary)] mb-2 font-medium">
                  {new Date(news.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                </p>
                <h3 className="text-white font-bold text-base mb-2">{news.title}</h3>
                <p className="text-[var(--tv-text-secondary)] text-sm line-clamp-2">{news.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function RowHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-sm text-[var(--tv-text-secondary)]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
