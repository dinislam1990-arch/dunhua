import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SplashScreen from './components/SplashScreen';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import PlayerPage from './pages/PlayerPage';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';
import { AppSettings } from './types';
import { useTVNavigation } from './hooks/useTVNavigation';

function App() {
  const [showSplash, setShowSplash] = useState(true);
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

  // Initialize TV navigation
  useTVNavigation();

  useEffect(() => {
    localStorage.setItem('dunhuatv-settings', JSON.stringify(settings));
  }, [settings]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      window.history.back();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <div className="flex h-screen w-screen overflow-hidden bg-[#0f0f23]">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:slug" element={<PlayerPage settings={settings} />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
