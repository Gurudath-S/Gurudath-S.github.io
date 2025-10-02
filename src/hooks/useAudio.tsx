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
  fadeDurationMs?: number; // fade in/out duration
}

export const useBackgroundMusic = ({
  audioUrl = '/audio/background-music.mp3',
  volume = 0.3,
  loop = true,
  fadeDurationMs = 1000,
}: UseBackgroundMusicProps = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  // Fade management refs
  const desiredVolumeRef = useRef(volume);
  const fadeFrameRef = useRef<number | null>(null);
  const fadeStartRef = useRef<number>(0);
  const fadeFromRef = useRef<number>(0);
  const fadeToRef = useRef<number>(0);
  const fadingOutRef = useRef(false);
  const fadeDurationRef = useRef(fadeDurationMs);

  // Update desired volume & fade duration if props change
  useEffect(() => {
    desiredVolumeRef.current = volume;
    fadeDurationRef.current = fadeDurationMs;
    // If currently playing and not fading out, snap to new volume (or fade quickly?)
    if (audioRef.current && isPlaying && !fadingOutRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, fadeDurationMs, isPlaying]);

  const cancelFade = () => {
    if (fadeFrameRef.current) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  };

  const startFade = (target: number, { pauseAfter = false, resetAfter = false }: { pauseAfter?: boolean; resetAfter?: boolean } = {}) => {
    if (!audioRef.current) return;
    cancelFade();
    fadeStartRef.current = performance.now();
    fadeFromRef.current = audioRef.current.volume;
    fadeToRef.current = Math.max(0, Math.min(1, target));
    const duration = Math.max(50, fadeDurationRef.current);
    const fadingOut = fadeToRef.current < fadeFromRef.current;
    fadingOutRef.current = fadingOut;

    const step = (now: number) => {
      if (!audioRef.current) return;
      const elapsed = now - fadeStartRef.current;
      const t = Math.min(1, elapsed / duration);
      // Ease (optional): use linear for predictable behavior
      const newVol = fadeFromRef.current + (fadeToRef.current - fadeFromRef.current) * t;
      audioRef.current.volume = newVol;
      if (t < 1) {
        fadeFrameRef.current = requestAnimationFrame(step);
      } else {
        fadeFrameRef.current = null;
        fadingOutRef.current = false;
        if (pauseAfter) {
          audioRef.current.pause();
          if (resetAfter) {
            try { audioRef.current.currentTime = 0; } catch { /* ignore */ }
          }
        }
      }
    };

    fadeFrameRef.current = requestAnimationFrame(step);
  };

  // Attempt to create / configure element once
  const ensureAudioElement = () => {
    if (!audioRef.current) {
      const el = new Audio(audioUrl);
      el.preload = 'auto';
      el.loop = loop;
      // Start silent; fade in after play
      el.volume = 0;
      el.addEventListener('play', () => {
        setIsPlaying(true);
        setIsLoading(false);
        // If just started and target volume > 0, fade in
        if (el.volume === 0 && desiredVolumeRef.current > 0) {
          startFade(desiredVolumeRef.current);
        }
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
    // Allow manual / forced playback on mobile when user interacts.
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
        audioRef.current.volume = 0; // ensure fade from zero
      } catch {}
    }
    attemptPlay();
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      // Fade out then pause (no reset)
      startFade(0, { pauseAfter: true });
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      // Fade out, then pause & reset
      startFade(0, { pauseAfter: true, resetAfter: true });
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      // Mute: stop & reset (restart semantics on unmute)
      stopMusic();
    } else {
      startMusic();
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
    desiredVolumeRef.current = Math.max(0, Math.min(1, newVolume));
  };

  // Attempt auto-start on desktop at mount / when switching from mobile -> desktop
  useEffect(() => {
    // Desktop: attempt auto-play; Mobile: stay silent until user taps button.
    if (!isMobile) {
      attemptPlay();
    }
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
