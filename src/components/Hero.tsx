import { useClickSound } from '@/hooks/useAudio';

export const Hero = () => {
  const { playClickSound } = useClickSound();
  
  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 text-center z-10">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block border border-border px-4 py-2 text-sm font-medium">
            Software Engineer
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
            Gurudath S
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Java Spring Boot Backend Engineer with 4+ years of experience building scalable microservices
          </p>
          
          <div className="flex gap-4 justify-center pt-8">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="inline-flex items-center justify-center px-8 py-3 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              onClick={handleLinkClick}
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
