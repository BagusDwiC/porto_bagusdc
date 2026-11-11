import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-16 pb-24 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
      <p>
        Loosely designed in{' '}
        <span className="font-medium text-slate-800 dark:text-slate-200">Figma</span> and coded in{' '}
        <span className="font-medium text-slate-800 dark:text-slate-200">Visual Studio Code</span>. Built with{' '}
        <span className="font-medium text-slate-800 dark:text-slate-200">React & TypeScript</span>, styled with{' '}
        <span className="font-medium text-slate-800 dark:text-slate-200">Tailwind CSS</span>, and brought to life with subtle interactions. Inspired by the minimalist aesthetic of Brittany Chiang.
      </p>
      <p className="mt-3">
        © {new Date().getFullYear()} Bagus Dwi Cahya. All rights reserved.
      </p>
    </footer>
  );
};
