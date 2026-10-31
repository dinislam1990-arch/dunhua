import { useState, useMemo } from 'react';
import { seriesData, genres } from '../data/series';
import SeriesCard from '../components/SeriesCard';
import { Search, Filter, X } from 'lucide-react';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredSeries = useMemo(() => {
    let result = [...seriesData];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.genres.some(g => g.toLowerCase().includes(query))
      );
    }

    // Filter by genre
    if (selectedGenre !== 'Все') {
      result = result.filter(s => s.genres.includes(selectedGenre));
    }

    // Sort
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
    <div className="min-h-screen p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Каталог дунхуа</h1>
        <p className="text-[#a0a0c0]">Выберите мультсериал для просмотра</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0c0]" />
          <input
            type="text"
            placeholder="Поиск мультсериалов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tv-focusable w-full pl-10 pr-10 py-3 bg-[#1a1a3e] border border-[#252550] rounded-xl text-white placeholder-[#a0a0c0] focus:border-[#e94560] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0c0] hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`tv-focusable px-4 py-3 rounded-xl border transition-all flex items-center gap-2 ${
            showFilters 
              ? 'bg-[#e94560] border-[#e94560] text-white' 
              : 'bg-[#1a1a3e] border-[#252550] text-[#a0a0c0] hover:text-white'
          }`}
        >
          <Filter size={18} />
          <span>Фильтры</span>
        </button>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'rating' | 'year' | 'title')}
          className="tv-focusable px-4 py-3 bg-[#1a1a3e] border border-[#252550] rounded-xl text-white focus:border-[#e94560] focus:outline-none cursor-pointer"
        >
          <option value="rating">По рейтингу</option>
          <option value="year">По году</option>
          <option value="title">По названию</option>
        </select>
      </div>

      {/* Genre filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`tv-focusable px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedGenre === genre
                  ? 'bg-[#e94560] text-white'
                  : 'bg-[#1a1a3e] text-[#a0a0c0] hover:text-white border border-[#252550]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-[#a0a0c0] mb-4">
        Найдено: {filteredSeries.length} {filteredSeries.length === 1 ? 'сериал' : 'сериалов'}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {filteredSeries.map((series) => (
          <SeriesCard key={series.id} series={series} size="medium" />
        ))}
      </div>

      {/* Empty state */}
      {filteredSeries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-[#1a1a3e] flex items-center justify-center mb-4">
            <Search size={32} className="text-[#a0a0c0]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Ничего не найдено</h3>
          <p className="text-[#a0a0c0]">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  );
}
