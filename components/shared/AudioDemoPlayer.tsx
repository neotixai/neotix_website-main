'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

type AudioDemo = {
  title: string;
  description?: string;
  src: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function AudioDemoPlayer({
  demos,
  columns = 1,
}: {
  demos: AudioDemo[];
  columns?: 1 | 2;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // seconds
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime || 0);

    const onLoadedMeta = () => {
      setDuration(audio.duration || 0);
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(audio.duration || 0);
      setCurrentIndex(null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', onLoadedMeta);
    audio.addEventListener('durationchange', onLoadedMeta);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('durationchange', onLoadedMeta);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const src = demos[index].src;

    // click sur un autre audio
    if (currentIndex !== index) {
      audio.pause();
      audio.src = src;
      audio.load(); // Safari
      setCurrentTime(0);
      setDuration(0);

      audio
        .play()
        .then(() => {
          setCurrentIndex(index);
          setIsPlaying(true);
        })
        .catch((err) => console.error('Audio play error:', err));

      return;
    }

    // play/pause même audio
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

  // seek
  const seekTo = (index: number, newTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentIndex !== index) return;

    const t = Math.min(Math.max(newTime, 0), duration || 0);
    audio.currentTime = t;
    setCurrentTime(t);
  };

  return (
    <div
      className={[
        columns === 2 ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6',
      ].join(' ')}
    >
      <audio ref={audioRef} preload="metadata" />

      {demos.map((demo, index) => {
        const isActive = currentIndex === index;
        const shownCurrent = isActive ? currentTime : 0;
        const shownDuration = isActive ? duration : 0;
        const progressPercent =
          isActive && shownDuration > 0 ? (shownCurrent / shownDuration) * 100 : 0;

        return (
          <div
            key={`${demo.src}-${index}`}
            className={[
              'w-full glass-card rounded-xl p-6 flex items-center gap-4',
              'bg-white/60 dark:bg-white/5 backdrop-blur-xl',
              'ring-1 ring-black/12 dark:ring-white/10',
              'transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl',
            ].join(' ')}
          >
            <button
              onClick={() => togglePlay(index)}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0"
              aria-label={isPlaying && isActive ? 'Pause' : 'Play'}
            >
              {isPlaying && isActive ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="font-semibold truncate">{demo.title}</h4>
                  {demo.description && (
                    <p className="text-sm dark:text-white/60 line-clamp-2">
                      {demo.description}
                    </p>
                  )}
                </div>

                <div className="text-sm text-gray-600 dark:text-white/60 tabular-nums whitespace-nowrap">
                  {formatTime(shownCurrent)} / {formatTime(shownDuration)}
                </div>
              </div>

              <div className="mt-3 w-full">
                <div className="relative h-2 rounded-full bg-gray-200 dark:bg-white/20 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                    style={{ width: `${progressPercent}%` }}
                  />

                  <input
                    type="range"
                    min={0}
                    max={shownDuration || 0}
                    step={0.1}
                    value={shownCurrent}
                    onChange={(e) => seekTo(index, Number(e.target.value))}
                    disabled={!isActive || !shownDuration}
                    className={[
                      'absolute inset-0 w-full h-full opacity-0 cursor-pointer',
                      !isActive || !shownDuration ? 'cursor-not-allowed' : '',
                    ].join(' ')}
                    aria-label="Seek audio"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
