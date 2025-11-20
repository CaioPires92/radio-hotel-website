'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
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
            <p className="text-navy/75">
              Desfrute de momentos de relaxamento nas piscinas cercadas pela natureza e
              diversão no nosso espaço de jogos para todas as idades.
            </p>
          </div>

          {/* Galeria à direita (com slide) */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/piscina.jpg', alt: 'Piscina principal' },
                { src: '/images/facilities/piscina1.jpg', alt: 'Piscina com área de descanso' },
                { src: '/images/facilities/piscina2.jpg', alt: 'Piscina externa integrada ao verde' },
                { src: '/images/facilities/piscina3.jpg', alt: 'Nova área da piscina' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>
        </div>
      </section>

      {/* Seção subsequente 1: Academia */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Galeria à esquerda (com slide) */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/academia1.jpg', alt: 'Academia com equipamentos' },
                { src: '/images/facilities/academia2.jpg', alt: 'Espaço fitness moderno' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>
          {/* Texto à direita */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Fitness Center</h3>
            <p className="text-navy/80">Completando suas opções de esportes e saúde, o Radio Hotel oferece seu Fitness Center.</p>
          </div>
        </div>
      </section>

      {/* Seção subsequente 2: Recreação */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Texto à esquerda */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Lazer para toda a família</h3>

            <div className="space-y-0">
              <h4 className="text-xl font-serif font-semibold text-navy">Bosque</h4>
              <p className="text-navy/75 mt-0">
                Área de 40.000 m² onde se encontra parte da área esportiva do hotel, com arco e
                flecha, pista de cooper e playground. Em um paisagismo com mais de 2.000 árvores.
              </p>
            </div>

            {/* Informações adicionais: Mini Clube e Monitores */}
            <div className="pt-2 space-y-4">
              <div className="space-y-0">
                <h4 className="text-xl font-serif font-semibold text-navy">Mini Clube</h4>
                <p className="text-navy/75 mt-0">Espaço exclusivo para crianças de 0 a 5 anos.</p>
              </div>
              <div className="space-y-0">
                <h4 className="text-xl font-serif font-semibold text-navy">Monitores</h4>
                <p className="text-navy/75 mt-0">Recreação infantil e adulta nos fins de semana, na alta temporada e em feriados prolongados.</p>
              </div>
            </div>
          </div>
          {/* Galeria à direita (com slide) */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/mini-club-1.jpg', alt: 'Recreação infantil no mini clube' },
                { src: '/images/facilities/mini-club-2.jpg', alt: 'Brincadeiras e jogos em família' },
                { src: '/images/facilities/bosque1.jpg', alt: 'Bosque de pinheiros' },
                { src: '/images/facilities/ar-livre-beach-tenis.jpg', alt: 'Quadra de beach tênis' },
                { src: '/images/facilities/ar-livre-1.jpg', alt: 'Atividade ao ar livre' },
                { src: '/images/facilities/ar-livre-2.jpg', alt: 'Lazer externo' },
                { src: '/images/facilities/ar-livre-4.jpg', alt: 'Contato com a natureza' },
                { src: '/images/facilities/gramado-parque-3.jpg', alt: 'Parque gramado' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>
        </div>
      </section>



      {/* Seção subsequente 3: Salão de Jogos (slide à esquerda, texto à direita) */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Carrossel à esquerda */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/sala-jogos.jpg', alt: 'Salão de jogos' },
                { src: '/images/facilities/sala-jogos-2.jpg', alt: 'Jogos e diversão' },
                { src: '/images/facilities/sala-jogos-3.jpg', alt: 'Espaço de jogos' },
                { src: '/images/facilities/sala-jogos-4.jpg', alt: 'Salão com mesa de jogos' },
                { src: '/images/facilities/sala-jogos-5.jpg', alt: 'Salão de jogos adulto' },
                { src: '/images/facilities/sala-jogos-6.jpg', alt: 'Jogos para todas as idades' },
                { src: '/images/facilities/sala-jogos-8.jpg', alt: 'Ambiente de recreação' },
                { src: '/images/facilities/sala-jogos-9.jpg', alt: 'Diversão em grupo' },
                { src: '/images/facilities/sala-jogos-10.jpg', alt: 'Salão de jogos amplo' },
                { src: '/images/facilities/sala-jogos-11.jpg', alt: 'Jogos em família' },
                { src: '/images/facilities/sala-jogos-12.jpg', alt: 'Área de lazer interna' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
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







      <Footer />
    </>
  );
}

