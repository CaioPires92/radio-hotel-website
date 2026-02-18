'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Phone, Wifi, Coffee, Tv, Wind, X } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/components/i18n/I18nProvider';
import { WHATSAPP_NUMBER } from '@/lib/config';

type Amenity = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
};

type GalleryPhoto = {
  src: string;
  tag?: string;
};

type Room = {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  amenities: Amenity[];
  gallery: GalleryPhoto[];
  tags?: string[];
};

function getRooms(t: (key: string) => string): Room[] {
  const commonAmenities: Amenity[] = [
    { icon: Wind, name: t('accommodations.amenities.airConditioning') },
    { icon: Wifi, name: t('accommodations.amenities.wifi') },
    { icon: Tv, name: t('accommodations.amenities.tv') },
    { icon: Coffee, name: t('accommodations.amenities.minibar') },
    { icon: Phone, name: t('accommodations.amenities.phone') },
  ];

  return [
    {
      id: 'std',
      name: 'Apartamento Standard',
      type: 'Standard',
      description: 'Vista interna ou frente para rua.',
      image: '/images/rooms/Apartamento-standard-interno.jpg',
      amenities: commonAmenities,
      tags: ['Standard vista interna', 'Standard frente rua'],
      gallery: [
        {
          src: '/images/rooms/Apartamento-standard-interno.jpg',
          tag: 'Standard vista interna',
        },
        {
          src: '/images/rooms/Apartamento-standard-interno2.jpg',
          tag: 'Standard frente rua',
        },
      ],
    },
    {
      id: 'luxo',
      name: 'Apartamento Luxo',
      type: 'Luxo',
      description: 'Mais espaço e vista para a piscina ou jardim.',
      image: '/images/rooms/Apartamento-luxo.jpg',
      amenities: commonAmenities,
      tags: ['Luxo (quarto)', 'Luxo com vista piscina/jardim'],
      gallery: [
        {
          src: '/images/rooms/Apartamento-luxo.jpg',
          tag: 'Luxo (quarto)',
        },
        {
          src: '/images/rooms/Apartamento-luxo2.jpg',
          tag: 'Luxo com vista piscina/jardim',
        },
      ],
    },
    {
      id: 'conjugado',
      name: 'Apto Conjugado',
      type: 'Conjugado',
      description: 'Apartamento Familiar com dois dormitórios e um toalete',
      image: '/images/rooms/conjugado.jpg',
      amenities: commonAmenities,
      tags: ['Conjugado'],
      gallery: [
        {
          src: '/images/rooms/conjugado.jpg',
          tag: 'Conjugado',
        },
        {
          src: '/images/rooms/conjugado2.jpg',
          tag: 'Conjugado',
        },
      ],
    },
    {
      id: 'suite-luxo',
      name: 'Suíte Luxo',
      type: 'Luxo',
      description: 'Suíte Luxo com vista para a piscina ou bosque.',
      image: '/images/rooms/suite-luxo.jpg',
      amenities: commonAmenities,
      tags: ['Luxo (quarto)', 'Luxo com vista piscina/jardim'],
      gallery: [
        {
          src: '/images/rooms/suite-luxo.jpg',
          tag: 'Luxo (quarto)',
        },
        {
          src: '/images/rooms/suite-luxo2.jpg',
          tag: 'Luxo com vista piscina/jardim',
        },
      ],
    },
    {
      id: 'master',
      name: 'Suíte Master',
      type: 'Master',
      description: 'Suíte ampla com duas camas de casal king size, no mesmo ambiente, com sacada e vista para a piscina.',
      image: '/images/rooms/Suite-Master2.jpg',
      amenities: commonAmenities,
      tags: ['Master com sacada', 'Master especial'],
      gallery: [
        {
          src: '/images/rooms/Suite-Master.jpg',
          tag: 'Master com sacada',
        },
        {
          src: '/images/rooms/Suite-Master2.jpg',
          tag: 'Master especial',
        },
      ],
    },
  ];
}

