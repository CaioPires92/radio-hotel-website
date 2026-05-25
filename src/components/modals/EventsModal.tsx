'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, ArrowRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/components/i18n/I18nProvider';
import { buildWhatsAppUrl } from '@/lib/config';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  previewImage?: string;
  category: string;
  url?: string;
}

interface DaySchedule {
  day: string;
  hours: string;
  location: string;
  items: string[];
  extraLocation?: string;
}

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EventsModal({ isOpen, onClose }: EventsModalProps) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const subtitle = t('eventsModal.subtitle');
  const closeLabel = t('common.close');
  const moreLabel = t('common.more');
  const detailImageSrc = selectedEvent?.image;
  const eventChipClass =
    'rounded-full bg-gold/12 px-3 py-1 text-xs font-medium text-navy/75 ring-1 ring-gold/15 shadow-sm';
  const events: Event[] = [
    {
      id: 'corpusChristi',
      title: t('eventsModal.corpusChristi.title'),
      description: t('eventsModal.corpusChristi.description'),
      date: t('eventsModal.corpusChristi.date'),
      time: t('eventsModal.corpusChristi.time'),
      location: t('eventsModal.corpusChristi.location'),
      image: '/images/facilities/ar-livre-1.jpg',
      category: t('eventsModal.categories.packages'),
    },
    {
      id: 'festaJunina',
      title: t('eventsModal.festaJunina.title'),
      description: t('eventsModal.festaJunina.description'),
      date: t('eventsModal.festaJunina.date'),
      time: t('eventsModal.festaJunina.time'),
      location: t('eventsModal.festaJunina.location'),
      image: '/images/events/festa-junina.jpg',
      category: t('eventsModal.categories.packages'),
    },
    {
      id: 'italianNight',
      title: t('eventsModal.italianNight.title'),
      description: t('eventsModal.italianNight.description'),
      date: t('eventsModal.italianNight.date'),
      time: t('eventsModal.italianNight.time'),
      location: t('eventsModal.italianNight.location') || 'Radio Hotel Serra Negra',
      image: '/images/events/noite-italiana.png',
      category: t('eventsModal.categories.gastronomy'),
    },
    {
      id: 'feijoada',
      title: t('eventsModal.feijoada.title'),
      description: t('eventsModal.feijoada.description'),
      date: t('eventsModal.feijoada.date'),
      time: t('eventsModal.feijoada.time'),
      location: t('eventsModal.feijoada.location') || 'Radio Hotel Serra Negra',
      image: '/images/events/sabado-feijoada.png',
      category: t('eventsModal.categories.gastronomy'),
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      setSelectedEvent(null);
      setIsImageZoomed(false);
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

  useEffect(() => {
    if (!selectedEvent) {
      setIsImageZoomed(false);
    }
  }, [selectedEvent]);

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
          <motion.div
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm win7-overlay-fix"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-h-[90vh] overflow-hidden rounded-[2rem] bg-white shadow-2xl max-w-6xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
          >
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

            <div className="max-h-[calc(90vh-132px)] overflow-y-auto bg-gradient-to-b from-cream via-white to-white">
              {!selectedEvent ? (
                <div className="space-y-0 p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-gold-on-light">
                        {t('eventsModal.title')}
                      </p>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy/70">
                        Selecione um card para ver os detalhes e reservar via WhatsApp.
                      </p>
                    </div>
                    <span className="hidden rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-navy ring-1 ring-gold/10 md:inline-flex">
                      {events.length} eventos
                    </span>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    {events.map((event, index) => (
                      <motion.button
                        key={event.id}
                        type="button"
                        onClick={() => setSelectedEvent(event)}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.08 }}
                        className="group flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-[1.6rem] bg-white text-left shadow-[0_18px_38px_rgba(13,27,76,0.10)] ring-1 ring-gold/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(13,27,76,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white md:h-[620px]"
                      >
                        <div className={cn(
                          'relative overflow-hidden',
                          'h-72 md:h-[320px]'
                        )}>
                          <Image
                            src={event.previewImage || event.image}
                            alt={event.title}
                            fill
                            className={cn(
                              'transition-transform duration-500 group-hover:scale-105',
                              'object-cover'
                            )}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
                          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                            <Badge className="border-0 bg-white/92 text-navy shadow-sm">
                              {event.category}
                            </Badge>
                            <Badge className="border-0 bg-gold px-3 py-1 text-navy shadow-sm">
                              {event.date}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                          <div className="space-y-2">
                            <h3 className="text-2xl font-serif font-semibold text-navy transition-colors group-hover:text-gold">
                              {event.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-navy/70">
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
                    ))}
                  </div>
                </div>
              ) : (
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
                        <button
                          type="button"
                          onClick={() => setIsImageZoomed(true)}
                          className="group relative overflow-hidden min-h-[320px] sm:min-h-[380px]"
                          aria-label={`Ampliar foto de ${selectedEvent.title}`}
                        >
                          <Image
                            src={detailImageSrc || selectedEvent.image}
                            alt={selectedEvent.title}
                            fill
                            className="object-contain bg-[#0b4fa7]"
                            sizes="(max-width: 1024px) 100vw, 55vw"
                          />
                          <div className="absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-black/5" />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/35 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                            <Badge className="mb-4 border-0 bg-gold text-navy shadow-sm">
                              {selectedEvent.category}
                            </Badge>
                            <h3 className="max-w-xl text-3xl font-serif font-bold leading-tight text-white sm:text-4xl">
                              {selectedEvent.title}
                            </h3>
                          </div>
                        </button>

                        <div className="flex flex-col gap-4 bg-gradient-to-b from-white to-cream/35 p-5 sm:p-6">
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
                                      'rounded-2xl bg-white/95 p-4 shadow-sm ring-1 ring-gold/10',
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

                          <div className="mt-auto border-t border-gold/15 pt-4">
                            {selectedEvent.id === 'christmas-parade-2025' ? (
                              <Button
                                asChild
                                className="h-12 w-full rounded-full bg-navy px-6 font-semibold text-white shadow-[0_10px_24px_rgba(13,27,76,0.18)] hover:bg-navy/90"
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

            <AnimatePresence>
              {isImageZoomed && selectedEvent && (
                <motion.div
                  className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsImageZoomed(false)}
                >
                  <motion.div
                    className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl"
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setIsImageZoomed(false)}
                      className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      aria-label="Fechar imagem ampliada"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    <div className="relative h-[80vh] w-full">
                      <Image
                        src={detailImageSrc || selectedEvent.image}
                        alt={selectedEvent.title}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
