'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Noite Italiana às Sextas-feiras',
    description: 'Celebre o início do fim de semana com uma autêntica noite italiana. Nosso Restaurante Cinquentenário oferece um buffet completo com massas frescas, antepastos clássicos e música ao vivo.',
    date: 'Toda Sexta-feira',
    time: '20:00',
    location: 'Restaurante Cinquentenário',
    image: '/events/noite-italiana.svg',
    category: 'Gastronomia'
  },
  {
    id: '2',
    title: 'O Sábado da nossa Feijoada',
    description: 'Desfrute da mais tradicional feijoada de Serra Negra, servida em nosso buffet completo. Uma experiência de sabor e tradição, perfeita para um almoço de sábado em família.',
    date: 'Todo Sábado',
    time: '13:00',
    location: 'Restaurante Cinquentenário',
    image: '/events/feijoada-sabado.svg',
    category: 'Gastronomia'
  },
  {
    id: '3',
    title: 'Passeio Guiado: Nosso Bosque Privativo',
    description: 'Conecte-se com a natureza em uma caminhada guiada pelo nosso parque privativo de 60.000 m². Explore a mata nativa, o bosque de pinheiros e nossa cachoeira particular, um verdadeiro oásis no centro da cidade.',
    date: 'Diariamente',
    time: '10:00',
    location: 'Parque Privativo do Hotel',
    image: '/events/passeio-bosque.svg',
    category: 'Bem-Estar & Lazer'
  },
  {
    id: '4',
    title: 'Pacote Especial: Escapada Romântica',
    description: 'Surpreenda quem você ama com uma estadia inesquecível. Inclui hospedagem em Apartamento Luxo com vista para a piscina, jantar especial no Restaurante Cinquentenário e decoração romântica.',
    date: 'Consulte disponibilidade',
    time: 'Check-in a partir das 14:00',
    location: 'Radio Hotel',
    image: '/events/pacote-romantico.svg',
    category: 'Pacotes'
  },
  {
    id: '5',
    title: 'Feriado de 20 de Novembro',
    description: 'Aproveite o feriado com uma programação que une descanso e a rica cultura brasileira. Desfrute de nossa gastronomia, piscina aquecida e da tranquilidade de nosso parque no coração de Serra Negra.',
    date: 'Pacote de 17 a 20 de Novembro',
    time: 'Programação completa',
    location: 'Radio Hotel',
    image: '/events/feriado-novembro.svg',
    category: 'Feriado'
  },
  {
    id: '6',
    title: 'Semana Mágica do Dia das Crianças',
    description: 'Uma semana inteira dedicada aos pequenos hóspedes, com nossa famosa monitoria de lazer, oficinas criativas, gincanas no parque e um cardápio especial para as crianças.',
    date: 'Semana de 12 de Outubro',
    time: 'Atividades das 9:00 às 22:00',
    location: 'Áreas de Lazer e Parque',
    image: '/events/dia-criancas.svg',
    category: 'Família'
  }
];

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EventsModal({ isOpen, onClose }: EventsModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBookEvent = (event: Event) => {
    const message = `Olá! Gostaria de fazer uma reserva para o evento "${event.title}" no dia ${event.date} às ${event.time}. Poderiam me ajudar com mais informações?`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-navy to-blue p-6 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="pr-12">
                <h2 className="text-3xl font-serif font-bold mb-2">Eventos Especiais</h2>
                <p className="text-white/95">Experiencias unicas no Radio Hotel</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {!selectedEvent ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-cream/50 hover:bg-white"
                            onClick={() => setSelectedEvent(event)}>
                        <CardContent className="p-0">
                          {/* Event Image */}
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <div className="w-full h-full bg-gradient-to-br from-gold/20 to-navy/20 flex items-center justify-center">
                              <Calendar className="w-12 h-12 text-gold" />
                            </div>
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-gold text-navy">{event.category}</Badge>
                            </div>
                          </div>
                          
                          {/* Event Info */}
                          <div className="p-4 space-y-3">
                            <h3 className="font-serif font-semibold text-navy text-lg group-hover:text-gold transition-colors">
                              {event.title}
                            </h3>
                            
                            <p className="text-sm text-navy/70 line-clamp-2">
                              {event.description}
                            </p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-navy/60">
                                <Calendar className="w-4 h-4" />
                                <span>{event.date}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-navy/60">
                                <Clock className="w-4 h-4" />
                                <span>{event.time}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-navy/60">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                            

                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Event Detail View */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex items-center gap-2 text-navy/70 hover:text-navy transition-colors"
                  >
                    <span>← Voltar aos eventos</span>
                  </button>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Event Image */}
                    <div className="relative h-80 bg-gradient-to-br from-gold/20 to-navy/20 rounded-xl flex items-center justify-center">
                      <Calendar className="w-20 h-20 text-gold" />
                    </div>
                    
                    {/* Event Details */}
                    <div className="space-y-6">
                      <div>
                        <Badge className="bg-gold text-navy mb-3">{selectedEvent.category}</Badge>
                        <h3 className="text-3xl font-serif font-bold text-navy mb-4">
                          {selectedEvent.title}
                        </h3>
                        <p className="text-lg text-navy/80 leading-relaxed">
                          {selectedEvent.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gold" />
                            <div>
                              <p className="text-sm text-navy/60">Data</p>
                              <p className="font-medium text-navy">{selectedEvent.date}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gold" />
                            <div>
                              <p className="text-sm text-navy/60">Horario</p>
                              <p className="font-medium text-navy">{selectedEvent.time}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gold" />
                            <div>
                              <p className="text-sm text-navy/60">Local</p>
                              <p className="font-medium text-navy">{selectedEvent.location}</p>
                            </div>
                          </div>
                          

                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gold/20">
                        <button
                          onClick={() => handleBookEvent(selectedEvent)}
                          className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                          Reservar via WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}