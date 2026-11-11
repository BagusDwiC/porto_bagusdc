import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { useTheme } from '../context/ThemeContext';
import {
  Search,
  User,
  Briefcase,
  Layers,
  Code2,
  Mail,
  Sun,
  Moon,
  Copy,
  Check,
  CornerDownLeft,
  X,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Actions' | 'Socials';
  icon: React.ReactNode;
  perform: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-about',
      label: 'Go to About',
      category: 'Navigation',
      icon: <User className="w-4 h-4 text-purple-400" />,
      perform: () => onNavigate('about'),
    },
    {
      id: 'nav-experience',
      label: 'Go to Experience',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-purple-400" />,
      perform: () => onNavigate('experience'),
    },
    {
      id: 'nav-projects',
      label: 'Go to Projects',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      perform: () => onNavigate('projects'),
    },
    {
      id: 'nav-skills',
      label: 'Go to Skills',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-purple-400" />,
      perform: () => onNavigate('skills'),
    },
    {
      id: 'nav-contact',
      label: 'Go to Contact',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-purple-400" />,
      perform: () => onNavigate('contact'),
    },
    {
      id: 'act-theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />,
      perform: toggleTheme,
    },
    {
      id: 'act-copy-email',
      label: copied ? 'Email Copied!' : `Copy Email (${PORTFOLIO_DATA.profile.email})`,
      category: 'Actions',
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />,
      perform: copyEmail,
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].perform();
          if (filteredCommands[selectedIndex].category === 'Navigation') {
            onClose();
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-purple-500/25 bg-[#120B24]/95 text-slate-100 shadow-2xl shadow-purple-950/70 overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-purple-500/20">
          <Search className="w-5 h-5 text-purple-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-purple-300/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-purple-400 hover:text-white rounded-md hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-xs text-purple-300/50">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.perform();
                    if (item.category === 'Navigation') onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                    isSelected
                      ? 'bg-purple-600/30 text-white border border-purple-500/30 shadow-sm'
                      : 'text-slate-300 hover:bg-purple-900/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-purple-900/40 border border-purple-500/20">
                      {item.icon}
                    </div>
                    <span className="font-medium text-xs sm:text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-purple-300/60 font-mono">
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/10">
                      {item.category}
                    </span>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-purple-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Palette Footer Shortcuts */}
        <div className="px-4 py-2.5 bg-purple-950/40 border-t border-purple-500/15 flex items-center justify-between text-[11px] text-purple-300/60">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-purple-900/40 border border-purple-500/20 text-[10px]">â†‘</kbd> <kbd className="px-1.5 py-0.5 rounded bg-purple-900/40 border border-purple-500/20 text-[10px]">â†“</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-purple-900/40 border border-purple-500/20 text-[10px]">â†µ</kbd> Select</span>
          </div>
          <span><kbd className="px-1.5 py-0.5 rounded bg-purple-900/40 border border-purple-500/20 text-[10px]">ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
};

