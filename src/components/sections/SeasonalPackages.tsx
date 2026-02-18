'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, Sun, Phone } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/config';

const packages = [
  {
    id: 'pascoa',
    title: 'Pacote de Páscoa',
    date: 'Abril',
    image: '/images/hero/hero1.jpg',
    perks: [
      'Música ao vivo à noite',
      'Recreação adulto e infantil'
    ],
  },
  {
    id: 'tiradentes',
    title: 'Pacote Tiradentes',
    date: 'Abril',
    image: '/images/hero/hero2.jpg',
    perks: [
      'Música ao vivo à noite',
      'Recreação adulto e infantil'
    ],
  },
  {
    id: 'maio',
    title: 'Pacote 1º de Maio',
    date: 'Maio',
    image: '/images/hero/hero3.jpg',
    perks: [
      'Música ao vivo à noite',
      'Recreação adulto e infantil'
    ],
  },
  {
    id: 'corpus',
    title: 'Pacote Corpus Christi',
    date: 'Junho',
    image: '/images/facilities/ar-livre-1.jpg',
    perks: [
      'Música ao vivo à noite',
      'Recreação adulto e infantil'
    ],
  },
];

export default function SeasonalPackages() {
  const handleBookingClick = () => {
    const msg = 'Olá! Quero informações dos pacotes de Páscoa e Feriados.';
    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="pacotes" className="relative py-16 sm:py-20 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Pacotes Especiais
          </motion.h2>
          <motion.p
            className="text-navy/80 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Páscoa e Feriados — garanta já sua reserva.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              // Card usa o padrão global card-standard para manter largura/altura e hover consistentes
              className="group card-standard card-standard-hover h-full flex flex-col md:min-h-[560px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              viewport={{ once: true }}
            >
              {/* Wrapper de mídia 16:9 com crop central uniforme */}
              <div className="card-media-16x9">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="card-media-img-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    {pkg.id === 'pascoa' && <Sun className="w-4 h-4" />}
                    {pkg.id !== 'pascoa' && <Calendar className="w-4 h-4" />}
                    <span className="font-serif font-bold text-base sm:text-lg md:text-xl drop-shadow">{pkg.title}</span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base bg-white/25 px-3 py-1.5 rounded-full font-medium ring-1 ring-white/40">{pkg.date}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col gap-3">
                <ul className="text-navy/80 text-sm sm:text-base space-y-2 mb-4 flex-1">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto">
                  {/* <span className="text-navy font-semibold">{pkg.price}</span> */}
                  <Button
                    onClick={handleBookingClick}
                    className="bg-gold text-navy hover:bg-gold/90 font-semibold rounded-full"
                    aria-label={`Reservar ${pkg.title}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Reservar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
