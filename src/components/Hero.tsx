import { useClickSound } from '@/hooks/useAudio';

export const Hero = () => {
  const { playClickSound } = useClickSound();
  
  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    await playClickSound(e);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const name = "Gurudath S";
  const letters = name.split('');

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 text-center z-10">
        <div className="space-y-6 animate-fade-in">

          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter overflow-hidden">
            <span className="inline-flex">
              {letters.map((letter, index) => (
                <span
                  key={index}
                  className="inline-block animate-apple-hello opacity-0"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Backend Engineer | Cloud-Native Microservices
          </p>
          
          <div className="flex gap-4 justify-center pt-8">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="inline-flex items-center justify-center px-8 py-3 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, 'projects')}
              className="inline-flex items-center justify-center px-8 py-3 border border-border hover:bg-accent transition-all"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
