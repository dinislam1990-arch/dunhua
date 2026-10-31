import { Series } from '../data/series';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SeriesCardProps {
  series: Series;
  size?: 'normal' | 'wide';
}

export default function SeriesCard({ series, size = 'normal' }: SeriesCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${series.slug}`);
  };

  if (size === 'wide') {
    return (
      <div
        onClick={handleClick}
        className="tv-item card-glow w-[320px] flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden bg-[var(--tv-card)]"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        aria-label={`${series.title}, рейтинг ${series.rating}`}
      >
        <div className="relative aspect-video">
          <img
            src={series.poster}
            alt={series.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 rating-badge">
            <Star size={12} fill="currentColor" /> {series.rating}
          </div>
          {series.status === 'ongoing' && (
            <div className="absolute top-3 right-3 bg-green-500/90 text-white text-xs px-2 py-1 rounded-md font-bold">
              Онгоинг
            </div>
          )}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-base truncate">{series.title}</h3>
            <p className="text-white/60 text-xs mt-0.5">{series.year} • {series.duration} • {series.age}</p>
          </div>
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-[var(--tv-accent)]/90 flex items-center justify-center backdrop-blur-sm">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <polygon points="8,5 19,12 8,19" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="tv-item card-glow w-[200px] flex-shrink-0 cursor-pointer group"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${series.title}, рейтинг ${series.rating}`}
    >
      {/* Poster */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3">
        <img
          src={series.poster}
          alt={series.title}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Rating */}
        <div className="absolute top-2.5 left-2.5 rating-badge">
          <Star size={11} fill="currentColor" /> {series.rating}
        </div>

        {/* Age */}
        <div className="absolute top-2.5 right-2.5 bg-black/60 text-white/90 text-xs px-2 py-0.5 rounded-md font-medium backdrop-blur-sm">
          {series.age}
        </div>

        {/* Status */}
        {series.status === 'ongoing' && (
          <div className="absolute bottom-2.5 left-2.5 bg-[var(--tv-accent)]/90 text-white text-xs px-2 py-0.5 rounded-md font-bold backdrop-blur-sm">
            Онгоинг
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-focus:opacity-100 transition-opacity bg-black/30">
          <div className="w-16 h-16 rounded-full bg-[var(--tv-accent)]/90 flex items-center justify-center backdrop-blur-sm shadow-lg">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-white truncate group-focus:text-[var(--tv-accent)] transition-colors">
        {series.title}
      </h3>
      <p className="text-xs text-[var(--tv-text-secondary)] mt-0.5">
        {series.year} • {series.duration}
      </p>
    </div>
  );
}
