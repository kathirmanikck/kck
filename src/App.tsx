import React, { useState } from 'react';
import { 
  Home, 
  Info, 
  PlusCircle, 
  Award, 
  Dna, 
  Menu as MenuIcon, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import CreditsView from './components/CreditsView';
import AddVersionView from './components/AddVersionView';

type View = 'home' | 'about' | 'add-version' | 'credits';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'add-version', label: 'Add Version', icon: PlusCircle },
    { id: 'credits', label: 'Credits', icon: Award },
  ];

  return (
    <div className="flex h-screen bg-brand-bg font-sans text-brand-text overflow-hidden relative">
      {/* DNA Gradient Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(61, 220, 110, 0.2) 40px, rgba(61, 220, 110, 0.2) 41px),
                            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(61, 220, 110, 0.2) 40px, rgba(61, 220, 110, 0.2) 41px)`
        }} />
      </div>

      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-brand-card rounded-md shadow-sm border border-brand-border"
      >
        {isSidebarOpen ? <X size={20} className="text-brand-accent" /> : <MenuIcon size={20} className="text-brand-accent" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-64 bg-brand-card border-r border-brand-border flex flex-col z-40 fixed lg:relative h-full"
          >
            <div className="p-8 border-b border-brand-border relative overflow-hidden group">
              <div className="scanning-bar group-hover:opacity-60 transition-opacity" />
              <h1 className="text-xl font-mono font-bold tracking-[0.2em] text-brand-accent flex items-center gap-2">
                BIOALIGN <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(61,220,110,0.8)]" />
              </h1>
              <span className="text-[10px] font-mono text-brand-muted mt-1 block tracking-wider uppercase">System_Status: <span className="text-brand-accent opacity-80">STABLE</span></span>
            </div>

            <nav className="flex-1 px-0 py-4 space-y-1">
              <div className="px-6 py-2 text-[10px] font-mono text-brand-muted uppercase tracking-[0.15em]">Main</div>
              {navItems.slice(0, 1).map((item) => (
                <SidebarItem key={item.id} item={item} current={currentView} onClick={() => {
                  setCurrentView(item.id as View);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }} />
              ))}
              
              <div className="px-6 py-2 mt-4 text-[10px] font-mono text-brand-muted uppercase tracking-[0.15em]">Advanced</div>
              {navItems.slice(2, 3).map((item) => (
                <SidebarItem key={item.id} item={item} current={currentView} onClick={() => {
                  setCurrentView(item.id as View);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }} />
              ))}

              <div className="px-6 py-2 mt-4 text-[10px] font-mono text-brand-muted uppercase tracking-[0.15em]">Info</div>
              {[navItems[1], navItems[3]].map((item) => (
                <SidebarItem key={item.id} item={item} current={currentView} onClick={() => {
                  setCurrentView(item.id as View);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }} />
              ))}
            </nav>

            <div className="p-6 border-t border-brand-border">
              <div className="bg-brand-bg/50 p-4 rounded-lg border border-brand-border/50">
                <p className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">BCB Project</p>
                <p className="text-xs font-mono text-brand-accent mt-1">2026 Edition</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative p-4 lg:p-12 z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentView === 'home' && <HomeView key="home" />}
            {currentView === 'about' && <AboutView key="about" />}
            {currentView === 'credits' && <CreditsView key="credits" />}
            {currentView === 'add-version' && <AddVersionView key="add-version" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

const SidebarItem: React.FC<{ item: any, current: string, onClick: () => void }> = ({ item, current, onClick }) => {
  const active = current === item.id;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 border-l-2 ${
        active 
          ? 'bg-brand-accent/5 text-brand-accent border-brand-accent' 
          : 'text-brand-muted hover:bg-brand-accent/5 hover:text-brand-accent border-transparent'
      }`}
    >
      <item.icon size={18} />
      <span className="text-sm font-medium">{item.label}</span>
    </button>
  );
};
