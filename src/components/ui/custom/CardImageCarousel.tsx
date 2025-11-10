'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'

type ImageItem = { src: string; alt: string }

type Props = {
  images: ImageItem[]
  className?: string
  intervalMs?: number
}

export default function CardImageCarousel({ images, className, intervalMs = 3500 }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const autoplayRef = useRef<number | null>(null)

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
    </div>
  )
}