export default function AccommodationsSimple() {
  const { t } = useTranslation();
  const rooms = useMemo(() => getRooms(t), [t]);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) ?? null;
  const isGalleryOpen = !!selectedRoom;

  useEffect(() => {
    if (selectedRoomId) {
      setCurrentPhotoIndex(0);
    }
  }, [selectedRoomId]);

  useEffect(() => {
    if (isGalleryOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isGalleryOpen]);



  const handleBookingClick = (roomName: string) => {
    const message = `${t('accommodations.whatsapp.bookingMessage')} ${roomName}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOpenGallery = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleCloseGallery = useCallback(() => {
    setSelectedRoomId(null);
  }, []);

  const nextPhoto = useCallback(() => {
    if (!selectedRoom || !selectedRoom.gallery.length) return;
    setCurrentPhotoIndex((prev) => (prev + 1) % selectedRoom.gallery.length);
  }, [selectedRoom]);

  const prevPhoto = useCallback(() => {
    if (!selectedRoom || !selectedRoom.gallery.length) return;
    setCurrentPhotoIndex((prev) => (prev - 1 + selectedRoom.gallery.length) % selectedRoom.gallery.length);
  }, [selectedRoom]);

  useEffect(() => {
    if (!isGalleryOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextPhoto();
      } else if (e.key === 'ArrowLeft') {
        prevPhoto();
      } else if (e.key === 'Escape') {
        handleCloseGallery();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isGalleryOpen, nextPhoto, prevPhoto, handleCloseGallery]);

  return (
    <section
      id="accommodations"
      className="py-16 bg-cream"
      aria-label={t('footer.quickLinks.accommodations')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-on-light font-medium text-sm uppercase tracking-wider mb-4 block">
            {t('accommodations.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">
            {t('accommodations.title')}
          </h2>
          <p className="text-lg text-navy/80 max-w-3xl mx-auto leading-relaxed">
            {t('accommodations.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {rooms.map((room) => (
            <Card
              key={room.id}
              className="pt-0 border-0 shadow-lg rounded-2xl overflow-hidden flex flex-col"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative w-full aspect-[4/3] bg-black">
                  <Image
                    src={room.image}
                    alt={room.description || room.name}
                    fill
                    className="object-cover object-center"
                    quality={85}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  {null}
                </div>

                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-navy mb-1">
                      {room.name}
                    </h3>
                    <p className="text-sm text-navy/75">{room.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-navy mb-2">
                      Comodidades em destaque
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs text-navy/75">
                      {room.amenities.slice(0, 4).map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-gold" />
                            </div>
                            <span>{amenity.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <Button
                      onClick={() => handleBookingClick(room.name)}
                      className="bg-gold hover:bg-gold/90 text-navy font-semibold w-full rounded-full"
                      aria-label={`Reservar ${room.name}`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {t('accommodations.buttons.bookNow')}
                    </Button>

                    {room.gallery.length > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => handleOpenGallery(room.id)}
                        className="w-full rounded-full border-navy/20 text-navy hover:bg-navy/5"
                        aria-label={`Ver fotos de ${room.name}`}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Ver fotos da acomodação
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {isGalleryOpen && selectedRoom && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 win7-overlay-fix"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accommodation-gallery-title"
            onClick={handleCloseGallery}
          >
            <div
              className="relative w-full max-w-5xl mx-auto h-[70vh] md:h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full bg-black">
                {selectedRoom.gallery.length > 0 && (
                  <Image
                    key={`${selectedRoom.id}-${currentPhotoIndex}`}
                    src={selectedRoom.gallery[currentPhotoIndex].src}
                    alt={
                      selectedRoom.gallery[currentPhotoIndex].tag ||
                      selectedRoom.description ||
                      selectedRoom.name
                    }
                    fill
                    className="object-cover object-center"
                    quality={90}
                    sizes="100vw"
                  />
                )}

                {null}

                <button
                  ref={closeButtonRef}
                  onClick={handleCloseGallery}
                  className="absolute top-3 right-3 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg"
                  aria-label="Fechar galeria"
                >
                  <X className="w-4 h-4 text-navy" />
                </button>

                {selectedRoom.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="w-5 h-5 text-navy" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="w-5 h-5 text-navy" />
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                      {currentPhotoIndex + 1} / {selectedRoom.gallery.length}
                    </div>

                    {/* Thumbnails */}
                    <div className="absolute bottom-3 left-3 right-24 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {selectedRoom.gallery.map((photo, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentPhotoIndex(idx)}
                          aria-label={`Ver foto ${idx + 1}`}
                          className={`relative h-12 w-16 rounded-md overflow-hidden ring-1 ring-white/40 ${idx === currentPhotoIndex ? 'outline outline-2 outline-gold' : ''}`}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.tag || selectedRoom.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 64px, 128px"
                            quality={70}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section >
  );
}
