'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Image from 'next/image';
import { buildWhatsAppUrl } from '@/lib/config';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
}



interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EventsModal({ isOpen, onClose }: EventsModalProps) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: '1',
      title: t('eventsModal.italianNight.title'),
      description: t('eventsModal.italianNight.description'),
      date: t('eventsModal.italianNight.date'),
      time: t('eventsModal.italianNight.time'),
      location: t('eventsModal.italianNight.location'),
      image: '/images/events/noite-italiana.png',
      category: t('eventsModal.categories.gastronomy')
    },
    {
      id: '2',
      title: t('eventsModal.feijoada.title'),
      description: t('eventsModal.feijoada.description'),
      date: t('eventsModal.feijoada.date'),
      time: t('eventsModal.feijoada.time'),
      location: t('eventsModal.feijoada.location'),
      image: '/images/events/sabado-feijoada.png',
      category: t('eventsModal.categories.gastronomy')
    },
    {
      id: '5',
      title: t('eventsModal.novemberHoliday.title'),
      description: t('eventsModal.novemberHoliday.description'),
      date: t('eventsModal.novemberHoliday.date'),
      time: t('eventsModal.novemberHoliday.time'),
      location: t('eventsModal.novemberHoliday.location'),
      image: '/images/events/ferias-julho.png',
      category: t('eventsModal.categories.holiday')
    },
    {
      id: 'january-vacation',
      title: t('eventsModal.januaryVacation.title'),
      description: t('eventsModal.januaryVacation.description'),
      date: t('eventsModal.januaryVacation.date'),
      time: t('eventsModal.januaryVacation.time'),
      location: t('eventsModal.januaryVacation.location'),
      image: '/images/events/ferias-julho.png',
      category: t('eventsModal.categories.packages')
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-navy to-blue p-6 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="pr-12">
                <h2 className="text-3xl font-serif font-bold mb-2">{t('eventsModal.title')}</h2>
                <p className="text-white/95">{t('eventsModal.subtitle')}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {!selectedEvent ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-cream/50 hover:bg-white"
                            onClick={() => setSelectedEvent(event)}>
                        <CardContent className="p-0">
                          {/* Event Image */}
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <Image 
                              src={event.image} 
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-gold text-navy">{event.category}</Badge>
                            </div>
                          </div>
                          
                          {/* Event Info */}
                          <div className="p-4 space-y-3">
                            <h3 className="font-serif font-semibold text-navy text-lg group-hover:text-gold transition-colors">
                              {event.title}
                            </h3>
                            
                            <p className="text-sm text-navy/70 line-clamp-2">
                              {event.description}
                            </p>
                            
                            <div className="space-y-2">
                              {event.date && (
                                <div className="flex items-center gap-2 text-sm text-navy/60">
                                  <Calendar className="w-4 h-4" />
                                  <span>{event.date}</span>
                                </div>
                              )}
                              
                              {event.time && (
                                <div className="flex items-center gap-2 text-sm text-navy/60">
                                  <Clock className="w-4 h-4" />
                                  <span>{event.time}</span>
                                </div>
                              )}
                              
                              {event.location && (
                                <div className="flex items-center gap-2 text-sm text-navy/60">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                            

                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Event Detail View */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex items-center gap-2 text-navy/70 hover:text-navy transition-colors"
                  >
                    <span>← {t('eventsModal.navigation.backToEvents')}</span>
                  </button>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Event Image */}
                    <div className="relative h-80 rounded-xl overflow-hidden">
                      <Image 
                        src={selectedEvent.image} 
                        alt={selectedEvent.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Event Details */}
                    <div className="space-y-6">
                      <div>
                        <Badge className="bg-gold text-navy mb-3">{selectedEvent.category}</Badge>
                        <h3 className="text-3xl font-serif font-bold text-navy mb-4">
                          {selectedEvent.title}
                        </h3>
                        <p className="text-lg text-navy/80 leading-relaxed">
                          {selectedEvent.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          {selectedEvent.date && (
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-gold" />
                              <div>
                                <p className="text-sm text-navy/60">{t('eventsModal.labels.date')}</p>
                                <p className="font-medium text-navy">{selectedEvent.date}</p>
                              </div>
                            </div>
                          )}
                          
                          {selectedEvent.time && (
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-gold" />
                              <div>
                                <p className="text-sm text-navy/60">{t('eventsModal.labels.time')}</p>
                                <p className="font-medium text-navy">{selectedEvent.time}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {selectedEvent.location && (
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-gold" />
                              <div>
                                <p className="text-sm text-navy/60">{t('eventsModal.labels.location')}</p>
                                <p className="font-medium text-navy">{selectedEvent.location}</p>
                              </div>
                            </div>
                          )}
                          

                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gold/20">
                        <button
                          onClick={() => handleBookEvent(selectedEvent)}
                          className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                          {t('eventsModal.buttons.bookWhatsApp')}
                        </button>
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
