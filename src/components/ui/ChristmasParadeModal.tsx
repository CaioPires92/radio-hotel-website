'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function ChristmasParadeModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const shown = sessionStorage.getItem('paradeModalShown')
    if (shown) return
    let fired = false
    const fire = () => {
      if (!fired) {
        setOpen(true)
        fired = true
        sessionStorage.setItem('paradeModalShown', '1')
      }
    }
    const timer = setTimeout(fire, 20000)
    const onScroll = () => {
      if (window.scrollY > 600) {
        fire()
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full inline-flex items-center justify-center shadow"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-navy" />
            </button>
            <div className="relative w-full aspect-[60/49]">
              <Image src="/images/events/parada-de-natal.jpg" alt="Parada de Natal 2025" fill sizes="100vw" className="object-cover object-top" />
            </div>
            <div className="bg-white p-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold text-navy font-semibold text-xs max-w-max">Parada de Natal 2025</div>
              <h3 className="text-2xl font-serif font-bold text-navy">🎅 Parada de Natal 2025 ✨</h3>
              <p className="text-navy/80">Em dezembro, Serra Negra se enche de magia com as encantadoras Paradas de Natal, um evento gratuito que promete emocionar toda a família.</p>
              <p className="text-navy/75">Datas: 13, 17, 20, 23, 25 e 27 de dezembro • Horário: 20h</p>
              <div className="flex items-center gap-2 text-sm text-navy/70">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Rua Coronel Pedro Penteado, Serra Negra - SP</span>
              </div>
              <div className="flex gap-3 pt-1">
                <a
                  href="https://www.serranegra.sp.gov.br/eventos/abertura-do-natal-luzes-da-serra-2025-sera-em-14-de-novembro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-navy hover:bg-navy/90 text-white font-semibold"
                >
                  Saiba mais
                </a>
                <Button
                  variant="outline"
                  className="px-5 py-2.5 rounded-full border-navy/20 text-navy hover:bg-navy/5"
                  onClick={() => setOpen(false)}
                >
                  Fechar
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
