'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';

interface PopButtonProps {
  onClick: () => void;
}

export default function PopButton({ onClick }: PopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 600 && !hasAnimated) {
        setIsVisible(true);
        setHasAnimated(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const handleClick = () => {
    onClick();
    // Hide button after click
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-1/2 right-6 z-40 transform -translate-y-1/2"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            scale: 1,
            rotate: [0, -5, 5, -5, 0]
          }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ 
            duration: 0.6, 
            type: "spring", 
            damping: 15,
            rotate: {
              duration: 0.8,
              delay: 0.3
            }
          }}
        >
          <motion.button
            onClick={handleClick}
            className="group relative bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-gold text-navy p-4 rounded-full shadow-2xl transition-all duration-300 hover:shadow-gold/25"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Sparkles */}
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </motion.div>
            
            {/* Main Icon */}
            <Calendar className="w-6 h-6 relative z-10" />
            
            {/* Tooltip */}
            <motion.div
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-navy text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              Eventos Especiais!
              <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 border-4 border-transparent border-l-navy" />
            </motion.div>
          </motion.button>
          
          {/* Floating Text */}
          <motion.div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-navy shadow-lg">
              Novos eventos!
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}