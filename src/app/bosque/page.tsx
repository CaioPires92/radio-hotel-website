'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BosquePage() {
  const attractions = [
    {
      title: 'Bosque de Pinheiros',
      description: 'Área verde com paisagismo para relaxar, ler e aproveitar o ar livre.',
      image: '/images/facilities/bosque1.jpg',
    },
    {
      title: 'Quadra de Tênis',
      description: 'Estrutura para prática de tênis em meio à natureza, ideal para todos os níveis.',
      image: '/images/facilities/quadra-tenis.jpg',
    },
    {
      title: 'Quadra de Beach Tennis',
      description: 'Areia branca e espaço dedicado para beach tennis com amigos e família.',
      image: '/images/facilities/beach-tenis.jpg',
    },
    {
      title: 'Área da Piscina Externa',
      description: 'Espaço amplo com espreguiçadeiras e vista do bosque para momentos de lazer.',
      image: '/images/facilities/piscina-externa.jpg',
    },
  ];

  return (
    <>
      <Navbar />

      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center text-center text-white">
        <Image src="/images/facilities/bosque1.jpg" alt="Área do Bosque" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Área do Bosque</h1>
          <p className="text-white/90 text-lg">Quadra de tênis, quadra de beach tennis e área da piscina externa.</p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            {attractions.map((a, idx) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-md"
              >
                <div className="relative h-56">
                  <Image src={a.image} alt={a.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-serif font-bold text-navy mb-3">{a.title}</h2>
                  <p className="text-navy/80">{a.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
