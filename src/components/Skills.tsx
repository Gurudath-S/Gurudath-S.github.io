import { useEffect, useRef, useState } from 'react';

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const allSkills = [
    'Java 17+', 'Spring Boot', 'JPA/Hibernate', 'JUnit/Mockito', 'REST APIs', 'Angular', 'Python',
    'MSSQL', 'MySQL', 'PostgreSQL', 'Oracle', 'Cosmos DB', 'Redis', 'Liquibase',
    'Azure', 'AWS', 'CI/CD', 'Docker', 'Kubernetes', 'Azure DevOps',
    'Git/GitHub', 'Agile', 'TDD', 'Design Patterns', 'Grafana', 'Snyk', 'SonarQube', 'GitHub Copilot'
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the section is visible
      const scrolled = Math.max(0, Math.min(1, (windowHeight - rect.top) / (sectionHeight + windowHeight)));
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative bg-accent/20 overflow-hidden min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Skills</h2>
        </div>
        
        <div className="relative h-96 flex items-center">
          <div className="absolute inset-0 flex items-center justify-start overflow-hidden">
            {allSkills.map((skill, index) => {
              const baseDelay = (index / allSkills.length) * 0.5;
              const xPosition = 100 - (scrollProgress * 150) + (baseDelay * 100);
              const yOffset = Math.sin((index + scrollProgress * 10) * 0.5) * 50;
              const opacity = scrollProgress > 0.1 ? Math.min(1, (scrollProgress - 0.1) * 2) : 0;
              
              return (
                <div
                  key={skill}
                  className="absolute whitespace-nowrap text-2xl md:text-4xl font-bold opacity-0 transition-all duration-300"
                  style={{
                    transform: `translate(${xPosition}vw, ${yOffset}px)`,
                    opacity: xPosition < 100 && xPosition > -50 ? opacity : 0,
                    left: 0,
                    top: `${20 + (index % 5) * 15}%`,
                    color: `hsl(var(--foreground) / ${0.3 + (Math.sin(index) * 0.3)})`,
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
