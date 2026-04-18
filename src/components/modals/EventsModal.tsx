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
  const detailImageSrc =
    selectedEvent?.id === 'festa-nacoes'
      ? '/images/events/festa-nacoes-2.png'
      : selectedEvent?.image;
  const eventChipClass =
    'rounded-full bg-gold/12 px-3 py-1 text-xs font-medium text-navy/75 ring-1 ring-gold/15 shadow-sm';
  const festaNacoesSchedule: DaySchedule[] = [
    {
      day: '01 de Maio (Sexta-feira)',
      hours: '11h às 22h',
      location: 'Praça John F. Kennedy',
      items: [
        '11h: Abertura Oficial',
        '17h: Lucas e Matheus e Banda',
        '20h: Renato Mota (Representando a Argentina)',
      ],
    },
    {
      day: '02 de Maio (Sábado)',
      hours: '10h às 22h',
      location: 'Praça John F. Kennedy',
      items: [
        '12h: Grupo de Dança Italiana de Cascalho (Itália)',
        '13h: Cartier Latin (França)',
        '15h30: "Etnia: Cores e Sons" - Cia de Dança Allegro',
        '17h: ATS Kung Fu Garra de Águia Lily Lau - Dança de Dragão e Leões Chineses',
        '18h: Banda Itália Brasil',
        '19h30: ATS Kung Fu Garra de Águia Lily Lau (Segunda apresentação)',
        '20h: Banda Ellus',
      ],
    },
    {
      day: '03 de Maio (Domingo)',
      hours: '10h às 20h',
      location: 'Praça John F. Kennedy',
      items: [
        '11h: Apresentação de Dança Grupo da Melhor Idade (Fundo Social)',
        '12h: Pra Ti Sambah',
        '14h: Ciça Marinho e Trio (Portugal)',
        '16h: Fiorire Escola de Ballet',
        '18h: Ray Conniff Tribute (E.U.A)',
      ],
      extraLocation: 'Encerramento Especial: 20h - Germano e Geovany | Praça Prefeito João Zelante',
    },
  ];

  const festivalCafeSchedule: DaySchedule[] = [
    {
      day: '22 de maio – Sexta-feira',
      hours: '17h às 22h',
      location: 'Av. Deputado Campos Vergal',
      items: [
        '17h: Abertura',
        '18h: Sérgio Estrada e Banda',
        '20h: Banda Ellus',
      ],
    },
    {
      day: '23 de maio – Sábado',
      hours: '11h às 20h',
      location: 'Av. Deputado Campos Vergal',
      items: [
        '11h: Orquestra Esperança de Viola Caipira',
        '14h: Alexandre Reys e Banda',
        '17h: Mayara Góis e Banda',
        '20h: Mario Neto e Banda',
      ],
    },
    {
      day: '24 de maio – Domingo',
      hours: '10h às 18h',
      location: 'Av. Deputado Campos Vergal',
      items: [
        '10h: Corporação Musical Lira de Serra Negra',
        '13h: Tony Marcos e Banda',
        '16h: Grupo Tradição Caipira (Orquestra de Viola)',
        '18h: Lucas e Matheus e Banda',
      ],
    },
  ];

  const events: Event[] = [
    {
      id: 'festa-nacoes',
      title: t('eventsModal.festaNacoes.title'),
      description: t('eventsModal.festaNacoes.description'),
      date: t('eventsModal.festaNacoes.date'),
      time: t('eventsModal.festaNacoes.time'),
      location: t('eventsModal.festaNacoes.location') || 'Radio Hotel Serra Negra',
      image: '/images/events/festa-nacoes.png?v=2',
      category: t('eventsModal.categories.packages'),
    },
    {
      id: 'festival-cafe',
      title: t('eventsModal.festivalCafe.title'),
      description: t('eventsModal.festivalCafe.description'),
      date: t('eventsModal.festivalCafe.date'),
      time: t('eventsModal.festivalCafe.time'),
      location: t('eventsModal.festivalCafe.location') || 'Radio Hotel Serra Negra',
      image: '/images/events/festival-cafe.png',
      previewImage: '/images/events/FestivaldoCafe.jpeg',
      category: t('eventsModal.categories.packages'),
    },
    {
      id: 'tiradentes',
      title: t('eventsModal.tiradentes.title'),
      description: t('eventsModal.tiradentes.description'),
      date: t('eventsModal.tiradentes.date'),
      time: t('eventsModal.tiradentes.time'),
      location: t('eventsModal.tiradentes.location'),
      image: '/images/hero/hero2.jpg',
      category: t('eventsModal.categories.packages'),
    },
    {
      id: 'mayDay',
      title: t('eventsModal.mayDay.title'),
      description: t('eventsModal.mayDay.description'),
      date: t('eventsModal.mayDay.date'),
      time: t('eventsModal.mayDay.time'),
      location: t('eventsModal.mayDay.location'),
      image: '/images/events/trabalho.jpg',
      category: t('eventsModal.categories.packages'),
    },
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
            className={cn(
              'relative w-full max-h-[90vh] overflow-hidden rounded-[2rem] bg-white shadow-2xl',
              selectedEvent?.id === 'festival-cafe' || selectedEvent?.id === 'festa-nacoes'
                ? 'max-w-[98vw] xl:max-w-[96rem]'
                : 'max-w-6xl'
            )}
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
                              event.id === 'festa-nacoes' ? 'object-contain bg-[#0b4fa7]' : 'object-cover'
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
                    {selectedEvent.id === 'festa-nacoes' ? (
                      <div className="grid gap-0 lg:grid-cols-[minmax(320px,0.88fr)_minmax(0,1.12fr)]">
                        <button
                          type="button"
                          onClick={() => setIsImageZoomed(true)}
                          className="group relative overflow-hidden bg-[#0b4fa7] p-4 sm:p-5 lg:p-6"
                          aria-label={`Ampliar foto de ${selectedEvent.title}`}
                        >
                          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-[0_18px_40px_rgba(13,27,76,0.22)] ring-1 ring-white/15">
                            <Image
                              src={detailImageSrc || selectedEvent.image}
                              alt={selectedEvent.title}
                              fill
                              className="object-contain object-center bg-[#0b4fa7] transition-transform duration-500 group-hover:scale-[1.01]"
                              sizes="(max-width: 1024px) 100vw, 42vw"
                            />
                          </div>
                        </button>

                        <div className="flex flex-col gap-6 bg-gradient-to-b from-white to-cream/35 p-6 sm:p-8">
                          <div className="space-y-3">
                            <Badge className="border-0 bg-gold text-navy shadow-sm">
                              Programação Especial
                            </Badge>
                            <div className="space-y-2">
                              <h3 className="text-3xl font-serif font-bold leading-tight text-navy sm:text-4xl">
                                Festa das Nações 2026
                              </h3>
                              <p className="max-w-2xl text-sm leading-relaxed text-navy/70">
                                Uma celebração das tradições, da gastronomia típica e de atrações para toda a família.
                              </p>
                            </div>
                          </div>

                          <div className="grid items-stretch gap-4 xl:grid-cols-2">
                            <div className="h-full space-y-5 rounded-[1.6rem] bg-white p-5 shadow-sm ring-1 ring-gold/10">
                              <div className="space-y-2">
                                <h4 className="text-xl font-serif font-semibold text-navy">
                                  Informações Gerais
                                </h4>
                                <div className="space-y-2 text-sm leading-relaxed text-navy/75">
                                  <p><strong>Evento:</strong> Festa das Nações 2026</p>
                                  <p><strong>Local Principal:</strong> Praça John F. Kennedy (Av. Deputado Campos Vergal, atrás do Palácio das Águas).</p>
                                  <p><strong>Atração Gastronômica:</strong> Comidas típicas.</p>
                                </div>
                              </div>
                            </div>

                            <div className="h-full space-y-5 rounded-[1.6rem] bg-white p-5 shadow-sm ring-1 ring-gold/10">
                              <div className="space-y-2">
                                <h4 className="text-xl font-serif font-semibold text-navy">
                                  Programação por Dia
                                </h4>
                                <p className="text-sm text-navy/65">
                                  A programação abaixo foi organizada para facilitar a leitura e a reserva via WhatsApp.
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                  <span className={eventChipClass}>
                                    01 a 03 de maio
                                  </span>
                                  <span className={eventChipClass}>
                                    3 dias de evento
                                  </span>
                                  <span className={eventChipClass}>
                                    Praça John F. Kennedy
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-4 xl:grid-cols-2">
                            {festaNacoesSchedule.map((day) => (
                              <div
                                key={day.day}
                                className="h-full rounded-2xl bg-white/95 p-4 shadow-sm ring-1 ring-gold/10"
                              >
                                <div className="space-y-1">
                                  <p className="font-semibold text-navy">{day.day}</p>
                                  <p className="text-sm text-navy/70">
                                    Horário: {day.hours} | Local: {day.location}
                                  </p>
                                </div>

                                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-navy/80">
                                  {day.items.map((item) => (
                                    <li key={item} className="flex gap-2">
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>

                                {day.extraLocation && (
                                  <p className="mt-3 text-sm font-medium text-navy/75">
                                    {day.extraLocation}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="mt-auto border-t border-gold/15 pt-6">
                            <Button
                              onClick={() => handleBookEvent(selectedEvent)}
                              className="h-12 w-full rounded-full bg-gold px-6 font-semibold text-navy shadow-[0_10px_24px_rgba(193,143,33,0.18)] hover:bg-gold/90"
                            >
                              {t('eventsModal.buttons.bookWhatsApp')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          'grid gap-0',
                          selectedEvent.id === 'festival-cafe'
                            ? 'lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)]'
                            : 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => setIsImageZoomed(true)}
                          className={cn(
                            'group relative overflow-hidden',
                            selectedEvent.id === 'festival-cafe'
                              ? 'min-h-[260px] sm:min-h-[320px]'
                              : 'min-h-[320px] sm:min-h-[380px]'
                          )}
                          aria-label={`Ampliar foto de ${selectedEvent.title}`}
                        >
                          <Image
                            src={detailImageSrc || selectedEvent.image}
                            alt={selectedEvent.title}
                            fill
                            className={cn(
                              selectedEvent.id === 'festival-cafe'
                                ? 'object-contain object-center bg-[#6b3f32]'
                                : 'object-contain bg-[#0b4fa7]'
                            )}
                            sizes="(max-width: 1024px) 100vw, 55vw"
                          />
                          {selectedEvent.id !== 'festival-cafe' && (
                            <>
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
                            </>
                          )}
                        </button>

                        <div className="flex flex-col gap-4 bg-gradient-to-b from-white to-cream/35 p-5 sm:p-6">
                          {selectedEvent.id === 'festival-cafe' && (
                            <>
                              <div className="space-y-2">
                                <Badge className="border-0 bg-gold text-navy shadow-sm">
                                  Programação Especial
                                </Badge>
                                <div className="space-y-1.5">
                                  <h3 className="text-2xl font-serif font-bold leading-tight text-navy sm:text-[2rem]">
                                    Festival do Café &amp; Riquezas da Serra 2026
                                  </h3>
                                  <p className="max-w-2xl text-sm leading-snug text-navy/70">
                                    Uma celebração dos sabores artesanais de Serra Negra.
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-0.5">
                                  <span className="rounded-full bg-gold/12 px-3 py-1 text-xs font-medium text-navy/75">
                                    22, 23 e 24 de Maio de 2026
                                  </span>
                                  <span className="rounded-full bg-gold/12 px-3 py-1 text-xs font-medium text-navy/75">
                                    Av. Deputado Campos Vergal
                                  </span>
                                  <span className="rounded-full bg-gold/12 px-3 py-1 text-xs font-medium text-navy/75">
                                    Serra Negra - SP
                                  </span>
                                </div>
                              </div>

                              <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-2">
                                <div className="space-y-4 rounded-[1.6rem] bg-white p-4 shadow-sm ring-1 ring-gold/10">
                                  <div className="space-y-1.5">
                                    <h4 className="text-xl font-serif font-semibold text-navy">
                                      Informações Gerais
                                    </h4>
                                    <div className="space-y-1.5 text-sm leading-relaxed text-navy/75">
                                      <p><strong>Evento:</strong> Festival do Café &amp; Riquezas da Serra 2026</p>
                                      <p><strong>Local:</strong> Av. Deputado Campos Vergal (Atrás do Palácio das Águas Prefeito Antônio Luigi Ítalo Franchi - Bimbo), Serra Negra - SP.</p>
                                      <p><strong>Descrição:</strong> Uma celebração dos sabores artesanais de Serra Negra.</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4 rounded-[1.6rem] bg-white p-4 shadow-sm ring-1 ring-gold/10">
                                  <div className="space-y-1.5">
                                    <h4 className="text-xl font-serif font-semibold text-navy">
                                      Programação Detalhada
                                    </h4>
                                    <p className="text-sm leading-snug text-navy/65">
                                      A programação foi organizada para facilitar a leitura e o acesso via WhatsApp.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid gap-3 lg:grid-cols-2">
                                {festivalCafeSchedule.map((day) => (
                                  <div
                                    key={day.day}
                                    className="h-full rounded-2xl bg-white/95 p-3.5 shadow-sm ring-1 ring-gold/10"
                                  >
                                    <div className="space-y-0.5">
                                      <p className="font-semibold text-navy">{day.day}</p>
                                      <p className="text-sm text-navy/70">
                                        Horário: {day.hours} | Local: {day.location}
                                      </p>
                                    </div>

                                    <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-navy/80">
                                      {day.items.map((item) => (
                                        <li key={item} className="flex gap-2">
                                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>

                                    {day.extraLocation && (
                                      <p className="mt-2.5 text-sm font-medium text-navy/75">
                                        {day.extraLocation}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </>
                          )}

                          {selectedEvent.id !== 'festival-cafe' && (
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
                          )}

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
                    )}
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
