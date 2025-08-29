'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Users, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Image from 'next/image';

const Events = () => {
  const { t } = useTranslation();
  const [currentEvent, setCurrentEvent] = useState(0);
  const [isContactLoading, setIsContactLoading] = useState(false);

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
      capacity: t('events.convention.capacity'),
      duration: t('events.convention.duration'),
      location: t('events.convention.location'),
      features: [
        t('events.convention.features.audiovisual'),
        t('events.convention.features.wifi'),
        t('events.convention.features.airConditioning'),
        t('events.convention.features.soundSystem'),
        t('events.convention.features.lighting'),
        t('events.convention.features.coffeeBreak')
      ],
    },
    {
      id: 2,
      title: t('events.corporate.title'),
      description: t('events.corporate.description'),
      image: '/images/conventions/convention-4.jpg',
      capacity: t('events.corporate.capacity'),
      duration: t('events.corporate.duration'),
      location: t('events.corporate.location'),
      features: [
        t('events.corporate.features.multimedia'),
        t('events.corporate.features.videoConference'),
        t('events.corporate.features.coffeeBreak'),
        t('events.corporate.features.parking'),
        t('events.corporate.features.technicalSupport')
      ],
    },
    {
      id: 3,
      title: t('events.social.title'),
      description: t('events.social.description'),
      image: '/images/conventions/convention-6.jpg',
      capacity: t('events.social.capacity'),
      duration: t('events.social.duration'),
      location: t('events.social.location'),
      features: [
        t('events.social.features.decoration'),
        t('events.social.features.gourmetBuffet'),
        t('events.social.features.parking'),
        t('events.social.features.technicalSupport'),
        t('events.social.features.audiovisual')
      ],
    },
  ];

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
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
        </motion.div>

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
                  <div className="relative h-96 lg:h-auto">
                    <Image
                      src={events[currentEvent].image}
                      alt={`${events[currentEvent].title} - ${events[currentEvent].description}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/20 to-transparent" />

                    {/* Event Number */}
                    <div className="absolute top-6 left-6 bg-gold text-navy font-bold text-lg w-12 h-12 rounded-full flex items-center justify-center">
                      {String(currentEvent + 1).padStart(2, '0')}
                    </div>
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-gold" />
                          <span className="text-sm text-navy/80">{events[currentEvent].capacity}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-gold" />
                          <span className="text-sm text-navy/80">{events[currentEvent].duration}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gold" />
                          <span className="text-sm text-navy/80">{events[currentEvent].location}</span>
                        </div>
                      </div>

                      {/* Features */}
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
            onClick={prevEvent}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label={t('events.navigation.previous')}
            tabIndex={0}
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>
          <button
            onClick={nextEvent}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label={t('events.navigation.next')}
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

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-cream rounded-2xl p-8">
            <h3 className="text-2xl font-serif font-bold text-navy mb-4">
              {t('events.planning.title')}
            </h3>
            <p className="text-navy/70 mb-6 max-w-2xl mx-auto">
              {t('events.planning.description')}
            </p>
            <Button
              onClick={() => {
                const message = t('events.whatsapp.planningInquiry');
                const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              variant="outline"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
              aria-label={t('events.specialist.ariaLabel')}
            >
              {t('events.specialist.button')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;