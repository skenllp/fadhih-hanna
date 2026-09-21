'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  playTrigger: boolean;
}

export default function MusicPlayer({ playTrigger }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (playTrigger) {
      setVisible(true);
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Audio play request:', err);
          });
      }
    }
  }, [playTrigger]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Audio resume error:', err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/music.mp3"
        preload="auto"
        loop
      />
      {visible && (
        <button
          type="button"
          onClick={toggleMusic}
          className={`music-toggle-btn ${isPlaying ? 'is-playing' : ''}`}
          aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
          title={isPlaying ? 'Mute music' : 'Play music'}
        >
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      )}
    </>
  );
}
