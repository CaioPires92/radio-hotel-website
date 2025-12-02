'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Ruler, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Image from 'next/image';
import { buildWhatsAppUrl } from '@/lib/config';
import ConferenceTable from '@/components/sections/ConferenceTable';

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
      duration: undefined,
      location: undefined,
      features: [],
    },
  ];

  const hasMultipleEvents = events.length > 1;

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
      const whatsappUrl = buildWhatsAppUrl(message);
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
      onKeyDown={hasMultipleEvents ? handleKeyDown : undefined}
      tabIndex={hasMultipleEvents ? 0 : -1}
      role={hasMultipleEvents ? 'region' : undefined}
      aria-label={hasMultipleEvents ? t('events.carousel.ariaLabel') : undefined}
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
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-navy bg-gradient-to-r from-navy to-transparent opacity-20" />
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

          {/* Navigation Arrows (only when there is more than one event) */}
          {hasMultipleEvents && (
            <>
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
            </>
          )}
        </div>

        {/* Event Indicators (only when there is more than one event) */}
        {hasMultipleEvents && (
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
        )}


        <ConferenceTable />
      </div>
    </section>
  );
};

export default Events;
