"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"

type ImageItem = { src: string; alt: string }

type Props = {
  images: ImageItem[]
  className?: string
  intervalMs?: number
  showDots?: boolean
  fit?: "cover" | "contain"
}

export default function CardImageCarousel({ images, className, intervalMs = 3500, showDots = true, fit = "cover" }: Props) {
  return (
    <div className={(className ? className + " " : "") + "relative w-full h-full"} aria-roledescription="carousel">
      <div className="relative w-full aspect-[16/9]">
        <Swiper
          className="absolute inset-0"
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: intervalMs, disableOnInteraction: false }}
          loop
          slidesPerView={1}
          pagination={showDots ? { clickable: true } : false}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={"block w-full h-full " + (fit === "cover" ? "object-cover" : "object-contain")}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
