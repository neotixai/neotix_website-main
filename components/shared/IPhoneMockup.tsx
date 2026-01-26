'use client';

import { motion } from 'framer-motion';
import { Battery, Wifi, Signal } from 'lucide-react';
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
}

export default function IPhoneMockup({
  messages,
  title = 'Conversation',
}: IPhoneMockupProps) {
  // 🔽 Scroll UNIQUEMENT dans l’écran du téléphone
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

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
        style={{ width: '360px', height: '740px' }}
      >
        {/* 📱 Coque iPhone */}
        <div
          className="relative w-full h-full rounded-[56px] bg-gradient-to-br from-gray-800 via-gray-900 to-black p-3"
          style={{
            boxShadow:
              '0 25px 60px -15px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1)',
          }}
        >
          {/* 📱 Écran */}
          <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-white">
            {/* 🔳 Encoche */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-8 bg-black rounded-b-3xl z-50 flex items-center justify-center"
              style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
            >
              <div className="w-16 h-1.5 bg-gray-900 rounded-full mt-2" />
            </div>

            <div className="relative h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
              {/* 🔝 Status + Header */}
              <div className="pt-12 pb-4 px-5 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[15px] font-semibold text-gray-900">
                    9:41
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Signal className="w-4 h-4 text-gray-900" />
                    <Wifi className="w-4 h-4 text-gray-900" />
                    <Battery className="w-6 h-4 text-gray-900" />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-sm font-semibold">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-semibold text-[15px]">
                      {title}
                    </div>
                    <div className="text-gray-500 text-xs">
                      Neotix Agent
                    </div>
                  </div>
                </div>
              </div>

              {/* 💬 Messages (zone scrollable) */}
              <div
                ref={chatScrollRef}
                className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-gray-50 to-white"
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
              <div className="px-4 py-3 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-400 text-[15px]">
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
              <div className="h-5 bg-white flex items-center justify-center">
                <div className="w-32 h-1 bg-gray-900 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}