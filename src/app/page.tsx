'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Events from '@/components/sections/Events';
import Accommodations from '@/components/sections/Accommodations';
import Highlights from '@/components/sections/Highlights';
import ParallaxSection from '@/components/sections/ParallaxSection';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/ui/custom/BookingForm';
import { Phone, ArrowUp, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show back to top button after 300px
      setShowBackToTop(scrollY > 300);
      
      // Show events modal after 600px scroll
      if (scrollY > 600 && !showEventsModal) {
        setShowEventsModal(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showEventsModal]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    const message = 'Olá! Gostaria de mais informações sobre o Rádio Hotel.';
    const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="events">
          <Events />
        </section>
        
        <section id="accommodations">
          <Accommodations />
        </section>
        
        <section id="highlights">
          <Highlights />
        </section>
        
        <ParallaxSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* WhatsApp Button */}
        <motion.button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contato via WhatsApp"
        >
          <Phone className="w-6 h-6 group-hover:animate-pulse" />
        </motion.button>
        
        {/* Booking Form Button */}
        <motion.button
          onClick={() => setShowBookingForm(true)}
          className="w-14 h-14 bg-gold hover:bg-gold/90 text-navy rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Fazer reserva"
        >
          <Calendar className="w-6 h-6 group-hover:animate-pulse" />
        </motion.button>
        
        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              onClick={scrollToTop}
              className="w-14 h-14 bg-navy hover:bg-navy/90 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      {/* Events Modal */}
      <AnimatePresence>
        {showEventsModal && (
          <motion.div
            className="fixed bottom-6 left-6 z-40 max-w-sm"
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gold/20 p-6 relative">
              <button
                onClick={() => setShowEventsModal(false)}
                className="absolute top-3 right-3 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Fechar modal"
              >
                <span className="text-gray-600 text-sm">×</span>
              </button>
              
              <div className="mb-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-serif font-bold text-navy mb-2">
                  Eventos Especiais
                </h3>
                <p className="text-sm text-navy/70 mb-4">
                  Descubra nossos espaços únicos para casamentos, corporativo e celebrações.
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const element = document.querySelector('#events');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                    setShowEventsModal(false);
                  }}
                  className="flex-1 bg-gold hover:bg-gold/90 text-navy font-semibold py-2 px-3 rounded-lg text-sm transition-all duration-300 hover:scale-105"
                >
                  Ver Eventos
                </button>
                <button
                  onClick={() => setShowEventsModal(false)}
                  className="px-3 py-2 text-navy/60 hover:text-navy text-sm transition-colors duration-200"
                >
                  Depois
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Booking Form Modal */}
      <BookingForm 
        isOpen={showBookingForm} 
        onClose={() => setShowBookingForm(false)} 
      />
    </div>
  );
}
