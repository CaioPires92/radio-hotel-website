'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wifi, Coffee, Tv, Wind, Phone, X, Camera } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
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

type Amenity = { icon: typeof Wifi; name: string };
type RoomGalleryItem = { src: string; tag: string };
type Room = {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  amenities: Amenity[];
  tags: string[];
  gallery: RoomGalleryItem[];
};

const roomsData = (t: (key: string) => string): Room[] => {
  const commonAmenities: Amenity[] = [
    { icon: Wind, name: t('accommodations.amenities.airConditioning') },
    { icon: Wifi, name: t('accommodations.amenities.wifi') },
    { icon: Tv, name: t('accommodations.amenities.tv') },
    { icon: Coffee, name: t('accommodations.amenities.minibar') },
    { icon: Phone, name: t('accommodations.amenities.phone') },
  ];

  // Seis quartos com fotos disponíveis (fallback estático)
  return [
    {
      id: 'std-frente-rua',
      name: 'Apartamento Standard',
      type: 'Apartamento Standard',
      description: 'Apartamento Standard frente rua',
      image: '/images/rooms/Apartamento-standard-interno2.jpg',
      amenities: commonAmenities,
      tags: ['Standard'],
      gallery: [
        { src: '/images/rooms/Apartamento-standard-interno2.jpg', tag: 'Apartamento Standard' },
      ],
    },
    {
      id: 'std-vista-interna',
      name: 'Apartamento Standard',
      type: 'Apartamento Standard',
      description: 'Apartamento Standard com vista interna',
      image: '/images/rooms/Apartamento-standard-interno.jpg',
      amenities: commonAmenities,
      tags: ['Standard'],
      gallery: [
        { src: '/images/rooms/Apartamento-standard-interno.jpg', tag: 'Apartamento Standard' },
      ],
    },
    {
      id: 'luxo-jardim',
      name: 'Apartamento Luxo',
      type: 'Piscina ou jardim',
      description: 'apto luxo com vista para a piscina ou jardim',
      image: '/images/rooms/Apartamento-luxo2.jpg',
      amenities: commonAmenities,
      tags: ['Luxo'],
      gallery: [
        { src: '/images/rooms/Apartamento-luxo2.jpg', tag: 'apto luxo com vista para a piscina ou jardim' },
      ],
    },
    {
      id: 'luxo-bosque',
      name: 'Apartamento Luxo',
      type: 'Piscina ou bosque',
      description: 'Apto Luxo com vista para a piscina ou bosque',
      image: '/images/rooms/Apartamento-luxo.jpg',
      amenities: commonAmenities,
      tags: ['Luxo'],
      gallery: [
        { src: '/images/rooms/Apartamento-luxo.jpg', tag: 'Luxo (quarto)' },
        { src: '/images/rooms/Apartamento-luxo2.jpg', tag: 'Luxo com vista piscina/jardim' },
      ],
    },
    {
      id: 'conjugado',
      name: 'Apto Conjugado',
      type: 'Conjugado',
      description: 'Apto Conjugado ideal para famílias, com ambientes integrados',
      image: '/images/rooms/conjugado.jpg',
      amenities: commonAmenities,
      tags: ['Conjugado'],
      gallery: [
        { src: '/images/rooms/conjugado.jpg', tag: 'Apto Conjugado' },
      ],
    },
    {
      id: 'suite-luxo',
      name: 'Suíte Luxo',
      type: 'Luxo',
      description: 'Suíte Luxo com vista para a piscina ou bosque',
      image: '/images/rooms/suite-luxo.jpg',
      amenities: commonAmenities,
      tags: ['Luxo'],
      gallery: [
        { src: '/images/rooms/suite-luxo.jpg', tag: 'Suíte Luxo' },
        { src: '/images/rooms/suite-luxo2.jpg', tag: 'Suíte Luxo (vista bosque/piscina)' },
      ],
    },
    {
      id: 'master-sacada',
      name: 'Suíte Master',
      type: 'Com sacada',
      description: 'Suíte Master com sacada e vista para a piscina',
      image: '/images/rooms/Suite-Master-com-sacada.jpg',
      amenities: commonAmenities,
      tags: ['Master'],
      gallery: [
        { src: '/images/rooms/Suite-Master-com-sacada.jpg', tag: 'Suíte Master com sacada' },
        { src: '/images/rooms/suite-master2.jpg', tag: 'Suíte Master especial' },
      ],
    },
    {
      id: 'master-especial',
      name: 'Suíte Master',
      type: 'Especial',
      description: 'Suíte Master especial com sacada e vista para a piscina',
      image: '/images/rooms/suite-master2.jpg',
      amenities: commonAmenities,
      tags: ['Master'],
      gallery: [
        { src: '/images/rooms/suite-master2.jpg', tag: 'Suíte Master especial com sacada e vista para a piscina' },
      ],
    },
  ];
};

