import React from 'react';
import { PORTFOLIO_DATA } from '../../data';

export const AboutSection: React.FC = () => {
  const { about } = PORTFOLIO_DATA;

  return (
    <section id="about" className="scroll-mt-16 lg:scroll-mt-24" aria-label="About me">
      {/* Section Sticky Header for Mobile */}
      <div className="sticky top-0 z-10 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">
          About
        </h2>
      </div>

      <div className="space-y-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
        {about.paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </section>
  );
};
