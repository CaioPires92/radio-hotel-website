'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Calendar, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Image from 'next/image';

interface ParallaxSectionProps {
  onBookingClick?: () => void;
  backgroundSrc?: string;

}

const ParallaxSection = ({ onBookingClick, backgroundSrc = "/images/hero/hero1.jpg" }: ParallaxSectionProps) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Parallax transforms with subtle movement
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const textY = useTransform(scrollY, [0, 1000], [0, 50]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.6, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick();
    } else {
      const message = t('parallax.whatsapp.bookingMessage');
      const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleCallClick = () => {
    window.open('tel:+5519999999999', '_self');
  };

  if (!mounted) {
    return (
      <section className="relative h-screen bg-navy flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            {t('parallax.fallback.title')}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}



      <motion.div
        className="absolute inset-0 z-0 w-full h-[120%] overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="relative w-full h-full">
          <Image
            src={backgroundSrc}
            alt="Radio Hotel - Serra Negra"
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
            priority={false}
          />
        </div>
      </motion.div>

      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-navy/80 via-navy/75 to-navy/90"
        style={{ opacity: overlayOpacity }}
      />

      {/* Base Overlay for Better Contrast */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-navy/60" />

      {/* Decorative Elements - Reduced opacity and better positioning */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Floating Particles - Reduced count and opacity */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gold/20 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Geometric Patterns - Better positioned */}
        <div className="absolute top-20 left-4 lg:left-10 w-24 lg:w-32 h-24 lg:h-32 border border-gold/15 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 right-4 lg:right-10 w-20 lg:w-24 h-20 lg:h-24 border border-gold/20 rotate-12" />
        <div className="absolute top-1/2 left-4 lg:left-20 w-12 lg:w-16 h-12 lg:h-16 bg-gold/5 rounded-full animate-bounce" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-30 min-h-screen flex items-center justify-center pt-16 pb-16"
        style={{ y: textY }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-8 sm:-mt-10 md:-mt-12">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Star className="w-3 sm:w-4 h-3 sm:h-4 text-gold fill-current" />
            <span className="text-gold font-medium text-xs sm:text-sm">{t('parallax.badge')}</span>
            <Star className="w-3 sm:w-4 h-3 sm:h-4 text-gold fill-current" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('parallax.title.line1')}
            <br />
            <span className="text-gold">{t('parallax.title.highlight')}</span> {t('parallax.title.line2')}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('parallax.subtitle')}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8 max-w-3xl lg:max-w-4xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gold/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gold mb-1 sm:mb-2">80</div>
              <div className="text-white text-xs sm:text-sm uppercase tracking-wider">{t('parallax.stats.tradition')}</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gold/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gold mb-1 sm:mb-2">8.9</div>
              <div className="text-white text-xs sm:text-sm uppercase tracking-wider">{t('parallax.stats.rating')}</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gold/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gold mb-1 sm:mb-2">9.9</div>
              <div className="text-white text-xs sm:text-sm uppercase tracking-wider">{t('parallax.stats.location')}</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 justify-center items-center mb-4 md:mb-6 mt-6 md:mt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              onClick={handleBookingClick}
              className="w-full md:w-auto bg-gold hover:bg-gold/90 text-navy font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-2xl group"
              aria-label={t('parallax.buttons.bookingAriaLabel')}
            >
              <Phone className="w-4 md:w-5 h-4 md:h-5 mr-2 group-hover:animate-pulse" />
              {t('parallax.buttons.bookNow')}
            </Button>

            <Button
              onClick={handleCallClick}
              variant="outline"
              className="w-full md:w-auto border-2 border-gold text-gold hover:bg-gold hover:text-navy font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-navy/20"
              aria-label={t('parallax.buttons.availabilityAriaLabel')}
            >
              <Calendar className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              {t('parallax.buttons.checkAvailability')}
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 md:gap-6 text-white/80 pb-0 md:pb-2 mt-8 md:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <Phone className="w-3 md:w-4 h-3 md:h-4" />
              <span className="text-xs md:text-sm">(19) 99999-9999</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/30" />
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 md:w-4 h-3 md:h-4" />
              <span className="text-xs md:text-sm">Serra Negra, SP</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden lg:block absolute z-30 bottom-0 lg:bottom-2 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center space-y-2">
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ParallaxSection;