'use client';

import { motion } from 'framer-motion';
import {
  Leaf,
  Waves,
  Mountain,
  Utensils,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  TreePine,
  MapPin,
  Star,
  PlugZap,
  BatteryCharging,
  Trophy
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useTranslation } from '@/components/i18n/I18nProvider';

const Highlights = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      id: 0,
      icon: TreePine,
      title: t('highlights.nature.title'),
      description: t('highlights.nature.description'),
      image: '/images/facilities/natureza.jpg',
    },
    {
      id: 1,
      icon: MapPin,
      title: t('highlights.location.title'),
      description: t('highlights.location.description'),
      image: '/images/facilities/bosque1.jpg',
    },
    {
      id: 2,
      icon: Waves,
      title: t('highlights.wellness.title'),
      description: t('highlights.wellness.description'),
      image: '/images/facilities/piscina3.jpg',
    },
    {
      id: 3,
      icon: Utensils,
      title: t('highlights.gastronomy.title'),
      description: t('highlights.gastronomy.description'),
      image: '/images/restaurant/restaurante1.jpg',
    },
    {
      id: 4,
      icon: Leaf,
      title: t('highlights.comfort.title'),
      description: t('highlights.comfort.description'),
      image: '/images/rooms/luxo-1.jpg',
    },
    // removed highlights: service and business
    {
      id: 8,
      icon: Trophy,
      title: t('highlights.sports.title'),
      description: t('highlights.sports.description'),
      image: '/images/facilities/sports.jpg',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="highlights" className="py-20 bg-white">
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
            {t('highlights.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            {t('highlights.title')}
          </h2>
          <p className="text-lg text-navy/80 max-w-3xl mx-auto leading-relaxed">
            {t('highlights.subtitle')}
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.id}
                variants={itemVariants}
                className="group relative"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-105 py-0">
                  <CardContent className="p-0 relative">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={highlight.image}
                        alt={`${highlight.title} - ${highlight.description}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />

                      {/* Icon */}
                      <div className="absolute top-4 left-4 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-navy" />
                      </div>

                      {/* Golden Border Effect on Hover */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                        {highlight.title}
                      </h3>

                      <p className="text-navy/80 mb-4 leading-relaxed">
                        {highlight.description}
                      </p>

                      {/* Decorative Element */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-center">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Services */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-navy to-blue rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-cream mb-6">
            Serviços Complementares
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Wifi, name: 'Wi-Fi Gratuito' },
              { icon: Car, name: 'Estacionamento' },
              { icon: Dumbbell, name: 'Academia' },
              { icon: PlugZap, name: 'Carregador Elétrico' },
            ].map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/30 transition-colors duration-300">
                    <ServiceIcon className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-semibold text-cream mb-1">{service.name}</h4>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;