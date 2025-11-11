import { useEffect, useState } from 'react';

interface PawAnimation {
  id: string;
  x: number;
  y: number;
  edge: 'top' | 'right' | 'bottom' | 'left';
  startX: number;
  startY: number;
}

export const CatPaw = () => {
  const [animations, setAnimations] = useState<PawAnimation[]>([]);

  useEffect(() => {
    const handleCatPawTrigger = (event: CustomEvent) => {
      const { x, y } = event.detail;
      
      // Calculate nearest edge
      const distToTop = y;
      const distToBottom = window.innerHeight - y;
      const distToLeft = x;
      const distToRight = window.innerWidth - x;
      
      const minDist = Math.min(distToTop, distToBottom, distToLeft, distToRight);
      
      let edge: 'top' | 'right' | 'bottom' | 'left';
      let startX: number;
      let startY: number;
      
      if (minDist === distToTop) {
        edge = 'top';
        startX = x;
        startY = -50;
      } else if (minDist === distToBottom) {
        edge = 'bottom';
        startX = x;
        startY = window.innerHeight + 50;
      } else if (minDist === distToLeft) {
        edge = 'left';
        startX = -50;
        startY = y;
      } else {
        edge = 'right';
        startX = window.innerWidth + 50;
        startY = y;
      }
      
      const id = `paw-${Date.now()}-${Math.random()}`;
      const newAnimation: PawAnimation = { id, x, y, edge, startX, startY };
      
      setAnimations(prev => [...prev, newAnimation]);
      
      // Remove after animation completes
      setTimeout(() => {
        setAnimations(prev => prev.filter(a => a.id !== id));
      }, 800);
    };

    window.addEventListener('catPawClick' as any, handleCatPawTrigger);
    return () => window.removeEventListener('catPawClick' as any, handleCatPawTrigger);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {animations.map((anim) => (
        <CatPawAnimation key={anim.id} {...anim} />
      ))}
    </div>
  );
};

const CatPawAnimation = ({ x, y, edge, startX, startY }: PawAnimation) => {
  const isVertical = edge === 'top' || edge === 'bottom';
  const rotation = edge === 'top' ? 180 : edge === 'bottom' ? 0 : edge === 'left' ? 90 : -90;
  
  return (
    <>
      {/* Cat paw */}
      <div
        className="absolute"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          className="animate-paw-tap drop-shadow-lg"
        >
          {/* Main pad */}
          <ellipse
            cx="30"
            cy="38"
            rx="16"
            ry="14"
            fill="#FCD7A1"
            stroke="#D4A574"
            strokeWidth="1.5"
          />
          
          {/* Toe pads */}
          <ellipse
            cx="18"
            cy="26"
            rx="6"
            ry="7"
            fill="#FCD7A1"
            stroke="#D4A574"
            strokeWidth="1.5"
            className="animate-toe-wiggle"
            style={{ animationDelay: '0.05s' }}
          />
          <ellipse
            cx="30"
            cy="22"
            rx="6"
            ry="7"
            fill="#FCD7A1"
            stroke="#D4A574"
            strokeWidth="1.5"
            className="animate-toe-wiggle"
            style={{ animationDelay: '0.1s' }}
          />
          <ellipse
            cx="42"
            cy="26"
            rx="6"
            ry="7"
            fill="#FCD7A1"
            stroke="#D4A574"
            strokeWidth="1.5"
            className="animate-toe-wiggle"
            style={{ animationDelay: '0.15s' }}
          />
          
          {/* Cute toe beans details */}
          <ellipse cx="18" cy="26" rx="3" ry="3.5" fill="#E8B88B" opacity="0.6" />
          <ellipse cx="30" cy="22" rx="3" ry="3.5" fill="#E8B88B" opacity="0.6" />
          <ellipse cx="42" cy="26" rx="3" ry="3.5" fill="#E8B88B" opacity="0.6" />
          <ellipse cx="30" cy="38" rx="8" ry="7" fill="#E8B88B" opacity="0.5" />
        </svg>
      </div>
      
      {/* Stretchy arm/leg connecting paw to edge */}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id={`leg-gradient-${startX}-${startY}`} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FCD7A1" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#F5C98C" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FCD7A1" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        
        {/* Animated stretching path */}
        <path
          d={`M ${startX} ${startY} Q ${(startX + x) / 2} ${(startY + y) / 2} ${x} ${y}`}
          fill="none"
          stroke={`url(#leg-gradient-${startX}-${startY})`}
          strokeWidth={isVertical ? "20" : "18"}
          strokeLinecap="round"
          className="animate-paw-stretch"
          style={{
            filter: 'blur(1px)',
          }}
        />
        
        {/* Fur texture overlay */}
        <path
          d={`M ${startX} ${startY} Q ${(startX + x) / 2} ${(startY + y) / 2} ${x} ${y}`}
          fill="none"
          stroke="#D4A574"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 6"
          className="animate-paw-stretch"
          opacity="0.4"
        />
      </svg>
    </>
  );
};
