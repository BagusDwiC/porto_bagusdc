import React, { useRef, useState } from 'react';

interface PhotoCardProps {
  photoUrl?: string;
  name: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photoUrl = '/photo.jpg', name }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Mouse move handler for 3D tilt and glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="mb-6 [@media(max-height:820px)]:lg:mb-3 group perspective-1000">
      {/* 
        ========================================================================
        PROFILE PHOTO (PORTRAIT 3:4):
        REPLACE WITH /public/photo.jpg
        Place your portrait photo named 'photo.jpg' inside the /public/ folder.
        Ideal aspect ratio: 3:4 (e.g., 600x800px or 900x1200px)
        ========================================================================
      */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        }}
        className="relative w-32 sm:w-36 md:w-40 [@media(max-height:820px)]:lg:w-24 aspect-[3/4] rounded-2xl overflow-hidden p-[1px] bg-gradient-to-b from-purple-500/40 via-purple-700/30 to-slate-800/40 dark:from-purple-400/30 dark:via-purple-900/40 dark:to-purple-600/10 shadow-lg shadow-purple-500/5 group-hover:shadow-xl group-hover:shadow-purple-500/20"
      >
        {/* Glow backdrop on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-fuchsia-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-purple-950/40 dark:bg-[#100922] flex items-center justify-center">
          {!imageError ? (
            <img
              src={photoUrl}
              alt={`Portrait photo of ${name}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } group-hover:scale-105`}
            />
          ) : null}

          {/* Elegant Silhouette Fallback if photo.jpg is not yet added in /public/photo.jpg */}
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 flex flex-col items-center justify-between p-4 bg-gradient-to-b from-purple-900/30 via-purple-950/80 to-[#0B0617] text-slate-400">
              <div className="w-full flex justify-between items-center text-[10px] text-purple-400/80 font-mono tracking-wider">
                <span>PORTRAIT</span>
                <span>3:4</span>
              </div>

              {/* Minimalist elegant vector silhouette */}
              <div className="relative my-auto flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500/20 to-fuchsia-400/10 border border-purple-500/30 flex items-center justify-center mb-2 shadow-inner">
                  <svg
                    className="w-8 h-8 text-purple-300/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="text-[11px] font-medium text-slate-300 tracking-wide text-center">
                  Bagus Dwi Cahya
                </span>
                <span className="text-[9px] text-purple-300/70 mt-0.5 text-center">
                  /public/photo.jpg
                </span>
              </div>

              <div className="text-[9px] text-purple-400/70 font-mono tracking-tight text-center">
                Photo (3:4)
              </div>
            </div>
          )}

          {/* Subtle inner corner highlight */}
          <div className="absolute inset-0 rounded-[15px] border border-white/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
