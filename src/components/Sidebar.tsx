import { NavLink, useLocation } from 'react-router-dom';
import { Home, List, Newspaper, Settings, Tv, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: '/', icon: Home, label: 'Главная' },
  { to: '/catalog', icon: List, label: 'Каталог' },
  { to: '/news', icon: Newspaper, label: 'Новости' },
  { to: '/settings', icon: Settings, label: 'Настройки' },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside 
      className={`h-screen flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-56'
      } bg-[#1a1a3e] border-r border-[#252550] relative`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-[#252550]">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e94560] to-[#c73e54] flex items-center justify-center flex-shrink-0">
          <Tv size={22} className="text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold text-white leading-tight">Дунхуа ТВ</h1>
            <p className="text-xs text-[#a0a0c0]">Android TV</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || 
            (item.to !== '/' && location.pathname.startsWith(item.to));
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`tv-focusable flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#e94560] to-[#c73e54] text-white shadow-lg shadow-[#e94560]/20'
                  : 'text-[#a0a0c0] hover:text-white hover:bg-[#252550]'
              }`}
            >
              <item.icon size={22} className="flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="tv-focusable absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#252550] border border-[#353570] flex items-center justify-center text-[#a0a0c0] hover:text-white hover:bg-[#e94560] transition-all"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-[#252550] text-xs text-[#a0a0c0]">
          <p>dunhuatv.ru</p>
          <p className="mt-1">v1.0 • TV Edition</p>
        </div>
      )}
    </aside>
  );
}
