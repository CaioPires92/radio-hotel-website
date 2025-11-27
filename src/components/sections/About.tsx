'use client';

import { motion } from 'framer-motion';
import { Award, Users, Star, Wifi, Car, Coffee, Utensils, Dumbbell, Smile, Waves, TreePine, PlugZap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useTranslation } from '@/components/i18n/I18nProvider';

export default function About() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Wifi,
      title: t('about.features.wifi.title')
    },
    {
      icon: Car,
      title: t('about.features.parking.title')
    },
    {
      icon: Waves,
      title: 'Piscinas'
    },
    {
      icon: Coffee,
      title: t('about.features.breakfast.title')
    },
    {
      icon: Utensils,
      title: t('about.features.restaurant.title')
    },
    {
      icon: TreePine,
      title: 'Bosque'
    },
    {
      icon: Dumbbell,
      title: t('about.features.gym.title')
    },
    {
      icon: Smile,
      title: 'Monitoria de Lazer'
    },
    {
      icon: PlugZap,
      title: 'Carregador EV'
    },
    {
      icon: Users,
      title: t('about.features.events.title')
    }
  ];

  const stats = [
    { number: '80', label: t('about.stats.years') },
    { number: '60k', label: t('about.stats.park') },
    { number: '8.9', label: t('about.stats.rating') },
    { number: '9.9', label: t('about.stats.location') }
  ];

  return (
    <section id="about" className="py-20 bg-cream relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-gold/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-gold/20 rounded-full" />
      <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image Section - 60% */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  // src="/about-hotel.svg"
                  src="/about-hotel.jpg"
                  alt="Radio Hotel - Vista Externa"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gold/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-navy">{t('about.award.years')}</h4>
                    <p className="text-gold font-medium">{t('about.award.excellence')}</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-gold rounded-full opacity-60" />
              <div className="absolute top-10 -right-2 w-4 h-4 bg-gold rounded-full opacity-40" />
            </div>
          </motion.div>

          {/* Content Section - 40% */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Star className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-navy">{t('about.badge')}</span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-navy leading-tight">
                {t('about.title')}
                <span className="text-gold block">{t('about.location')}</span>
              </h2>
            </div>

            {/* Description */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-navy/80 leading-relaxed">
                {t('about.description1')}
              </p>

              <p className="text-lg text-navy/80 leading-relaxed">
                {t('about.description2')}
              </p>

              {(() => {
                const note = t('about.anniversaryNote');
                if (note !== 'about.anniversaryNote') {
                  return (
                    <p className="text-lg text-navy/80 leading-relaxed">{note}</p>
                  );
                }
                return null;
              })()}
            </motion.div>

            {/* Removidos daqui: Features Grid e Stats (serão exibidos abaixo) */}
          </motion.div>
        </div>

        {/* Features - faixa horizontal inferior */}
        <motion.div
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                {/* Mini card de feature segue padrão global .mini-card */}
                <Card className="mini-card mini-card-hover h-full border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="px-0 py-0">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <h4 className="font-semibold text-navy text-sm">{feature.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats - faixa horizontal inferior */}
        <motion.div
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gold/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl lg:text-3xl font-serif font-bold text-gold mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-navy/70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
