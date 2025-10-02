import { Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useBackgroundMusic, useClickSound } from '@/hooks/useAudio';
import { useEffect } from 'react';

export const AudioControls = () => {
  const {
    isPlaying,
    isLoading,
    error,
    isMobile,
    toggleMusic,
    startMusic,
  } = useBackgroundMusic({
    audioUrl: '/audio/background-music.mp3', // You can change this URL
    volume: 0.3,
    loop: true
  });

  const { playClickSound } = useClickSound();

  const handleToggleClick = () => {
    playClickSound();
    toggleMusic();
  };

  // Hook now auto-attempts start on mount / desktop; no manual effect needed
  useEffect(() => {
    // If autoplay was blocked & user clicks button we explicitly start
    if (!isMobile && !isPlaying && !isLoading && !error) {
      // No action; waiting for hook's internal attempt
    }
  }, [isMobile, isPlaying, isLoading, error]);

  // Now rendered on mobile too; we might optionally shrink the button
  const sizeClasses = isMobile ? 'bottom-4 right-4 h-10 w-10' : 'bottom-8 right-8';

  const getIcon = () => {
    if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    return isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />;
  };

  const getAriaLabel = () => {
    if (isLoading) return 'Loading audio...';
    if (error) return `Audio error: ${error}`;
    return isPlaying ? 'Mute background music' : 'Play background music';
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleClick}
      disabled={isLoading}
      className={`fixed ${sizeClasses} z-50 bg-background/80 backdrop-blur-sm border border-border hover:bg-accent disabled:opacity-50`}
      aria-label={getAriaLabel()}
  title={error ? `Audio Error: ${error}` : (isPlaying ? 'Click to mute music' : 'Click to play music')}
    >
      {getIcon()}
    </Button>
  );
};
