'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const images = [
  { src: 'https://picsum.photos/id/1018/1200/800', alt: 'Paisagem montanhosa ao entardecer' },
  { src: 'https://picsum.photos/id/1015/1200/800', alt: 'Lago com árvores ao fundo' },
  { src: 'https://picsum.photos/id/1016/1200/800', alt: 'Estrada entre colinas verdes' },
  { src: 'https://picsum.photos/id/1020/1200/800', alt: 'Vista aérea de floresta densa' },
]

export default function Page() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const isHovering = useRef(false)
  const autoplayRef = useRef<number | null>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  // Autoplay simples com pausa no hover
  useEffect(() => {
    if (!emblaApi) return
    const play = () => {
      if (!isHovering.current) emblaApi.scrollNext()
    }
    autoplayRef.current = window.setInterval(play, 4000)
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-6 sm:px-10 py-16 sm:py-20">
      <div className="space-y-4 max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0a0d29]">
          Área Comum
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Experiência confortável com espaços pensados para descanso, convivência e boas memórias.
          Explore alguns registros do ambiente.
        </p>
      </div>

      <div className="flex w-full justify-center">
        <div
          className="relative w-[320px] sm:w-[420px] md:w-[520px]"
          onMouseEnter={() => (isHovering.current = true)}
          onMouseLeave={() => (isHovering.current = false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') scrollPrev()
            if (e.key === 'ArrowRight') scrollNext()
          }}
        >
          <div
            className="overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-lg"
            ref={emblaRef}
            tabIndex={0}
            aria-roledescription="carousel"
            aria-label="Galeria de imagens da área comum"
          >
            <div className="flex">
              {images.map((img, idx) => (
                <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-72 sm:h-96">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botões de navegação */}
          <button
            type="button"
            aria-label="Slide anterior"
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full h-10 w-10 bg-[#b2ab70] text-[#0a0d29] shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#b2ab70]/60"
          >
            <ChevronLeft aria-hidden className="h-5 w-5" />
            <span className="sr-only">Anterior</span>
          </button>
          <button
            type="button"
            aria-label="Próximo slide"
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full h-10 w-10 bg-[#b2ab70] text-[#0a0d29] shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#b2ab70]/60"
          >
            <ChevronRight aria-hidden className="h-5 w-5" />
            <span className="sr-only">Próximo</span>
          </button>

          {/* Paginação (dots) */}
          <div className="flex items-center justify-center gap-2 mt-4" aria-label="Paginação do carrossel">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Ir ao slide ${i + 1}`}
                aria-current={i === selectedIndex}
                className={
                  'h-2.5 w-2.5 rounded-full transition ' +
                  (i === selectedIndex ? 'bg-[#b2ab70]' : 'bg-black/20 hover:bg-black/30')
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
