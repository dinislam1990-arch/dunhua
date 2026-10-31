import { newsData } from '../data/series';
import { Newspaper, Calendar, ExternalLink } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="min-h-screen p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Newspaper size={28} className="text-[#e94560]" />
          <h1 className="text-3xl font-bold text-white">Новости</h1>
        </div>
        <p className="text-[#a0a0c0]">Последние обновления и анонсы с dunhuatv.ru</p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {newsData.map((news, index) => (
          <article 
            key={news.id} 
            className="tv-focusable bg-[#1a1a3e] rounded-2xl overflow-hidden border border-[#252550] hover:border-[#e94560]/30 transition-all group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={14} className="text-[#e94560]" />
                <time className="text-xs text-[#a0a0c0]">
                  {new Date(news.date).toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </time>
              </div>
              <h2 className="text-lg font-semibold text-white mb-3 group-hover:text-[#e94560] transition-colors">
                {news.title}
              </h2>
              <p className="text-[#a0a0c0] text-sm leading-relaxed mb-4">
                {news.content}
              </p>
              <a
                href="https://dunhuatv.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="tv-focusable inline-flex items-center gap-1.5 text-[#e94560] text-sm font-medium hover:text-[#ff6b81] transition-colors"
              >
                Читать на сайте <ExternalLink size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Telegram CTA */}
      <div className="mt-10 bg-gradient-to-r from-[#1a1a3e] to-[#252550] rounded-2xl p-8 border border-[#252550]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">📢 Подпишись на Telegram</h3>
            <p className="text-[#a0a0c0] text-sm">
              Получай уведомления о новых сериях и обновлениях первым!
            </p>
          </div>
          <a
            href="https://t.me/dunhuatv"
            target="_blank"
            rel="noopener noreferrer"
            className="tv-focusable px-6 py-3 bg-[#e94560] hover:bg-[#ff6b81] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#e94560]/20 flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Подписаться
          </a>
        </div>
      </div>

      {/* Update schedule */}
      <div className="mt-8 bg-[#1a1a3e] rounded-2xl p-6 border border-[#252550]">
        <h3 className="text-lg font-bold text-white mb-4">📅 График обновлений</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-[#252550] rounded-xl">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <div>
              <p className="text-white text-sm font-medium">Несравненный боевой дух 2</p>
              <p className="text-[#a0a0c0] text-xs">Каждый день</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#252550] rounded-xl">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <div>
              <p className="text-white text-sm font-medium">Путешествие к бессмертию 5</p>
              <p className="text-[#a0a0c0] text-xs">Каждую неделю</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#252550] rounded-xl">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div>
              <p className="text-white text-sm font-medium">За гранью времени 2</p>
              <p className="text-[#a0a0c0] text-xs">Каждую неделю</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#252550] rounded-xl">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <div>
              <p className="text-white text-sm font-medium">Практикуя ци сто тысяч лет</p>
              <p className="text-[#a0a0c0] text-xs">Каждый день</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
