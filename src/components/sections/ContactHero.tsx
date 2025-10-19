'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/components/i18n/I18nProvider';

interface ContactHeroProps {
  heightClass?: string;
  imageSrc?: string;
  callNumberE164?: string;
  whatsappHref?: string;
}

export default function ContactHero({
  heightClass = 'min-h-[50vh] md:min-h-[60vh]',
  imageSrc = '/images/hero/hero2.jpg',
  callNumberE164 = '+551938923311',
  whatsappHref,
}: ContactHeroProps) {
  const { t } = useTranslation();

  const handleCall = () => {
    window.location.href = `tel:${callNumberE164}`;
  };

  const handleWhatsApp = () => {
    if (whatsappHref) {
      window.open(whatsappHref, '_blank');
    }
  };

  return (
    <section
      id="contact-hero"
      className={`relative ${heightClass} overflow-hidden flex items-center justify-center`}
      role="region"
      aria-label={t('navigation.contact')}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={t('navigation.contact')}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 to-blue/60" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <motion.h1
                className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('contact.title')}
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl font-light mb-8 text-gold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t('contact.subtitle')}
              </motion.h2>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button
                  onClick={handleCall}
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-[180px]"
                  aria-label={t('navigation.bookNow')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t('contact.cta.callNow') || t('navigation.bookNow')}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gold text-white bg-transparent hover:bg-gold hover:text-navy font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 min-w-[180px]"
                  onClick={handleWhatsApp}
                  aria-label={t('contact.whatsapp')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('contact.cta.whatsapp') || t('contact.whatsapp')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}