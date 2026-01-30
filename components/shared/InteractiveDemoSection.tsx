'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, User, Phone, Mail, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import IPhoneMockup from './IPhoneMockup';

// Interface for phone translations
interface PhoneTranslations {
  lockScreen: {
    carrier: string;
    agent: string;
    unlockPrompt: string;
    weather: {
      sunny: string;
    };
    days: string[];
    months: string[];
  };
  conversation: {
    neotixAgent: string;
    messagePlaceholder: string;
  };
}

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  time: string;
  timestamp: number;
};

type ClientInfo = {
  label: string;
  value: string;
  timestamp: number;
  icon: 'user' | 'phone' | 'mail' | 'location' | 'calendar';
};

type AIFunction = {
  label: string;
  timestamp: number;
};

type AudioDemo = {
  title: string;
  description?: string;
  src: string;
  messages: Message[];
  industry: string;
  clientInfo: ClientInfo[];
  aiFunctions: AIFunction[];
};

// ✅ IMPROVEMENT: Extract constants for better maintainability
const CONSTANTS = {
  TYPING_SPEED_AGENT: 35,     // Faster for agent (more professional)
  TYPING_SPEED_USER: 40,      // Slightly slower for user
  AUDIO_NEAR_END_THRESHOLD: 0.1,
} as const;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ✅ IMPROVEMENT: Helper to get icon component
function getIcon(iconName: ClientInfo['icon']) {
  const iconMap = {
    user: User,
    phone: Phone,
    mail: Mail,
    location: MapPin,
    calendar: Calendar,
  };
  return iconMap[iconName] || Calendar;
}

