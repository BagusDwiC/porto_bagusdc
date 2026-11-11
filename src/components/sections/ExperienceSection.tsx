import React from 'react';
import { PORTFOLIO_DATA } from '../../data';
import { ArrowUpRight } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experiences } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="scroll-mt-16 lg:scroll-mt-24" aria-label="Work experience">
      {/* Mobile Sticky Header */}
      <div className="sticky top-0 z-10 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">
          Experience
        </h2>
      </div>

      <div className="group/list space-y-12">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group relative grid pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-40"
          >
            {/* Card Background Overlay on Hover */}
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition-all duration-300 motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-purple-950/25 dark:lg:group-hover:bg-[#160D30]/60 lg:group-hover:border lg:group-hover:border-purple-500/20 lg:group-hover:shadow-[0_10px_30px_-15px_rgba(147,51,234,0.3)]" />

            {/* Time Period Column */}
            <header
              className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:col-span-2 font-mono"
              aria-label={exp.period}
            >
              {exp.period}
            </header>

            {/* Content Column */}
            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-slate-900 dark:text-slate-200">
                <div>
                  <a
                    href={exp.companyUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-baseline font-medium leading-tight text-slate-900 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 focus-visible:text-purple-600 dark:focus-visible:text-purple-300 group/link text-base"
                    aria-label={`${exp.role} at ${exp.company} (opens link)`}
                  >
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded-xl md:-inset-x-6 md:-inset-y-4 lg:block" />
                    <span>
                      {exp.role} ·{' '}
                      <span className="inline-block text-purple-600 dark:text-purple-400">
                        {exp.company}
                        <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                      </span>
                    </span>
                  </a>
                </div>
              </h3>

              <p className="mt-2 text-sm leading-normal text-slate-600 dark:text-slate-400">
                {exp.description}
              </p>

              {/* Technologies Tag List */}
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
                {exp.technologies.map((tech) => (
                  <li key={tech}>
                    <span className="flex items-center rounded-full bg-purple-500/10 dark:bg-purple-400/10 px-3 py-1 text-xs font-medium leading-5 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Full Résumé Link */}
      <div className="mt-12">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center font-medium leading-tight text-slate-900 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 focus-visible:text-purple-600 dark:focus-visible:text-purple-300 group text-sm font-heading"
        >
          <span>View Full Résumé</span>
          <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
        </a>
      </div>
    </section>
  );
};
