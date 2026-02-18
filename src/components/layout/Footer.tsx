'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/i18n/I18nProvider';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Image from 'next/image';
import { buildWhatsAppUrl, PHONE_RESERVAS, PHONE_RECEPCAO_1, PHONE_RECEPCAO_2, PHONE_RECEPCAO_MOBILE, EMAIL_RESERVAS, ADDRESS } from '@/lib/config';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  ExternalLink,
  PlugZap
} from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('footer.quickLinks.home'), href: '/' },
    { name: t('footer.quickLinks.about'), href: '/#about' },
    { name: t('footer.quickLinks.accommodations'), href: '/acomodacoes' },
    { name: t('footer.quickLinks.events'), href: '/conventions' },
    { name: t('footer.quickLinks.contact'), href: '/contato' },
  ];

  const services = [
    { name: t('footer.services.wifi'), icon: Wifi },
    { name: t('footer.services.parking'), icon: Car },
    { name: t('footer.services.restaurant'), icon: Utensils },
    { name: t('footer.services.gym'), icon: Dumbbell },
    { name: t('footer.services.pool'), icon: Waves },
    { name: 'Carregador Elétrico', icon: PlugZap },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: 'Informações e Reservas',
      value: `De Segunda a Sexta das 08:00 às 18:00\n${PHONE_RESERVAS.replace('+55 ', '')}`,
      href: `tel:${PHONE_RESERVAS.replace(/\s|\(|\)|-/g, '')}`,
    },
    {
      icon: Phone,
      label: 'Recepção',
      value: `${PHONE_RECEPCAO_1.replace('+55 ', '')}\n${PHONE_RECEPCAO_2.replace('+55 ', '')}\n${PHONE_RECEPCAO_MOBILE.replace('+55 ', '')}`,
      href: `tel:${PHONE_RECEPCAO_1.replace(/\s|\(|\)|-/g, '')}`,
    },
    {
      icon: Mail,
      label: t('footer.contact.email.label'),
      value: EMAIL_RESERVAS,
      href: `mailto:${EMAIL_RESERVAS}`,
    },
    {
      icon: MapPin,
      label: t('footer.contact.address.label'),
      value: t('footer.contact.address.value'),
      href: `https://maps.google.com/?q=${encodeURIComponent(`${ADDRESS.street}, ${ADDRESS.city} - ${ADDRESS.region}`)}`,
    },
    // Horário removido conforme solicitação
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/RadioHotelSerraNegra/',
      color: 'hover:text-blue-500',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/radiohotelsn/',
      color: 'hover:text-pink-500',
    },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (href.startsWith('http')) {
      window.open(href, '_blank');
      return;
    }

    // Internal navigation (same tab)
    window.location.href = href;
  };

  const handleWhatsAppClick = () => {
    const message = t('footer.whatsapp.message');
    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isSubmittingNewsletter) {
      setIsSubmittingNewsletter(true);
      try {
        // Here you would typically send the email to your newsletter service.
        // Keep silent in the client to avoid logging user PII in browser consoles.
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setEmail('');
      } catch (error) {
        console.error('Newsletter signup error:', error);
      } finally {
        setIsSubmittingNewsletter(false);
      }
    }
  };

  return (
    <footer className="text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero/hero2.jpg"
            alt="Radio Hotel Background"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-gradient-to-b from-black via-black to-black opacity-85" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold rotate-45" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gold/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-gold/30 rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Hotel Info & Logo */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative w-48 h-20 md:w-64 md:h-24">
                    <Image
                      src="/logo.png"
                      alt={t('footer.logo.alt')}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 192px, 256px"
                      quality={90}
                    />
                  </div>
                </div>
                <p className="text-white leading-relaxed">
                  {t('footer.description')}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={social.name}
                      onClick={() => handleLinkClick(social.href)}
                      className={`w-10 h-10 bg-white/10 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                      aria-label={t(`footer.social.${social.name.toLowerCase()}.ariaLabel`)}
                    >
                      <Icon className="w-5 h-5" color="#FFFFFF" />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-gold mb-6 flex items-center">
                <ExternalLink className="w-5 h-5 mr-2" color="#C5A253" />
                {t('footer.quickLinks.title')}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-white hover:text-gold transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-gold mb-6">
                Nossos Serviços
              </h4>
              <ul className="space-y-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <li key={service.name} className="flex items-center space-x-3 group">
                      <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center group-hover:bg-gold/30 transition-colors duration-300">
                        <Icon className="w-4 h-4" color="#C5A253" />
                      </div>
                      <span className="text-white group-hover:text-gold transition-colors duration-300">
                        {service.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-gold mb-6">
                Contato
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <li key={contact.label} className="group">
                      {contact.href ? (
                        <button
                          onClick={() => handleLinkClick(contact.href)}
                          className="flex items-start space-x-3 text-left w-full hover:text-gold transition-colors duration-300"
                        >
                          <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-gold/30 transition-colors duration-300">
                            <Icon className="w-4 h-4" color="#C5A253" />
                          </div>
                          <div>
                            <div className="text-sm text-white/90 mb-1">{contact.label}</div>
                            <div className="text-white whitespace-pre-line text-sm leading-relaxed">
                              {contact.value}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center mt-0.5">
                            <Icon className="w-4 h-4 text-gold" />
                          </div>
                          <div>
                            <div className="text-sm text-white/90 mb-1">{contact.label}</div>
                            <div className="text-white whitespace-pre-line text-sm leading-relaxed">
                              {contact.value}
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* WhatsApp CTA */}
              <motion.button
                onClick={handleWhatsAppClick}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4" />
                <span>Fale Conosco no WhatsApp</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gold mb-2">
                Receba Nossas Ofertas Especiais
              </h4>
              <p className="text-white/90 mb-4">
                Cadastre-se e seja o primeiro a saber sobre promoções exclusivas
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/90 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmittingNewsletter || !email}
                  className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[100px] flex items-center justify-center"
                >
                  {isSubmittingNewsletter ? (
                    <LoadingSpinner size="sm" color="navy" />
                  ) : (
                    'Cadastrar'
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/90 text-sm">
                © {currentYear} Radio Hotel. Todos os direitos reservados.
              </div>

              <div className="flex items-center space-x-4 text-sm text-white/90">
                <button className="hover:text-gold transition-colors duration-300">
                  Política de Privacidade
                </button>
                <span>•</span>
                <button className="hover:text-gold transition-colors duration-300">
                  Termos de Uso
                </button>
                <span>•</span>
                <a
                  href="https://www.instagram.com/caiopires92/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-300"
                  aria-label="desenvolvido por Caio Pires"
                >
                  desenvolvido por Caio Pires
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
