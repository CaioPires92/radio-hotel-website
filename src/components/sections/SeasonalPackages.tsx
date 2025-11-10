'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, PartyPopper, Sun, Phone } from 'lucide-react';

const packages = [
  {
    id: 'natal',
    title: 'Pacote de Natal',
    date: '23Ã¢â‚¬â€œ26 Dez',
    image: 'https://images.pexels.com/photos/3171207/pexels-photo-3171207.jpeg', // exemplo
    perks: ['MÃºsica ao vivo todas as noites','RecreaÃ§Ã£o adulto e infantil durante todo o pacote','Papai Noel','Coquetel com todos os tipos de bebidas inclusas atÃ© o final da ceia'],
    // price: 'a partir de R$ 1.890',
  },
  {
    id: 'reveillon',
    title: 'Pacote de RÃƒÂ©veillon',
    date: '28 DezÃ¢â‚¬â€œ02 Jan',
    image: 'https://images.pexels.com/photos/3036525/pexels-photo-3036525.jpeg',
    perks: ['Música ao vivo todas as noites', 'Recreação adulto e infantil durante todo o pacote', 'Coquetel com todos os tipos de bebidas inclusas até o final da ceia'],
    // price: 'a partir de R$ 2.490',
  },
  {
    id: 'ferias',
    title: 'FÃƒÂ©rias de Janeiro',
    date: 'MÃƒÂªs Todo',
    image: 'https://images.pexels.com/photos/61129/pexels-photo-61129.jpeg',
    perks: [
      'Música ao vivo todas as noites',
      'Recreação adulto e infantil',
      'Sexta-feira Noite Italiana com degustação de queijos e vinho',
      'Pensão completa (café da manhã, almoço e jantar)'
    ],
    // price: 'a partir de R$ 1.290',
  },
];

export default function SeasonalPackages() {
  const handleBookingClick = () => {
    const msg = 'OlÃƒÂ¡! Quero informaÃƒÂ§ÃƒÂµes dos pacotes de Natal/RÃƒÂ©veillon/FÃƒÂ©rias.';
    window.open(`https://wa.me/5519999999999?text=${encodeURIComponent(msg)}`, '_blank');
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
            Natal, RÃƒÂ©veillon e FÃƒÂ©rias de Janeiro Ã¢â‚¬â€ garanta jÃƒÂ¡ sua reserva.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              className="relative rounded-2xl overflow-hidden border border-gold/20 bg-white shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              viewport={{ once: true }}
            >
              <div className="relative h-44 sm:h-52">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    {pkg.id === 'natal' && <PartyPopper className="w-4 h-4" />}
                    {pkg.id === 'reveillon' && <Calendar className="w-4 h-4" />}
                    {pkg.id === 'ferias' && <Sun className="w-4 h-4" />}
                    <span className="font-semibold">{pkg.title}</span>
                  </div>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{pkg.date}</span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <ul className="text-navy/80 text-sm sm:text-base space-y-2 mb-4">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
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
