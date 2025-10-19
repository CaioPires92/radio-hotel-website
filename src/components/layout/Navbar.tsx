'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompactLanguageSelector } from '@/components/i18n/LanguageSelector';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { WHATSAPP_NUMBER } from '@/lib/config';

interface NavbarProps {
  onBookingClick?: () => void;
}

const Navbar = ({ onBookingClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

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
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.contact'), href: '/#contact' },
  ];

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick();
    } else {
      const message = t('navbar.whatsapp.bookingMessage');
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      // Se não estiver na home, navega para a home com o hash
      if (window.location.pathname !== '/') {
        router.push(href);
        setIsOpen(false);
        return;
      }
      // Na home, rola suavemente até a seção
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      } else {
        // Fallback: navega usando o hash
        router.push(href);
        setIsOpen(false);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/#home" aria-label="Go to home">
              <Image
                src="/logo.png"
                alt="Rádio Hotel Logo"
                width={120}
                height={40}
                priority
                className="drop-shadow-md"
              />
            </a>
          </div>
  
          {/* Centered Desktop Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-white/90 hover:text-gold transition-colors`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
  
          {/* Right Actions (Language + CTA) */}
          <div className="hidden md:flex items-center space-x-4">
            <CompactLanguageSelector />
  
            <Button
              onClick={handleBookingClick}
              className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('navigation.bookNow')}
            </Button>
          </div>
  
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('navbar.mobile.closeMenu') : t('navbar.mobile.openMenu')}
              aria-expanded={isOpen}
              variant="ghost"
              className="text-white"
              onKeyDown={handleKeyDown}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
  
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden bg-navy/95 backdrop-blur-md shadow-lg`}
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left text-white/90 hover:text-gold transition-colors`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => {
                    handleBookingClick();
                    setIsOpen(false);
                  }}
                  className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t('navigation.bookNow')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;