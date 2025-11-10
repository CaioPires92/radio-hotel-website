'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type ImageItem = { src: string; alt: string }

type Props = {
  title: string
  subtitle?: string
  images: ImageItem[]
  intervalMs?: number
  className?: string
}

export default function ImageCarousel({
  title,
  subtitle,
  images,
  intervalMs = 4000,
  className,
}: Props) {
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

  useEffect(() => {
    if (!emblaApi) return
    const play = () => {
      if (!isHovering.current) emblaApi.scrollNext()
    }
    autoplayRef.current = window.setInterval(play, intervalMs)
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current)
    }
  }, [emblaApi, intervalMs])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  return (
    <section className={"py-12 sm:py-16 " + (className ?? '')}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy">{title}</h2>
          {subtitle && <p className="text-navy/80 mt-1 sm:mt-2">{subtitle}</p>}
        </div>

        <div
          className="relative w-full flex justify-center"
          onMouseEnter={() => (isHovering.current = true)}
          onMouseLeave={() => (isHovering.current = false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') scrollPrev()
            if (e.key === 'ArrowRight') scrollNext()
          }}
        >
          <div
            className="relative w-full max-w-[720px] md:max-w-[840px]"
          >
            <div
              className="overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-lg"
              ref={emblaRef}
              tabIndex={0}
              aria-roledescription="carousel"
              aria-label={title}
            >
              <div className="flex">
                {images.map((img, idx) => (
                  <div key={idx} className="flex-[0_0_100%] min-w-0">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-64 sm:h-80 md:h-96 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

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
      </div>
    </section>
  )
}

