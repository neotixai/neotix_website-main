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

// Interface for UI translations
interface UITranslations {
  selectDemo: string;
  readyToStart: string;
  answeringQuestions: string;
  clientInformation: string;
  waitingClientData: string;
  aiActions: string;
  noActions: string;
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
  translations,
  uiTranslations,
}: { 
  demos: AudioDemo[];
  translations?: PhoneTranslations;
  uiTranslations: UITranslations;
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
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [currentIndex, demos, startTypingEffect, typingProgress]);

  const loadDemo = useCallback(
    (index: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      // Arrêter les intervalles de frappe en cours
      typingIntervalsRef.current.forEach(interval => clearInterval(interval));
      typingIntervalsRef.current.clear();

      setCurrentIndex(index);
      setIsPlaying(false);
      setCurrentTime(0);
      setVisibleMessages([]);
      setVisibleClientInfo([]);
      setVisibleAIFunctions([]);
      setDisplayedMessages(new Map());
      setTypingProgress(new Map());
      setAudioError(null);
      setIsLoading(true);

      audio.src = demos[index].src;
      audio.load();
    },
    [demos]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || currentIndex === null) return;

    if (isPlaying) {
      audio.pause();
      // Arrêter tous les intervalles de frappe
      typingIntervalsRef.current.forEach(interval => clearInterval(interval));
      typingIntervalsRef.current.clear();
    } else {
      audio.play().catch((err) => {
        console.error('Playback error:', err);
        setAudioError('Unable to play audio. Please try again.');
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentIndex]);

  const seekTo = useCallback(
    (index: number, time: number) => {
      const audio = audioRef.current;
      if (!audio || currentIndex !== index) return;
      audio.currentTime = time;
    },
    [currentIndex]
  );

  const currentDemo = currentIndex !== null ? demos[currentIndex] : null;

  // Créer les messages avec l'effet de frappe
  const messagesWithTyping = visibleMessages.map((msg) => {
    const displayedText = displayedMessages.get(msg.id);
    if (displayedText !== undefined) {
      return { ...msg, text: displayedText };
    }
    return msg;
  });

  return (
    <div className="w-full">
      <audio ref={audioRef} preload="metadata" />

      {audioError && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-center">
          {audioError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
        {/* Liste des démos - Gauche */}
        <div className="order-2 lg:order-1 flex justify-center">
          <div className="w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-center lg:text-left">
              {uiTranslations.selectDemo}
            </h3>
            <div className="space-y-3">
              {demos.map((demo, index) => {
                const isActive = currentIndex === index;
                const shownCurrent = isActive ? currentTime : 0;
                const shownDuration = isActive ? duration : 0;
                const progressPercent = shownDuration > 0 ? (shownCurrent / shownDuration) * 100 : 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div
                      className={`glass-card rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'ring-2 ring-violet-500 bg-white/80 dark:bg-white/10'
                          : 'bg-white/60 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/8'
                      } backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10`}
                      onClick={() => !isActive && loadDemo(index)}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isActive) {
                              togglePlay();
                            } else {
                              loadDemo(index);
                              setTimeout(() => togglePlay(), 100);
                            }
                          }}
                          disabled={isLoading && isActive}
                          className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label={isPlaying && isActive ? 'Pause' : 'Play'}
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
                    {isPlaying ? uiTranslations.answeringQuestions : uiTranslations.readyToStart}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {currentDemo.industry}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    {uiTranslations.clientInformation}
                  </h5>
                  <div className="space-y-2">
                    {visibleClientInfo.length === 0 ? (
                      <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                        {uiTranslations.waitingClientData}
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
                    {uiTranslations.aiActions}
                  </h5>
                  <div className="space-y-2">
                    {visibleAIFunctions.length === 0 ? (
                      <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                        {uiTranslations.noActions}
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