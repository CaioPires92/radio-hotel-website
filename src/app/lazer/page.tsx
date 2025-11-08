'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LazerPage() {
  const activities = [
    {
      title: 'Piscinas',
      description: 'Piscinas ao ar livre cercadas pela natureza para relaxar e se divertir.',
      image: '/images/facilities/piscina1.jpg',
    },
    {
      title: 'Academia',
      description: 'Espaço equipado para manter a rotina de exercícios durante a estadia.',
      image: '/images/facilities/academia1.jpg',
    },
    {
      title: 'Trilhas Ecológicas',
      description: 'Contato com a natureza em trilhas leves e bem sinalizadas.',
      image: '/images/facilities/natureza.jpg',
    },
    {
      title: 'Bosque de Pinheiros',
      description: 'Área verde para caminhadas e momentos de descanso ao ar livre.',
      image: '/images/facilities/bosque1.jpg',
    },
    {
      title: 'Monitoria de Lazer',
      description: 'Atividades guiadas para todas as idades em períodos programados.',
      image: '/images/facilities/brinquedo1.jpg',
    },
  ];

  return (
    <>
      <Navbar />

      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center text-center text-white">
        <Image src="/images/hero/hero3.jpg" alt="Lazer Radio Hotel" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Lazer e Atividades</h1>
          <p className="text-white/90 text-lg">Piscinas, academia, trilhas ecológicas e bosque.</p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            {activities.map((a, idx) => (
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
