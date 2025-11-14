'use client'

import {
  Waves,
  Utensils,
  TreePine,
  Dumbbell,
  Trophy,
  Car,
  Wifi,
  PlugZap,
} from 'lucide-react'

type Feature = {
  icon: React.ComponentType<{ className?: string }>
  label: string
}

const features: Feature[] = [
  { icon: Waves, label: 'Piscinas' },
  { icon: Utensils, label: 'Restaurantes' },
  { icon: TreePine, label: 'Bosque' },
  { icon: Dumbbell, label: 'Academia' },
  { icon: Trophy, label: 'Eventos' },
  { icon: Car, label: 'Estacionamento' },
  { icon: Wifi, label: 'Wi‑Fi' },
  { icon: PlugZap, label: 'Carregador EV' },
]

export default function FeatureIcons() {
  return (
    <section className="relative py-10 md:py-14 bg-cream">
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/parallax-bg.svg')] bg-repeat bg-[length:280px] bg-center opacity-[0.04]"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                // Mini card de ícone usa o mesmo padrão global .mini-card
                className="mini-card mini-card-hover"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gold/90 text-navy flex items-center justify-center shadow">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <span className="text-navy font-semibold tracking-wide text-sm md:text-base">
                  {f.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
