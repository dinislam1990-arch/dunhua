import { useState, useMemo } from 'react';
import { seriesData, genres } from '../data/series';
import SeriesCard from '../components/SeriesCard';
import { Search, Filter, X, Grid3X3, LayoutGrid } from 'lucide-react';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredSeries = useMemo(() => {
    let result = [...seriesData];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.genres.some(g => g.toLowerCase().includes(query))
      );
    }

    if (selectedGenre !== 'Все') {
      result = result.filter(s => s.genres.includes(selectedGenre));
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'year':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [searchQuery, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">Каталог дунхуа</h1>
        <p className="text-[var(--tv-text-secondary)] text-lg">Выберите мультсериал для просмотра</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[300px] max-w-lg">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--tv-text-secondary)]" />
          <input
            type="text"
            placeholder="Поиск по названию, жанру..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tv-btn w-full pl-12 pr-12 py-4 bg-[var(--tv-surface)] border-2 border-[var(--tv-border)] rounded-xl text-white text-base placeholder-[var(--tv-text-secondary)] focus:border-[var(--tv-accent)] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="tv-btn absolute right-4 top-1/2 -translate-y-1/2 text-[var(--tv-text-secondary)] hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`tv-btn px-6 py-4 rounded-xl border-2 transition-all flex items-center gap-2 text-base font-semibold ${
            showFilters 
              ? 'bg-[var(--tv-accent)] border-[var(--tv-accent)] text-white' 
              : 'bg-[var(--tv-surface)] border-[var(--tv-border)] text-[var(--tv-text-secondary)] hover:text-white hover:border-[var(--tv-accent)]'
          }`}
        >
          <Filter size={20} />
          <span>Жанры</span>
        </button>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'rating' | 'year' | 'title')}
          className="tv-btn px-6 py-4 bg-[var(--tv-surface)] border-2 border-[var(--tv-border)] rounded-xl text-white text-base focus:border-[var(--tv-accent)] focus:outline-none cursor-pointer font-semibold"
        >
          <option value="rating">⭐ По рейтингу</option>
          <option value="year">📅 По году</option>
          <option value="title">🔤 По названию</option>
        </select>
      </div>

      {/* Genre filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 mb-8 animate-fade-in">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`tv-btn px-5 py-2.5 rounded-xl text-base font-semibold transition-all ${
                selectedGenre === genre
                  ? 'bg-[var(--tv-accent)] text-white shadow-lg shadow-[var(--tv-accent)]/20'
                  : 'bg-[var(--tv-surface)] text-[var(--tv-text-secondary)] hover:text-white border-2 border-[var(--tv-border)] hover:border-[var(--tv-accent)]'
              }`}
              tabIndex={0}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-base text-[var(--tv-text-secondary)] mb-6 font-medium">
        Найдено: <span className="text-white font-bold">{filteredSeries.length}</span> {filteredSeries.length === 1 ? 'сериал' : 'сериалов'}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredSeries.map((series, i) => (
          <div key={series.id} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
            <SeriesCard series={series} />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredSeries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-[var(--tv-surface)] flex items-center justify-center mb-6">
            <Search size={40} className="text-[var(--tv-text-secondary)]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Ничего не найдено</h3>
          <p className="text-[var(--tv-text-secondary)] text-lg">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  );
}
