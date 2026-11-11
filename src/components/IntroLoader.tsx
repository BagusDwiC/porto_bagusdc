import React, { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
  name: string;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete, name }) => {
  const [stage, setStage] = useState<'text' | 'fadeout' | 'done'>('text');

  useEffect(() => {
    // Check if user already saw intro in this session to respect repeat visits
    const seen = sessionStorage.getItem('portfolio_intro_seen');
    if (seen) {
      onComplete();
      return;
    }

    const timer1 = setTimeout(() => {
      setStage('fadeout');
    }, 1100);

    const timer2 = setTimeout(() => {
      setStage('done');
      sessionStorage.setItem('portfolio_intro_seen', 'true');
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07040D] text-white transition-opacity duration-500 ${
        stage === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Ambient violet glow */}
        <div className="absolute w-56 h-56 rounded-full bg-purple-600/15 blur-3xl -z-10 animate-pulse" />

        {/* Minimalist Monogram / Studio Pill */}
        <div className="mb-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-[10px] font-mono tracking-wider text-purple-300 uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
          <span>PORTFOLIO // 2026</span>
        </div>

        {/* Main Name with Professional Architectural Sans */}
        <div className="overflow-hidden mb-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white animate-in slide-in-from-bottom-3 duration-500">
            {name}
          </h1>
        </div>

        {/* Subtitle / Role with clean tabular/mono spacing */}
        <p className="text-xs sm:text-sm font-heading font-medium tracking-wide text-purple-300/80 mb-5">
          Junior Software Engineer | Data Analyst | IT Support
        </p>

        {/* Hairline loading line */}
        <div className="w-28 h-[2px] bg-purple-950/80 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full animate-[progress_1.2s_ease-in-out_forwards]" />
        </div>
      </div>
    </div>
  );
};
