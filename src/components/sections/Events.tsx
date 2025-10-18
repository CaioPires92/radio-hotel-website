'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Users, MapPin, Clock, Ruler, Maximize, ArrowUpDown, Building2, Layers, Wind, Wifi, Monitor, Disc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Image from 'next/image';
import ConferenceTable from '@/components/sections/ConferenceTable';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Events = () => {
  const { t } = useTranslation();
  const [currentEvent, setCurrentEvent] = useState(0);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevEvent();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextEvent();
    }
  };

  const events = [
    {
      id: 1,
      title: t('events.convention.title'),
      description: t('events.convention.description'),
      image: '/images/conventions/convention-1.jpg',
      duration: undefined,
      location: undefined,
      features: [],
    },
  ];

  // Miniaturas de fotos da seção Conventions
  const conventionInlinePhotos = [
    '/images/conventions/IMG_0008.jpg',
    '/images/conventions/IMG_0023.jpg',
    '/images/conventions/IMG_0711.jpg',
  ];

  const lightboxOpen = lightboxIndex !== null;
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setCurrentPhotoIndex(index);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const nextPhoto = () => {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + 1) % conventionInlinePhotos.length;
    setLightboxIndex(next);
    setCurrentPhotoIndex(next);
  };
  const prevPhoto = () => {
    if (lightboxIndex === null) return;
    const prev = (lightboxIndex - 1 + conventionInlinePhotos.length) % conventionInlinePhotos.length;
    setLightboxIndex(prev);
    setCurrentPhotoIndex(prev);
  };

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  // Navegação das fotos inline (setas do slide principal)
  const nextInlinePhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % conventionInlinePhotos.length);
  };
  const prevInlinePhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + conventionInlinePhotos.length) % conventionInlinePhotos.length);
  };

  const handleContactClick = async () => {
    setIsContactLoading(true);
    try {
      const message = `${t('events.whatsapp.eventInquiry')} ${events[currentEvent].title}`;
      const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsContactLoading(false);
    }
  };

  return (
    <section
      id="events"
      className="py-20 bg-white"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={t('events.carousel.ariaLabel')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
            {t('events.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            {t('events.title')}
          </h2>
          <p className="text-lg text-navy/80 max-w-3xl mx-auto leading-relaxed">
            {t('events.description')}
          </p>

          {/* Miniaturas clicáveis para ampliar */}
          <div className="hidden">
            {conventionInlinePhotos.map((src, idx) => (
              <button
                key={src}
                onClick={() => setCurrentPhotoIndex(idx)}
                className={`relative overflow-hidden rounded-xl border ${idx === currentPhotoIndex ? 'border-gold ring-2 ring-gold' : 'border-navy/10'} shadow-sm focus:outline-none focus:ring-2 focus:ring-gold`}
                aria-label={`Visualizar foto ${idx + 1}`}
                aria-current={idx === currentPhotoIndex ? 'true' : 'false'}
              >
                <Image
                  src={src}
                  alt={`${t('events.convention.title')} - miniatura ${idx + 1}`}
                  width={180}
                  height={120}
                  className="object-cover"
                  quality={70}
                  sizes="(min-width: 1024px) 180px, 35vw"
                  priority={idx === 0}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lightbox Modal */}
        <Dialog open={lightboxOpen} onOpenChange={(open) => !open && closeLightbox()}>
          <DialogContent className="bg-transparent p-0 max-w-6xl">
            {lightboxIndex !== null && (
              <div className="relative w-[92vw] max-w-5xl h-[60vh] sm:h-[70vh] mx-auto">
                <Image
                  src={conventionInlinePhotos[lightboxIndex]}
                  alt={`${t('events.convention.title')} - foto ampliada ${lightboxIndex + 1}`}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="100vw"
                  quality={85}
                  priority
                />
                {/* Sombra suave para contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />

                {/* Navegação */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all focus:outline-none focus:ring-2 focus:ring-gold"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-navy" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all focus:outline-none focus:ring-2 focus:ring-gold"
                  aria-label="Próxima foto"
                >
                <ChevronRight className="w-6 h-6 text-navy" />
                </button>

                {/* Indicador */}
                <div className="absolute bottom-3 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {lightboxIndex + 1} / {conventionInlinePhotos.length}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Events Carousel */}
        <div className="relative">
          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-96 lg:h-auto group cursor-zoom-in" onClick={() => openLightbox(currentPhotoIndex)} role="button" aria-label={t('events.convention.title')}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPhotoIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={conventionInlinePhotos[currentPhotoIndex] ?? events[currentEvent].image}
                          alt={`${events[currentEvent].title} - ${events[currentEvent].description}`}
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/20 to-transparent" />

                    {/* Event Number */}
                    <div className="absolute top-6 left-6 bg-gold text-navy font-bold text-lg w-12 h-12 rounded-full flex items-center justify-center">
                      {String(currentEvent + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Thumbnails below the slide */}
                  <div className="px-6 py-4 bg-white/80 flex flex-wrap gap-3 items-center">
                    {conventionInlinePhotos.map((src, idx) => (
                      <button
                        key={src}
                        onClick={() => setCurrentPhotoIndex(idx)}
                        className={`relative overflow-hidden rounded-xl border ${idx === currentPhotoIndex ? 'border-gold ring-2 ring-gold' : 'border-navy/10'} shadow-sm focus:outline-none focus:ring-2 focus:ring-gold`}
                        aria-label={`Visualizar foto ${idx + 1}`}
                        aria-current={idx === currentPhotoIndex ? 'true' : 'false'}
                      >
                        <Image
                          src={src}
                          alt={`${t('events.convention.title')} - miniatura ${idx + 1}`}
                          width={160}
                          height={110}
                          className="object-cover"
                          quality={70}
                          sizes="(min-width: 1024px) 160px, 40vw"
                          priority={idx === 0}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <motion.div
                      key={currentEvent}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 className="text-3xl font-serif font-bold text-navy mb-4">
                        {events[currentEvent].title}
                      </h3>

                      <p className="text-lg text-navy/80 mb-6 leading-relaxed">
                        {events[currentEvent].description}
                      </p>

                      {/* Event Details */}
                      {(events[currentEvent].duration || events[currentEvent].location) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                          {events[currentEvent].duration && (
                            <div className="flex items-center space-x-3">
                              <Clock className="w-5 h-5 text-gold" />
                              <span className="text-sm text-navy/80">{events[currentEvent].duration}</span>
                            </div>
                          )}
                          {events[currentEvent].location && (
                            <div className="flex items-center space-x-3">
                              <MapPin className="w-5 h-5 text-gold" />
                              <span className="text-sm text-navy/80">{events[currentEvent].location}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Convention Stats (compact) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {[
                          { icon: Ruler, label: t('events.convention.area') },
                          { icon: Maximize, label: t('events.convention.expandableArea') },
                        ]
                          .filter(item => Boolean(item.label))
                          .map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <item.icon className="w-5 h-5 text-gold" />
                              <span className="text-sm text-navy/80">{item.label}</span>
                            </div>
                          ))}
                      </div>

                      {/* Features */}
                      {events[currentEvent].features?.length > 0 && (
                        <div className="mb-8">
                          <h4 className="font-semibold text-navy mb-3">{t('events.features.title')}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {events[currentEvent].features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gold rounded-full" />
                                <span className="text-sm text-navy/70">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Button
                        onClick={handleContactClick}
                        disabled={isContactLoading}
                        className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 w-fit disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[180px] flex items-center justify-center"
                        aria-label={`${t('events.requestQuote.ariaLabel')} ${events[currentEvent].title}`}
                      >
                        {isContactLoading ? (
                          <LoadingSpinner size="sm" color="navy" />
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 mr-2" />
                            {t('events.requestQuote.button')}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevInlinePhoto}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Foto anterior"
            tabIndex={0}
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>
          <button
            onClick={nextInlinePhoto}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Próxima foto"
            tabIndex={0}
          >
            <ChevronRight className="w-6 h-6 text-navy" />
          </button>
        </div>

        {/* Event Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentEvent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold ${index === currentEvent
                ? 'bg-gold scale-125'
                : 'bg-navy/20 hover:bg-navy/40'
                }`}
              aria-label={`${t('events.navigation.viewEvent')} ${index + 1}`}
              tabIndex={0}
            />
          ))}
        </div>


        <ConferenceTable />
      </div>
    </section>
  );
};

export default Events;