'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BackToTopButton() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hide button when in hero section (less than 600px) or show after 300px scroll outside hero
      if (scrollY < 600) {
        setIsVisible(false);
      } else {
        setIsVisible(scrollY > 300);
      }

      // Calculate scroll progress
      const progress = (scrollY / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-6 z-40"
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{
            duration: 0.3,
            type: "spring",
            damping: 20,
            stiffness: 300
          }}
        >
          <motion.button
            onClick={scrollToTop}
            onKeyDown={handleKeyDown}
            className="group relative text-white p-3 rounded-full shadow-xl backdrop-blur-sm 
            transition-all duration-300 hover:shadow-navy/25 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t('backToTop.ariaLabel')}
            tabIndex={0}
          >
            {/* Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 50 50"
            >
              {/* White background circle */}
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="white"
                stroke="none"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="none"
                strokeWidth="2"
              />
              <motion.circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#C5A253"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Icon */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronUp className="w-5 h-5 relative z-10 text-gold" />
            </motion.div>

            {/* Tooltip */}
            <motion.div
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-white text-navy px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              {t('backToTop.tooltip')}
              <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 border-4 border-transparent border-l-white" />
            </motion.div>
          </motion.button>

          {/* Progress Text */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-navy bg-white/90 backdrop-blur-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {Math.round(scrollProgress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}