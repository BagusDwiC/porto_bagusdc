import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { PhotoCard } from './PhotoCard';
import { Github, Linkedin, Instagram, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderMobileProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const HeaderMobile: React.FC<HeaderMobileProps> = ({ activeSection, onNavigate }) => {
  const { profile, navigation, socials } = PORTFOLIO_DATA;
  const { theme, toggleTheme } = useTheme();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <header className="lg:hidden pt-12 pb-8 border-b border-slate-200 dark:border-slate-800">
      {/* Pas Foto 3:4 */}
      <div className="flex justify-start">
        <PhotoCard photoUrl={profile.avatarUrl} name={profile.name} />
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-900 dark:text-white font-display">
          {profile.name}
        </h1>

        <h2 className="text-lg font-medium text-purple-600 dark:text-purple-400 font-heading">
          {profile.role}
        </h2>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-md">
          {profile.tagline}
        </p>
      </div>

      {/* Social links & Theme toggle in mobile header */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <ul className="flex items-center gap-4" aria-label="Social media">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-300 transition-colors"
                aria-label={social.label}
              >
                {getSocialIcon(social.icon)}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleTheme}
          type="button"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-purple-600" />
              <span>Dark</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Sticky Section Bar */}
      <div className="sticky top-0 z-20 mt-8 -mx-6 px-6 py-3 bg-white/90 dark:bg-[#0F0922]/90 backdrop-blur-md border-y border-purple-200/50 dark:border-purple-900/40">
        <nav className="flex overflow-x-auto gap-2 no-scrollbar" aria-label="Quick mobile navigation">
          {navigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 font-semibold border border-purple-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
