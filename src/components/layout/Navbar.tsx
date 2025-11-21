'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompactLanguageSelector } from '@/components/i18n/LanguageSelector';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  onBookingClick?: () => void;
}

const Navbar = ({ onBookingClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const bookNowLabel = (() => {
    const v = t('navigation.bookNow');
    return v === 'navigation.bookNow' ? 'Reservar agora' : v;
  })();

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: t('navigation.home'), href: '/#home' },
    { name: t('about.title'), href: '/#about' },
    { name: t('navigation.accommodations'), href: '/acomodacoes' },
    { name: t('navigation.events'), href: '/conventions' },
    { name: t('navigation.restaurant'), href: '/restaurante' },
    { name: t('navigation.contact'), href: '/contato' },
  ];

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick();
    } else {
      // Fallback global: leva para a página de contato / reservas
      window.location.href = '/contato';
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 gap-2 sm:gap-4 flex-nowrap">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-3" aria-label="Radio Hotel">
              <div className={`relative transition-all duration-300 ${isScrolled ? 'w-24 h-16 md:h-20' : 'w-28 h-16 md:h-20'}`}>
                <Image
                  src={isScrolled ? "/logo-color.png" : "/logo.png"}
                  alt="Radio Hotel Logo"
                  fill
                  className="object-contain transition-all duration-300"
                  sizes="(max-width: 768px) 96px, 128px"
                  quality={90}
                  priority
                />
              </div>
              <div className="hidden sm:block">
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden min-[812px]:block flex-1 min-w-0">
            <div className="ml-0 xl:ml-8 flex items-baseline justify-center xl:justify-start space-x-2 lg:space-x-3 xl:space-x-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`px-1 xl:px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gold text-navy`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="relative group inline-block">
                <button
                  className={`px-1 xl:px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gold text-navy`}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Passeios
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg ring-1 ring-black/10 rounded-md min-w-[180px] z-50">
                  <Link href="/blog" className="block px-4 py-2 text-sm text-navy hover:bg-cream/60">Passeios (Blog)</Link>
                  <Link href="/passeios-test" className="block px-4 py-2 text-sm text-navy hover:bg-cream/60">Passeios Teste</Link>
                </div>
              </div>
              {/* Language Selector */}
              <div className="hidden xl:block ml-2 xl:ml-4">
                <CompactLanguageSelector className="text-sm" isScrolled={isScrolled} />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden min-[812px]:block flex-shrink-0">
            <Button
              onClick={handleBookingClick}
              className={`font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gold hover:bg-gold/90 text-navy`}
              aria-label="Reservar pelo menu"
              
              // Prevent wrapping on mid screens
              style={{ minWidth: 160 }}
            >
              <Phone className="w-4 h-4 mr-2" />
              {bookNowLabel}
            </Button>
          </div>

          {/* Mobile menu button */}
        <div className="min-[812px]:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              variant="ghost"
              size="sm"
              className={`p-2 text-navy hover:text-gold`}
              aria-label={isOpen ? t('navbar.mobile.closeMenu') : t('navbar.mobile.openMenu')}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        id="mobile-menu"
            className={`min-[812px]:hidden ${isOpen ? 'block' : 'hidden'
          } bg-white/95 backdrop-blur-md border-t border-gray-200`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        onKeyDown={handleKeyDown}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-base font-medium text-navy hover:text-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:bg-gold/10 rounded"
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.a
            href="/blog"
            className="block px-3 py-2 text-base font-medium text-navy hover:text-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:bg-gold/10 rounded"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            Passeios (Blog)
          </motion.a>
          <motion.a
            href="/passeios-test"
            className="block px-3 py-2 text-base font-medium text-navy hover:text-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:bg-gold/10 rounded"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            Passeios Teste
          </motion.a>
          {/* Language Selector Mobile */}
          <div className="px-3 py-2 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <CompactLanguageSelector className="text-sm" isScrolled={true} />
            </div>
          </div>
          <div className="px-3 py-2">
            <Button
              onClick={() => {
                handleBookingClick();
                setIsOpen(false);
              }}
              aria-label={t('navigation.bookNow')}
              className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold py-2 rounded-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('navigation.bookNow')}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
