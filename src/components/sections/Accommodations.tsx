'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wifi, Coffee, Tv, Bath, Wind, Phone, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useTranslation } from '@/components/i18n/I18nProvider';
import { WHATSAPP_NUMBER } from '@/lib/config';
import Link from 'next/link';

interface AccommodationsProps {
  onBookingClick?: () => void;
  compact?: boolean;
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
    tags: ['Suíte standard'],
    gallery: [
      { src: '/images/rooms/standard-1.jpg', tag: 'Suíte standard' },
    ],
  };

  const luxury = {
    id: 'luxury',
    name: t('accommodations.rooms.luxury.name'),
    type: t('accommodations.rooms.luxury.type'),
    description: t('accommodations.rooms.luxury.description'),
    image: '/images/rooms/luxo-2.jpg',
    amenities: commonAmenities,
    tags: ['Suíte master', 'Suíte master especial'],
    gallery: [
      { src: '/images/rooms/luxo-2.jpg', tag: 'Suíte master' },
      // { src: '/images/rooms/master-especial.jpg', tag: 'Suíte master especial' }, // adicionar arquivo em public para habilitar
    ],
  };

  const quadruple = {
    id: 'quadruple',
    name: t('accommodations.rooms.quadruple.name'),
    type: t('accommodations.rooms.quadruple.type'),
    description: t('accommodations.rooms.quadruple.description'),
    image: '/images/rooms/quadruplo-2.jpg',
    amenities: commonAmenities,
    tags: ['Suíte com 2 camas de casal'],
    gallery: [
      { src: '/images/rooms/quadruplo-2.jpg', tag: 'Suíte com 2 camas de casal' },
      // { src: '/images/rooms/suite-2-camas.jpg', tag: 'Suíte com 2 camas de casal' }, // adicionar arquivo em public para habilitar
    ],
  };

  return [
    standard,
    luxury,
    quadruple,
  ];
};

