import { useCallback, useEffect, useRef, useState } from "react";

export default function usePageSound() {
  const audioRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}Sounds/newspaper-flip.mp3`
    );

    audio.volume = 0.2;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playPageSound = useCallback(() => {
    if (!soundEnabled || !audioRef.current) return;

    const audio = audioRef.current;

    audio.currentTime = 0;
    audio.play().catch(() => {
      // Playback can be blocked until the visitor interacts.
    });
  }, [soundEnabled]);

  return {
    soundEnabled,
    setSoundEnabled,
    playPageSound,
  };
}