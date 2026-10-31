import { NavLink, useLocation } from 'react-router-dom';
import { Home, List, Newspaper, Settings, Tv, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: '/', icon: Home, label: 'Главная', exact: true },
  { to: '/catalog', icon: List, label: 'Каталог', exact: false },
  { to: '/news', icon: Newspaper, label: 'Новости', exact: false },
  { to: '/settings', icon: Settings, label: 'Настройки', exact: false },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  return (
    <aside 
      className={`h-screen flex flex-col transition-all duration-300 ease-out ${
        collapsed ? 'w-20' : 'w-64'
      } bg-[var(--tv-surface)] border-r border-[var(--tv-border)] relative flex-shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b border-[var(--tv-border)]">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--tv-accent)] to-[#c73e54] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--tv-accent)]/20">
          <Tv size={24} className="text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden">
            <h1 className="text-xl font-black text-white leading-tight whitespace-nowrap">Дунхуа ТВ</h1>
            <p className="text-xs text-[var(--tv-text-secondary)] font-medium">Android TV</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={`tv-nav-item flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
              isActive(item)
                ? 'active text-white shadow-lg shadow-[var(--tv-accent)]/20'
                : 'text-[var(--tv-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
            tabIndex={0}
          >
            <item.icon size={24} className="flex-shrink-0" />
            {!collapsed && <span className="font-semibold text-base whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="tv-btn absolute -right-4 top-24 w-8 h-8 rounded-full bg-[var(--tv-card)] border-2 border-[var(--tv-border)] flex items-center justify-center text-[var(--tv-text-secondary)] hover:text-white hover:bg-[var(--tv-accent)] hover:border-[var(--tv-accent)] transition-all z-50"
        aria-label={collapsed ? 'Развернуть' : 'Свернуть'}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Footer */}
      {!collapsed && (
        <div className="p-5 border-t border-[var(--tv-border)]">
          <p className="text-[var(--tv-text-dim)] text-xs">dunhuatv.ru</p>
          <p className="text-[var(--tv-text-dim)] text-xs mt-1">v2.0 • TV Edition</p>
        </div>
      )}
    </aside>
  );
}
