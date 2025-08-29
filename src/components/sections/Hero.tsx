'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useTranslation } from '@/components/i18n/I18nProvider';

interface HeroProps {
  onBookingClick?: () => void;
}

const Hero = ({ onBookingClick }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const { t } = useTranslation();

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
    }
  };

  const slides = [
    {
      id: 1,
      image: '/images/hero/hero1.jpg',
      title: t('hero.slide1.title'),
      subtitle: t('hero.slide1.subtitle'),
      description: t('hero.slide1.description'),
    },
    {
      id: 2,
      image: '/images/hero/hero2.jpg',
      title: t('hero.slide2.title'),
      subtitle: t('hero.slide2.subtitle'),
      description: t('hero.slide2.description'),
    },
    {
      id: 3,
      image: '/images/hero/hero3.jpg',
      title: t('hero.slide3.title'),
      subtitle: t('hero.slide3.subtitle'),
      description: t('hero.slide3.description'),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleBookingClick = async () => {
    setIsBookingLoading(true);
    try {
      if (onBookingClick) {
        onBookingClick();
      } else {
        const message = t('hero.whatsapp.bookingMessage');
        const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsBookingLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={t('hero.carousel.ariaLabel')}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 13, 41, 0.7), rgba(22, 68, 110, 0.6)), url(${slides[currentSlide].image})`,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white"
              >
                {/* Location Badge */}
                <motion.div
                  className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium">{t('hero.location')}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  className="text-5xl md:text-7xl font-serif font-bold mb-4 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  className="text-xl md:text-2xl font-light mb-6 text-gold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Button
                    onClick={handleBookingClick}
                    disabled={isBookingLoading}
                    size="lg"
                    className="bg-gold hover:bg-gold/90 text-navy font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[180px] flex items-center justify-center"
                    aria-label={t('navigation.bookNow')}
                  >
                    {isBookingLoading ? (
                      <LoadingSpinner size="md" color="navy" />
                    ) : (
                      <>
                        <Phone className="w-5 h-5 mr-2" />
                        {t('navigation.bookNow')}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gold text-gray-800 hover:bg-gold hover:text-navy font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
                    onClick={() => {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    aria-label={t('hero.discoverMore')}
                  >
                    {t('hero.discoverMore')}
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label={t('hero.previousSlide')}
        tabIndex={0}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label={t('hero.nextSlide')}
        tabIndex={0}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold ${index === currentSlide
                ? 'bg-gold scale-125'
                : 'bg-white/50 hover:bg-white/70'
              }`}
            aria-label={`${t('hero.goToSlide')} ${index + 1}`}
            tabIndex={0}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;