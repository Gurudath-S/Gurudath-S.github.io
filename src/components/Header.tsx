import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">GS</div>
        
        <div className="hidden md:flex gap-8">
          {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/gurudath" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/gurudath-s" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:gurudath20102000@gmail.com">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};
