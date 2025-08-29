'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  Waves,
  Heart,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre o Hotel', href: '#about' },
    { name: 'Acomodações', href: '#accommodations' },
    { name: 'Eventos', href: '#events' },
    { name: 'Galeria', href: '#gallery' },
    { name: 'Contato', href: '#contact' },
  ];

  const services = [
    { name: 'Wi-Fi Gratuito', icon: Wifi },
    { name: 'Estacionamento', icon: Car },
    { name: 'Room Service', icon: Coffee },
    { name: 'Restaurante', icon: Utensils },
    { name: 'Academia', icon: Dumbbell },
    { name: 'Piscina', icon: Waves },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: 'Telefone',
      value: '(19) 99999-9999',
      href: 'tel:+5519999999999',
    },
    {
      icon: Mail,
      label: 'E-mail',
      value: 'contato@radiohotel.com.br',
      href: 'mailto:contato@radiohotel.com.br',
    },
    {
      icon: MapPin,
      label: 'Endereço',
      value: 'Rua das Montanhas, 123\nSerra Negra - SP, 13930-000',
      href: 'https://maps.google.com/?q=Serra+Negra+SP',
    },
    {
      icon: Clock,
      label: 'Atendimento',
      value: '24 horas por dia\n7 dias por semana',
      href: null,
    },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/radiohotel',
      color: 'hover:text-blue-500',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/radiohotel',
      color: 'hover:text-pink-500',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/radiohotel',
      color: 'hover:text-blue-400',
    },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  const handleWhatsAppClick = () => {
    const message = 'Olá! Gostaria de mais informações sobre o Radio Hotel.';
    const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isSubmittingNewsletter) {
      setIsSubmittingNewsletter(true);
      try {
        // Here you would typically send the email to your newsletter service
        console.log('Newsletter signup:', email);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setEmail('');
        // You could show a success message here
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
        <img
          src="/images/facilities/facilities1.jpg"
          alt="Radio Hotel Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black/90" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold rotate-45" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gold/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-gold/30 rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                  <img
                    src="/logo.png"
                    alt="Rádio Hotel Logo"
                    className="w-26 object-contain"
                  />
                </div>
                <p className="text-white leading-relaxed">
                  Tradição e elegância no coração de Serra Negra.
                  Uma experiência única em meio à natureza exuberante.
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
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
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
                <ExternalLink className="w-5 h-5 mr-2" />
                Links Rápidos
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
                        <Icon className="w-4 h-4 text-gold" />
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
                            <Icon className="w-4 h-4 text-gold" />
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
                <div className="flex items-center space-x-1">
                  <span>Feito com</span>
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                  <span>em Serra Negra</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;