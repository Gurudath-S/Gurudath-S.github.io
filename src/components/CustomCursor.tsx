import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.style.cursor === 'pointer';
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.05s ease-out',
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800 dark:bg-gray-100 shadow-lg transition-all duration-200 ${
            isClicking ? 'w-6 h-6' : isHovering ? 'w-5 h-5' : 'w-4 h-4'
          }`}
          style={{
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.4), 0 0 25px rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>

      {/* Outer cursor ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gray-700 dark:border-gray-300 transition-all duration-300 ${
            isClicking ? 'w-20 h-20 opacity-70' : isHovering ? 'w-24 h-24 opacity-60' : 'w-16 h-16 opacity-50'
          }`}
          style={{
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>
    </>
  );
};
