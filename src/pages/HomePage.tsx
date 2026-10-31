import { useNavigate } from 'react-router-dom';
import { seriesData, newsData } from '../data/series';
import SeriesCard from '../components/SeriesCard';
import { TrendingUp, Sparkles, Clock, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  
  const topRated = [...seriesData].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const newSeries = seriesData.filter(s => s.year === 2026 || s.year === 2025).slice(0, 6);
  const latestEpisodes = seriesData.filter(s => s.status === 'ongoing').slice(0, 4);
  const featured = seriesData[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featured.poster}
            alt={featured.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f23] via-[#0f0f23]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-transparent to-transparent" />
        </div>
        
        <div className="relative h-full flex items-center px-8 lg:px-12">
          <div className="max-w-2xl animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-[#ffd700]" />
              <span className="text-[#ffd700] text-sm font-medium">Рекомендуем</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {featured.title}
            </h1>
            <div className="flex items-center gap-3 mb-4 text-sm text-[#a0a0c0]">
              <span className="rating-badge flex items-center gap-1">
                ★ {featured.rating}
              </span>
              <span>{featured.age}</span>
              <span>{featured.duration}</span>
              <span>{featured.year}</span>
            </div>
            <p className="text-[#a0a0c0] text-base mb-6 line-clamp-3">
              {featured.description}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/catalog/${featured.slug}`)}
                className="tv-focusable px-8 py-3 bg-[#e94560] hover:bg-[#ff6b81] text-white font-semibold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#e94560]/30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <polygon points="8,5 19,12 8,19" />
                </svg>
                Смотреть
              </button>
              <button
                onClick={() => navigate('/catalog')}
                className="tv-focusable px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl backdrop-blur-sm transition-all"
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-6 lg:px-10 pb-10 space-y-10 -mt-10 relative z-10">
        
        {/* Latest Episodes */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-[#e94560]" />
              <h2 className="text-xl font-bold text-white">Новые серии</h2>
            </div>
            <button 
              onClick={() => navigate('/catalog')}
              className="tv-focusable text-[#a0a0c0] hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              Все <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {latestEpisodes.map((series) => (
              <div
                key={series.id}
                onClick={() => navigate(`/catalog/${series.slug}`)}
                className="tv-focusable bg-[#1a1a3e] rounded-xl overflow-hidden cursor-pointer group hover:border-[#e94560]/50 border border-transparent transition-all"
                tabIndex={0}
              >
                <div className="relative aspect-video">
                  <img
                    src={series.poster}
                    alt={series.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#e94560] text-white text-xs px-2 py-0.5 rounded font-medium">
                    Серия {series.totalEpisodes}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white truncate">{series.title}</h3>
                  <p className="text-xs text-[#a0a0c0] mt-1">Онгоинг • {series.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-[#ffd700]" />
              <h2 className="text-xl font-bold text-white">Топ рейтинга</h2>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {topRated.map((series) => (
              <SeriesCard key={series.id} series={series} size="medium" />
            ))}
          </div>
        </section>

        {/* New Series */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-[#e94560]" />
              <h2 className="text-xl font-bold text-white">Новинки 2025-2026</h2>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {newSeries.map((series) => (
              <SeriesCard key={series.id} series={series} size="medium" />
            ))}
          </div>
        </section>

        {/* News */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white">Последние новости</h2>
            <button 
              onClick={() => navigate('/news')}
              className="tv-focusable text-[#a0a0c0] hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              Все новости <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newsData.slice(0, 4).map((news) => (
              <div key={news.id} className="tv-focusable bg-[#1a1a3e] rounded-xl p-4 border border-[#252550] hover:border-[#e94560]/30 transition-all">
                <p className="text-xs text-[#a0a0c0] mb-2">{new Date(news.date).toLocaleDateString('ru-RU')}</p>
                <h3 className="text-sm font-semibold text-white mb-1">{news.title}</h3>
                <p className="text-xs text-[#a0a0c0] line-clamp-2">{news.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
