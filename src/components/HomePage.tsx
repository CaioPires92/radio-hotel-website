'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
// import Events from '@/components/sections/Events';
import Accommodations from '@/components/sections/Accommodations';
import ParallaxSection from '@/components/sections/ParallaxSection';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/ui/custom/BookingForm';
import EventsModal from '@/components/modals/EventsModal';
import PopButton from '@/components/ui/PopButton';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import BackToTopButton from '@/components/ui/BackToTopButton';
import Highlights from '@/components/sections/Highlights';
import WaveDivider from '@/components/ui/WaveDivider';
import BandSeparator from '@/components/ui/BandSeparator';

function HomePage() {
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar onBookingClick={() => setIsBookingFormOpen(true)} />
      <Hero onBookingClick={() => setIsBookingFormOpen(true)} />
      
      

      <About />
      {/* <Events /> */}
      {/* Seções */}
      {/* Hero, About, etc. */}
      {/* Usa versão compacta na Home */}
      <Accommodations compact />
      <WaveDivider variant="line" color="#b2ab70" height={44} className="-mt-1 -mb-1" />
      <Highlights />
      <WaveDivider variant="line" color="#b2ab70" height={44} className="-mt-1 -mb-1" />
      <ParallaxSection onBookingClick={() => setIsBookingFormOpen(true)} />
      <BandSeparator height={12} color="#b2ab70" />
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
