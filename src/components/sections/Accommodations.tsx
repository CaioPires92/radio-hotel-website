'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wifi, Coffee, Tv, Bath, Wind, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useTranslation } from '@/components/i18n/I18nProvider';
import { WHATSAPP_NUMBER } from '@/lib/config';

interface AccommodationsProps {
  onBookingClick?: () => void;
}

const roomsData = (t: (key: string) => string) => {
  const commonAmenities = [
    { icon: Wind, name: t('accommodations.amenities.airConditioning') },
    { icon: Wifi, name: t('accommodations.amenities.wifi') },
    { icon: Tv, name: t('accommodations.amenities.tv') },
    { icon: Coffee, name: t('accommodations.amenities.minibar') },
    { icon: Phone, name: t('accommodations.amenities.telephone') },
  ];

  const standard = {
    id: 'standard',
    name: t('accommodations.rooms.standard.name'),
    type: t('accommodations.rooms.standard.type'),
    description: t('accommodations.rooms.standard.description'),
    image: '/images/rooms/standard-1.jpg',
    amenities: commonAmenities,
  };

  const luxury = {
    id: 'luxury',
    name: t('accommodations.rooms.luxury.name'),
    type: t('accommodations.rooms.luxury.type'),
    description: t('accommodations.rooms.luxury.description'),
    image: '/images/rooms/luxo-2.jpg',
    amenities: commonAmenities,
  };

  const quadruple = {
    id: 'quadruple',
    name: t('accommodations.rooms.quadruple.name'),
    type: t('accommodations.rooms.quadruple.type'),
    description: t('accommodations.rooms.quadruple.description'),
    image: '/images/rooms/quadruplo-2.jpg',
    amenities: commonAmenities,
  };

  return [
    standard,
    luxury,
    quadruple,
  ];
};

const Accommodations = ({ onBookingClick }: AccommodationsProps) => {
  const [currentRoom, setCurrentRoom] = useState(0);
  const { t } = useTranslation();
  const rooms = roomsData(t);

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % rooms.length);
  };

  const prevRoom = () => {
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const handleBookingClick = (roomName: string) => {
    if (onBookingClick) {
      onBookingClick();
    } else {
      const message = `${t('accommodations.whatsapp.bookingMessage')} ${roomName}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <section id="accommodations" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
            {t('accommodations.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            {t('accommodations.title')}
          </h2>
          <p className="text-lg text-navy/80 max-w-3xl mx-auto leading-relaxed">
            {t('accommodations.subtitle')}
          </p>
        </motion.div>

        {/* Room Carousel */}
        <div className="relative">
          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl bg-white">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Image Section */}
                  <div className="lg:col-span-3 relative h-96 lg:h-auto">
                    <Image
                      src={rooms[currentRoom].image}
                      alt={`${rooms[currentRoom].name} - Vista do quarto com ${rooms[currentRoom].amenities.map(a => a.name).join(', ')}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />

                    {/* Room Type Badge */}
                    <div className="absolute top-6 left-6 bg-gold text-navy font-semibold text-sm px-4 py-2 rounded-full">
                      {rooms[currentRoom].type}
                    </div>


                  </div>

                  {/* Content Section */}
                  <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                    <motion.div
                      key={currentRoom}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 className="text-3xl font-serif font-bold text-navy mb-2">
                        {rooms[currentRoom].name}
                      </h3>

                      <p className="text-navy/80 mb-6 leading-relaxed">
                        {rooms[currentRoom].description}
                      </p>

                      {/* Amenities */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-navy mb-3">Comodidades:</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {rooms[currentRoom].amenities.map((amenity, index) => {
                            const Icon = amenity.icon;
                            return (
                              <div key={index} className="flex flex-col items-center text-center group">
                                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gold/20 transition-colors duration-300">
                                  <Icon className="w-5 h-5 text-gold" />
                                </div>
                                <span className="text-xs text-navy/70">{amenity.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={() => handleBookingClick(rooms[currentRoom].name)}
                        className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 w-full"
                        aria-label={`Reservar ${rooms[currentRoom].name}`}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {t('accommodations.buttons.bookNow')}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevRoom}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10"
            aria-label={t('accommodations.navigation.previous')}
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>
          <button
            onClick={nextRoom}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10"
            aria-label={t('accommodations.navigation.next')}
          >
            <ChevronRight className="w-6 h-6 text-navy" />
          </button>
        </div>

        {/* Room Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {rooms.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentRoom(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentRoom
                ? 'bg-gold scale-125'
                : 'bg-navy/20 hover:bg-navy/40'
                }`}
              aria-label={`${t('accommodations.navigation.viewRoom')} ${index + 1}`}
            />
          ))}
        </div>

        {/* Room Grid Preview */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              className={`cursor-pointer transition-all duration-300 ${index === currentRoom ? 'scale-105' : 'hover:scale-102'
                }`}
              onClick={() => setCurrentRoom(index)}
              whileHover={{ y: -5 }}
            >
              <Card className={`border-2 transition-all duration-300 ${index === currentRoom
                ? 'border-gold shadow-lg'
                : 'border-transparent hover:border-gold/50'
                }`}>
                <CardContent className="p-4">
                  <div className="relative w-full h-32 mb-3">
                    <Image
                      src={room.image}
                      alt={`${room.name} - ${room.type}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="font-serif font-semibold text-navy mb-1">{room.name}</h4>
                  <p className="text-sm text-navy/70 mb-2">{room.type}</p>
                  <div className="flex justify-between items-center">
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Accommodations;