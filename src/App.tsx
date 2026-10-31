import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SplashScreen from './components/SplashScreen';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import DetailsPage from './pages/DetailsPage';
import PlayerPage from './pages/PlayerPage';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';
import { AppSettings } from './types';

function AppContent() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('dunhuatv-settings');
    if (saved) return JSON.parse(saved);
    return {
      autoplay: true,
      quality: '720p',
      playbackSpeed: 1,
      subtitles: false,
      subtitleSize: 'medium',
      theme: 'dark',
      volume: 80,
    };
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('dunhuatv-settings', JSON.stringify(settings));
  }, [settings]);

  // TV Remote / Keyboard Navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Back button on TV remote
    if (e.key === 'GoBack' || (e.key === 'Backspace' && location.pathname !== '/')) {
      e.preventDefault();
      navigate(-1);
    }
    
    // Escape key
    if (e.key === 'Escape') {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (location.pathname !== '/') {
        navigate(-1);
      }
    }
  }, [navigate, location]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--tv-bg)]">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/details/:slug" element={<DetailsPage />} />
          <Route path="/player/:slug" element={<PlayerPage settings={settings} />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
