import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Info, 
  PlusCircle, 
  Award, 
  Menu as MenuIcon, 
  X,
  Github,
  Mail,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import CreditsView from './components/CreditsView';
import AddVersionView from './components/AddVersionView';

type View = 'home' | 'about' | 'add-version' | 'credits';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, group: 'Main' },
    { id: 'add-version', label: 'Add Version', icon: PlusCircle, group: 'Settings' },
    { id: 'about', label: 'About Us', icon: Info, group: 'Info' },
    { id: 'credits', label: 'Credits', icon: Award, group: 'Info' },
  ];

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-brand-bg font-sans text-brand-text relative">
      {/* DNA Gradient Background Effect */}
      <div className="dna-bg" />

      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-brand-bg2 border border-brand-border rounded-xl text-brand-accent shadow-2xl"
      >
        {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-brand-bg2 border-r border-brand-border transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8 border-b border-brand-border group relative overflow-hidden">
          <div className="scanning-bar opacity-0 group-hover:opacity-10 transition-opacity" />
          <h1 className="text-xl font-mono font-bold tracking-[0.2em] text-brand-accent whitespace-nowrap">
            BIOALIGN <span className="text-brand-text/20 font-light">_</span>
          </h1>
          <p className="text-[10px] font-mono text-brand-muted mt-1 uppercase tracking-widest whitespace-nowrap">v1.0 · DNA Alignment Tool</p>
        </div>

        <nav className="py-8">
          {['Main', 'Settings', 'Info'].map((group) => (
            <div key={group} className="mb-6">
              <div className="px-8 py-2 text-[10px] font-mono text-brand-muted uppercase tracking-[0.2em] mb-2">{group}</div>
              {navItems.filter(item => item.group === group).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as View)}
                  className={`w-full flex items-center gap-3 px-8 py-3 transition-all duration-200 border-l-2 text-sm ${
                    currentView === item.id 
                      ? 'bg-brand-accent/5 text-brand-accent border-brand-accent font-medium' 
                      : 'text-brand-muted hover:text-brand-accent/80 border-transparent hover:bg-brand-accent/[0.02]'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-brand-border bg-brand-bg2">
          <p className="text-[10px] font-mono text-brand-muted leading-relaxed uppercase tracking-widest">
            BCB Project · 2026<br />
            <span className="text-brand-accent/50">Dept of Bioinformatics</span>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 min-h-screen relative z-10 overflow-x-hidden">
        <div className="max-w-4xl p-8 lg:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === 'home' && <HomeView />}
              {currentView === 'about' && <AboutView />}
              {currentView === 'credits' && <CreditsView />}
              {currentView === 'add-version' && <AddVersionView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Website Footer - removed as requested dashboard like look */}
    </div>
  );
}
