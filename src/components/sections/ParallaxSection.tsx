'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Calendar, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ParallaxSectionProps {
  onBookingClick?: () => void;
}

const ParallaxSection = ({ onBookingClick }: ParallaxSectionProps) => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const textY = useTransform(scrollY, [0, 1000], [0, 100]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.6, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick();
    } else {
      const message = 'Olá! Gostaria de fazer uma reserva no Rádio Hotel. Podem me ajudar?';
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
            Sua Experiência Única Aguarda
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-[120%]"
        style={{ y: backgroundY }}
      >
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/parallax-bg.svg')`,
            backgroundAttachment: 'fixed',
          }}
        />
      </motion.div>

      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/75 to-navy/90"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Base Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-navy/60" />

      {/* Decorative Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/30 rounded-full"
            style={
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }
            }
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Geometric Patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-gold/30 rotate-12" />
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-gold/10 rounded-full animate-bounce" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ y: textY }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-6 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4 text-gold fill-current" />
            <span className="text-gold font-medium text-sm">Experiência Premium</span>
            <Star className="w-4 h-4 text-gold fill-current" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Sua Experiência
            <br />
            <span className="text-gold">Única</span> Aguarda
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Desconecte-se do mundo e reconecte-se consigo mesmo em meio à natureza 
            exuberante de Serra Negra. Momentos inesquecíveis começam aqui.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gold/20">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gold mb-2">25+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Anos de Tradição</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gold/20">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gold mb-2">98%</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Satisfação dos Hóspedes</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gold/20">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gold mb-2">4.9</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Avaliação Média</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              onClick={handleBookingClick}
              className="bg-gold hover:bg-gold/90 text-navy font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-2xl group"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Reservar Agora
            </Button>
            
            <Button
              onClick={handleCallClick}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Consultar Disponibilidade
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">(19) 99999-9999</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Serra Negra, SP</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-white/60 text-xs uppercase tracking-wider">Continue Explorando</span>
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