import React, { useState } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '../../data';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="scroll-mt-16 lg:scroll-mt-24" aria-label="Selected projects">
      {/* Mobile Sticky Header */}
      <div className="sticky top-0 z-10 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">
          Projects
        </h2>
      </div>

      <div className="group/list space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      data-cursor="view"
      className="group relative grid gap-4 pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-40"
    >
      {/* Background card on hover */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition-all duration-300 motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-purple-950/25 dark:lg:group-hover:bg-[#160D30]/60 lg:group-hover:border lg:group-hover:border-purple-500/20 lg:group-hover:shadow-[0_10px_30px_-15px_rgba(147,51,234,0.3)]" />

      {/* Project Thumbnail Image */}
      <div className="z-10 sm:order-1 sm:col-span-2 mt-1">
        <div className="aspect-video w-full rounded-lg border-2 border-purple-200/50 dark:border-purple-900/40 bg-purple-950/40 overflow-hidden relative transition-colors duration-300 group-hover:border-purple-500/50 shadow-sm">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : !imgError ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-purple-950 to-slate-900 text-purple-400">
              <ExternalLink className="w-6 h-6 text-purple-400/60" />
            </div>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="z-10 sm:order-2 sm:col-span-6">
        <h3 className="font-medium leading-snug text-slate-900 dark:text-slate-200">
          <div>
            <a
              href={project.link || project.githubUrl || project.video || project.image}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-baseline font-medium leading-tight text-slate-900 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 focus-visible:text-purple-600 dark:focus-visible:text-purple-300 group/link text-base"
              aria-label={`${project.title} (opens link)`}
            >
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded-xl md:-inset-x-6 md:-inset-y-4 lg:block" />
              <span>
                {project.title}
                <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px text-purple-600 dark:text-purple-400" />
              </span>
            </a>
          </div>
        </h3>

        <p className="mt-2 text-sm leading-normal text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Project technologies">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <span className="flex items-center rounded-full bg-purple-500/10 dark:bg-purple-400/10 px-3 py-1 text-xs font-medium leading-5 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
