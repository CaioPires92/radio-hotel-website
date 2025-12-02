"use client"

import type { ReactElement } from "react"

export default function IeOverlayTestPage(): ReactElement {
  return (
    <main className="min-h-screen bg-cream text-navy">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">
            IE / Windows 7 – Overlay Test
          </h1>
          <p className="text-navy/80 text-sm sm:text-base max-w-2xl">
            Página técnica provisória para validar fallbacks de overlays, mini-cards
            e efeitos semitransparentes em navegadores antigos (IE11 / Windows 7).
            Em navegadores modernos, o visual deve permanecer idêntico ao restante do site.
          </p>
        </header>

        {/* 1. Card overlay escuro genérico */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">1. Card overlay escuro (`.card-overlay-dark`)</h2>
          <p className="text-sm text-navy/75">
            Fundo com imagem e overlay escuro usando a classe global <code>card-overlay-dark</code>.
            No IE/Win7 o fundo deve continuar visível com um véu em <code>rgba(0,0,0,0.4)</code>.
          </p>
          <div className="relative h-40 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg bg-[url('/images/hero/hero2.jpg')] bg-cover bg-center">
            {/* Força o overlay a ficar sempre visível neste exemplo de teste */}
            <div className="card-overlay-dark" style={{ opacity: 0.8 }} />
            <div className="relative z-10 h-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm sm:text-base">
                Overlay escuro padrão (.card-overlay-dark)
              </span>
            </div>
          </div>
        </section>

        {/* 2. Mini-card global */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">2. Mini-card global (`.mini-card`)</h2>
          <p className="text-sm text-navy/75">
            Exemplo do mini-card usado em diversas seções. Em IE/Win7 o fundo deve ficar em
            <code>rgba(255,255,255,0.9)</code> sem blur.
          </p>
          <div className="mini-card">
            <div className="h-8 w-8 rounded-lg bg-gold/10 flex items-center justify-center mr-2">
              <span className="text-gold text-sm font-semibold">★</span>
            </div>
            <div>
              <div className="font-semibold text-sm">Mini-card de teste</div>
              <div className="text-xs text-navy/70">Fallback de background em IE/Win7</div>
            </div>
          </div>
        </section>

        {/* 3. Chip escuro (label) */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">3. Chip escuro (`.chip-dark`)</h2>
          <p className="text-sm text-navy/75">
            Chip/label com <code>bg-black/60</code> + classe auxiliar <code>chip-dark</code>.
            Em IE/Win7, o fallback garante <code>rgba(0,0,0,0.6)</code>.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full shadow chip-dark">
              Chip Dark – overlay de texto
            </span>
            <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full shadow">
              Versão sem chip-dark (comparação)
            </span>
          </div>
        </section>

        {/* 4. Badge dourado com blur */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">4. Badge dourado com blur (`.badge-gold-soft`)</h2>
          <p className="text-sm text-navy/75">
            Replica o badge da seção Parallax: <code>bg-gold/20</code> com <code>backdrop-blur-sm</code>.
            A classe <code>badge-gold-soft</code> garante um fundo estável em IE/Win7.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="inline-flex items-center space-x-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 badge-gold-soft">
              <span className="text-gold text-xs font-semibold">Badge com badge-gold-soft</span>
            </div>
            <div className="inline-flex items-center space-x-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2">
              <span className="text-gold text-xs font-semibold">Badge sem badge-gold-soft</span>
            </div>
          </div>
        </section>

        {/* 5. Cards claros com blur (badge-card-soft) */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">5. Cards claros com blur (`.badge-card-soft`)</h2>
          <p className="text-sm text-navy/75">
            Três blocos com <code>bg-white/5</code> e <code>backdrop-blur-sm</code>,
            iguais aos stats da ParallaxSection. O fallback usa <code>badge-card-soft</code>
            para manter o véu claro em IE/Win7.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gold/20 badge-card-soft">
              <div className="text-2xl font-serif font-bold text-gold mb-1">80</div>
              <div className="text-xs text-navy/70 uppercase tracking-wide">Anos</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gold/20 badge-card-soft">
              <div className="text-2xl font-serif font-bold text-gold mb-1">8.9</div>
              <div className="text-xs text-navy/70 uppercase tracking-wide">Avaliação</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gold/20 badge-card-soft">
              <div className="text-2xl font-serif font-bold text-gold mb-1">9.9</div>
              <div className="text-xs text-navy/70 uppercase tracking-wide">Localização</div>
            </div>
          </div>
        </section>

        {/* 6. Pattern overlays (highlights / feature icons) */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold">6. Pattern overlays (`highlights-pattern-overlay`, `feature-icons-pattern-overlay`)</h2>
          <p className="text-sm text-navy/75">
            Exemplos simplificados das seções Highlights e FeatureIcons, apenas para testar
            o comportamento da imagem de fundo em navegadores antigos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Highlights-like */}
            <div className="relative h-32 rounded-2xl overflow-hidden ring-1 ring-black/5 bg-cream">
              <div
                className="pointer-events-none absolute inset-0 bg-[url('/parallax-bg.svg')] bg-repeat bg-[length:280px] bg-center opacity-10 highlights-pattern-overlay"
                aria-hidden
              />
              <div className="relative z-10 flex items-center justify-center h-full">
                <span className="text-sm font-medium text-navy">
                  Pattern – highlights-pattern-overlay
                </span>
              </div>
            </div>

            {/* FeatureIcons-like */}
            <div className="relative h-32 rounded-2xl overflow-hidden ring-1 ring-black/5 bg-cream">
              <div
                className="pointer-events-none absolute inset-0 bg-[url('/parallax-bg.svg')] bg-repeat bg-[length:280px] bg-center opacity-[0.04] feature-icons-pattern-overlay"
                aria-hidden
              />
              <div className="relative z-10 flex items-center justify-center h-full">
                <span className="text-sm font-medium text-navy">
                  Pattern – feature-icons-pattern-overlay
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-gold/20 pt-6 mt-4 text-xs text-navy/60 space-y-1">
          <p>
            Para testar em navegadores antigos, acesse esta URL diretamente:{' '}
            <code className="bg-white/60 px-1 py-0.5 rounded">
              /ie-overlay-test
            </code>
          </p>
          <p>
            Em IE11/Windows 7, verifique se os elementos acima continuam visíveis
            com véu/fundo adequado, mesmo sem suporte a <code>backdrop-filter</code>
            ou utilitários modernos de cor.
          </p>
        </section>
      </section>
    </main>
  )
}
