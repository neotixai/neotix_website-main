'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

type AudioDemo = {
  title: string;
  description?: string;
  src: string;
};

export default function AudioDemoPlayer({ demos }: { demos: AudioDemo[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;

    const updateProgress = () => {
      const audio = audioRef.current!;
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentIndex(null);
    });

    return () => {
      audioRef.current?.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = (index: number) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(demos[index].src);
    }

    if (currentIndex !== index) {
      audioRef.current.src = demos[index].src;
      audioRef.current.play();
      setCurrentIndex(index);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6">
      {demos.map((demo, index) => (
        <div
          key={index}
          className="glass-card rounded-xl p-6 flex items-center gap-4"
        >
          <button
            onClick={() => togglePlay(index)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center"
          >
            {isPlaying && currentIndex === index ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>

          <div className="flex-1">
            <h4 className="font-semibold">{demo.title}</h4>
            {demo.description && (
              <p className="text-sm dark:text-white/60">{demo.description}</p>
            )}

            <div className="mt-3 h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-400 to-blue-400 transition-all"
                style={{
                  width:
                    currentIndex === index ? `${progress}%` : '0%'
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}