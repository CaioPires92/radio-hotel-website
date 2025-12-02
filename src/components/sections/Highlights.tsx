'use client'

import type { ComponentType, SVGProps } from 'react'
import { useTranslation } from '@/components/i18n/I18nProvider'
import CardImageCarousel from '@/components/ui/custom/CardImageCarousel'
import { ArrowRight, Waves, Utensils, Leaf } from 'lucide-react'
import Image from 'next/image'

type Item = {
  title: string
  description: string
  href: string
  images: { src: string; alt: string }[]
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export default function Highlights() {
  const { t } = useTranslation()

  const items: Item[] = [
    {
      title: t('highlights.leisure.title'),
      description: t('highlights.leisure.description'),
      href: '/lazer',
      icon: Waves,
      images: [
        { src: '/images/facilities/thumbs-16x9/piscina1.jpg', alt: 'Piscina do hotel com área de descanso' },
        { src: '/images/facilities/thumbs-16x9/piscina2.jpg', alt: 'Piscina externa integrada ao bosque' },
        { src: '/images/facilities/thumbs-16x9/piscina3.jpg', alt: 'Nova área da piscina' },
        { src: '/images/facilities/thumbs-16x9/mini-club-1.jpg', alt: 'Espaço de jogos e recreação' },
        { src: '/images/facilities/thumbs-16x9/mini-club-2.jpg', alt: 'Mini clube para crianças' },
        { src: '/images/facilities/thumbs-16x9/ar-livre-beach-tenis.jpg', alt: 'Quadra de beach tênis ao ar livre' },
      ],
    },
    {
      title: t('highlights.gastronomy.title'),
      description: t('highlights.gastronomy.description'),
      href: '/restaurante',
      icon: Utensils,
      images: [
        { src: '/images/restaurant/thumbs-16x9/restaurante1.jpg', alt: 'Ambiente do restaurante' },
        { src: '/images/restaurant/thumbs-16x9/restaurante2.jpg', alt: 'Restaurante Cinquentenário' },
        { src: '/images/restaurant/thumbs-16x9/restaurante3.jpg', alt: 'Restaurante Paradiso' },
      ],
    },
    {
      title: t('highlights.comfort.title'),
      description: t('highlights.comfort.description'),
      href: '/acomodacoes',
      icon: Leaf,
      images: [
        { src: '/images/rooms/thumbs-16x9/suite-luxo.jpg', alt: 'Suíte Luxo' },
        { src: '/images/rooms/thumbs-16x9/Suite-Master-com-sacada-e-vista-para-a-piscina.jpg', alt: 'Suíte Master' },
        { src: '/images/rooms/thumbs-16x9/Apartamento-Standard-com-vista-interna.jpg', alt: 'Apartamento Standard' },
        { src: '/images/rooms/thumbs-16x9/Apartamento-Standard-frente-rua.jpg', alt: 'Apartamento Standard (frente rua)' },
        { src: '/images/rooms/thumbs-16x9/Apartamento-luxo-com-vista-para-a-piscina-ou-jardim.jpg', alt: 'Apartamento Luxo' },
        { src: '/images/rooms/thumbs-16x9/conjugado.jpg', alt: 'Apto Conjugado' },
        { src: '/images/rooms/thumbs-16x9/conjugado2.jpg', alt: 'Apto Conjugado (variação)' },
      ],
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-cream" id="highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção com pattern sutil */}
        <div className="relative text-center mb-12 md:mb-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[url('/parallax-bg.svg')] bg-repeat bg-[length:280px] bg-center opacity-10 highlights-pattern-overlay"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-6 right-0 translate-x-6 hidden md:block opacity-10"
            aria-hidden
          >
            <Image src="/about-hotel.svg" alt="Elemento decorativo do hotel" width={224} height={224} />
          </div>
          <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
            {t('highlights.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">
            {t('highlights.title')}
          </h2>
          <p className="text-lg text-navy/80 max-w-3xl mx-auto leading-relaxed">
            {t('highlights.subtitle')}
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {items.map((item, idx) => {
            const reverse = idx % 2 === 1
            const Icon = item.icon || Waves
            return (
              <div
                key={item.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center"
              >
                {/* Card / Carousel – usa o mesmo padrão visual de card da home */}
                <div className={reverse ? 'order-2 lg:order-2' : 'order-1 lg:order-1'}>
                  <div className="group card-standard card-standard-hover relative overflow-hidden">
                    <CardImageCarousel images={item.images} fit="cover" className="h-72 md:h-96" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full shadow chip-dark">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`${reverse ? 'order-1 lg:order-1' : 'order-2 lg:order-2'} mt-4 lg:mt-0`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gold/90 text-navy flex items-center justify-center shadow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-navy/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm md:text-base text-navy font-semibold px-4 py-2 border border-navy/15 rounded-full hover:border-gold hover:text-gold hover:bg-gold/5 transition-colors"
                    aria-label={`Saiba mais sobre ${item.title}`}
                  >
                    Saiba mais
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
