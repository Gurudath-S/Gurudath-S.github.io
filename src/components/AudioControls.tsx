import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { useBackgroundMusic } from '@/hooks/useAudio';
import { useEffect } from 'react';

export const AudioControls = () => {
  const { isPlaying, toggleMusic, startMusic } = useBackgroundMusic();

  useEffect(() => {
    // Start music after a short delay to allow user interaction
    const timer = setTimeout(() => {
      const handleFirstInteraction = () => {
        startMusic();
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction, { once: true });
      document.addEventListener('scroll', handleFirstInteraction, { once: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [startMusic]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMusic}
      className="fixed bottom-8 right-8 z-50 bg-background/80 backdrop-blur-sm border border-border hover:bg-accent"
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
    >
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  );
};
