import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { seriesData } from '../data/series';
import { AppSettings } from '../types';
import { 
  ArrowLeft, Play, Star, Clock, Calendar, List, 
  ExternalLink, ChevronLeft, ChevronRight, Info
} from 'lucide-react';

interface PlayerPageProps {
  settings: AppSettings;
}

export default function PlayerPage({ settings }: PlayerPageProps) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const series = seriesData.find(s => s.slug === slug);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [viewMode, setViewMode] = useState<'info' | 'episodes'>('info');

  if (!series) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Сериал не найден</h2>
          <button 
            onClick={() => navigate('/catalog')}
            className="tv-focusable px-6 py-3 bg-[#e94560] text-white rounded-xl hover:bg-[#ff6b81] transition-colors"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  const episodeUrl = series.episodes[currentEpisode - 1]?.videoUrl || `https://dunhuatv.ru/`;

  const nextEpisode = () => {
    if (currentEpisode < series.episodes.length) {
      setCurrentEpisode(currentEpisode + 1);
    }
  };

  const prevEpisode = () => {
    if (currentEpisode > 1) {
      setCurrentEpisode(currentEpisode - 1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero with poster */}
      <div className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={series.poster}
            alt={series.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f23] via-[#0f0f23]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-transparent to-[#0f0f23]/30" />
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="tv-focusable absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center hover:bg-[#e94560] transition-colors backdrop-blur-sm"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Content overlay */}
        <div className="relative h-full flex items-end pb-8 px-8">
          <div className="flex items-end gap-6 w-full">
            {/* Poster */}
            <img
              src={series.poster}
              alt={series.title}
              className="w-36 h-52 rounded-xl object-cover shadow-2xl border-2 border-[#252550] hidden md:block"
            />
            {/* Info */}
            <div className="flex-1 animate-fade-in">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{series.title}</h1>
              <div className="flex items-center gap-3 mb-3 text-sm flex-wrap">
                <span className="rating-badge flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> {series.rating}
                </span>
                <span className="text-[#a0a0c0]">{series.age}</span>
                <span className="text-[#a0a0c0] flex items-center gap-1">
                  <Clock size={12} /> {series.duration}
                </span>
                <span className="text-[#a0a0c0] flex items-center gap-1">
                  <Calendar size={12} /> {series.year}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  series.status === 'ongoing' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {series.status === 'ongoing' ? 'Онгоинг' : 'Завершён'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {series.genres.map(g => (
                  <span key={g} className="px-2.5 py-1 bg-[#252550] text-[#a0a0c0] text-xs rounded-lg">{g}</span>
                ))}
              </div>
              <p className="text-[#a0a0c0] text-sm max-w-2xl line-clamp-3">{series.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-8 py-6 -mt-4 relative z-10">
        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <a
            href={episodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tv-focusable px-8 py-3.5 bg-[#e94560] hover:bg-[#ff6b81] text-white font-semibold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#e94560]/30 text-lg"
          >
            <Play size={22} fill="white" />
            Смотреть серию {currentEpisode}
          </a>
          <button
            onClick={() => setViewMode(viewMode === 'info' ? 'episodes' : 'info')}
            className="tv-focusable px-5 py-3.5 bg-[#252550] hover:bg-[#353570] text-white font-medium rounded-xl flex items-center gap-2 transition-all"
          >
            <List size={18} />
            Список серий
          </button>
          <a
            href={`https://dunhuatv.ru/`}
            target="_blank"
            rel="noopener noreferrer"
            className="tv-focusable px-5 py-3.5 bg-[#252550] hover:bg-[#353570] text-white font-medium rounded-xl flex items-center gap-2 transition-all"
          >
            <ExternalLink size={18} />
            На сайте
          </a>
        </div>

        {/* Episode navigation */}
        <div className="flex items-center gap-4 mb-6 bg-[#1a1a3e] rounded-xl p-4 border border-[#252550]">
          <button
            onClick={prevEpisode}
            disabled={currentEpisode <= 1}
            className="tv-focusable w-10 h-10 rounded-lg bg-[#252550] flex items-center justify-center hover:bg-[#e94560] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div className="flex-1 text-center">
            <p className="text-white font-semibold text-lg">Серия {currentEpisode} из {series.episodes.length}</p>
            <p className="text-[#a0a0c0] text-sm">
              {settings.quality} • {settings.playbackSpeed}x
              {settings.subtitles && ' • Субтитры'}
            </p>
          </div>
          <button
            onClick={nextEpisode}
            disabled={currentEpisode >= series.episodes.length}
            className="tv-focusable w-10 h-10 rounded-lg bg-[#252550] flex items-center justify-center hover:bg-[#e94560] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>

        {/* Episodes list */}
        {viewMode === 'episodes' && (
          <div className="bg-[#1a1a3e] rounded-2xl border border-[#252550] overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-[#252550] flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">Все серии ({series.episodes.length})</h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-3">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {series.episodes.map((ep) => (
                  <a
                    key={ep.id}
                    href={ep.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCurrentEpisode(ep.number)}
                    className={`tv-focusable aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                      currentEpisode === ep.number
                        ? 'bg-[#e94560] text-white shadow-lg shadow-[#e94560]/30'
                        : 'bg-[#252550] text-[#a0a0c0] hover:bg-[#353570] hover:text-white'
                    }`}
                  >
                    {ep.number}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info panel */}
        {viewMode === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* Description */}
            <div className="bg-[#1a1a3e] rounded-2xl p-6 border border-[#252550]">
              <div className="flex items-center gap-2 mb-4">
                <Info size={18} className="text-[#e94560]" />
                <h3 className="text-white font-semibold">Описание</h3>
              </div>
              <p className="text-[#a0a0c0] text-sm leading-relaxed">{series.description}</p>
            </div>

            {/* Quick info */}
            <div className="bg-[#1a1a3e] rounded-2xl p-6 border border-[#252550]">
              <h3 className="text-white font-semibold mb-4">Информация</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#a0a0c0] text-sm">Рейтинг</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <Star size={14} className="text-[#ffd700]" fill="#ffd700" /> {series.rating}/10
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0c0] text-sm">Возраст</span>
                  <span className="text-white font-medium">{series.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0c0] text-sm">Длительность серии</span>
                  <span className="text-white font-medium">{series.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0c0] text-sm">Год выпуска</span>
                  <span className="text-white font-medium">{series.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0c0] text-sm">Всего серий</span>
                  <span className="text-white font-medium">{series.totalEpisodes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0c0] text-sm">Статус</span>
                  <span className={`font-medium ${series.status === 'ongoing' ? 'text-green-400' : 'text-blue-400'}`}>
                    {series.status === 'ongoing' ? 'Выходит' : 'Завершён'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0c0] text-sm">Жанры</span>
                  <span className="text-white font-medium text-right text-sm max-w-[60%]">
                    {series.genres.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="mt-6 bg-[#252550]/50 rounded-xl p-4 border border-[#252550] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#e94560]/20 flex items-center justify-center flex-shrink-0">
            <Info size={16} className="text-[#e94560]" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Подсказка</p>
            <p className="text-[#a0a0c0] text-xs mt-0.5">
              Нажмите «Смотреть» чтобы открыть серию на сайте dunhuatv.ru. 
              Видео воспроизводится в качестве {settings.quality} с настройками из раздела «Настройки».
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
