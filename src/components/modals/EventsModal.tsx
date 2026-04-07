'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Image from 'next/image';
import { buildWhatsAppUrl } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  url?: string;
}

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EventsModal({ isOpen, onClose }: EventsModalProps) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventsSwiper, setEventsSwiper] = useState<SwiperType | null>(null);
  const subtitle = t('eventsModal.subtitle');
  const closeLabel = t('common.close');
  const moreLabel = t('common.more');

  const events: Event[] = [
    {
      id: '1',
      title: t('eventsModal.italianNight.title'),
      description: t('eventsModal.italianNight.description'),
      date: t('eventsModal.italianNight.date'),
      time: t('eventsModal.italianNight.time'),
      location: t('eventsModal.italianNight.location') || 'Radio Hotel Serra Negra',
      image: '/images/events/noite-italiana.png',
      category: t('eventsModal.categories.gastronomy')
    },
    {
      id: '2',
      title: t('eventsModal.feijoada.title'),
      description: t('eventsModal.feijoada.description'),
      date: t('eventsModal.feijoada.date'),
      time: t('eventsModal.feijoada.time'),
      location: t('eventsModal.feijoada.location') || 'Radio Hotel Serra Negra',
      image: '/images/events/sabado-feijoada.png',
      category: t('eventsModal.categories.gastronomy')
    },

    {
      id: 'tiradentes',
      title: t('eventsModal.tiradentes.title'),
      description: t('eventsModal.tiradentes.description'),
      date: t('eventsModal.tiradentes.date'),
      time: t('eventsModal.tiradentes.time'),
      location: t('eventsModal.tiradentes.location'),
      image: '/images/hero/hero2.jpg',
      category: t('eventsModal.categories.packages')
    },
    {
      id: 'mayDay',
      title: t('eventsModal.mayDay.title'),
      description: t('eventsModal.mayDay.description'),
      date: t('eventsModal.mayDay.date'),
      time: t('eventsModal.mayDay.time'),
      location: t('eventsModal.mayDay.location'),
      image: '/images/events/trabalho.jpg',
      category: t('eventsModal.categories.packages')
    },
    {
      id: 'corpusChristi',
      title: t('eventsModal.corpusChristi.title'),
      description: t('eventsModal.corpusChristi.description'),
      date: t('eventsModal.corpusChristi.date'),
      time: t('eventsModal.corpusChristi.time'),
      location: t('eventsModal.corpusChristi.location'),
      image: '/images/facilities/ar-livre-1.jpg',
      category: t('eventsModal.categories.packages')
    },
    {
      id: 'festaJunina',
      title: t('eventsModal.festaJunina.title'),
      description: t('eventsModal.festaJunina.description'),
      date: t('eventsModal.festaJunina.date'),
      time: t('eventsModal.festaJunina.time'),
      location: t('eventsModal.festaJunina.location'),
      image: '/images/facilities/ar-livre-1.jpg',
      category: t('eventsModal.categories.packages')
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      setSelectedEvent(null);
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBookEvent = (event: Event) => {
    let message = `${t('eventsModal.whatsapp.bookingMessage')} "${event.title}"`;
    if (event.date) {
      message += ` ${t('eventsModal.whatsapp.onDay')} ${event.date}`;
    }
    if (event.time) {
      message += ` ${t('eventsModal.whatsapp.atTime')} ${event.time}`;
    }
    message += `. ${t('eventsModal.whatsapp.helpRequest')}`;
    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
  };

  const getEventPriority = (event: Event) =>
    [event.date, event.time, event.location].filter(Boolean).length;

  const featuredEvent = events.reduce<Event | null>((currentFeatured, event) => {
    if (!currentFeatured) {
      return event;
    }

    return getEventPriority(event) > getEventPriority(currentFeatured)
      ? event
      : currentFeatured;
  }, null);

  const otherEvents = featuredEvent
    ? events.filter((event) => event.id !== featuredEvent.id)
    : events;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="events-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm win7-overlay-fix"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-navy via-blue to-navy px-6 pb-7 pt-6 text-white sm:px-8">
              <div className="absolute inset-y-0 right-0 w-56 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_60%)]" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label={closeLabel}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-w-3xl pr-12">
                <h2 id="events-modal-title" className="mb-2 text-3xl font-serif font-bold tracking-tight sm:text-4xl">
                  {t('eventsModal.title')}
                </h2>
                {subtitle && (
                  <p className="max-w-2xl text-sm text-white/90 sm:text-base">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[calc(90vh-132px)] overflow-y-auto bg-gradient-to-b from-cream via-white to-white">
              {!selectedEvent ? (
                <div className="space-y-0">
                  {featuredEvent && (
                    <motion.button
                      type="button"
                      onClick={() => setSelectedEvent(featuredEvent)}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="group relative block min-h-[300px] w-full overflow-hidden text-left shadow-[0_30px_70px_rgba(13,27,76,0.18)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white md:min-h-[380px]"
                    >
                      <Image
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 80vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/72 to-navy/28" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />

                      <div className="relative flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
                        <div className="flex items-start justify-between gap-4">
                          <Badge className="border-0 bg-gold px-3 py-1 text-navy shadow-sm">
                            {featuredEvent.category}
                          </Badge>
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-medium text-white/95 backdrop-blur-sm">
                            {moreLabel}
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>

                        <div className="max-w-2xl space-y-4">
                          <h3 className="text-3xl font-serif font-bold leading-tight text-white sm:text-4xl">
                            {featuredEvent.title}
                          </h3>
                          <p className="max-w-xl text-sm leading-relaxed text-white/88 sm:text-base">
                            {featuredEvent.description}
                          </p>

                          <div className="flex flex-wrap gap-3 pt-1">
                            {[
                              { key: 'date', value: featuredEvent.date, icon: Calendar },
                              { key: 'time', value: featuredEvent.time, icon: Clock },
                              { key: 'location', value: featuredEvent.location, icon: MapPin },
                            ]
                              .filter((item) => item.value)
                              .map((item) => (
                                <span
                                  key={item.key}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/14 px-4 py-2 text-sm text-white/92 backdrop-blur-sm"
                                >
                                  <item.icon className="h-4 w-4 text-gold" />
                                  <span>{item.value}</span>
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  )}

                  {otherEvents.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 }}
                      className="space-y-4 px-6 py-6 sm:px-8 sm:py-8"
                    >
                      <div className="h-px w-full bg-gradient-to-r from-gold/45 via-gold/15 to-transparent" />

                      <div
                        className="events-modal-carousel relative px-10 pb-3 pt-1 sm:px-12"
                        aria-label={t('eventsModal.title')}
                      >
                        <Swiper
                          className="overflow-hidden pb-16 md:pb-20"
                          modules={[Pagination, Autoplay]}
                          slidesPerView={1.08}
                          spaceBetween={16}
                          breakpoints={{
                            640: { slidesPerView: 1.35, spaceBetween: 18 },
                            768: { slidesPerView: 2, spaceBetween: 18 },
                            1024: { slidesPerView: 3, spaceBetween: 20 },
                          }}
                          loop={otherEvents.length > 1}
                          autoplay={otherEvents.length > 1 ? { delay: 4500, disableOnInteraction: false } : false}
                          pagination={otherEvents.length > 1 ? { clickable: true } : false}
                          onSwiper={(swiper) => setEventsSwiper(swiper)}
                        >
                          {otherEvents.map((event, index) => (
                            <SwiperSlide key={event.id} className="h-auto">
                              <motion.button
                                type="button"
                                onClick={() => setSelectedEvent(event)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.06 }}
                                className="group flex h-[390px] w-full flex-col overflow-hidden rounded-[1.6rem] bg-white text-left shadow-[0_18px_38px_rgba(13,27,76,0.10)] ring-1 ring-gold/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(13,27,76,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:h-[410px]"
                              >
                                <div className="relative h-44 overflow-hidden">
                                  <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                                  <div className="absolute left-4 top-4">
                                    <Badge className="border-0 bg-white/90 text-navy shadow-sm">
                                      {event.category}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="flex flex-1 flex-col gap-4 p-5">
                                  <div className="space-y-2">
                                    <h3 className="text-xl font-serif font-semibold text-navy transition-colors group-hover:text-gold">
                                      {event.title}
                                    </h3>
                                    <p className="line-clamp-2 text-sm leading-relaxed text-navy/70">
                                      {event.description}
                                    </p>
                                  </div>

                                  <div className="space-y-2.5 text-sm text-navy/68">
                                    {[
                                      { key: 'date', value: event.date, icon: Calendar },
                                      { key: 'time', value: event.time, icon: Clock },
                                      { key: 'location', value: event.location, icon: MapPin },
                                    ]
                                      .filter((item) => item.value)
                                      .map((item) => (
                                        <div key={item.key} className="flex items-start gap-2.5">
                                          <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                          <span className={cn(item.key === 'location' && 'line-clamp-2')}>
                                            {item.value}
                                          </span>
                                        </div>
                                      ))}
                                  </div>

                                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-navy/75">
                                    <span>{moreLabel}</span>
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                  </div>
                                </div>
                              </motion.button>
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        {otherEvents.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={() => eventsSwiper?.slidePrev()}
                              className="absolute left-0 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 transition-colors hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-gold"
                              aria-label={t('common.previous')}
                            >
                              <ChevronLeft className="h-5 w-5 text-white" />
                            </button>
                            <button
                              type="button"
                              onClick={() => eventsSwiper?.slideNext()}
                              className="absolute right-0 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 transition-colors hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-gold"
                              aria-label={t('common.next')}
                            >
                              <ChevronRight className="h-5 w-5 text-white" />
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* Event Detail View */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 p-6 sm:p-8"
                >
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy/70 shadow-sm ring-1 ring-gold/10 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t('eventsModal.navigation.backToEvents')}</span>
                  </button>

                  <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_50px_rgba(13,27,76,0.10)] ring-1 ring-gold/10">
                    <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                      <div className="relative min-h-[320px] overflow-hidden sm:min-h-[380px]">
                        <Image
                          src={selectedEvent.image}
                          alt={selectedEvent.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 55vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/35 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                          <Badge className="mb-4 border-0 bg-gold text-navy shadow-sm">
                            {selectedEvent.category}
                          </Badge>
                          <h3 className="max-w-xl text-3xl font-serif font-bold leading-tight text-white sm:text-4xl">
                            {selectedEvent.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6 bg-gradient-to-b from-white to-cream/35 p-6 sm:p-8">
                        <p className="text-base leading-relaxed text-navy/80 sm:text-lg">
                          {selectedEvent.description}
                        </p>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            {
                              key: 'date',
                              value: selectedEvent.date,
                              icon: Calendar,
                              label: t('eventsModal.labels.date'),
                            },
                            {
                              key: 'time',
                              value: selectedEvent.time,
                              icon: Clock,
                              label: t('eventsModal.labels.time'),
                            },
                            {
                              key: 'location',
                              value: selectedEvent.location,
                              icon: MapPin,
                              label: t('eventsModal.labels.location'),
                              fullWidth: true,
                            },
                          ]
                            .filter((item) => item.value)
                            .map((item) => (
                              <div
                                key={item.key}
                                className={cn(
                                  "rounded-2xl bg-white/95 p-4 shadow-sm ring-1 ring-gold/10",
                                  item.fullWidth && 'sm:col-span-2'
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold">
                                    <item.icon className="h-5 w-5" />
                                  </div>
                                  <div className="space-y-1">
                                    {item.label && (
                                      <p className="text-sm text-navy/55">
                                        {item.label}
                                      </p>
                                    )}
                                    <p className="font-medium leading-relaxed text-navy">
                                      {item.value}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="mt-auto border-t border-gold/15 pt-6">
                          {selectedEvent.id === 'christmas-parade-2025' ? (
                            <Button
                              asChild
                              className="h-12 w-full rounded-full bg-navy px-6 text-white hover:bg-navy/90"
                            >
                              <a
                                href={selectedEvent.url || 'https://www.serranegra.sp.gov.br/eventos/abertura-do-natal-luzes-da-serra-2025-sera-em-14-de-novembro'}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Saiba mais
                              </a>
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleBookEvent(selectedEvent)}
                              className="h-12 w-full rounded-full bg-gold px-6 text-navy hover:bg-gold/90"
                            >
                              {t('eventsModal.buttons.bookWhatsApp')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
