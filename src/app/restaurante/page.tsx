'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function RestaurantePage() {
  const restaurants = [
    {
      title: 'Restaurante Cinquentenário',
      image: '/images/restaurant/restaurante2.jpg',
      alt: 'Restaurante Cinquentenário',
      description:
        'Ambiente requintado e a tradição de sempre servir o melhor cardápio à la carte (domingo à quinta‑feira) ou buffet completo de frios, saladas e doces (finais de semana, feriados e períodos de alta temporada).',
    },
    {
      title: 'Restaurante Paradiso',
      image: '/images/restaurant/restaurante3.jpg',
      alt: 'Restaurante Paradiso',
      description:
        'Junto ao bosque de mata nativa, de frente para as piscinas. Cardápio de grelhados e buffet completo de frios, saladas e doces, aberto nas altas temporadas e feriados.',
    },
  ];

  return (
    <>
      <Navbar />

      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center text-center text-white">
        <Image src="/images/restaurant/restaurante1.jpg" alt="Restaurantes do Radio Hotel" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Restaurantes</h1>
          <p className="text-white/90 text-lg">Experiências gastronômicas em ambientes únicos.</p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            {/* Texto à esquerda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gold/10">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-3">{restaurants[0].title}</h2>
                <p className="text-navy/85 leading-relaxed">{restaurants[0].description}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gold/10">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-3">{restaurants[1].title}</h2>
                <p className="text-navy/85 leading-relaxed">{restaurants[1].description}</p>
              </div>
            </motion.div>

            {/* Galeria à direita */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="relative h-40 md:h-56 lg:h-64 rounded-xl overflow-hidden shadow-sm">
                  <Image src="/images/restaurant/restaurante1.jpg" alt="Ambiente do restaurante" fill className="object-cover" />
                </div>
                <div className="relative h-40 md:h-56 lg:h-64 rounded-xl overflow-hidden shadow-sm">
                  <Image src="/images/restaurant/restaurante2.jpg" alt="Restaurante Cinquentenário" fill className="object-cover" />
                </div>
                <div className="relative h-40 md:h-56 lg:h-64 rounded-xl overflow-hidden shadow-sm col-span-2">
                  <Image src="/images/restaurant/restaurante3.jpg" alt="Restaurante Paradiso" fill className="object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
