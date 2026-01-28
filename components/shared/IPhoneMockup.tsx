'use client';

import { motion } from 'framer-motion';
import { Battery, Wifi, Signal, Lock, BatteryFull, Sun, Cloud } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  time: string;
}

interface IPhoneMockupProps {
  messages: Message[];
  title?: string;
  isLocked?: boolean;
}

export default function IPhoneMockup({
  messages,
  title = 'Conversation',
  isLocked = false,
}: IPhoneMockupProps) {
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  // Obtenir l'heure actuelle
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  // Obtenir la date
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const date = now.getDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-sm"
    >
      <div
        className="relative mx-auto isolate"
        style={{ width: '334px', height: '666px' }}
      >
        {/* 📱 Coque iPhone */}
        <div
          className="relative w-full h-full rounded-[56px] bg-gradient-to-br from-gray-800 via-gray-800 to-gray-800 p-3"
          style={{
            boxShadow:
              '0 25px 60px -15px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1)',
          }}
        >
          {/* 🔊 Volume + */}
          <div className="absolute left-[-5px] top-[185px] w-[6px] h-[60px] bg-gradient-to-b from-gray-800 to-gray-800 rounded-full shadow-md" />

          {/* 🔊 Volume – */}
          <div className="absolute left-[-5px] top-[250px] w-[6px] h-[60px] bg-gradient-to-b from-gray-800 to-gray-800 rounded-full shadow-md" />
          
          {/* 🔊 Mute – */}
          <div className="absolute left-[-5px] top-[120px] w-[6px] h-[40px] bg-gradient-to-b from-gray-800 to-gray-800 rounded-full shadow-md" />

          {/* 🔒 Power */}
          <div className="absolute right-[-5px] top-[205px] w-[6px] h-[90px] bg-gradient-to-b from-gray-800 to-gray-800 rounded-full shadow-md" />

          {/* 📱 Écran */}
          <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-gradient-to-r from-[#DC2626] via-[#E11D48] to-[#9333EA]">
           
            {/* 🔳 Encoche */}
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-[38%] h-8 bg-black rounded-[999px] z-50 flex items-center justify-center"
              style={{ boxShadow: '0 8px 14px rgba(0,0,0,0.45)' }}
            >
              <div className="w-16 h-1.5 bg-gray-900 rounded-full opacity-80" />
            </div>

            {isLocked ? (
              /* 🔒 ÉCRAN DE VERROUILLAGE */
              <div className="relative h-full flex flex-col bg-gradient-to-r from-[#B91C1C] via-[#BE185D] to-[#7C3AED]">
                {/* Status bar */}
                <div className="pt-3 px-6 flex items-center justify-between ml-1 mt-1">
                  <div className="text-white text-sm font-semibold mr-3">
                    Neotix AI
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Signal className="w-4 h-4 text-white mr-1.5" />
                    <Wifi className="w-4 h-4 text-white" />
                    <BatteryFull className="w-6 h-4 text-white fill-white" />
                  </div>
                </div>

                {/* Centre : Date et branding */}
                  <div className="flex-1 flex flex-col items-center justify-center px-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                  {/* Date */}
                  <div className="mb-32 -mt-22">
                    <div className="text-white/90 text-lg font-medium mb-1">
                      {dayName}, {monthName} {date}
                    </div>
                    
                    <div className="text-white text-6xl sm:text-7xl lg:text-8xl font-semibold mt-2">
                      {currentTime}
                    </div>
                    
                    {/* Météo juste en dessous */}
                    <div className="mx-auto px-6 py-4 rounded-3xl inline-flex flex-col gap-1 mt-6">
                      {/* Température et icône */}
                      <div className="flex gap-16">
                        <div className="text-white text-1xl font-medium leading-tight -ml-32">
                          21°
                        </div>
                        <Sun className="w-5 h-5 text-yellow-300 fill-yellow-300 -ml-28" />
                      </div>
                      
                      {/* Infos supplémentaires */}
                      <div className="text-white/90 text-xs font-light -ml-64">
                        Sunny
                      </div>
                    </div>
                  </div>

                  {/* Logo / Branding avec espace */}
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-10">
                      Neotix AI
                    </h1>
                    <p className="text-white/80 text-sm">
                      AI Agent
                    </p>
                  </div>
                    {/* Icône de déverrouillage */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex flex-col items-center gap-2 mt-24"
                    >
                      <Lock className="w-6 h-6 text-white/60" />
                      <p className="text-white/60 text-xs">
                        Select a demo to unlock
                      </p>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bas : Home indicator */}
                <div className="h-8 flex items-center justify-center">
                  <div className="w-32 h-1 bg-white/30 rounded-full" />
                </div>
              </div>
            ) : (
              /* 💬 ÉCRAN DE CONVERSATION */
              <div className="relative h-full flex flex-col">
                {/* 🔝 Status bar - remontée */}
                <div className="pt-3 px-6 bg-gradient-to-r from-[#DC2626] via-[#E11D48] to-[#9333EA]">
                  <div className="flex items-center justify-between ml-2">
                    <div className="text-[15px] font-semibold text-gray-900 mt-2">
                      {currentTime}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Signal className="w-4 h-4 text-white mr-1.5" />
                      <Wifi className="w-4 h-4 text-white" />
                      <BatteryFull className="w-6 h-4 text-black fill-black" />
                    </div>
                  </div>
                </div>

                {/* 👤 Header avec AI et titre */}
                <div className="pt-6 pb-4 px-5 bg-gradient-to-r from-[#DC2626] via-[#E11D48] to-[#9333EA] border-b border-white/10">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center bg-gray-300 rounded-3xl p-3 shadow-sm border border-gray-500">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 shadow-lg">
                        <span className="text-white text-sm font-semibold">AI</span>
                      </div>

                      <div className="whitespace-nowrap">
                        <div className="text-gray-900 font-semibold text-[11px] leading-tight">
                          {title}
                        </div>
                        <div className="text-gray-500 text-xs leading-tight">
                          Neotix Agent
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 💬 Messages (zone scrollable) */}
                <div
                  ref={chatScrollRef}
                  className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-r from-[#DC2626] via-[#E11D48] to-[#9333EA]"
                >
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className={`flex ${
                          message.sender === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div className="flex flex-col max-w-[75%]">
                          <div
                            className={`rounded-[20px] px-4 py-2.5 shadow-sm ${
                              message.sender === 'user'
                                ? 'bg-blue-500 text-white rounded-br-md'
                                : 'bg-gray-200 text-gray-900 rounded-bl-md'
                            }`}
                          >
                            <p className="text-[15px] leading-[1.4]">
                              {message.text}
                            </p>
                          </div>
                          <span
                            className={`text-[11px] text-gray-400 mt-1 px-1 ${
                              message.sender === 'user'
                                ? 'text-right'
                                : 'text-left'
                            }`}
                          >
                            {message.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ⌨️ Input */}
                <div className="px-4 py-3 bg-gradient-to-r from-[#DC2626] via-[#E11D48] to-[#9333EA]">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-400 text-[11px]">
                      Message...
                    </div>
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ⬜ Home indicator */}
                <div className="h-5 bg-gradient-to-r from-[#DC2626] via-[#E11D48] to-[#9333EA] flex items-center justify-center">
                  <div className="w-32 h-1 bg-gray-900 rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
