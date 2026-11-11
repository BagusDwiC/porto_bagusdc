import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'button'>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with a mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"]');
      const projectCard = target.closest('[data-cursor="view"]');

      if (projectCard) {
        setCursorType('project');
        setCursorText('VIEW');
      } else if (interactive) {
        setCursorType('pointer');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Smooth trailing effect for the outer ring
  useEffect(() => {
    let frameId: number;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      frameId = requestAnimationFrame(follow);
    };
    frameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(frameId);
  }, [pos]);

  if (!isVisible) return null;

  const isProject = cursorType === 'project';
  const isPointer = cursorType === 'pointer';

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Inner precise dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-purple-400 dark:bg-purple-300 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 pointer-events-none shadow-sm shadow-purple-500/50"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${isProject ? 0 : 1})`,
        }}
      />

      {/* Outer reactive ring */}
      <div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-200 pointer-events-none ${
          isProject
            ? 'w-14 h-14 bg-purple-600/90 text-white text-[10px] font-bold tracking-widest border border-purple-400 shadow-lg shadow-purple-900/50 backdrop-blur-sm'
            : isPointer
            ? 'w-10 h-10 border border-purple-500/80 bg-purple-500/10 scale-110'
            : 'w-7 h-7 border border-purple-400/40 dark:border-purple-300/30'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {isProject && <span>{cursorText}</span>}
      </div>
    </div>
  );
};
