import { Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useBackgroundMusic } from '@/hooks/useAudio';
import { useEffect } from 'react';

export const AudioControls = () => {
  const { 
    isPlaying, 
    isLoading, 
    error, 
    isMobile, 
    toggleMusic, 
    startMusic 
  } = useBackgroundMusic({
    audioUrl: '/audio/background-music.mp3', // You can change this URL
    volume: 0.3,
    loop: true
  });

  useEffect(() => {
    // Don't start music on mobile
    if (isMobile) return;

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
  }, [startMusic, isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  const getIcon = () => {
    if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    return isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />;
  };

  const getAriaLabel = () => {
    if (isLoading) return 'Loading audio...';
    if (error) return `Audio error: ${error}`;
    return isPlaying ? 'Mute music' : 'Play music';
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMusic}
      disabled={isLoading}
      className="fixed bottom-8 right-8 z-50 bg-background/80 backdrop-blur-sm border border-border hover:bg-accent disabled:opacity-50"
      aria-label={getAriaLabel()}
      title={error ? error : undefined}
    >
      {getIcon()}
    </Button>
  );
};
