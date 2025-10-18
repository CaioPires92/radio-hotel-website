'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
// import Events from '@/components/sections/Events';
import Accommodations from '@/components/sections/Accommodations';
import Highlights from '@/components/sections/Highlights';
import ParallaxSection from '@/components/sections/ParallaxSection';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/ui/custom/BookingForm';
import EventsModal from '@/components/modals/EventsModal';
import PopButton from '@/components/ui/PopButton';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import BackToTopButton from '@/components/ui/BackToTopButton';
import SeasonalPackages from './sections/SeasonalPackages';
import PromoRibbon from './ui/PromoRibbon';

function HomePage() {
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar onBookingClick={() => setIsBookingFormOpen(true)} />
      <Hero onBookingClick={() => setIsBookingFormOpen(true)} />
      <PromoRibbon />
      <SeasonalPackages />

      <About />
      {/* <Events /> */}
      {/* Seções */}
      {/* Hero, About, etc. */}
      {/* Usa versão compacta na Home */}
      <Accommodations compact />
      <Highlights />
      <ParallaxSection onBookingClick={() => setIsBookingFormOpen(true)} />
      <Footer />

      {/* Modals and Floating Elements */}
      <BookingForm
        isOpen={isBookingFormOpen}
        onClose={() => setIsBookingFormOpen(false)}
      />
      <EventsModal
        isOpen={isEventsModalOpen}
        onClose={() => setIsEventsModalOpen(false)}
      />
      <PopButton onClick={() => setIsEventsModalOpen(true)} />
      <WhatsAppButton />
      <BackToTopButton />
    </main>
  );
}

export default HomePage;