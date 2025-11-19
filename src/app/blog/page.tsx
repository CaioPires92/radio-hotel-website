'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogHero from '@/components/sections/BlogHero';
import { SOCIALS, buildWhatsAppUrl } from '@/lib/config';
import { MapPin, Map, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';

const blogPosts = [
  {
    id: 'alto-da-serra',
    image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025132413.jpg',
  },
  {
    id: 'fontana-di-trevi',
    image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025095100.jpg',
  },
  {
    id: 'teleferico-cristo-redentor',
    image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025133057.jpg',
  },
  {
    id: 'museu-vinho-cachaca-silotto',
    image: '/images/facilities/silotto.jpg',
  },
  {
    id: 'vale-ouro-verde-museu-cafe',
    image: '/images/facilities/vale-ouro.jpg',
  },
  {
    id: 'sitio-bom-retiro-familia-carra',
    image: '/images/facilities/carra.jpg',
  },
  {
    id: 'sitio-chapadao-queijos',
    image: '/images/facilities/chapadao.jpg',
  },
];

type PoiContact = {
  address?: string;
  phone?: string;
  whatsappNumbers?: string[]; // E.164: 55 + DDD + número
  instagramUrl?: string | null;
  locationUrl?: string;
};

const poiContacts: Record<string, PoiContact> = {
  'alto-da-serra': {
    address: 'Rua Paulo Marchi, 3079 - Jardim Gustavo, Serra Negra - SP',
    instagramUrl: 'https://www.instagram.com/espacosantarosasn/',
    locationUrl: 'https://www.google.com/maps/dir/-22.6202854,-46.6995035/Alto+da+Serra+-+Alto+da+Serra,+Serra+Negra+-+SP/data=!4m10!4m9!1m1!4e1!1m5!1m4!1s0x94c922ae2bce4df7:0xaf49b917fa40df7!8m2!3d-22.619121!4d-46.6774705!3e0?utm_source=mstt_0',
  },
  'fontana-di-trevi': {
    address: 'Av. Deputado Pomeu Campos Vergal, Serra Negra – SP',
    instagramUrl: null,
    locationUrl:
      'https://www.google.de/maps/place/Fontana+di+Trevi+em+Serra+Negra/@-22.6100055,-46.7050937,17z/data=!3m1!4b1!4m6!3m5!1s0x94c9199f6374d031:0xe1c5336db6515312!8m2!3d-22.6100105!4d-46.7002228!16s%2Fg%2F11k4b8h95v?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D',
  },
  'teleferico-cristo-redentor': {
    address: 'R. Cristo Redentor, 157 - Lot. Vale do Sol, Serra Negra',
    instagramUrl: null,
    locationUrl:
      'https://www.google.com/maps/place/Cristo+Redentor+de+Serra+Negra/@-22.6041517,-46.7016246,17z/data=!3m1!4b1!4m6!3m5!1s0x94c919af9d840e0f:0x55e3a025772f7564!8m2!3d-22.6041567!4d-46.6990497!16s%2Fg%2F11f6d8ptg5?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D',
  },
  'vale-ouro-verde-museu-cafe': {
    address: 'Estrada Municipal Amathis Franchi, km 05 – Vale do Ouro Verde, Serra Negra – SP',
    whatsappNumbers: ['5519971476542'],
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Estrada+Municipal+Amathis+Franchi,+Km+05+-+Vale+do+Ouro+Verde,+Serra+Negra+-+SP',
  },
  'museu-vinho-cachaca-silotto': {
    address: 'Rodovia SP-360, km 158,5 – Sítio São Pedro, Serra Negra – SP',
    whatsappNumbers: ['5519971493543', '5519997755028'],
    instagramUrl: 'https://www.instagram.com/familiasilotto/',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Rodovia+SP-360,+Km+158,5+-+Sítio+São+Pedro,+Serra+Negra+-+SP',
  },
  'sitio-bom-retiro-familia-carra': {
    address: 'Rodovia SP-105, Km 9 – Serra Negra – SP',
    whatsappNumbers: ['5519997222961'],
    instagramUrl: 'https://www.instagram.com/familiacarra/',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Rodovia+SP-105,+Km+9+-+Serra+Negra+-+SP',
  },
  'sitio-chapadao-queijos': {
    address: 'Rodovia SP-105, km 5,5 – Bairro Santo Aleixo, Serra Negra – SP',
    whatsappNumbers: ['5519999846555'],
    instagramUrl: 'https://www.instagram.com/afazendachapadao/',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Rodovia+SP-105,+Km+5,5+-+Bairro+Santo+Aleixo,+Serra+Negra+-+SP',
  },
};

function toTelHref(phone?: string) {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, '');
  const e164 = digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
  return `tel:${e164}`;
}

