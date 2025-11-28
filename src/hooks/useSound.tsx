import { useRef, useEffect, useCallback } from 'react';

interface SoundOptions {
  /**
   * Volume 0 to 1 (default 0.5)
   */
  volume?: number;
  /**
   * Start time in seconds
   */
  start?: number;
  /**
   * End time in seconds
   */
  end?: number;
}

export const useSound = (
  url: string,
  { volume = 0.5, start = 0, end }: SoundOptions = {}
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Audio source
  useEffect(() => {
    const audio = new Audio(url);
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      // Cleanup: Stop sound and clear any pending stop-timers
      if (timerRef.current) clearTimeout(timerRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, [url]);

  // Handle Volume Updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(Math.max(volume, 0), 1);
    }
  }, [volume]);

  // Play Logic
  const play = useCallback(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Clear any previous "stop" timers if the user clicks rapidly
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set the start position
    audio.currentTime = start;

    audio.play().catch((e) => {
      console.warn('Sound blocked:', e);
    });

    // If an end time is defined, schedule the pause
    if (end !== undefined && end > start) {
      const durationMs = (end - start) * 1000;

      timerRef.current = setTimeout(() => {
        audio.pause();
      }, durationMs);
    }
  }, [start, end]);

  return play;
};
