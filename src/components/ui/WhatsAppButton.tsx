'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const message = 'Olá! Gostaria de saber mais informações sobre o Radio Hotel e fazer uma reserva.';
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{
            duration: 0.5,
            type: "spring",
            damping: 15,
            stiffness: 300
          }}
        >
          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:shadow-green-500/25"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Entrar em contato via WhatsApp"
          >
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Icon with animation */}
            <motion.div
              animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <MessageCircle className="w-7 h-7 relative z-10" />
            </motion.div>

            {/* Notification Badge */}
            <motion.div
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              1
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute bottom-full mb-3 right-0 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Fale conosco no WhatsApp!</span>
                  </div>
                  <div className="absolute top-full right-4 transform -translate-x-1/2 border-4 border-transparent border-t-navy" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Floating Messages */}
          <motion.div
            className="absolute bottom-20 right-0 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {/* Message Bubbles */}
            <motion.div
              className="bg-white rounded-lg p-3 shadow-lg max-w-xs border border-gray-100"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-medium">Radio Hotel</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Olá! Como podemos ajudá-lo hoje?
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Agora</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}