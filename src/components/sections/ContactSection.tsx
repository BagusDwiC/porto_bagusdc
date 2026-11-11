import React from 'react';
import { PORTFOLIO_DATA } from '../../data';
import { Mail, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, socials } = PORTFOLIO_DATA;

  return (
    <section id="contact" className="scroll-mt-16 lg:scroll-mt-24 pb-16" aria-label="Contact">
      {/* Mobile Sticky Header */}
      <div className="sticky top-0 z-10 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">
          Contact
        </h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-display">
            Let's Connect and Build Something Extraordinary Together.
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            My inbox is always open. Whether you have a web development project, an IT support or data analysis opportunity, want to discuss a new collaboration, or simply want to say hello, I'd love to hear from you.
          </p>
        </div>

        {/* Contact CTA Button */}
        <div className="pt-2">
          <a
            href={socials.find((s) => s.icon === 'email')?.url ?? `mailto:${profile.email}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <Mail className="w-4 h-4" />
            <span>Say Hello at {profile.email}</span>
            <ArrowUpRight className="w-4 h-4 ml-0.5" />
          </a>
        </div>

        {/* Quick Social Directory */}
        <div className="pt-6 border-t border-purple-200/50 dark:border-purple-900/40">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400/80 font-mono mb-3">
            Other Channels
          </h4>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-600 dark:hover:text-purple-300 inline-flex items-center gap-1 transition-colors"
              >
                <span>{social.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
