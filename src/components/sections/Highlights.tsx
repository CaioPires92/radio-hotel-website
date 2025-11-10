'use client'

import { useTranslation } from '@/components/i18n/I18nProvider'
import CardImageCarousel from '@/components/ui/custom/CardImageCarousel'
import { ArrowRight } from 'lucide-react'

type Item = {
  title: string
  description: string
  href: string
  images: { src: string; alt: string }[]
}

export default function Highlights() {
  const { t } = useTranslation()

  const items: Item[] = [
    {
      title: t('highlights.leisure.title'),
      description: t('highlights.leisure.description'),
      href: '/lazer',
      images: [
        { src: '/images/facilities/piscina1.jpg', alt: 'Piscina do hotel com área de descanso' },
        { src: '/images/facilities/piscina2.jpg', alt: 'Piscina externa integrada ao bosque' },
        { src: '/images/facilities/brinquedo1.jpg', alt: 'Espaço de jogos e recreação' },
      ],
    },
    {
      title: t('highlights.bosque.title'),
      description: t('highlights.bosque.description'),
      href: '/bosque',
      images: [
        { src: '/images/facilities/sports.jpg', alt: 'Quadra de tênis' },
        { src: '/images/facilities/facilities-2.jpg', alt: 'Quadra de beach tênis' },
        { src: '/images/facilities/piscina2.jpg', alt: 'Piscina externa próxima ao bosque' },
      ],
    },
    {
      title: t('highlights.gastronomy.title'),
      description: t('highlights.gastronomy.description'),
      href: '/restaurante',
      images: [
        { src: '/images/restaurant/restaurante1.jpg', alt: 'Ambiente do restaurante' },
        { src: '/images/restaurant/restaurante2.jpg', alt: 'Restaurante Cinquentenário' },
        { src: '/images/restaurant/restaurante3.jpg', alt: 'Restaurante Paradiso' },
      ],
    },
    {
      title: t('highlights.comfort.title'),
      description: t('highlights.comfort.description'),
      href: '/acomodacoes',
      images: [
        { src: '/images/rooms/luxo-1.jpg', alt: 'Apartamento Luxo' },
        { src: '/images/rooms/master-especial.jpg', alt: 'Suíte Master Especial' },
        { src: '/images/rooms/standard-1.jpg', alt: 'Apartamento Standard' },
      ],
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-cream" id="highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12 md:mb-16">
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
            return (
              <div key={item.title} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Card / Carousel */}
                <div className={reverse ? 'order-2 lg:order-2' : 'order-1 lg:order-1'}>
                  <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-64 sm:h-80">
                    <CardImageCarousel images={item.images} className="h-64 sm:h-80" />
                  </div>
                </div>

                {/* Text */}
                <div className={reverse ? 'order-1 lg:order-1' : 'order-2 lg:order-2'}>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
                    {item.title}
                  </h3>
                  <p className="text-navy/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
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
