'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type ImageItem = { src: string; alt: string }

type Props = {
  images: ImageItem[]
  className?: string
  intervalMs?: number
  showDots?: boolean
}

export default function CardImageCarousel({ images, className, intervalMs = 3500, showDots = false }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const autoplayRef = useRef<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  useEffect(() => {
    if (!emblaApi) return
    const play = () => emblaApi.scrollNext()
    autoplayRef.current = window.setInterval(play, intervalMs)
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current)
    }
  }, [emblaApi, intervalMs])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi || !showDots) return
    setScrollSnaps(emblaApi.scrollSnapList())
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, showDots])

  return (
    <div className={"relative overflow-hidden " + (className ?? '')} ref={emblaRef} aria-roledescription="carousel">
      <div className="flex">
        {images.map((img, idx) => (
          <div key={idx} className="flex-[0_0_100%] min-w-0">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* gradient overlay to match card style */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />

      {/* Setas discretas */}
      <button
        type="button"
        aria-label="Slide anterior"
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-black/30 text-white shadow transition opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-black/40"
      >
        <ChevronLeft aria-hidden className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Próximo slide"
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-black/30 text-white shadow transition opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-black/40"
      >
        <ChevronRight aria-hidden className="h-4 w-4" />
      </button>

      {showDots && scrollSnaps.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Ir ao slide ${i + 1}`}
              aria-current={i === selectedIndex}
              className={'h-1.5 w-1.5 rounded-full transition ' + (i === selectedIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80')}
            />
          ))}
        </div>
      )}
    </div>
  )
}
