import React from 'react';
import { PORTFOLIO_DATA } from '../../data';

export const SkillsSection: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="scroll-mt-16 lg:scroll-mt-24" aria-label="Skills and technical expertise">
      {/* Mobile Sticky Header */}
      <div className="sticky top-0 z-10 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">
          Skills
        </h2>
      </div>

      <div className="space-y-8">
        {skills.map((categoryGroup) => (
          <div key={categoryGroup.category} className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono">
              {categoryGroup.category}
            </h3>

            {/* Interactive Grid (No progress bars!) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categoryGroup.items.map((skill) => (
                <div
                  key={skill.name}
                  className="group relative p-3 rounded-xl border border-purple-200/50 dark:border-purple-900/40 bg-white/60 dark:bg-[#120A26]/50 hover:bg-purple-50/80 dark:hover:bg-[#1C103C] hover:border-purple-500/40 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-purple-900/20 cursor-default"
                >
                  <div className="flex flex-col justify-between h-full space-y-1">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </span>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>{skill.level}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40 group-hover:bg-purple-400 group-hover:shadow-[0_0_6px_rgba(168,85,247,0.8)] transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
