import { useEffect, useRef, useState } from 'react';

export const useBackgroundMusic = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = 0.1; // Low volume for ambient music
      gainNodeRef.current.connect(audioContextRef.current.destination);

      // Create a simple ambient tone
      oscillatorRef.current = audioContextRef.current.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.value = 220; // A3 note
      oscillatorRef.current.connect(gainNodeRef.current);
      oscillatorRef.current.start();

      // Add subtle frequency modulation for zen-like effect
      const lfo = audioContextRef.current.createOscillator();
      lfo.frequency.value = 0.5;
      const lfoGain = audioContextRef.current.createGain();
      lfoGain.gain.value = 5;
      lfo.connect(lfoGain);
      lfoGain.connect(oscillatorRef.current.frequency);
      lfo.start();

      setIsPlaying(true);
    }
  };

  const stopMusic = () => {
    if (oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.stop();
      audioContextRef.current.close();
      oscillatorRef.current = null;
      audioContextRef.current = null;
      gainNodeRef.current = null;
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return { isPlaying, toggleMusic, startMusic };
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
