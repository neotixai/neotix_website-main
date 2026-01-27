'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, User, Phone, Mail, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import IPhoneMockup from './IPhoneMockup';

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

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function InteractiveDemoSection({ demos }: { demos: AudioDemo[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [visibleClientInfo, setVisibleClientInfo] = useState<ClientInfo[]>([]);
  const [visibleAIFunctions, setVisibleAIFunctions] = useState<AIFunction[]>([]);

  // 🆕 États pour l'effet de frappe
  const [displayedMessages, setDisplayedMessages] = useState<Map<number, string>>(new Map());
  const [typingProgress, setTypingProgress] = useState<Map<number, number>>(new Map());
  const typingIntervalsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // 🆕 Nettoyer les intervalles de frappe
  useEffect(() => {
    return () => {
      typingIntervalsRef.current.forEach(interval => clearInterval(interval));
      typingIntervalsRef.current.clear();
    };
  }, []);

  // 🆕 Fonction pour démarrer l'effet de frappe
  const startTypingEffect = useCallback((message: Message) => {
    const startIndex = typingProgress.get(message.id) || 0;
    let charIndex = startIndex;
    const typingSpeed = 42;

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

        // 🆕 Démarrer l'effet de frappe pour les nouveaux messages
        messagesToShow.forEach((message) => {
          const currentProgress = typingProgress.get(message.id) || 0;
          const fullLength = message.text.length;
          
          // Si le message n'est pas complètement affiché et n'est pas déjà en train de s'afficher
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
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(audio.duration || 0);
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
  }, [currentIndex, demos, typingProgress, startTypingEffect]);

  const togglePlay = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const src = demos[index].src;

    if (currentIndex !== index) {
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
        })
        .catch((err) => console.error('Audio play error:', err));

      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // 🆕 Si l'audio est terminé (ou proche de la fin), tout réinitialiser
      if (audio.currentTime >= audio.duration - 0.1) {
        audio.currentTime = 0;
        setCurrentTime(0);
        setVisibleMessages([]);
        setVisibleClientInfo([]);
        setVisibleAIFunctions([]);
        
        // 🆕 Réinitialiser la frappe pour replay
        typingIntervalsRef.current.forEach(interval => clearInterval(interval));
        typingIntervalsRef.current.clear();
        setDisplayedMessages(new Map());
        setTypingProgress(new Map());
      }
      
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error(err));
    }
  };

  const seekTo = (index: number, newTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentIndex !== index) return;

    const t = Math.min(Math.max(newTime, 0), duration || 0);
    audio.currentTime = t;
    setCurrentTime(t);

    const currentDemo = demos[index];
    
    // 🆕 Réinitialiser l'effet de frappe lors du seek
    typingIntervalsRef.current.forEach(interval => clearInterval(interval));
    typingIntervalsRef.current.clear();
    setDisplayedMessages(new Map());
    setTypingProgress(new Map());
    
    const messagesToShow = currentDemo.messages.filter(
      (msg) => msg.timestamp <= t
    );
    setVisibleMessages(messagesToShow);
    
    // 🆕 Afficher instantanément tous les messages jusqu'au point de seek
    const instantMessages = new Map<number, string>();
    const instantProgress = new Map<number, number>();
    messagesToShow.forEach(msg => {
      instantMessages.set(msg.id, msg.text);
      instantProgress.set(msg.id, msg.text.length);
    });
    setDisplayedMessages(instantMessages);
    setTypingProgress(instantProgress);

    const clientInfoToShow = currentDemo.clientInfo.filter(
      (info) => info.timestamp <= t
    );
    setVisibleClientInfo(clientInfoToShow);

    const aiFunctionsToShow = currentDemo.aiFunctions.filter(
      (func) => func.timestamp <= t
    );
    setVisibleAIFunctions(aiFunctionsToShow);
  };

  const currentDemo = currentIndex !== null ? demos[currentIndex] : null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return User;
      case 'phone':
        return Phone;
      case 'mail':
        return Mail;
      case 'location':
        return MapPin;
      case 'calendar':
        return Calendar;
      default:
        return User;
    }
  };

  // 🆕 Créer les messages avec le texte en cours de frappe
  const messagesWithTyping = visibleMessages.map(msg => ({
    ...msg,
    text: displayedMessages.get(msg.id) || ''
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <audio ref={audioRef} preload="metadata" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-14">
        <div className="order-2 lg:order-1 space-y-6">
          <div className="glass-card rounded-2xl p-6 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Volume2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold">Select a Demo</h3>
            </div>

            <div className="space-y-4">
              {demos.map((demo, index) => {
                const isActive = currentIndex === index;
                const shownCurrent = isActive ? currentTime : 0;
                const shownDuration = isActive ? duration : 0;
                const progressPercent =
                  isActive && shownDuration > 0
                    ? (shownCurrent / shownDuration) * 100
                    : 0;

                return (
                  <div
                    key={`${demo.src}-${index}`}
                    className={[
                      'rounded-xl p-4 transition-all duration-300',
                      isActive
                        ? 'bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 ring-2 ring-blue-500/50'
                        : 'bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => togglePlay(index)}
                        className={[
                          'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                          isActive
                            ? 'bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600',
                        ].join(' ')}
                        aria-label={isPlaying && isActive ? 'Pause' : 'Play'}
                      >
                        {isPlaying && isActive ? (
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
                                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
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
                                aria-label="Seek audio"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {currentDemo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                {isPlaying && (
                  <div className="flex items-center gap-1"> {/* 🆕 Déplacer la condition ici */}
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

        <div className="order-1 lg:order-2 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex ?? 'locked'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* 🆕 Toujours afficher l'iPhone, avec écran de verrouillage ou messages */}
              <IPhoneMockup
                messages={messagesWithTyping}
                title={currentDemo?.title}
                isLocked={currentIndex === null}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
