import { Series } from '../data/series';
import { Star, Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SeriesCardProps {
  series: Series;
  size?: 'small' | 'medium' | 'large';
}

export default function SeriesCard({ series, size = 'medium' }: SeriesCardProps) {
  const navigate = useNavigate();

  const sizeClasses = {
    small: 'w-36',
    medium: 'w-48',
    large: 'w-56',
  };

  const handleClick = () => {
    navigate(`/catalog/${series.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`tv-focusable ${sizeClasses[size]} flex-shrink-0 cursor-pointer group`}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Poster */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2 card-glow">
        <img
          src={series.poster}
          alt={series.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Rating badge */}
        <div className="absolute top-2 left-2 rating-badge flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          {series.rating}
        </div>

        {/* Age badge */}
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
          {series.age}
        </div>

        {/* Status badge */}
        {series.status === 'ongoing' && (
          <div className="absolute bottom-2 left-2 bg-[#e94560] text-white text-xs px-2 py-0.5 rounded font-medium">
            Онгоинг
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-[#e94560]/90 flex items-center justify-center backdrop-blur-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#e94560] transition-colors">
        {series.title}
      </h3>
      <div className="flex items-center gap-2 mt-1 text-xs text-[#a0a0c0]">
        <span className="flex items-center gap-1">
          <Calendar size={10} />
          {series.year}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={10} />
          {series.duration}
        </span>
      </div>
    </div>
  );
}