const Accommodations = ({ onBookingClick, compact }: AccommodationsProps) => {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { t } = useTranslation();
  // Substitui variável por state para aceitar dados dinâmicos
  const [rooms, setRooms] = useState<Room[]>(roomsData(t));
  const [allRooms, setAllRooms] = useState<Room[]>(roomsData(t));
  const categories = useMemo(() => ['Apartamento Standard', 'Apartamento Luxo', 'Suíte Master', 'Apto Conjugado', 'Suíte Luxo'], []);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);



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
      { icon: Phone, name: t('accommodations.amenities.phone') },
    ];

    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();

        const apiRooms: Room[] = (data?.rooms ?? []).map((r: Room) => ({
          ...r,
          amenities: r.amenities?.length ? r.amenities : commonAmenities,
          // Garante que a particularidade apareça como tag visível
          tags: Array.from(new Set([...(r.tags || []), r.description].filter(Boolean)))
        }));

        // Se encontrou categorias via API, usa elas; senão mantém as atuais
        if (apiRooms.length) {
          const ordered = apiRooms.sort((a, b) => categories.indexOf(a.name) - categories.indexOf(b.name));
          setAllRooms(ordered);
          const initial = ordered.filter((r) => r.name === activeCategory);
          setRooms(initial.length ? initial : ordered);
          setCurrentRoom(0);
        }
      } catch {
        // Silencia erro e mantém fallback estático
      }
    };

    fetchRooms();
  }, [t, activeCategory, categories]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const filtered = allRooms.filter((r) => r.name === cat);
    setRooms(filtered.length ? filtered : allRooms);
    setCurrentRoom(0);
  };

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

          {/* Prévia das acomodações – versão compacta com Swiper */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {(() => {
              // Representantes fixos por categoria (thumbs oficiais)
              const source: Room[] = (allRooms && allRooms.length) ? allRooms : rooms
              const findByKey = (key: string) => source.find((r) => (r.name || '').toLowerCase().includes(key))
              const reps = [
                {
                  key: 'standard',
                  label: 'Apto Standard',
                  type: 'Standard',
                  description: 'Apto Standard com vista interna ou frente para rua',
                  image: '/images/rooms/thumbs/Apartamento-Standard-com-vista-interna.jpg',
                },
                {
                  key: 'luxo',
                  label: 'Apto Luxo',
                  type: 'Luxo',
                  description: 'apto luxo com vista para a piscina ou jardim',
                  image: '/images/rooms/thumbs/Apartamento-luxo.jpg',
                },
                {
                  key: 'master',
                  label: 'Suíte Master',
                  type: 'Master',
                  description: 'Suíte Master com sacada e vista para a piscina',
                  image: '/images/rooms/thumbs/Suite-Master-com-sacada-e-vista-para-a-piscina.jpg',
                },
                {
                  key: 'conjugado',
                  label: 'Apto Conjugado',
                  type: 'Conjugado',
                  description: 'Apto Conjugado ideal para famílias',
                  image: '/images/rooms/thumbs/conjugado.jpg',
                },
                {
                  key: 'suíte',
                  label: 'Suíte Luxo',
                  type: 'Luxo',
                  description: 'Suíte Luxo com vista para a piscina ou bosque',
                  image: '/images/rooms/thumbs/suite-luxo.jpg',
                },
              ]

              const cards = reps.map((rep) => {
                const r = findByKey(rep.key);
                return {
                  id: r?.id || rep.key,
                  name: rep.label,
                  type: rep.type,
                  // Descrição solicitada para cada categoria
                  description: rep.description,
                  image: rep.image,
                }
              })

              return (
                <div className="relative">
                  <Swiper
                    className="overflow-hidden pb-16 md:pb-20"
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={16}
                    breakpoints={{
                      768: { slidesPerView: 2, spaceBetween: 16 },
                      1024: { slidesPerView: 3, spaceBetween: 20 },
                    }}
                    loop
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    onSwiper={(s) => setSwiper(s)}
                  >
                    {cards.map((room) => (
                      <SwiperSlide key={room.id}>
                        <Card className="group card-standard card-standard-hover border-0 h-full flex flex-col md:min-h-[500px] pt-0">
                          <CardContent className="p-0 flex-1 flex flex-col">
                            <div className="card-media-fixed bg-black rounded-t-xl">
                              <Image
                                src={room.image}
                                alt={room.description || room.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="card-media-img-cover"
                              />
                              {room.type && room.name && room.type.toLowerCase() !== room.name.toLowerCase() && (
                                <div className="absolute top-4 left-4 bg-gold text-navy font-semibold text-xs px-3 py-1 rounded-full">
                                  {room.type}
                                </div>
                              )}
                            </div>
                            <div className="p-5 sm:p-6 flex-none flex flex-col gap-2">
                              <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">{room.name}</h3>
                              {room.description && (
                                <p className="text-sm text-navy/70">{room.description}</p>
                              )}
                              <div className="mt-4">
                                <Button
                                  onClick={() => handleBookingClick(room.name)}
                                  className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full w-full"
                                  aria-label={`Reservar ${room.name}`}
                                >
                                  <Phone className="w-4 h-4 mr-2" />
                                  {t('accommodations.buttons.bookNow')}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button
                    onClick={() => swiper?.slidePrev()}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/35 hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                    aria-label={t('accommodations.navigation.previous')}
                  >
                    <ChevronLeft className="w-5 h-5" color="#FFFFFF" />
                  </button>
                  <button
                    onClick={() => swiper?.slideNext()}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/35 hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                    aria-label={t('accommodations.navigation.next')}
                  >
                    <ChevronRight className="w-5 h-5" color="#FFFFFF" />
                  </button>
                </div>
              )
            })()}
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

        {/* Filtro por categoria */}
        <div className="flex justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full border transition ${activeCategory === cat ? 'bg-gold text-navy border-gold' : 'bg-white text-navy border-gold/30 hover:bg-gold/10'}`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Room Carousel (Swiper) */}
        <div className="relative">
          <Swiper
            className="overflow-hidden rounded-2xl"
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            onSwiper={(s) => setSwiper(s)}
            onSlideChange={(s) => { setCurrentRoom(s.realIndex); setCurrentPhotoIndex(0); }}
          >
            {rooms.map((room) => (
              <SwiperSlide key={room.id}>
                <Card className="border-0 shadow-2xl bg-white py-0">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-5 gap-0">
                      <div className="lg:col-span-3 relative h-[460px] sm:h-[540px] lg:h-[620px] group bg-black overflow-hidden">
                        <Image
                          src={room.image}
                          alt={`${room.description}`}
                          fill
                          className="object-cover object-center"
                          priority
                          quality={85}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                        <div className="absolute top-6 left-6 bg-gold text-navy font-semibold text-sm px-4 py-2 rounded-full">
                          {room.type}
                        </div>
                        <div className="absolute top-6 right-6 flex flex-wrap gap-2">
                          {room.tags?.map((tag, idx) => (
                            <span key={idx} className="bg-white/90 text-navy text-xs px-3 py-1 rounded-full shadow">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                      <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <h3 className="text-3xl font-serif font-bold text-navy mb-2">
                            {room.name}
                          </h3>
                          <p className="text-navy/80 mb-6 leading-relaxed">
                            {room.description}
                          </p>
                          <div className="mb-8">
                            <h4 className="font-semibold text-navy mb-3">Comodidades:</h4>
                            <div className="grid grid-cols-3 gap-3">
                              {room.amenities.map((amenity, index) => {
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
                          <Button
                            onClick={() => handleBookingClick(room.name)}
                            className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 w-full"
                            aria-label={`Reservar ${room.name}`}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            {t('accommodations.buttons.bookNow')}
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Galeria (modal) responsivo */}
          <AnimatePresence>
            {isGalleryOpen && (
              <motion.div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 win7-overlay-fix"
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
                      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] bg-white">
                        {rooms[currentRoom].gallery && rooms[currentRoom].gallery.length > 0 && (
                          <Image
                            src={rooms[currentRoom].gallery[currentPhotoIndex].src}
                            alt={`${rooms[currentRoom].description}`}
                            fill
                            className="object-contain"
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
                          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                            <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
                              {rooms[currentRoom].gallery?.map((photo, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentPhotoIndex(idx)}
                                  className={`relative flex-shrink-0 w-12 h-8 sm:w-16 sm:h-10 md:w-20 md:h-12 rounded-lg overflow-hidden border-2 transition-colors ${idx === currentPhotoIndex ? 'border-gold' : 'border-white/50 hover:border-white'
                                    }`}
                                  aria-label={`Selecionar foto ${idx + 1}`}
                                >
                                  <Image src={photo.src} alt={photo.tag ?? rooms[currentRoom].type} fill className="object-cover" quality={75} />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Indicador de posição */}
                        {rooms[currentRoom].gallery && rooms[currentRoom].gallery.length > 1 && (
                          <div className="absolute top-3 right-12 sm:top-4 sm:right-16 bg-black/60 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                            {currentPhotoIndex + 1} / {rooms[currentRoom].gallery.length}
                          </div>
                        )}
                      </div>

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
            onClick={() => swiper?.slidePrev()}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10"
            aria-label={t('accommodations.navigation.previous')}
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10"
            aria-label={t('accommodations.navigation.next')}
          >
            <ChevronRight className="w-6 h-6 text-navy" />
          </button>
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
              <Card className={`pt-0 border-2 transition-all duration-300 ${index === currentRoom
                ? 'border-gold shadow-lg'
                : 'border-transparent hover:border-gold/50'
                }`}>
                <CardContent className="p-0">
                  <div className="relative w-full aspect-[4/3] group">
                    <Image
                      src={room.image}
                      alt={`${room.description}`}
                      fill
                      className="object-cover object-center"
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
                  <div className="p-3">
                    <h4 className="font-serif font-semibold text-navy mb-1">{room.name}</h4>
                    <p className="text-sm text-navy/70 mb-2">{room.description}</p>
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
