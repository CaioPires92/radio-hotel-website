'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CardImageCarousel from '@/components/ui/custom/CardImageCarousel';

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

      {/* Seção principal: informações à esquerda, galeria à direita */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Texto à esquerda */}
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">Restaurantes</h2>
            <div className="space-y-4">
              <div className="space-y-0">
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-navy">Restaurante Cinquentenário:</h3>
                <p className="text-navy/80">
                  Ambiente requintado e a tradição de sempre servir o melhor cardápio à la carte (domingo à
                  quinta-feira) ou buffet completo de frios, saladas e doces (finais de semana, feriados e
                  períodos de alta temporada).
                </p>
              </div>
              <div className="space-y-0">
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-navy">Restaurante Paradiso:</h3>
                <p className="text-navy/80">
                  Junto ao bosque de mata nativa, de frente para as piscinas. Cardápio de grelhados e buffet completo
                  de frios, saladas e doces.
                </p>
              </div>
            </div>
          </div>

          {/* Galeria à direita (com slide) */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/restaurant/restaurante1.jpg', alt: 'Ambiente do restaurante' },
                { src: '/images/restaurant/restaurante2.jpg', alt: 'Restaurante Cinquentenário' },
                { src: '/images/restaurant/restaurante3.jpg', alt: 'Restaurante Paradiso' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>
        </div>
      </section>

      {/* Seção secundária removida: manter apenas um card rolando com fotos */}

      <Footer />
    </>
  );
}
