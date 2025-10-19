'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/components/i18n/I18nProvider';
import StructuredData from '@/components/seo/StructuredData';
import { WHATSAPP_NUMBER } from '@/lib/config';
import ContactHero from '@/components/sections/ContactHero';

export default function ContactPage() {
  const { t } = useTranslation();

  const phones = [
    {
      label: 'Informações e Reservas',
      numbers: [
        { display: '(19) 3892-2284', e164: '+551938922284' },
      ],
    },
    {
      label: 'Recepção',
      numbers: [
        { display: '(19) 3892-3311', e164: '+551938923311' },
        { display: '(19) 99990-3311', e164: '+5519999903311' },
      ],
    },
  ];

  const email = {
    display: 'contato@radiohotel.com.br',
    href: 'mailto:contato@radiohotel.com.br',
  };

  const address = {
    display:
      'Rua Cel. Pedro Penteado, 387 — Centro\nSerra Negra - SP\nCEP: 13930-000',
    mapsHref:
      'https://www.google.com/maps/search/?api=1&query=Rua%20Cel.%20Pedro%20Penteado%2C%20387%20-%20Centro%2C%20Serra%20Negra%20-%20SP%2C%2013930-000',
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t('footer.whatsapp.message')
  )}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Radio Hotel Serra Negra',
    telephone: '+55 19 3892-3311',
    email: email.display,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Cel. Pedro Penteado, 387',
      addressLocality: 'Serra Negra',
      addressRegion: 'SP',
      postalCode: '13930-000',
      addressCountry: 'BR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'reservations',
        telephone: '+55 19 3892-2284',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'reception',
        telephone: '+55 19 3892-3311',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'whatsapp',
        telephone: '+55 19 99990-3311',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <StructuredData data={jsonLd} />

      {/* Hero */}
      <ContactHero
        heightClass="min-h-[50vh] md:min-h-[60vh]"
        imageSrc="/images/hero/hero2.jpg"
        callNumberE164="+551938923311"
        whatsappHref={`https://wa.me/${WHATSAPP_NUMBER}`}
      />

      {/* Content Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phones */}
          <Card className="bg-navy/80 border-gold/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Phone className="w-5 h-5 text-gold" />
                {t('contact.phone')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {phones.map((group) => (
                  <li key={group.label}>
                    <div className="text-white/90 font-medium mb-2">{group.label}</div>
                    <div className="flex flex-wrap gap-3">
                      {group.numbers.map((n) => (
                        <a
                          key={n.e164}
                          href={`tel:${n.e164}`}
                          className="text-gold hover:text-gold/80 underline"
                          aria-label={`Ligar para ${group.label} ${n.display}`}
                        >
                          {n.display}
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="bg-navy/80 border-gold/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="w-5 h-5 text-gold" />
                {t('contact.email')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={email.href}
                className="text-gold hover:text-gold/80 underline"
                aria-label={`Enviar e-mail para ${email.display}`}
              >
                {email.display}
              </a>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="bg-navy/80 border-gold/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-gold" />
                {t('contact.address')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white whitespace-pre-line mb-3">{address.display}</p>
              <Button
                onClick={() => window.open(address.mapsHref, '_blank')}
                className="bg-gold hover:bg-gold/90 text-navy"
                aria-label="Abrir localização no Google Maps"
              >
                Ver no Google Maps
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp */}
          <Card className="bg-navy/80 border-gold/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageCircle className="w-5 h-5 text-gold" />
                {t('contact.whatsapp')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => window.open(whatsappHref, '_blank')}
                className="bg-green-500 hover:bg-green-600 text-white"
                aria-label="Abrir conversa no WhatsApp"
              >
                Conversar via WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}