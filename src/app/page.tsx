'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Events from '@/components/sections/Events';
import Accommodations from '@/components/sections/Accommodations';
import Highlights from '@/components/sections/Highlights';
import ParallaxSection from '@/components/sections/ParallaxSection';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/ui/custom/BookingForm';
import EventsModal from '@/components/modals/EventsModal';
import PopButton from '@/components/ui/PopButton';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import BackToTopButton from '@/components/ui/BackToTopButton';

export default function Home() {
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Accommodations />
      <Highlights />
      <ParallaxSection />
      <BookingForm />
      <Footer />
      
      {/* Interactive Components */}
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
