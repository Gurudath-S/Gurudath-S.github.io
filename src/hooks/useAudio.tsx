import { useEffect, useRef, useState } from 'react';

// Hook to detect if device is mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
};

interface UseBackgroundMusicProps {
  audioUrl?: string;
  volume?: number;
  loop?: boolean;
}

export const useBackgroundMusic = ({ 
  audioUrl = '/audio/background-music.mp3', 
  volume = 0.3,
  loop = true 
}: UseBackgroundMusicProps = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const startMusic = async () => {
    // Don't play audio on mobile devices
    if (isMobile) {
      console.log('Audio disabled on mobile devices');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.volume = volume;
        audioRef.current.loop = loop;
        
        // Add event listeners
        audioRef.current.addEventListener('ended', () => setIsPlaying(false));
        audioRef.current.addEventListener('error', (e) => {
          setError('Failed to load audio file');
          setIsLoading(false);
          setIsPlaying(false);
        });
      }

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      setError('Failed to play audio. User interaction may be required.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isMobile) return; // Prevent toggle on mobile
    
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Auto-stop if switched to mobile
  useEffect(() => {
    if (isMobile && isPlaying) {
      stopMusic();
    }
  }, [isMobile, isPlaying]);

  return { 
    isPlaying, 
    isLoading, 
    error, 
    isMobile,
    toggleMusic, 
    startMusic, 
    stopMusic,
    setVolume 
  };
};

export const useClickSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playClickSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  return { playClickSound };
};
