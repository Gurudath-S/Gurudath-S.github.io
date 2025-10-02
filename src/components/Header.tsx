import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useClickSound } from '@/hooks/useAudio';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { playClickSound } = useClickSound();
  
  const scrollToSection = (id: string) => {
    playClickSound();
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleThemeToggle = () => {
    playClickSound();
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleThemeToggle}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/gurudath-s" target="_blank" rel="noopener noreferrer" onClick={playClickSound}>
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/gurudath-s" target="_blank" rel="noopener noreferrer" onClick={playClickSound}>
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:gurudath20102000@gmail.com" onClick={playClickSound}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};
