'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Image from 'next/image';
import { buildWhatsAppUrl } from '@/lib/config';

interface HeroProps {
  onBookingClick?: () => void;
  heightClass?: string; // permite ajustar a altura externamente
}

const Hero = ({ onBookingClick, heightClass = 'min-h-[50vh] sm:min-h-[65vh] md:min-h-[80vh] lg:h-screen' }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // Novo estado
  const { t } = useTranslation();
  const bookNowLabel = (() => {
    const v = t('navigation.bookNow');
    return v === 'navigation.bookNow' ? 'Reservar agora' : v;
  })();
  const [reduceMotion, setReduceMotion] = useState(false);

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
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduceMotion(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused, reduceMotion]);

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
        const whatsappUrl = buildWhatsAppUrl(message);
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
      className={`relative ${heightClass} overflow-hidden`}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}  // Pausar ao entrar com mouse
      onMouseLeave={() => setIsPaused(false)} // Retomar ao sair com mouse
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
            <div className="relative w-full h-full">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                priority={currentSlide === 0}
                className="object-cover"
                sizes="100vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/70 to-blue/60" />
              {/* Pattern sutil por cima do gradiente */}
              <div
                className="absolute inset-0 bg-[url('/parallax-bg.svg')] bg-repeat bg-[length:360px] opacity-[0.08]"
                aria-hidden
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preload next images */}
      {slides.map((slide, index) => {
        if (index !== currentSlide && index <= currentSlide + 1) {
          return (
            <link
              key={slide.id}
              rel="preload"
              as="image"
              href={slide.image}
            />
          );
        }
        return null;
      })}

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-start lg:items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 md:pt-8 lg:pt-0 max-[639px]:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-0">
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
                  className="hidden lg:inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium">Serra Negra, São Paulo</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {(() => {
                    const title = slides[currentSlide].title;
                    if (title.toLowerCase().includes('radio hotel serra negra')) {
                      return (
                        <>
                          <span className="block md:inline">Radio Hotel</span>{' '}
                          <span className="block md:inline">Serra Negra</span>
                        </>
                      );
                    }
                    return title;
                  })()}
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  className="text-lg sm:text-xl md:text-2xl font-light mb-6 text-gold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-base sm:text-lg md:text-xl mb-8 leading-relaxed max-w-2xl md:max-w-3xl text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="mt-4 md:mt-6 flex flex-col md:flex-row gap-3 md:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 1.2 }}
                >
                  <Button
                    onClick={handleBookingClick}
                    disabled={isBookingLoading}
                    size="lg"
                    className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[160px] sm:min-w-[180px] sm:w-full md:w-auto flex items-center justify-center"
                    aria-label={bookNowLabel}
                  >
                    {isBookingLoading ? (
                      <LoadingSpinner size="md" color="navy" />
                    ) : (
                      <>
                        <Phone className="w-5 h-5 mr-2" />
                        {bookNowLabel}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gold text-white bg-transparent hover:bg-gold hover:text-navy font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 sm:w-full md:w-auto"
                    onClick={() => {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    aria-label={t('hero.discoverMore')}
                  >
                    {t('hero.discoverMore')}
                  </Button>
                </motion.div>
                {/* Controle explícito de carrossel */}
                <div className="mt-2 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setIsPaused(p => !p)}
                    aria-pressed={isPaused}
                    aria-label={isPaused ? t('hero.carousel.play') : t('hero.carousel.pause')}
                    className="bg-gold text-navy hover:bg-gold/90"
                  >
                    {isPaused ? t('hero.carousel.play') : t('hero.carousel.pause')}
                  </Button>
                  {reduceMotion && (
                    <span className="text-white/80 text-sm">Preferência de movimento reduzido ativa</span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (hidden on mobile) */}
      <button
        onClick={prevSlide}
        className="hidden min-[812px]:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label={t('hero.previousSlide')}
        tabIndex={0}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden min-[812px]:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold"
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
        className="hidden sm:block absolute bottom-8 right-8 z-20"
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