export default function InteractiveDemoSection({ 
  demos,
  translations 
}: { 
  demos: AudioDemo[];
  translations?: PhoneTranslations;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [visibleClientInfo, setVisibleClientInfo] = useState<ClientInfo[]>([]);
  const [visibleAIFunctions, setVisibleAIFunctions] = useState<AIFunction[]>([]);

  // ✅ IMPROVEMENT: Add error state
  const [audioError, setAudioError] = useState<string | null>(null);
  
  // ✅ IMPROVEMENT: Add loading state
  const [isLoading, setIsLoading] = useState(false);

  // États pour l'effet de frappe
  const [displayedMessages, setDisplayedMessages] = useState<Map<number, string>>(new Map());
  const [typingProgress, setTypingProgress] = useState<Map<number, number>>(new Map());
  const typingIntervalsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // Nettoyer les intervalles de frappe
  useEffect(() => {
    return () => {
      typingIntervalsRef.current.forEach(interval => clearInterval(interval));
      typingIntervalsRef.current.clear();
    };
  }, []);

  // ✅ IMPROVEMENT: Use different typing speeds for agent vs user
  const startTypingEffect = useCallback((message: Message) => {
    const startIndex = typingProgress.get(message.id) || 0;
    let charIndex = startIndex;
    
    // Different speeds for agent (faster/professional) vs user
    const typingSpeed = message.sender === 'agent' 
      ? CONSTANTS.TYPING_SPEED_AGENT 
      : CONSTANTS.TYPING_SPEED_USER;

    const interval = setInterval(() => {
      // Vérifier si l'audio est toujours en lecture
      if (!audioRef.current || audioRef.current.paused) {
        clearInterval(interval);
        typingIntervalsRef.current.delete(message.id);
        setTypingProgress(prev => new Map(prev).set(message.id, charIndex));
        return;
      }

      if (charIndex <= message.text.length) {
        setDisplayedMessages(prev => new Map(prev).set(message.id, message.text.slice(0, charIndex)));
        charIndex++;
      } else {
        clearInterval(interval);
        typingIntervalsRef.current.delete(message.id);
        setTypingProgress(prev => new Map(prev).set(message.id, message.text.length));
      }
    }, typingSpeed);

    typingIntervalsRef.current.set(message.id, interval);
  }, [typingProgress]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const time = audio.currentTime || 0;
      setCurrentTime(time);

      if (currentIndex !== null) {
        const currentDemo = demos[currentIndex];
        const messagesToShow = currentDemo.messages.filter(
          (msg) => msg.timestamp <= time
        );
        setVisibleMessages(messagesToShow);

        // Démarrer l'effet de frappe pour les nouveaux messages
        messagesToShow.forEach((message) => {
          const currentProgress = typingProgress.get(message.id) || 0;
          const fullLength = message.text.length;
          
          if (currentProgress < fullLength && !typingIntervalsRef.current.has(message.id) && !audio.paused) {
            startTypingEffect(message);
          }
        });

        const clientInfoToShow = currentDemo.clientInfo.filter(
          (info) => info.timestamp <= time
        );
        setVisibleClientInfo(clientInfoToShow);

        const aiFunctionsToShow = currentDemo.aiFunctions.filter(
          (func) => func.timestamp <= time
        );
        setVisibleAIFunctions(aiFunctionsToShow);
      }
    };

    const onLoadedMeta = () => {
      setDuration(audio.duration || 0);
      setCurrentTime(audio.currentTime || 0);
      setIsLoading(false);  // ✅ IMPROVEMENT: Clear loading state
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(audio.duration || 0);
    };

    // ✅ IMPROVEMENT: Add error handler
    const onError = () => {
      setAudioError('Unable to load audio. Please try again.');
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', onLoadedMeta);
    audio.addEventListener('durationchange', onLoadedMeta);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('durationchange', onLoadedMeta);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [currentIndex, demos, typingProgress, startTypingEffect]);

  // ✅ IMPROVEMENT: Preload audio files for instant playback
  useEffect(() => {
    demos.forEach(demo => {
      const audio = new Audio(demo.src);
      audio.preload = 'auto';
    });
  }, [demos]);

  const togglePlay = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const src = demos[index].src;

    if (currentIndex !== index) {
      setIsLoading(true);  // ✅ IMPROVEMENT: Show loading state
      setAudioError(null); // Clear any previous errors
      
      audio.pause();
      audio.src = src;
      audio.load();
      setCurrentTime(0);
      setDuration(0);
      setVisibleMessages([]);
      setVisibleClientInfo([]);
      setVisibleAIFunctions([]);
      
      // Réinitialiser l'effet de frappe ET la progression
      typingIntervalsRef.current.forEach(interval => clearInterval(interval));
      typingIntervalsRef.current.clear();
      setDisplayedMessages(new Map());
      setTypingProgress(new Map());

      audio
        .play()
        .then(() => {
          setCurrentIndex(index);
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Audio play error:', err);
          setAudioError('Failed to play audio. Please try again.');
          setIsLoading(false);
        });

      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Si l'audio est terminé (ou proche de la fin), tout réinitialiser
      if (audio.currentTime >= audio.duration - CONSTANTS.AUDIO_NEAR_END_THRESHOLD) {
        audio.currentTime = 0;
        setCurrentTime(0);
        setVisibleMessages([]);
        setVisibleClientInfo([]);
        setVisibleAIFunctions([]);
        
        typingIntervalsRef.current.forEach(interval => clearInterval(interval));
        typingIntervalsRef.current.clear();
        setDisplayedMessages(new Map());
        setTypingProgress(new Map());
      }

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Audio play error:', err);
          setAudioError('Failed to play audio. Please try again.');
        });
    }
  };

  const seekTo = (index: number, newTime: number) => {
    const audio = audioRef.current;
    if (!audio || currentIndex !== index) return;

    // Pause tous les effets de frappe en cours
    typingIntervalsRef.current.forEach(interval => clearInterval(interval));
    typingIntervalsRef.current.clear();

    audio.currentTime = newTime;
    setCurrentTime(newTime);

    // Réinitialiser les messages et la frappe
    const currentDemo = demos[index];
    const messagesToShow = currentDemo.messages.filter(
      (msg) => msg.timestamp <= newTime
    );
    setVisibleMessages(messagesToShow);

    // Réinitialiser displayedMessages et typingProgress
    const newDisplayedMessages = new Map<number, string>();
    const newTypingProgress = new Map<number, number>();

    messagesToShow.forEach((msg) => {
      newDisplayedMessages.set(msg.id, msg.text);
      newTypingProgress.set(msg.id, msg.text.length);
    });

    setDisplayedMessages(newDisplayedMessages);
    setTypingProgress(newTypingProgress);
  };

  const currentDemo = currentIndex !== null ? demos[currentIndex] : null;

  const messagesWithTyping = visibleMessages.map((message) => ({
    ...message,
    text: displayedMessages.get(message.id) || '',
  }));

  // ✅ IMPROVEMENT: Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      
      switch(e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay(currentIndex);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekTo(currentIndex, Math.max(0, currentTime - 5));
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekTo(currentIndex, Math.min(duration, currentTime + 5));
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, currentTime, duration]);

  return (
    <div className="w-full">
      <audio ref={audioRef} />

      {/* ✅ IMPROVEMENT: Error message display */}
      {audioError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm text-center max-w-md mx-auto"
        >
          {audioError}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Demo List - Gauche */}
        <div className="order-2 lg:order-1">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">
              Select a Demo
            </h3>

            <div className="space-y-3">
              {demos.map((demo, index) => {
                const isActive = currentIndex === index;
                const shownDuration = isActive ? duration : 0;
                const shownCurrent = isActive ? currentTime : 0;
                const progressPercent = shownDuration > 0 ? (shownCurrent / shownDuration) * 100 : 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}  // ✅ IMPROVEMENT: Tap feedback
                  >
                    <div
                      className={[
                        'glass-card rounded-xl p-4 transition-all duration-300 cursor-pointer',
                        isActive
                          ? 'bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 ring-2 ring-violet-400 dark:ring-violet-600 shadow-lg'
                          : 'bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 ring-1 ring-black/12 dark:ring-white/10',
                      ].join(' ')}
                      onClick={() => !isLoading && togglePlay(index)}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          className={[
                            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                            isActive
                              ? 'bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg'
                              : 'bg-gray-400 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600',
                          ].join(' ')}
                          aria-label={`${isPlaying && isActive ? 'Pause' : 'Play'} ${demo.title}`}
                          aria-pressed={isActive}
                          disabled={isLoading}
                        >
                          {isLoading && isActive ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : isPlaying && isActive ? (
                            <Pause className="w-5 h-5 text-white" />
                          ) : (
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm truncate">
                                {demo.title}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {demo.industry}
                              </p>
                            </div>

                            <div className="text-xs text-gray-600 dark:text-white/60 tabular-nums whitespace-nowrap">
                              {formatTime(shownCurrent)} / {formatTime(shownDuration)}
                            </div>
                          </div>

                          {isActive && (
                            <div className="w-full">
                              <div className="relative h-1.5 rounded-full bg-gray-200 dark:bg-white/20 overflow-hidden">
                                <div
                                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-100"
                                  style={{ width: `${progressPercent}%` }}
                                />

                                <input
                                  type="range"
                                  min={0}
                                  max={shownDuration || 0}
                                  step={0.1}
                                  value={shownCurrent}
                                  onChange={(e) =>
                                    seekTo(index, Number(e.target.value))
                                  }
                                  disabled={!isActive || !shownDuration}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  aria-label={`Seek ${demo.title} to position`}
                                  aria-valuemin={0}
                                  aria-valuemax={shownDuration}
                                  aria-valuenow={shownCurrent}
                                  aria-valuetext={`${formatTime(shownCurrent)} of ${formatTime(shownDuration)}`}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Téléphone - Centre */}
        <div className="order-1 lg:order-2 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex ?? 'locked'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <IPhoneMockup
                messages={messagesWithTyping}
                title={currentDemo?.title}
                isLocked={currentIndex === null}
                translations={translations}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Client Info & AI Actions - Droite */}
        <div className="order-3 lg:order-3 flex justify-center mt-2">
          {currentDemo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 w-full max-w-md"
            >
              <div className="flex items-center gap-3 mb-6">
                {isPlaying && (
                  <div className="flex items-center gap-1">
                    <motion.div
                      className="w-1 h-3 bg-blue-500 rounded-full"
                      animate={{ height: ['12px', '20px', '12px'] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="w-1 h-3 bg-blue-500 rounded-full"
                      animate={{ height: ['12px', '20px', '12px'] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1 h-3 bg-blue-500 rounded-full"
                      animate={{ height: ['12px', '20px', '12px'] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-lg">
                    {isPlaying ? 'AI Agent Active' : 'Ready to Start'}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {currentDemo.industry}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    Client Information
                  </h5>
                  <div className="space-y-2">
                    {visibleClientInfo.length === 0 ? (
                      <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                        Waiting for client data...
                      </p>
                    ) : (
                      visibleClientInfo.map((info, index) => {
                        const Icon = getIcon(info.icon);
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {info.label}
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {info.value}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h5 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    AI Actions
                  </h5>
                  <div className="space-y-2">
                    {visibleAIFunctions.length === 0 ? (
                      <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                        No actions executed yet...
                      </p>
                    ) : (
                      visibleAIFunctions.map((func, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-green-50 dark:bg-green-900/20"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </motion.div>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {func.label}
                          </p>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
