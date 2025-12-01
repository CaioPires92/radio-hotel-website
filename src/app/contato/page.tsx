'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, MessageCircle, Facebook, Instagram, Send } from 'lucide-react'
import { buildWhatsAppUrl, PHONE_RESERVAS, PHONE_RECEPCAO_1, PHONE_RECEPCAO_2, PHONE_RECEPCAO_MOBILE, EMAIL_RESERVAS, ADDRESS, SOCIALS } from '@/lib/config'
import { useTranslation } from '@/components/i18n/I18nProvider'

// Metadata movido para head.tsx para evitar export em componente cliente

export default function ContatoPage() {
  const { t } = useTranslation()
  const reservasTelHref = `tel:${PHONE_RESERVAS.replace(/\s|\(|\)|-/g, '')}`
  const recepcao1Href = `tel:${PHONE_RECEPCAO_1.replace(/\s|\(|\)|-/g, '')}`
  const recepcao2Href = `tel:${PHONE_RECEPCAO_2.replace(/\s|\(|\)|-/g, '')}`
  const recepcaoMobileHref = `tel:${PHONE_RECEPCAO_MOBILE.replace(/\s|\(|\)|-/g, '')}`
  const mapsQuery = encodeURIComponent(`${ADDRESS.street}, ${ADDRESS.city} - ${ADDRESS.region}`)
  const mapsHref = `https://maps.google.com/?q=${mapsQuery}`
  const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`

  const whatsappMessage = 'Olá! Gostaria de informações sobre hospedagem no Radio Hotel.'
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage)

  // Formulário simples (sem backend): envia via WhatsApp ou e-mail
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [errors, setErrors] = useState<{ nome?: string; email?: string; mensagem?: string }>({})
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = async () => {
    try {
      const fullAddress = `${ADDRESS.street}, ${ADDRESS.city} - ${ADDRESS.region}`
      await navigator.clipboard.writeText(fullAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const validate = () => {
    const newErrors: { nome?: string; email?: string; mensagem?: string } = {}
    if (!nome.trim()) newErrors.nome = t('contactPage.form.errors.nameRequired')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) newErrors.email = t('contactPage.form.errors.emailInvalid')
    if (!mensagem.trim()) newErrors.mensagem = t('contactPage.form.errors.messageRequired')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleWhatsAppForm = () => {
    if (!validate()) return
    const msg = `Olá! Meu nome é ${nome || '(sem nome)'}.
E-mail: ${email || '(não informado)'}
Telefone: ${telefone || '(não informado)'}
Mensagem: ${mensagem || '(sem mensagem)'}`
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  const handleEmailForm = () => {
    setStatusMsg(null)
    setStatusType(null)
    if (!validate()) return
    if (website) return // honeypot preenchido, ignora
    const payload = { nome, email, telefone, mensagem, website }
    setIsSubmitting(true)
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (res.status === 501) {
          // fallback para mailto se serviço não estiver configurado
          const subject = encodeURIComponent(t('contactPage.form.mailSubject'))
          const body = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}`)
          window.location.href = `mailto:${EMAIL_RESERVAS}?subject=${subject}&body=${body}`
          return
        }
        if (!res.ok) throw new Error('Server error')
        setStatusMsg(t('contactPage.form.feedback.success'))
        setStatusType('success')
        setNome(''); setEmail(''); setTelefone(''); setMensagem('')
      })
      .catch(() => {
        setStatusMsg(t('contactPage.form.feedback.error'))
        setStatusType('error')
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* Header */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero/hero2.jpg"
              alt="Radio Hotel Serra Negra"
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
          <div className="absolute inset-0 bg-navy/60 bg-gradient-to-r from-navy/80 to-blue/70" />
        </div>
        <div className="relative z-10 max-w-4xl px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('contactPage.header.title')}
          </motion.h1>
          <motion.h2
            className="text-xl md:text-2xl font-medium mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('contactPage.header.subtitle')}
          </motion.h2>
          {/* Hero apenas com título e subtítulo */}
        </div>
      </section>

      {/* Conteúdos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Esquerda: Endereço, Telefones, Redes Sociais (sem cards) */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-navy flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-gold" /> {t('contactPage.address.title')}
              </h2>
              <div className="text-navy/90 space-y-1">
                <p>{ADDRESS.street}</p>
                <p>{ADDRESS.city} - {ADDRESS.region}</p>
                {ADDRESS.postalCode && <p>CEP: {ADDRESS.postalCode}</p>}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 rounded-full bg-navy text-cream text-sm hover:bg-navy/90 transition">
                  {t('contactPage.address.viewMap')}
                </a>
                <button onClick={handleCopyAddress} className="inline-flex items-center px-3 py-1 rounded-full border border-gold/30 text-navy text-sm hover:bg-gold/10 transition">
                  {copied ? t('contactPage.address.copied') : t('contactPage.address.copy')}
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-navy mb-3">{t('contactPage.phones.title')}</h2>
              <div className="space-y-3 text-navy/90">
                <div>
                  <div className="font-semibold">{t('contactPage.phones.reservations')}</div>
                  <a href={reservasTelHref} className="hover:text-gold transition-colors">{PHONE_RESERVAS.replace('+55 ', '')}</a>
                </div>
                <div>
                  <div className="font-semibold">{t('contactPage.phones.reception')}</div>
                  <div className="flex flex-col">
                    <a href={recepcao1Href} className="hover:text-gold transition-colors">{PHONE_RECEPCAO_1.replace('+55 ', '')}</a>
                    <a href={recepcao2Href} className="hover:text-gold transition-colors">{PHONE_RECEPCAO_2.replace('+55 ', '')}</a>
                    <a href={recepcaoMobileHref} className="hover:text-gold transition-colors">{PHONE_RECEPCAO_MOBILE.replace('+55 ', '')}</a>
                  </div>
                </div>
                <div className="pt-2">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-gold text-navy font-semibold hover:brightness-105 transition">
                    {t('contactPage.digital.ctaWhatsApp')}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-navy mb-3">{t('contactPage.social.title')}</h2>
              <div className="flex items-center gap-4">
                <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center hover:bg-gold/30 transition">
                  <Facebook className="w-5 h-5 text-navy" />
                </a>
                <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center hover:bg-gold/30 transition">
                  <Instagram className="w-5 h-5 text-navy" />
                </a>
              </div>
            </div>
          </div>

          {/* Direita: Formulário */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-navy mb-6">{t('contactPage.form.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-navy mb-1">
                    {t('contactPage.form.fields.name')} <span className="text-gold">*</span>
                  </label>
                  <input id="nome" value={nome} onChange={e => setNome(e.target.value)} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? 'erro-nome' : undefined} autoComplete="name" className="w-full rounded-lg border border-gold/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40" placeholder={t('contactPage.form.placeholders.name')} />
                  {errors.nome && <p id="erro-nome" className="text-red-600 text-sm mt-1">{errors.nome}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
                    {t('contactPage.form.fields.email')} <span className="text-gold">*</span>
                  </label>
                  <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'erro-email' : undefined} autoComplete="email" className="w-full rounded-lg border border-gold/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40" placeholder={t('contactPage.form.placeholders.email')} />
                  {errors.email && <p id="erro-email" className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="telefone" className="block text-sm font-medium text-navy mb-1">{t('contactPage.form.fields.phone')}</label>
                  <input id="telefone" type="tel" inputMode="tel" autoComplete="tel" value={telefone} onChange={e => setTelefone(e.target.value)} className="w-full rounded-lg border border-gold/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40" placeholder={t('contactPage.form.placeholders.phone')} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="mensagem" className="block text-sm font-medium text-navy mb-1">
                    {t('contactPage.form.fields.message')} <span className="text-gold">*</span>
                  </label>
                  <textarea id="mensagem" value={mensagem} onChange={e => setMensagem(e.target.value)} rows={6} aria-invalid={!!errors.mensagem} aria-describedby={errors.mensagem ? 'erro-mensagem' : undefined} className="w-full rounded-lg border border-gold/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40" placeholder={t('contactPage.form.placeholders.message')} />
                  {errors.mensagem && <p id="erro-mensagem" className="text-red-600 text-sm mt-1">{errors.mensagem}</p>}
                  {/* Honeypot */}
                  <input type="text" value={website} onChange={e => setWebsite(e.target.value)} className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={handleWhatsAppForm} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-navy font-semibold hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed" disabled={isSubmitting}>
                  <MessageCircle className="w-4 h-4" /> {t('contactPage.form.actions.sendWhatsApp')}
                </button>
                <button onClick={handleEmailForm} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy text-cream font-semibold hover:bg-navy/90 disabled:opacity-60 disabled:cursor-not-allowed" disabled={isSubmitting}>
                  <Send className="w-4 h-4" /> {t('contactPage.form.actions.sendEmail')}
                </button>
              </div>
              <p className="sr-only" role="status" aria-live="polite">{statusMsg || ''}</p>
              {statusMsg && (
                <div
                  className={`mt-4 text-sm rounded-lg px-4 py-3 border ${
                    statusType === 'success'
                      ? 'bg-gold/10 border-gold/40 text-navy'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  {statusMsg}
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Formulário movido para a coluna direita acima */}

      {/* Redes sociais movidas para a coluna esquerda acima */}

      {/* Mapa incorporado */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden ring-1 ring-gold/10">
            <iframe
              title={t('contactPage.address.mapTitle')}
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-72 md:h-96 border-0"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
