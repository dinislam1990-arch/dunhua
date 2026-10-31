import { newsData } from '../data/series';
import { Newspaper, Calendar, ExternalLink, Bell } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--tv-accent)] to-[#c73e54] flex items-center justify-center shadow-lg shadow-[var(--tv-accent)]/20">
            <Newspaper size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white">Новости</h1>
            <p className="text-[var(--tv-text-secondary)] text-lg">Обновления и анонсы с dunhuatv.ru</p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {newsData.map((news, index) => (
          <article 
            key={news.id} 
            className={`tv-item animate-fade-in-up stagger-${index + 1} bg-[var(--tv-surface)] rounded-2xl overflow-hidden border-2 border-[var(--tv-border)] cursor-pointer group`}
            tabIndex={0}
          >
            <div className="p-7">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-[var(--tv-accent)]" />
                <time className="text-sm text-[var(--tv-text-secondary)] font-medium">
                  {new Date(news.date).toLocaleDateString('ru-RU', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                  })}
                </time>
              </div>
              <h2 className="text-xl font-bold text-white mb-3 group-focus:text-[var(--tv-accent)] transition-colors">
                {news.title}
              </h2>
              <p className="text-[var(--tv-text-secondary)] text-base leading-relaxed mb-5">
                {news.content}
              </p>
              <a
                href="https://dunhuatv.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="tv-btn inline-flex items-center gap-2 text-[var(--tv-accent)] text-base font-semibold hover:text-[var(--tv-accent-light)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Читать на сайте <ExternalLink size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Telegram CTA */}
      <div className="bg-gradient-to-r from-[var(--tv-surface)] to-[var(--tv-card)] rounded-2xl p-8 border border-[var(--tv-border)] mb-8">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <Bell size={28} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">📢 Telegram канал</h3>
              <p className="text-[var(--tv-text-secondary)] text-base">
                Уведомления о новых сериях и обновлениях
              </p>
            </div>
          </div>
          <a
            href="https://t.me/dunhuatv"
            target="_blank"
            rel="noopener noreferrer"
            className="tv-btn px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-3 text-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Подписаться
          </a>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-[var(--tv-surface)] rounded-2xl p-8 border border-[var(--tv-border)]">
        <h3 className="text-2xl font-bold text-white mb-6">📅 График выхода серий</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Несравненный боевой дух 2', schedule: 'Каждый день', active: true },
            { name: 'Путешествие к бессмертию 5', schedule: 'Каждую неделю', active: true },
            { name: 'За гранью времени 2', schedule: 'Каждую неделю', active: true },
            { name: 'Практикуя ци сто тысяч лет', schedule: 'Каждый день', active: true },
            { name: 'Сильнейший: История Юньсяо Ли', schedule: 'Каждую неделю', active: true },
            { name: 'День моего вознесения', schedule: 'Каждую неделю', active: false },
          ].map((item, i) => (
            <div key={i} className="tv-item flex items-center gap-4 p-4 bg-[var(--tv-card)] rounded-xl cursor-default" tabIndex={0}>
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.active ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">{item.name}</p>
                <p className="text-[var(--tv-text-secondary)] text-sm">{item.schedule}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
