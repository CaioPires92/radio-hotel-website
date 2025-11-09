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
      title: 'Salão de Jogos',
      description: 'Diversão garantida com mesa de bilhar, pebolim e jogos para todas as idades.',
      image: '/images/facilities/salao-jogos.jpg',
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
          <p className="text-white/90 text-lg">Piscinas, academia e salão de jogos.</p>
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

      {/* Informações adicionais de lazer */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold text-navy mb-2">Fitness Center</h3>
              <p className="text-navy/80">Completando suas opções de esportes e saúde, o Rádio Hotel oferece seu Fitness Center.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold text-navy mb-2">Mini Clube</h3>
              <p className="text-navy/80">Este espaço é reservado para crianças de 0 até 5 anos de idade.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold text-navy mb-2">Monitores</h3>
              <p className="text-navy/80">Recreação infantil e adulto na área de esporte aos finais de semana, todos os dias da alta temporada e em feriados prolongados.</p>
            </motion.div>

            {/* Imagens adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {[
                { title: 'Fitness Center', image: '/images/facilities/academia2.jpg' },
                { title: 'Mini Clube', image: '/images/facilities/brinquedo1.jpg' },
                { title: 'Monitores', image: '/images/facilities/sports.jpg' },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-navy">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
