import { useEffect, useRef, useState, useMemo } from 'react';

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(1);
  const lastScrollY = useRef(0);
  
  const allSkills = [
    'Java 17+', 'Spring Boot', 'JPA/Hibernate', 'JUnit/Mockito', 'REST APIs', 
    'Angular', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript',
    'MSSQL', 'MySQL', 'PostgreSQL', 'Oracle', 'Cosmos DB', 'Redis', 'Liquibase',
    'Azure', 'AWS', 'CI/CD', 'Docker', 'Kubernetes', 'Azure DevOps', 'Jenkins',
    'Git/GitHub', 'Agile', 'TDD', 'Design Patterns', 'DevOps', 'CDC',
    'Grafana', 'Snyk', 'SonarQube', 'GitHub Copilot', 'Prompt Engineering', 'AI Tools'
  ];

  // Easing function for smoother animations
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Detect scroll direction
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection(1); // scrolling down
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection(-1); // scrolling up
      }
      lastScrollY.current = currentScrollY;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress with smoother calculation
      const visibleStart = -rect.top;
      const visibleEnd = -rect.top + windowHeight;
      const totalScrollableHeight = sectionHeight + windowHeight;
      
      let progress = Math.max(0, Math.min(1, visibleStart / totalScrollableHeight));
      progress = easeOutCubic(progress);
      
      rafId = requestAnimationFrame(() => {
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Memoize skill positions for performance
  const skillPositions = useMemo(() => {
    return allSkills.map((skill, index) => {
      const row = Math.floor(index / 6);
      const col = index % 6;
      const baseDelay = (index / allSkills.length);
      
      // Direction multiplier: 1 for down, -1 for up
      const directionMultiplier = scrollDirection;
      
      // Smooth horizontal movement based on scroll
      const xPosition = 120 - (scrollProgress * 200 * directionMultiplier) + (baseDelay * 80);
      
      // Vertical spacing - more spread out
      const yOffset = row * 120 + (Math.sin((index + scrollProgress * 5) * 0.3) * 30);
      
      // Fade in/out based on visibility
      const opacity = scrollProgress > 0.05 
        ? Math.min(1, (scrollProgress - 0.05) * 3) * (1 - Math.max(0, (scrollProgress - 0.85) * 5))
        : 0;
      
      const isVisible = xPosition < 110 && xPosition > -60;
      
      return {
        xPosition,
        yOffset,
        opacity: isVisible ? opacity : 0,
        row,
        col
      };
    });
  }, [scrollProgress, scrollDirection, allSkills]);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-32 relative bg-accent/20 overflow-hidden"
      style={{ minHeight: '250vh' }}
      aria-label="Skills and Technologies"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-16 sticky top-32 z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Skills</h2>
        </div>
        
        {/* Accessible skill list for screen readers */}
        <div className="sr-only" role="list" aria-label="List of technical skills">
          {allSkills.map((skill) => (
            <div key={`sr-${skill}`} role="listitem">{skill}</div>
          ))}
        </div>
        
        {/* Visual floating animation */}
        <div 
          className="relative flex items-center justify-center" 
          style={{ height: '150vh' }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center justify-start overflow-hidden">
            {allSkills.map((skill, index) => {
              const pos = skillPositions[index];
              
              return (
                <div
                  key={skill}
                  className="absolute whitespace-nowrap text-2xl md:text-4xl lg:text-5xl font-bold will-change-transform"
                  style={{
                    transform: `translate(${pos.xPosition}vw, ${pos.yOffset}px)`,
                    opacity: pos.opacity,
                    left: 0,
                    top: `${15 + pos.row * 12}%`,
                    color: `hsl(var(--foreground) / ${0.25 + (Math.sin(index * 0.5) * 0.25)})`,
                    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: 'none',
                    fontWeight: 700,
                  }}
                >
                  {skill}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
