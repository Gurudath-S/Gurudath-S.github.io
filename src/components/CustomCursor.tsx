import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(touchCapable || window.innerWidth < 768);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.style.cursor === 'pointer';
      
      setIsHovering(isInteractive);
      
      if (isInteractive) {
        const element = (target.closest('button, a') as HTMLElement) || target;
        if (hoveredElement && hoveredElement !== element) {
          const prevTargets = hoveredElement.querySelectorAll<HTMLElement>('svg, span, p, h1, h2, h3, img') ;
          if (prevTargets.length > 0) {
            prevTargets.forEach(el => { el.style.filter = ''; el.style.transition = ''; });
          } else {
            hoveredElement.style.filter = '';
            hoveredElement.style.transition = '';
          }
        }
        setHoveredElement(element);

        const targets = element.querySelectorAll<HTMLElement>('svg, span, p, h1, h2, h3, img');
        if (targets.length > 0) {
          targets.forEach(el => {
            el.style.transition = 'filter 0.3s ease';
            el.style.filter = 'drop-shadow(0 0 6px rgba(250, 204, 21, 0.8)) drop-shadow(0 0 12px rgba(250, 204, 21, 0.5))';
          });
        } else {
          element.style.transition = 'filter 0.3s ease';
          element.style.filter = 'drop-shadow(0 0 6px rgba(250, 204, 21, 0.8)) drop-shadow(0 0 12px rgba(250, 204, 21, 0.5))';
        }
      } else {
        if (hoveredElement) {
          const prevTargets = hoveredElement.querySelectorAll<HTMLElement>('svg, span, p, h1, h2, h3, img');
          if (prevTargets.length > 0) {
            prevTargets.forEach(el => { el.style.filter = ''; el.style.transition = ''; });
          } else {
            hoveredElement.style.filter = '';
            hoveredElement.style.transition = '';
          }
        }
        setHoveredElement(null);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      if (hoveredElement) {
        const prevTargets = hoveredElement.querySelectorAll<HTMLElement>('svg, span, p, h1, h2, h3, img');
        if (prevTargets.length > 0) {
          prevTargets.forEach(el => { el.style.filter = ''; el.style.transition = ''; });
        } else {
          hoveredElement.style.filter = '';
          hoveredElement.style.transition = '';
        }
      }
    };
  }, [hoveredElement]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
        style={{
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          background: 'radial-gradient(circle, rgba(250, 204, 21, 0.3) 0%, rgba(250, 204, 21, 0.15) 40%, transparent 70%)',
          filter: `blur(${isHovering ? '8px' : '6px'})`,
          boxShadow: isHovering 
            ? '0 0 30px rgba(250, 204, 21, 0.4), 0 0 60px rgba(250, 204, 21, 0.2)' 
            : '0 0 20px rgba(250, 204, 21, 0.3), 0 0 40px rgba(250, 204, 21, 0.15)',
        }}
      />
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/40"
        style={{
          width: isHovering ? '8px' : '6px',
          height: isHovering ? '8px' : '6px',
          boxShadow: '0 0 10px rgba(250, 204, 21, 0.6)',
        }}
      />
    </div>
  );
};
