import React, { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from './data';
import { Sidebar } from './components/Sidebar';
import { HeaderMobile } from './components/HeaderMobile';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/Footer';
import { useScrollSpy } from './hooks/useScrollSpy';
import { ThemeProvider } from './context/ThemeContext';
import { useLenis } from './hooks/useLenis';
import { Background3D } from './components/Background3D';
import { CustomCursor } from './components/CustomCursor';
import { ProgressBar } from './components/ProgressBar';
import { CommandPalette } from './components/CommandPalette';
import { IntroLoader } from './components/IntroLoader';
import { Sparkles, Command } from 'lucide-react';

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}

function PortfolioContent() {
  const sectionIds = PORTFOLIO_DATA.navigation.map((n) => n.id);
  const activeSection = useScrollSpy(sectionIds, 200);

  // Initialize Lenis smooth scrolling
  useLenis();

  // Command Palette State
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Intro Loader State
  const [showIntro, setShowIntro] = useState(true);

  // Spotlight mouse position for ambient deep-purple glow
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcut for Command Palette (Cmd+K / Ctrl+K or single "K")
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      const isInputFocused = activeTag === 'input' || activeTag === 'textarea';

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'k' && !isInputFocused && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FBF9FE] dark:bg-[#07040E] text-slate-900 dark:text-slate-300 transition-colors duration-500 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Intro Reveal Screen (brief, 1.4s max) */}
      {showIntro && (
        <IntroLoader
          name={PORTFOLIO_DATA.profile.name}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Top Reading Progress Indicator */}
      <ProgressBar />

      {/* Custom Interactive Follower Cursor (Desktop) */}
      <CustomCursor />

      {/* 3D Subtle Particle Constellation Background (Three.js) */}
      <Background3D />

      {/* 
        Spotlight Gradient Cursor Glow (Deep Purple edition)
        Bereaksi halus terhadap kursor di desktop 
      */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 hidden lg:block"
        style={{
          background: `radial-gradient(750px at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.12), transparent 80%)`,
        }}
      />

      {/* Floating Command Palette Quick Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsCommandOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-[#150B28]/80 hover:bg-[#20103E] text-purple-200 text-xs font-mono border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-950/60 transition-all duration-300 hover:scale-105 hover:border-purple-400 group"
        aria-label="Open command palette (Press K)"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
        <span className="text-[11px] font-sans">Quick Menu</span>
        <kbd className="px-1.5 py-0.5 rounded bg-purple-900/60 text-[10px] text-purple-300 border border-purple-500/20">
          K
        </kbd>
      </button>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={handleNavigate}
      />

      <div className="relative z-20 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-16">
          {/* Left Column: Fixed Sidebar on Desktop */}
          <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

          {/* Right Column: Scrollable Content on Desktop */}
          <main id="content" className="pt-8 lg:w-1/2 lg:py-24">
            {/* Mobile Header (displayed below lg breakpoint) */}
            <HeaderMobile activeSection={activeSection} onNavigate={handleNavigate} />

            <div className="space-y-24 pt-8 lg:pt-0">
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection />
              <SkillsSection />
              <ContactSection />
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
