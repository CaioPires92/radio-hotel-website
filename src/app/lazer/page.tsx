'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CardImageCarousel from '@/components/ui/custom/CardImageCarousel';

export default function LazerPage() {
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

      {/* Seção em duas colunas: informações à esquerda, galeria à direita */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Texto à esquerda */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">Piscina</h2>
            <p className="text-navy/80 text-lg">Piscina e salão de jogos.</p>
            <p className="text-navy/75">
              Desfrute de momentos de relaxamento nas piscinas cercadas pela natureza e
              diversão no nosso espaço de jogos para todas as idades.
            </p>
          </div>

          {/* Galeria à direita (com slide) */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-72 sm:h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/piscina1.jpg', alt: 'Piscina com área de descanso' },
                { src: '/images/facilities/piscina2.jpg', alt: 'Piscina externa integrada ao bosque' },
                { src: '/images/facilities/brinquedo1.jpg', alt: 'Espaço de jogos e recreação' },
              ]}
              className="h-72 sm:h-80 md:h-96"
              showDots
            />
          </div>
        </div>
      </section>

      {/* Seção subsequente 1: Academia */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Galeria à esquerda (com slide) */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-64 sm:h-72 md:h-80">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/academia1.jpg', alt: 'Academia com equipamentos' },
                { src: '/images/facilities/academia2.jpg', alt: 'Espaço fitness moderno' },
              ]}
              className="h-64 sm:h-72 md:h-80"
              showDots
            />
          </div>
          {/* Texto à direita */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Academia</h3>
            <p className="text-navy/80">Espaço equipado para manter a rotina de exercícios durante a estadia, com aparelhos modernos e ambiente climatizado.</p>
          </div>
        </div>
      </section>

      {/* Seção subsequente 2: Recreação */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Texto à esquerda */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Recreação</h3>
            <p className="text-navy/80">Atividades orientadas para todas as idades com nossa equipe, incluindo brincadeiras, dinâmicas e jogos em família.</p>
          </div>
          {/* Galeria à direita (com slide) */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-64 sm:h-72 md:h-80">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/brinquedo1.jpg', alt: 'Recreação infantil no salão' },
                { src: '/images/facilities/sports.jpg', alt: 'Atividades e jogos com a equipe' },
                { src: '/images/facilities/natureza.jpg', alt: 'Recreação ao ar livre' },
              ]}
              className="h-64 sm:h-72 md:h-80"
              showDots
            />
          </div>
        </div>
      </section>

      

      {/* Seção subsequente 3: Salão de Jogos (slide à esquerda, texto à direita) */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Carrossel à esquerda */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-64 sm:h-72 md:h-80">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/brinquedo1.jpg', alt: 'Salão de jogos infantil' },
                { src: '/images/facilities/sports.jpg', alt: 'Área de jogos e esportes' },
                { src: '/images/facilities/facilities.jpg', alt: 'Ambiente de lazer interno' },
              ]}
              className="h-64 sm:h-72 md:h-80"
              showDots
            />
          </div>

          {/* Texto à direita */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Salão de Jogos</h3>
            <p className="text-navy/80">
              Diversão garantida com mesa de bilhar, pebolim e jogos para todas as idades, em um ambiente
              acolhedor e integrado às áreas de lazer do hotel.
            </p>
          </div>
        </div>
      </section>

      {/* Área do Bosque: texto à esquerda, slide à direita */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Texto à esquerda */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">Área do Bosque</h2>
            <p className="text-navy/80 text-lg">Quadra de tênis, quadra de beach tênis e piscina externa.</p>
            <p className="text-navy/75">
              Conecte-se com a natureza em nosso bosque, com áreas esportivas e espaços ao ar livre
              perfeitos para atividades em família e momentos de bem-estar.
            </p>
          </div>

          {/* Galeria à direita (com slide) */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-72 sm:h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/sports.jpg', alt: 'Quadra de tênis' },
                { src: '/images/facilities/facilities-2.jpg', alt: 'Quadra de beach tênis' },
                { src: '/images/facilities/piscina2.jpg', alt: 'Piscina externa próxima ao bosque' },
              ]}
              className="h-72 sm:h-80 md:h-96"
              showDots
            />
          </div>
        </div>
      </section>

      {/* Trilhas e Natureza: slide à esquerda, texto à direita */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Galeria à esquerda (com slide) */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-64 sm:h-72 md:h-80">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/natureza.jpg', alt: 'Trilha em meio à natureza' },
                { src: '/images/facilities/bosque1.jpg', alt: 'Bosque de pinheiros' },
                { src: '/images/facilities/chapadao.jpg', alt: 'Vista do chapadão' },
              ]}
              className="h-64 sm:h-72 md:h-80"
              showDots
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Trilhas e Natureza</h3>
            <p className="text-navy/80">Caminhos sombreados e paisagens para contemplação e atividades ao ar livre.</p>
          </div>
        </div>
      </section>

      {/* Lazer ao Ar Livre: texto à esquerda, slide à direita */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Lazer ao Ar Livre</h3>
            <p className="text-navy/80">Atividades esportivas, sala de jogos e contato com a natureza para momentos inesquecíveis.</p>
          </div>
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-64 sm:h-72 md:h-80">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/sports.jpg', alt: 'Quadra de esportes' },
                { src: '/images/facilities/natureza.jpg', alt: 'Natureza ao redor do hotel' },
                { src: '/images/facilities/piscina2.jpg', alt: 'Piscina externa' },
                { src: '/images/facilities/brinquedo1.jpg', alt: 'Sala de jogos' },
              ]}
              className="h-64 sm:h-72 md:h-80"
              showDots
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
