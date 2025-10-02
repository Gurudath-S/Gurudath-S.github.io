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
  volume?: number; // 0.0 - 1.0
  loop?: boolean;
}

export const useBackgroundMusic = ({
  audioUrl = '/audio/background-music.mp3',
  volume = 0.3,
  loop = true,
}: UseBackgroundMusicProps = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Attempt to create / configure element once
  const ensureAudioElement = () => {
    if (!audioRef.current) {
      const el = new Audio(audioUrl);
      el.preload = 'auto';
      el.loop = loop;
      el.volume = volume;
      el.addEventListener('play', () => {
        setIsPlaying(true);
        setIsLoading(false);
      });
      el.addEventListener('pause', () => {
        setIsPlaying(false);
      });
      el.addEventListener('ended', () => setIsPlaying(false));
      el.addEventListener('error', (e) => {
        console.error('Audio element error', e);
        // Only surface file / network issues, not autoplay policy
        if (el.networkState === el.NETWORK_NO_SOURCE) {
          setError('Audio file missing');
        } else {
          setError('Audio error');
        }
        setIsLoading(false);
        setIsPlaying(false);
      });
      audioRef.current = el;
    } else {
      // Re-sync mutable properties if props changed
      audioRef.current.loop = loop;
      audioRef.current.volume = volume;
    }
  };

  const attemptPlay = () => {
    if (isMobile) return; // Skip on mobile by spec
    ensureAudioElement();
    if (!audioRef.current) return;
    setIsLoading(true);
    const playPromise = audioRef.current.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          // Success handled by 'play' listener
        })
        .catch((err: any) => {
          // Autoplay blocked => attach one–time user interaction handler silently
            if (err?.name === 'NotAllowedError') {
              setIsLoading(false);
              const resume = () => {
                attemptPlay();
                window.removeEventListener('click', resume);
                window.removeEventListener('keydown', resume);
                window.removeEventListener('mousemove', resume);
                window.removeEventListener('scroll', resume);
              };
              window.addEventListener('click', resume, { once: true });
              window.addEventListener('keydown', resume, { once: true });
              window.addEventListener('mousemove', resume, { once: true });
              window.addEventListener('scroll', resume, { once: true });
            } else {
              console.error('Playback error', err);
              setError('Cannot start audio');
              setIsLoading(false);
            }
        });
    }
  };

  const startMusic = () => {
    // Explicit external request to (re)start
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
      } catch {}
    }
    attemptPlay();
  };

  const pauseMusic = () => {
    if (audioRef.current) audioRef.current.pause();
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      try { audioRef.current.currentTime = 0; } catch {}
    }
  };

  const toggleMusic = () => {
    if (isMobile) return;
    if (isPlaying) {
      // Mute: stop & reset (restart semantics on unmute)
      stopMusic();
      setIsPlaying(false);
    } else {
      startMusic();
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  };

  // Attempt auto-start on desktop at mount / when switching from mobile -> desktop
  useEffect(() => {
    if (!isMobile) {
      attemptPlay();
    } else {
      stopMusic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, audioUrl]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  return {
    isPlaying,
    isLoading,
    error,
    isMobile,
    toggleMusic,
    startMusic,
    pauseMusic,
    stopMusic,
    setVolume,
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
