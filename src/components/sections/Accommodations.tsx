'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wifi, Car, Coffee, Tv, Bath, Wind, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface AccommodationsProps {
  onBookingClick?: () => void;
}

const Accommodations = ({ onBookingClick }: AccommodationsProps) => {
  const [currentRoom, setCurrentRoom] = useState(0);

  const rooms = [
    {
      id: 1,
      name: 'Suíte Master',
      type: 'Luxo Premium',
      description: 'Nossa suíte mais exclusiva, com vista panorâmica para as montanhas e acabamentos de primeira linha.',
      image: '/images/rooms/suite-master.png',
      size: '45m²',
      capacity: '2 pessoas',
      price: 'R$ 450',
      period: 'por noite',
      amenities: [
        { icon: Wifi, name: 'Wi-Fi gratuito' },
        { icon: Car, name: 'Estacionamento' },
        { icon: Coffee, name: 'Frigobar' },
        { icon: Tv, name: 'TV 55"' },
        { icon: Bath, name: 'Banheira' },
        { icon: Wind, name: 'Ar condicionado' },
      ],
      features: ['Vista para montanha', 'Varanda privativa', 'Banheira de hidromassagem', 'Sala de estar'],
    },
    {
      id: 2,
      name: 'Quarto Deluxe',
      type: 'Conforto Superior',
      description: 'Quartos espaçosos e elegantes, perfeitos para uma estadia confortável e relaxante.',
      image: '/images/rooms/suite-luxo.png',
      size: '32m²',
      capacity: '2 pessoas',
      price: 'R$ 320',
      period: 'por noite',
      amenities: [
        { icon: Wifi, name: 'Wi-Fi gratuito' },
        { icon: Car, name: 'Estacionamento' },
        { icon: Coffee, name: 'Frigobar' },
        { icon: Tv, name: 'TV 42"' },
        { icon: Bath, name: 'Chuveiro' },
        { icon: Wind, name: 'Ar condicionado' },
      ],
      features: ['Vista para jardim', 'Varanda', 'Mesa de trabalho', 'Cofre digital'],
    },
    {
      id: 3,
      name: 'Quarto Standard',
      type: 'Essencial Confortável',
      description: 'Acomodações aconchegantes com todo o conforto necessário para uma ótima estadia.',
      image: '/images/rooms/standard-interno.png',
      size: '25m²',
      capacity: '2 pessoas',
      price: 'R$ 220',
      period: 'por noite',
      amenities: [
        { icon: Wifi, name: 'Wi-Fi gratuito' },
        { icon: Car, name: 'Estacionamento' },
        { icon: Coffee, name: 'Frigobar' },
        { icon: Tv, name: 'TV 32"' },
        { icon: Bath, name: 'Chuveiro' },
        { icon: Wind, name: 'Ar condicionado' },
      ],
      features: ['Vista interna', 'Janela ampla', 'Armário espaçoso', 'Escrivaninha'],
    },
    {
      id: 4,
      name: 'Suíte Família',
      type: 'Ideal para Famílias',
      description: 'Espaço amplo e funcional, perfeito para famílias que buscam conforto e praticidade.',
      image: '/images/rooms/suite-familia.png',
      size: '55m²',
      capacity: '4 pessoas',
      price: 'R$ 520',
      period: 'por noite',
      amenities: [
        { icon: Wifi, name: 'Wi-Fi gratuito' },
        { icon: Car, name: 'Estacionamento' },
        { icon: Coffee, name: 'Frigobar' },
        { icon: Tv, name: 'TV 50"' },
        { icon: Bath, name: '2 Banheiros' },
        { icon: Wind, name: 'Ar condicionado' },
      ],
      features: ['2 quartos', 'Sala de estar', 'Cozinha compacta', 'Varanda ampla'],
    },
  ];

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
      const message = `Olá! Gostaria de fazer uma reserva para: ${roomName}`;
      const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
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
            Acomodações
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            Conforto e Elegância
          </h2>
          <p className="text-lg text-navy/80 max-w-3xl mx-auto leading-relaxed">
            Escolha entre nossas acomodações cuidadosamente projetadas, cada uma oferecendo 
            uma experiência única de conforto, elegância e tranquilidade.
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
                      alt={`${rooms[currentRoom].name} - Vista do quarto com ${rooms[currentRoom].amenities.join(', ')}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                    
                    {/* Room Type Badge */}
                    <div className="absolute top-6 left-6 bg-gold text-navy font-semibold text-sm px-4 py-2 rounded-full">
                      {rooms[currentRoom].type}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-right">
                        <div className="text-2xl font-serif font-bold text-navy">
                          {rooms[currentRoom].price}
                        </div>
                        <div className="text-sm text-navy/70">
                          {rooms[currentRoom].period}
                        </div>
                      </div>
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
                      
                      <div className="flex items-center space-x-4 mb-4 text-sm text-navy/70">
                        <span>{rooms[currentRoom].size}</span>
                        <span>•</span>
                        <span>{rooms[currentRoom].capacity}</span>
                      </div>
                      
                      <p className="text-navy/80 mb-6 leading-relaxed">
                        {rooms[currentRoom].description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-navy mb-3">Características:</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {rooms[currentRoom].features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-gold rounded-full" />
                              <span className="text-sm text-navy/70">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

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
                        Reservar Agora
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
            aria-label="Acomodação anterior"
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>
          <button
            onClick={nextRoom}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Próxima acomodação"
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentRoom
                  ? 'bg-gold scale-125'
                  : 'bg-navy/20 hover:bg-navy/40'
              }`}
              aria-label={`Ver acomodação ${index + 1}`}
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
              className={`cursor-pointer transition-all duration-300 ${
                index === currentRoom ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setCurrentRoom(index)}
              whileHover={{ y: -5 }}
            >
              <Card className={`border-2 transition-all duration-300 ${
                index === currentRoom 
                  ? 'border-gold shadow-lg' 
                  : 'border-transparent hover:border-gold/50'
              }`}>
                <CardContent className="p-4">
                  <div className="relative w-full h-32 mb-3">
                    <Image
                      src={room.image}
                      alt={`${room.name} - ${room.type} com ${room.size}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="font-serif font-semibold text-navy mb-1">{room.name}</h4>
                  <p className="text-sm text-navy/70 mb-2">{room.type}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-navy/60">{room.size}</span>
                    <span className="font-semibold text-gold">{room.price}</span>
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