'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onBookingClick?: () => void;
}

const Navbar = ({ onBookingClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  const handleMenuItemKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsOpen(false);
      // Navigate to the href
      window.location.href = href;
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
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Acomodações', href: '#accommodations' },
    { name: 'Eventos', href: '#events' },
    { name: 'Contato', href: '#contact' },
  ];

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick();
    } else {
      const message = 'Olá! Gostaria de fazer uma reserva no Radio Hotel.';
      const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#home" className="flex items-center space-x-3">
              <img
                src={isScrolled ? "/logo-color.png" : "/logo.png"}
                alt="Rádio Hotel Logo"
                className="w-20  object-contain transition-all duration-300"
              />
              <div className="hidden sm:block">
              </div>
            </a>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gold ${isScrolled ? 'text-navy' : 'text-white'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleBookingClick}
              className={`font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg ${isScrolled
                ? 'bg-gold hover:bg-gold/90 text-navy'
                : 'bg-white hover:bg-white/90 text-navy'
                }`}
              aria-label="Fazer reserva no Radio Hotel"
            >
              <Phone className="w-4 h-4 mr-2" />
              Reservar Agora
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              variant="ghost"
              size="sm"
              className={`p-2 ${isScrolled ? 'text-navy hover:text-gold' : 'text-white hover:text-gold'
                }`}
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
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
        className={`md:hidden ${isOpen ? 'block' : 'hidden'
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
              onKeyDown={(e) => handleMenuItemKeyDown(e, item.href)}
              tabIndex={isOpen ? 0 : -1}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
          <div className="px-3 py-2">
            <Button
              onClick={() => {
                handleBookingClick();
                setIsOpen(false);
              }}
              aria-label="Fazer reserva no Radio Hotel"
              className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold py-2 rounded-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              Reservar Agora
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;