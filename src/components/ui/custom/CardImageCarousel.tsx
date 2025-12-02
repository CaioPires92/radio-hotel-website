"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import type { Swiper as SwiperType } from "swiper"

type ImageItem = { src: string; alt: string }

type Props = {
  images: ImageItem[]
  className?: string
  intervalMs?: number
  showDots?: boolean
  fit?: "cover" | "contain"
  showCountBadge?: boolean
  showArrows?: boolean
}

export default function CardImageCarousel({ images, className, intervalMs = 3500, showDots = true, fit = "cover", showCountBadge = false, showArrows = true }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  return (
    <div
      className={(className ? className + " " : "") + "relative w-full h-full bg-black"}
      aria-roledescription="carousel"
    >
      <Swiper
        className="absolute inset-0 w-full h-full pb-20 md:pb-24"
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: intervalMs, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        pagination={showDots ? { clickable: true } : false}
        onSwiper={setSwiper}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="w-full h-full flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="100vw"
                loading="lazy"
                className={(fit === "cover" ? "object-cover" : "object-contain")}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Imagem anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/35 hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={() => swiper && swiper.slidePrev()}
          >
            <ChevronLeft className="w-5 h-5" color="#FFFFFF" />
          </button>
          <button
            type="button"
            aria-label="Próxima imagem"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/35 hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={() => swiper && swiper.slideNext()}
          >
            <ChevronRight className="w-5 h-5" color="#FFFFFF" />
          </button>
        </>
      )}
      {showCountBadge && (
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-black/50 text-white text-xs font-medium shadow-md">
            {images.length}
          </span>
        </div>
      )}
    </div>
  )
}