const Blog = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <BlogHero heightClass="min-h-[50vh] md:min-h-[60vh]" imageSrc="/images/hero/hero2.jpg" />

      <section id="blog" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-navy/80 leading-relaxed whitespace-pre-line">
              {t('blog.intro')}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-navy/70 font-medium">{t('footer.followUs')}</span>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy underline"
                aria-label="Instagram Radio Hotel Serra Negra"
              >
                <Instagram className="inline-block w-4 h-4 mr-1 align-[-2px]" />
                Instagram
              </a>
              <span className="text-navy/30">•</span>
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy underline"
                aria-label="Facebook Radio Hotel Serra Negra"
              >
                <Facebook className="inline-block w-4 h-4 mr-1 align-[-2px]" />
                Facebook
              </a>
              <a
                href={buildWhatsAppUrl(t('navbar.whatsapp.bookingMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy underline ml-2"
                aria-label={t('contactPage.digital.ctaWhatsApp')}
              >
                <MessageCircle className="inline-block w-4 h-4 mr-1 align-[-2px]" />
                {t('contactPage.digital.ctaWhatsApp')}
              </a>
            </div>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={t(`blog.${post.id}.title`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold font-serif text-navy mb-3">
                    {t(`blog.${post.id}.title`)}
                  </h3>
                  <p className="text-navy/80 leading-relaxed">
                    {t(`blog.${post.id}.description`)}
                  </p>

                  {(() => {
                    const poi = poiContacts[post.id];
                    if (!poi) return null;
                    const telHref = toTelHref(poi.phone);
                    return (
                      <div className="mt-4 space-y-1 text-sm text-navy/70">
                        {poi.address && (
                          <div>
                            <span className="font-semibold"><MapPin className="inline-block w-4 h-4 mr-1 align-[-2px]" />{t('blog.contacts.address')}:</span>{' '}
                            <span>{poi.address}</span>
                          </div>
                        )}
                        {poi.phone && (
                          <div>
                            <span className="font-semibold">{t('blog.contacts.phone')}:</span>{' '}
                            {telHref ? (
                              <a href={telHref} className="underline text-navy" aria-label={`${t('blog.contacts.phone')}: ${poi.phone}`}>
                                {poi.phone}
                              </a>
                            ) : (
                              <span>{poi.phone}</span>
                            )}
                          </div>
                        )}
                        {poi.locationUrl && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold"><Map className="inline-block w-4 h-4 mr-1 align-[-2px]" />{t('blog.contacts.location')}:</span>
                            <a href={poi.locationUrl} target="_blank" rel="noopener noreferrer" className="underline text-navy" aria-label="Localização no mapa">
                              Google Maps
                            </a>
                          </div>
                        )}
                        {poi.instagramUrl ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold"><Instagram className="inline-block w-4 h-4 mr-1 align-[-2px]" />{t('blog.contacts.instagram')}:</span>
                            <a
                              href={poi.instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-navy"
                              aria-label="Redes sociais do ponto turístico"
                            >
                              Instagram
                            </a>
                          </div>
                        ) : null}
                        {poi.whatsappNumbers?.length ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold"><MessageCircle className="inline-block w-4 h-4 mr-1 align-[-2px]" />{t('blog.contacts.contact')}:</span>
                            {poi.whatsappNumbers.map((num, i) => (
                              <a
                                key={i}
                                href={buildWhatsAppUrl(t('blog.contacts.whatsappMessage'), num)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-navy"
                                aria-label={`${t('blog.contacts.whatsapp')}`}
                              >
                                {t('blog.contacts.whatsapp')}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blog;
