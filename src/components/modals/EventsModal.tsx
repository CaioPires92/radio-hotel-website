'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import Image from 'next/image';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useTranslation } from '@/components/i18n/I18nProvider';
import { buildWhatsAppUrl } from '@/lib/config';

interface EventBanner {
  id: string;
  title: string;
  image: string;
  date?: string;
  expiresOn?: string;
}

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const saoPauloDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Sao_Paulo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function getSaoPauloDateKey() {
  const parts = saoPauloDateFormatter.formatToParts(new Date());
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';

  return `${getPart('year')}-${getPart('month')}-${getPart('day')}`;
}

export default function EventsModal({ isOpen, onClose }: EventsModalProps) {
  const { t } = useTranslation();
  const [todayInSaoPaulo, setTodayInSaoPaulo] = useState(getSaoPauloDateKey);

  // Para adicionar um banner, inclua aqui uma imagem na proporção 4:5 (ex.: 1080 x 1350 px).
  const banners: EventBanner[] = [
    {
      id: 'dia-das-criancas-2026',
      title: 'Dia das Crianças',
      image: '/images/events/dia-das-criancas.webp',
      date: '12 de outubro de 2026',
      expiresOn: '2026-10-13',
    },
    {
      id: 'feriado-2-novembro-2026',
      title: 'Feriado de 2 de Novembro',
      image: '/images/events/2-novembro.webp',
      date: '2 de novembro de 2026',
      expiresOn: '2026-11-03',
    },
    {
      id: 'feriado-20-novembro-2026',
      title: 'Feriado de 20 de Novembro',
      image: '/images/events/20-novembro.webp',
      date: '20 de novembro de 2026',
      expiresOn: '2026-11-23',
    },
    {
      id: 'natal-reveillon-2026',
      title: 'Natal & Réveillon',
      image: '/images/events/natal-reveillon.webp',
      date: 'Natal e Réveillon de 2026',
      expiresOn: '2027-01-02',
    },
    {
      id: 'noite-italiana',
      title: t('eventsModal.italianNight.title'),
      image: '/images/events/noite-italiana.webp',
      date: t('eventsModal.italianNight.date'),
    },
    {
      id: 'feijoada',
      title: t('eventsModal.feijoada.title'),
      image: '/images/events/feijoada.webp',
      date: t('eventsModal.feijoada.date'),
    },
  ];

  const visibleBanners = banners.filter(
    (banner) => !banner.expiresOn || todayInSaoPaulo < banner.expiresOn
  );

  useEffect(() => {
    const updateDate = () => setTodayInSaoPaulo(getSaoPauloDateKey());
    const timer = window.setInterval(updateDate, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const openWhatsApp = (banner: EventBanner) => {
    let message = `${t('eventsModal.whatsapp.bookingMessage')} "${banner.title}"`;
    if (banner.date) message += ` ${t('eventsModal.whatsapp.onDay')} ${banner.date}`;
    message += `. ${t('eventsModal.whatsapp.helpRequest')}`;

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="events-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-navy/85 backdrop-blur-sm win7-overlay-fix"
            onClick={onClose}
            aria-label={t('common.close')}
          />

          <motion.div
            className="relative w-full max-w-7xl pt-20 sm:pt-24"
            initial={{ scale: 0.96, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 18 }}
            transition={{ duration: 0.25 }}
          >
            <header className="absolute inset-x-1 top-0 flex items-start justify-between gap-4 text-white sm:inset-x-2">
              <div className="min-w-0 pt-1 text-shadow-lg">
                <h2 id="events-modal-title" className="font-serif text-2xl font-bold sm:text-4xl">
                  {t('eventsModal.title')}
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  {t('eventsModal.carouselInstructions')}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-11 sm:w-11"
                aria-label={t('common.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div>
              <Swiper
                key={visibleBanners.map((banner) => banner.id).join('-')}
                className="events-modal-carousel !pb-9 sm:!px-12"
                modules={[A11y, Keyboard, Navigation, Pagination]}
                navigation={visibleBanners.length > 1}
                loop={visibleBanners.length > 1}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                spaceBetween={18}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
              >
                {visibleBanners.map((banner) => (
                  <SwiperSlide key={banner.id}>
                    <button
                      type="button"
                      onClick={() => openWhatsApp(banner)}
                      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-navy shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      aria-label={`${t('eventsModal.buttons.bookWhatsApp')}: ${banner.title}`}
                    >
                      <Image
                        src={banner.image}
                        alt={banner.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 639px) 88vw, (max-width: 1023px) 44vw, 30vw"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                      <span className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-white/95 px-4 py-3 text-sm font-semibold text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        <MessageCircle className="h-4 w-4 text-[#25D366]" />
                        {t('eventsModal.buttons.bookWhatsApp')}
                      </span>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