const Accommodations = ({ onBookingClick, compact }: AccommodationsProps) => {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { t } = useTranslation();
  // Substitui variável por state para aceitar dados dinâmicos
  const [rooms, setRooms] = useState(roomsData(t));

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % rooms.length);
  };

  const prevRoom = () => {
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const handleOpenGallery = () => {
    setCurrentPhotoIndex(0);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextPhoto = () => {
    const total = rooms[currentRoom].gallery?.length || 0;
    if (total > 0) setCurrentPhotoIndex((prev) => (prev + 1) % total);
  };

  const prevPhoto = () => {
    const total = rooms[currentRoom].gallery?.length || 0;
    if (total > 0) setCurrentPhotoIndex((prev) => (prev - 1 + total) % total);
  };

  // Fechar galeria com ESC e prevenir scroll
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isGalleryOpen) {
        handleCloseGallery();
      }
    };

    if (isGalleryOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen]);

  const handleBookingClick = (roomName: string) => {
    if (onBookingClick) {
      onBookingClick();
    } else {
      const message = `${t('accommodations.whatsapp.bookingMessage')} ${roomName}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  useEffect(() => {
    // Monta amenidades comuns usando tradução atual
    const commonAmenities = [
      { icon: Wind, name: t('accommodations.amenities.airConditioning') },
      { icon: Wifi, name: t('accommodations.amenities.wifi') },
      { icon: Tv, name: t('accommodations.amenities.tv') },
      { icon: Coffee, name: t('accommodations.amenities.minibar') },
      { icon: Phone, name: t('accommodations.amenities.telephone') },
    ];

    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();

        const apiRooms = (data?.rooms ?? []).map((r: any) => ({
          ...r,
          amenities: r.amenities?.length ? r.amenities : commonAmenities
        }));

        // Se encontrou categorias via API, usa elas; senão mantém as atuais
        if (apiRooms.length) {
          setRooms(apiRooms);
        }
      } catch {
        // Silencia erro e mantém fallback estático
      }
    };

    fetchRooms();
  }, [t]);

  // Variante compacta para a Home
  if (compact) {
    return (
      <section id="accommodations" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
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

          {/* Prévia das acomodações (3 cards) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {rooms.slice(0, 3).map((room) => (
              <Card key={room.id} className="border-0 shadow-2xl bg-white">
                <CardContent className="p-0">
                  <div className="relative h-48 rounded-t-2xl overflow-hidden">
                    <Image
                      src={room.image}
                      alt={`${room.name} - ${room.type}`}
                      fill
                      className="object-cover rounded-lg"
                      quality={85}
                    />
                    <div className="absolute top-4 left-4 bg-gold text-navy font-semibold text-xs px-3 py-1 rounded-full">
                      {room.type}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-3xl font-serif font-bold text-navy mb-1">{room.name}</h3>
                    <p className="text-sm text-navy/70 mb-4">{room.description}</p>
                    <Button
                      onClick={() => handleBookingClick(room.name)}
                      className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full w-full"
                      aria-label={`Reservar ${room.name}`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {t('accommodations.buttons.bookNow')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Link para página dedicada */}
          <div className="mt-10 text-center">
            <Link href="/acomodacoes" aria-label="Ver acomodações">
              <Button className="inline-flex bg-navy hover:bg-navy/90 text-white px-6 py-3 rounded-full">
                {t('accommodations.buttons.viewAll') || 'Ver acomodações'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

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
                  <div className="lg:col-span-3 relative h-96 lg:h-auto group rounded-t-2xl overflow-hidden">
                    <Image
                      src={rooms[currentRoom].image}
                      alt={`${rooms[currentRoom].name} - Vista do quarto com ${rooms[currentRoom].amenities.map(a => a.name).join(', ')}`}
                      fill
                      className="object-cover"
                      priority
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />

                    {/* Room Type Badge */}
                    <div className="absolute top-6 left-6 bg-gold text-navy font-semibold text-sm px-4 py-2 rounded-full">
                      {rooms[currentRoom].type}
                    </div>

                    {/* Tags da suíte visíveis */}
                    <div className="absolute top-6 right-6 flex flex-wrap gap-2">
                      {rooms[currentRoom].tags?.map((tag, idx) => (
                        <span key={idx} className="bg-white/90 text-navy text-xs px-3 py-1 rounded-full shadow">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Botão "Ver fotos" centralizado que aparece no hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-2xl">
                      <button
                        onClick={handleOpenGallery}
                        className="bg-white/95 hover:bg-white text-navy px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-300"
                        aria-label="Abrir galeria de fotos"
                      >
                        <Camera className="w-4 h-4" />
                        Ver fotos
                      </button>
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

          {/* Galeria (modal) responsivo */}
          <AnimatePresence>
            {isGalleryOpen && (
              <motion.div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseGallery} // Clique fora fecha a galeria
              >
                <div 
                  className="relative w-full max-w-6xl mx-auto"
                  onClick={(e) => e.stopPropagation()} // Previne fechamento ao clicar na imagem
                >
                  <Card className="bg-white/95 border-0 rounded-2xl overflow-hidden shadow-2xl">
                    <CardContent className="p-0">
                      <div className="relative h-[80vh] sm:h-[85vh] md:h-[90vh] lg:h-[90vh] rounded-t-2xl overflow-hidden">
                        {rooms[currentRoom].gallery && rooms[currentRoom].gallery.length > 0 && (
                          <Image
                            src={rooms[currentRoom].gallery[currentPhotoIndex].src}
                            alt={`${rooms[currentRoom].name} - ${rooms[currentRoom].gallery[currentPhotoIndex].tag ?? rooms[currentRoom].type}`}
                            fill
                            className="object-cover"
                            quality={85}
                            priority
                          />
                        )}

                        {/* Tag visível */}
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <span className="bg-navy text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-md">
                            {rooms[currentRoom].gallery?.[currentPhotoIndex]?.tag ?? rooms[currentRoom].type}
                          </span>
                        </div>

                        {/* Botão fechar */}
                        <button
                          onClick={handleCloseGallery}
                          className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
                          aria-label="Fechar galeria"
                        >
                          <X className="w-4 h-4 sm:w-5 sm:h-5 text-navy" />
                        </button>

                        {/* Navegação - apenas se houver mais de uma foto */}
                        {rooms[currentRoom].gallery && rooms[currentRoom].gallery.length > 1 && (
                          <>
                            <button
                              onClick={prevPhoto}
                              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-colors"
                              aria-label="Foto anterior"
                            >
                              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-navy" />
                            </button>
                            <button
                              onClick={nextPhoto}
                              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-colors"
                              aria-label="Próxima foto"
                            >
                              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-navy" />
                            </button>
                          </>
                        )}

                        {/* Thumbnails - apenas se houver mais de uma foto */}
                        {rooms[currentRoom].gallery && rooms[currentRoom].gallery.length > 1 && (
                          <></>
                        )}

                        {/* Indicador de posição */}
                        {rooms[currentRoom].gallery && rooms[currentRoom].gallery.length > 1 && (
                          <div className="absolute top-3 right-12 sm:top-4 sm:right-16 bg-black/60 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                            {currentPhotoIndex + 1} / {rooms[currentRoom].gallery.length}
                          </div>
                        )}
                      </div>

                      {rooms[currentRoom].gallery && rooms[currentRoom].gallery.length > 1 && (
                        <div className="px-4 sm:px-6 pt-3">
                          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
                            {rooms[currentRoom].gallery?.map((photo, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentPhotoIndex(idx)}
                                className={`relative flex-shrink-0 w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                  idx === currentPhotoIndex ? 'border-gold' : 'border-white/50 hover:border-white'
                                }`}
                                aria-label={`Selecionar foto ${idx + 1}`}
                              >
                                <Image src={photo.src} alt={photo.tag ?? rooms[currentRoom].type} fill className="object-cover" quality={75} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Outras acomodações */}
                      <div className="p-4 border-t flex flex-wrap gap-2 items-center justify-center">
                        {rooms.map((room, idx) => (
                          <button
                            key={room.id}
                            onClick={() => { setCurrentRoom(idx); setCurrentPhotoIndex(0); }}
                            className={`text-sm px-3 py-1 rounded-full border ${idx === currentRoom ? 'bg-gold text-navy border-gold' : 'bg-white text-navy border-navy/20 hover:bg-navy/5'}`}
                            aria-label={`Ver acomodações: ${room.name}`}
                          >
                            {room.type}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
    
{/* Room Grid Preview */}
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
      {/* WRAPPER QUE MANDA NO RADIUS */}
      <div
        className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
          index === currentRoom
            ? 'border-gold shadow-lg'
            : 'border-transparent hover:border-gold/50'
        }`}
      >
        <Card className="border-0 rounded-none shadow-none">
          <CardContent className="p-0">
            {/* IMAGEM */}
            <div className="relative w-full h-48 group">
              <Image
                src={room.image}
                alt={`${room.name} - ${room.type}`}
                fill
                className="object-cover"
                quality={85}
              />

              <div className="absolute top-2 left-2">
                <span className="bg-navy/80 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {room.type}
                </span>
              </div>

              {/* Botão "Ver fotos" que aparece no hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Previne ativação do onClick do card
                    setCurrentRoom(index);
                    handleOpenGallery();
                  }}
                  className="bg-white/95 hover:bg-white text-navy px-3 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-300 text-sm"
                  aria-label={`Ver galeria de fotos de ${room.name}`}
                >
                  <Camera className="w-3 h-3" />
                  Ver fotos
                </button>
              </div>
            </div>

            {/* TEXTO */}
            <div className="p-4">
              <h4 className="font-serif font-semibold text-navy mb-1">
                {room.name}
              </h4>
              <p className="text-sm text-navy/70 mb-2">{room.type}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  ))}
</motion.div>



      </div>
    </section>
  );
};

export default Accommodations;