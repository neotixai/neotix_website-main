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
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentIndex(null);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const src = demos[index].src;

    // Si on clique sur un autre audio
    if (currentIndex !== index) {
      audio.pause();
      audio.src = src;
      audio.load(); // 🔑 TRÈS IMPORTANT pour Safari
      audio
        .play()
        .then(() => {
          setCurrentIndex(index);
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Safari audio error:', err);
        });
      return;
    }

    // Play / Pause sur le même audio
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error(err));
    }
  };

  const seek = (
  e: React.MouseEvent<HTMLDivElement>,
  index: number
) => {
  const audio = audioRef.current;
  if (!audio || currentIndex !== index) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const ratio = clickX / rect.width;

  audio.currentTime = audio.duration * ratio;
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Audio element UNIQUE */}
      <audio ref={audioRef} preload="metadata" />

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
              <p className="text-sm dark:text-white/60">
                {demo.description}
              </p>
            )}

            {/* Progress bar */}
            <div
              className="mt-3 h-2 w-full rounded-full overflow-hidden bg-gray-200 dark:bg-white/20 cursor-pointer"
              onClick={(e) => seek(e, index)}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all"
                style={{
                  width: currentIndex === index ? `${progress}%` : '0%',
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}