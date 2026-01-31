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

  // ✅ FIX: Amélioration de startTypingEffect pour reprendre exactement où ça s'est arrêté
  const startTypingEffect = useCallback((message: Message) => {
    // Si un intervalle existe déjà pour ce message, ne rien faire
    if (typingIntervalsRef.current.has(message.id)) {
      return;
    }

    // Récupérer la progression actuelle (nombre de caractères déjà affichés)
    const currentProgress = typingProgress.get(message.id) || 0;
    
    // Si le message est déjà complètement affiché, ne rien faire
    if (currentProgress >= message.text.length) {
      setDisplayedMessages(prev => new Map(prev).set(message.id, message.text));
      return;
    }
    
    // Commencer à l'index actuel de progression
    let charIndex = currentProgress;
    
    // Different speeds for agent (faster/professional) vs user
    const typingSpeed = message.sender === 'agent' 
      ? CONSTANTS.TYPING_SPEED_AGENT 
      : CONSTANTS.TYPING_SPEED_USER;

    const interval = setInterval(() => {
      // Vérifier si l'audio est toujours en lecture
      if (!audioRef.current || audioRef.current.paused) {
        clearInterval(interval);
        typingIntervalsRef.current.delete(message.id);
        // ✅ FIX: Sauvegarder la progression actuelle lors de la pause
        setTypingProgress(prev => new Map(prev).set(message.id, charIndex));
        return;
      }

      if (charIndex < message.text.length) {
        charIndex++;
        setDisplayedMessages(prev => new Map(prev).set(message.id, message.text.slice(0, charIndex)));
        setTypingProgress(prev => new Map(prev).set(message.id, charIndex));
      } else {
        // Message complètement affiché
        clearInterval(interval);
        typingIntervalsRef.current.delete(message.id);
        setDisplayedMessages(prev => new Map(prev).set(message.id, message.text));
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
          
          // ✅ FIX: Démarrer l'effet de frappe seulement si:
          // 1. Le message n'est pas complètement affiché
          // 2. Il n'y a pas déjà un intervalle en cours
          // 3. L'audio est en lecture
          if (currentProgress < fullLength && 
              !typingIntervalsRef.current.has(message.id) && 
              !audio.paused) {
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
      setIsLoading(false);
      setAudioError(null);
    };

    const onError = () => {
      setIsLoading(false);
      setAudioError('Error loading audio');
      setIsPlaying(false);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (audio) audio.currentTime = 0;
      
      // ✅ FIX: Réinitialiser la progression de frappe quand l'audio se termine
      setTypingProgress(new Map());
      setDisplayedMessages(new Map());
      typingIntervalsRef.current.forEach(interval => clearInterval(interval));
      typingIntervalsRef.current.clear();
    };

    audio.addEventListener('loadedmetadata', onLoadedMeta);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [currentIndex, demos, startTypingEffect, typingProgress]);

  // ✅ FIX: Nettoyer et redémarrer les effets de frappe lors de la reprise
  useEffect(() => {
    if (isPlaying && currentIndex !== null) {
      // Redémarrer l'effet de frappe pour tous les messages visibles qui ne sont pas complets
      visibleMessages.forEach((message) => {
        const currentProgress = typingProgress.get(message.id) || 0;
        if (currentProgress < message.text.length && !typingIntervalsRef.current.has(message.id)) {
          startTypingEffect(message);
        }
      });
    } else {
      // Pause: arrêter tous les intervalles de frappe
      typingIntervalsRef.current.forEach((interval, messageId) => {
        clearInterval(interval);
      });
      typingIntervalsRef.current.clear();
    }
  }, [isPlaying, visibleMessages, currentIndex, startTypingEffect, typingProgress]);

  const togglePlayPause = useCallback(
    async (index: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (currentIndex !== index) {
        // Switch to new demo
        setCurrentIndex(index);
        setIsPlaying(false);
        setCurrentTime(0);
        setVisibleMessages([]);
        setVisibleClientInfo([]);
        setVisibleAIFunctions([]);
        setDisplayedMessages(new Map());
        setTypingProgress(new Map());
        
        // Nettoyer les intervalles de frappe
        typingIntervalsRef.current.forEach(interval => clearInterval(interval));
        typingIntervalsRef.current.clear();

        audio.src = demos[index].src;
        audio.currentTime = 0;
        setIsLoading(true);
        setAudioError(null);

        try {
          await audio.load();
          await audio.play();
          setIsPlaying(true);
        } catch (err) {
          console.error('Error playing audio:', err);
          setAudioError('Error playing audio');
          setIsPlaying(false);
          setIsLoading(false);
        }
      } else {
        // Toggle play/pause for current demo
        if (audio.paused) {
          // ✅ FIX: Si l'audio est à la fin (ou au début), réinitialiser la progression
          if (audio.currentTime === 0 || audio.currentTime >= audio.duration - 0.1) {
            setTypingProgress(new Map());
            setDisplayedMessages(new Map());
            typingIntervalsRef.current.forEach(interval => clearInterval(interval));
            typingIntervalsRef.current.clear();
          }
          
          try {
            await audio.play();
            setIsPlaying(true);
          } catch (err) {
            console.error('Error playing audio:', err);
            setAudioError('Error playing audio');
            setIsPlaying(false);
          }
        } else {
          audio.pause();
          setIsPlaying(false);
        }
      }
    },
    [currentIndex, demos]
  );

  const seekTo = useCallback(
    (index: number, time: number) => {
      const audio = audioRef.current;
      if (!audio || currentIndex !== index) return;

      audio.currentTime = time;
      setCurrentTime(time);

      // ✅ FIX: Lors du seek, réinitialiser l'état de frappe pour les messages affectés
      if (currentIndex !== null) {
        const currentDemo = demos[currentIndex];
        
        // Nettoyer tous les intervalles
        typingIntervalsRef.current.forEach(interval => clearInterval(interval));
        typingIntervalsRef.current.clear();

        // Réinitialiser la progression et l'affichage pour tous les messages
        const newProgress = new Map<number, number>();
        const newDisplayed = new Map<number, string>();
        
        currentDemo.messages.forEach((message) => {
          if (message.timestamp <= time) {
            // Message qui devrait être visible
            // Afficher immédiatement le message complet
            newProgress.set(message.id, message.text.length);
            newDisplayed.set(message.id, message.text);
          } else {
            // Message futur - réinitialiser
            newProgress.set(message.id, 0);
            newDisplayed.set(message.id, '');
          }
        });
        
        setTypingProgress(newProgress);
        setDisplayedMessages(newDisplayed);
      }
    },
    [currentIndex, demos]
  );

  const currentDemo = currentIndex !== null ? demos[currentIndex] : null;

  // Créer les messages avec le texte en cours de frappe
  const messagesWithTyping = visibleMessages.map(msg => ({
    ...msg,
    text: displayedMessages.get(msg.id) || ''
  }));

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Audio Controls - Gauche */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {uiTranslations.selectDemo}
              </h3>
              {demos.map((demo, index) => {
                const isActive = currentIndex === index;
                const shownCurrent = isActive ? currentTime : 0;
                const shownDuration = isActive ? duration : 0;
                const progressPercent = shownDuration > 0 ? (shownCurrent / shownDuration) * 100 : 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-3 last:mb-0"
                  >
                    <div className={`rounded-xl p-4 border backdrop-blur-xl ring-1 transition-all ${
                      isActive 
                        ? 'bg-white/60 dark:bg-white/5 border-blue-500 ring-black/12 dark:ring-white/10 shadow-md' 
                        : 'bg-white/60 dark:bg-white/5 border-gray-200 dark:border-gray-700 ring-black/12 dark:ring-white/10 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => togglePlayPause(index)}
                          disabled={isLoading && isActive}
                          className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label={
                            isLoading && isActive
                              ? 'Loading...'
                              : isPlaying && isActive
                              ? `Pause ${demo.title}`
                              : `Play ${demo.title}`
                          }
                        >
                          {isLoading && isActive ? (
                            <div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                            />
                          ) : isPlaying && isActive ? (
                            <Pause className="w-5 h-5 text-white" />
                          ) : (
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                {demo.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {demo.industry}
                              </p>
                            </div>

                            <div className="text-xs text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">
                              {formatTime(shownCurrent)} / {formatTime(shownDuration)}
                            </div>
                          </div>

                          {isActive && (
                            <div className="w-full mt-2">
                              <div className="relative h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                <div
                                  className="absolute left-0 top-0 h-full rounded-full bg-blue-500 transition-all duration-100"
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

        <audio ref={audioRef} preload="metadata" />
      </div>
    </div>
  );
}