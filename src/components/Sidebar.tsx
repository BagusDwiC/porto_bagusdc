import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { PhotoCard } from './PhotoCard';
import { Github, Linkedin, Instagram, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
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
    <aside data-lenis-prevent className="[@media(max-height:820px)]:lg:py-5 [@media(max-height:820px)]:lg:gap-3 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:gap-8 lg:overflow-y-auto lg:py-12 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div>
        {/* Foto Profil (Pas Foto 3:4) */}
        <PhotoCard photoUrl={profile.avatarUrl} name={profile.name} />

        {/* Header Identitas */}
        <div className="space-y-3 [@media(max-height:820px)]:space-y-1.5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.035em] leading-[1.08] text-slate-900 dark:text-white font-display">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
              {profile.name}
            </a>
          </h1>

          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-purple-600 dark:text-purple-400 font-heading">
            {profile.role}
          </h2>

          <p className="max-w-xs text-sm sm:text-base [@media(max-height:820px)]:text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.tagline}
          </p>
        </div>

        {/* Section Navigation with Active Scroll Spy */}
        <nav className="nav hidden lg:block mt-8 xl:mt-12 [@media(max-height:820px)]:!mt-4" aria-label="In-page navigation">
          <ul className="w-max space-y-1">
            {navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="group flex items-center py-2 [@media(max-height:820px)]:py-1 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-sm"
                  >
                    {/* Indicator Line: lengthens when active */}
                    <span
                      className={`mr-4 h-[2px] transition-all duration-300 ease-out group-hover:w-16 group-hover:bg-purple-400 dark:group-hover:bg-purple-300 ${
                        isActive
                          ? 'w-16 bg-purple-500 dark:bg-purple-400'
                          : 'w-8 bg-slate-300 dark:bg-purple-900/40'
                      }`}
                    />
                    {/* Text Label: lights up when active */}
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 group-hover:text-purple-900 dark:group-hover:text-purple-100 ${
                        isActive
                          ? 'text-purple-600 dark:text-purple-300 font-bold'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Footer Area: Theme Switch, Command Palette & Social Media Links */}
      <div className="mt-12 lg:mt-0 lg:shrink-0 pt-6 [@media(max-height:820px)]:lg:pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-purple-200/50 dark:border-purple-900/30">
        <ul className="flex items-center gap-5" aria-label="Social media">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="block text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-300 transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-full p-1"
                aria-label={`${social.label} (opens in a new tab)`}
              >
                {getSocialIcon(social.icon)}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors border border-purple-200 dark:border-purple-500/20"
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
    </aside>
  );
};
