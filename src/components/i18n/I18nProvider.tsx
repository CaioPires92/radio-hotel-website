'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { Locale } from '@/lib/i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dictionary: Record<string, any>;
  isLoading: boolean;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string;
  isRTL: boolean;
  locales: Locale[];
  defaultLocale: Locale;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale || 'pt-BR');
  const [isLoading, setIsLoading] = useState(false);
  
  // Simple translation function for now
  const t = (key: string, params?: Record<string, string | number>) => {
    // Basic translations for the app
    const translations: Record<string, string> = {
      // Booking translations
      'booking.title': 'Faça sua Reserva',
      'booking.subtitle': 'Preencha os dados abaixo e entraremos em contato via WhatsApp',
      'booking.checkIn': 'Check-in',
      'booking.checkOut': 'Check-out',
      'booking.adults': 'Adultos',
      'booking.children': 'Crianças',
      'booking.accommodationType': 'Tipo de Quarto',
      'booking.submitButton': 'Enviar Solicitação',
      'booking.closeForm': 'Fechar',
      'booking.whatsappRedirect': 'Você será redirecionado para o WhatsApp',
      'booking.roomTypes.standard': 'Quarto Standard',
      'booking.roomTypes.deluxe': 'Quarto Deluxe',
      'booking.roomTypes.suiteMaster': 'Suíte Master',
      'booking.roomTypes.suiteFamily': 'Suíte Família',
      'booking.currency': 'R$',
      'booking.perNight': 'noite',
      'booking.adultSingular': 'adulto',
      'booking.adultPlural': 'adultos',
      'booking.childSingular': 'criança',
      'booking.childPlural': 'crianças',
      'booking.specialRequests': 'Solicitações Especiais',
      'booking.specialRequestsPlaceholder': 'Descreva suas necessidades especiais...',
      'booking.selectAccommodation': 'Selecione uma acomodação',
      'booking.validation.checkInRequired': 'Check-in é obrigatório',
      'booking.validation.checkOutRequired': 'Check-out é obrigatório',
      'booking.validation.checkOutAfterCheckIn': 'Check-out deve ser posterior ao check-in',
      'booking.validation.roomTypeRequired': 'Tipo de quarto é obrigatório',
      'booking.submitAriaLabel': 'Enviar solicitação de reserva',
      'booking.sending': 'Enviando...',
      
      // About translations
      'about.badge': 'Tradição & Elegância',
      'about.title': 'Radio Hotel',
      'about.location': 'Serra Negra',
      'about.description1': 'Há mais de 80 anos, o Radio Hotel é sinônimo de hospitalidade e tradição em Serra Negra. Localizado no coração da cidade, oferecemos uma experiência única que combina o charme clássico com o conforto moderno.',
      'about.description2': 'Nossa paixão pela excelência se reflete em cada detalhe, desde nossos quartos elegantemente decorados até nosso atendimento personalizado, garantindo que cada hóspede se sinta verdadeiramente especial.',
      'about.award.years': '80+ Anos',
      'about.award.excellence': 'de Excelência',
      'about.stats.years': 'Anos de História',
      'about.stats.park': 'm² de Área Verde',
      'about.stats.rating': 'Avaliação Média',
      'about.stats.location': 'Localização',
      
      // About features
      'about.features.wifi.title': 'Wi-Fi Gratuito',
      'about.features.wifi.description': 'Internet de alta velocidade em todas as áreas',
      'about.features.parking.title': 'Estacionamento',
      'about.features.parking.description': 'Vagas gratuitas para hóspedes',
      'about.features.breakfast.title': 'Café da Manhã',
      'about.features.breakfast.description': 'Buffet completo com produtos regionais',
      'about.features.restaurant.title': 'Restaurante',
      'about.features.restaurant.description': 'Culinária regional e internacional',
      'about.features.gym.title': 'Academia',
      'about.features.gym.description': 'Equipamentos modernos 24h',
      'about.features.events.title': 'Eventos',
      'about.features.events.description': 'Salões para eventos e celebrações',
      
      // Navigation translations
      'navigation.home': 'Início',
      'navigation.accommodations': 'Acomodações',
      'navigation.events': 'Eventos',
      'navigation.contact': 'Contato',
      'navigation.booking': 'Reservar',
      'navigation.bookNow': 'Reservar Agora',
      'navigation.language': 'Idioma',
      
      // Hero translations
      'hero.slide1.title': 'Radio Hotel',
      'hero.slide1.subtitle': 'Tradição e Elegância em Serra Negra',
      'hero.slide1.description': 'Há mais de 80 anos oferecendo hospitalidade única no coração de Serra Negra',
      'hero.slide2.title': 'Conforto Premium',
      'hero.slide2.subtitle': 'Quartos e Suítes Exclusivas',
      'hero.slide2.description': 'Acomodações elegantes com vista para as montanhas e todo conforto moderno',
      'hero.slide3.title': 'Experiência Completa',
      'hero.slide3.subtitle': 'Gastronomia e Lazer',
      'hero.slide3.description': 'Restaurante premiado, spa relaxante e atividades para toda a família',
      'hero.cta.booking': 'Fazer Reserva',
      'hero.cta.explore': 'Explorar Hotel',
      'hero.discoverMore': 'Descobrir Mais',
      'hero.location': 'Serra Negra, SP',
      'hero.rating': 'Avaliação',
      'hero.phone': 'Contato',
      
      // Reviews translations
      'reviews.title': 'O que nossos hóspedes dizem',
      'reviews.subtitle': 'Experiências reais de quem já se hospedou no Radio Hotel e vivenciou nossa hospitalidade única.',
      'reviews.basedOn': `Baseado em ${params?.count || 5} avaliações`,
      'reviews.verified': '✓ Verificado',
      'reviews.navigation.previous': 'Avaliação anterior',
      'reviews.navigation.next': 'Próxima avaliação',
      'reviews.navigation.goToReview': `Ir para avaliação ${params?.number || 1}`,
      'reviews.cta.text': 'Quer compartilhar sua experiência conosco?',
      'reviews.cta.button': 'Deixar uma Avaliação',
      'reviews.review1.comment': 'Uma experiência incrível! O Radio Hotel superou todas as minhas expectativas.',
      'reviews.review2.comment': 'Que lugar maravilhoso! A combinação perfeita entre elegância e natureza.',
      'reviews.review3.comment': 'Adorei cada momento da minha estadia. O hotel tem uma atmosfera única.',
      'reviews.review4.comment': 'Excelente hotel! Desde a recepção até o check-out, tudo foi perfeito.',
      'reviews.review5.comment': 'Uma joia escondida em Serra Negra! O Radio Hotel oferece uma experiência premium.',
      
      // Events translations
      'events.badge': 'Eventos Especiais',
      'events.title': 'Eventos & Convenções',
      'events.subtitle': 'Espaços versáteis para seus eventos corporativos e sociais',
      'events.convention.title': 'Salão de Convenções',
      'events.convention.description': 'Espaço amplo e moderno para eventos corporativos, palestras e convenções.',
      'events.convention.capacity': 'Até 200 pessoas',
      'events.convention.duration': 'Disponível 24h',
      'events.convention.location': 'Térreo - Ala Principal',
      'events.convention.features.audiovisual': 'Sistema audiovisual completo',
      'events.convention.features.wifi': 'Wi-Fi de alta velocidade',
      'events.convention.features.airConditioning': 'Ar condicionado central',
      'events.convention.features.soundSystem': 'Sistema de som profissional',
      'events.convention.features.lighting': 'Iluminação ajustável',
      'events.convention.features.coffeeBreak': 'Área para coffee break',
      'events.corporate.title': 'Eventos Corporativos',
      'events.corporate.description': 'Ambiente profissional para reuniões, treinamentos e apresentações.',
      'events.social.title': 'Eventos Sociais',
      'events.social.description': 'Celebre momentos especiais em nossos salões elegantes.',
      'events.cta.contact': 'Solicitar Orçamento',
      'events.cta.explore': 'Ver Mais Detalhes',
      
      // Accommodations translations
      'accommodations.title': 'Acomodações',
      'accommodations.subtitle': 'Quartos e suítes elegantes para uma estadia inesquecível',
      'accommodations.rooms.standard.name': 'Quarto Standard',
      'accommodations.rooms.standard.type': 'Conforto Essencial',
      'accommodations.rooms.standard.description': 'Quartos confortáveis com todas as comodidades necessárias para uma estadia agradável.',
      'accommodations.rooms.standard.capacity': 'Até 2 pessoas',
      'accommodations.rooms.standard.features.0': 'Cama de casal confortável',
      'accommodations.rooms.standard.features.1': 'Banheiro privativo',
      'accommodations.rooms.standard.features.2': 'Vista para o jardim',
      'accommodations.rooms.standard.features.3': 'Área de trabalho',
      'accommodations.rooms.luxury.name': 'Quarto Luxo',
      'accommodations.rooms.luxury.type': 'Elegância Premium',
      'accommodations.rooms.luxury.description': 'Quartos espaçosos com decoração refinada e comodidades premium.',
      'accommodations.rooms.luxury.capacity': 'Até 3 pessoas',
      'accommodations.rooms.suite.name': 'Suíte Master',
      'accommodations.rooms.suite.type': 'Experiência Exclusiva',
      'accommodations.rooms.suite.description': 'Suítes amplas com sala de estar separada e vista panorâmica.',
      'accommodations.rooms.suite.capacity': 'Até 4 pessoas',
      'accommodations.amenities.wifi': 'Wi-Fi Gratuito',
      'accommodations.amenities.parking': 'Estacionamento',
      'accommodations.amenities.minibar': 'Frigobar',
      'accommodations.amenities.tv': 'TV a Cabo',
      'accommodations.amenities.bathroom': 'Banheiro Privativo',
      'accommodations.amenities.airConditioning': 'Ar Condicionado',
      'accommodations.cta.booking': 'Reservar Agora',
      'accommodations.cta.details': 'Ver Detalhes',
      
      // Footer translations
      'footer.title': 'Radio Hotel',
      'footer.description': 'Há mais de 80 anos oferecendo hospitalidade única em Serra Negra. Tradição, conforto e excelência em cada detalhe.',
      'footer.quickLinks.home': 'Início',
      'footer.quickLinks.about': 'Sobre',
      'footer.quickLinks.accommodations': 'Acomodações',
      'footer.quickLinks.events': 'Eventos',
      'footer.quickLinks.gallery': 'Galeria',
      'footer.quickLinks.contact': 'Contato',
      'footer.services.wifi': 'Wi-Fi Gratuito',
      'footer.services.parking': 'Estacionamento',
      'footer.services.roomService': 'Room Service',
      'footer.services.restaurant': 'Restaurante',
      'footer.services.gym': 'Academia',
      'footer.services.pool': 'Piscina',
      'footer.contact.title': 'Contato',
      'footer.contact.phone': '(19) 3892-1234',
      'footer.contact.email': 'contato@radiohotel.com.br',
      'footer.contact.address': 'Rua Principal, 123 - Centro, Serra Negra - SP',
      'footer.contact.hours': '24 horas por dia',
      'footer.newsletter.title': 'Newsletter',
      'footer.newsletter.description': 'Receba ofertas especiais e novidades',
      'footer.newsletter.placeholder': 'Seu e-mail',
      'footer.newsletter.button': 'Inscrever-se',
      'footer.newsletter.success': 'Inscrição realizada com sucesso!',
      'footer.social.title': 'Redes Sociais',
      'footer.copyright': `© ${new Date().getFullYear()} Radio Hotel. Todos os direitos reservados.`,
      'footer.privacy': 'Política de Privacidade',
      'footer.terms': 'Termos de Uso',
      
      // Highlights translations
      'highlights.title': 'Destaques do Hotel',
      'highlights.subtitle': 'Descubra o que torna sua estadia especial',
      'highlights.location.title': 'Localização Privilegiada',
      'highlights.location.description': 'No coração de Serra Negra, próximo às principais atrações da cidade.',
      'highlights.location.features.0': 'Centro da cidade',
      'highlights.location.features.1': 'Próximo ao comércio',
      'highlights.location.features.2': 'Fácil acesso',
      'highlights.wellness.title': 'Bem-estar & Lazer',
      'highlights.wellness.description': 'Espaços dedicados ao seu relaxamento e diversão.',
      'highlights.wellness.features.0': 'Piscina aquecida',
      'highlights.wellness.features.1': 'Área de lazer',
      'highlights.wellness.features.2': 'Jardins paisagísticos',
      'highlights.gastronomy.title': 'Gastronomia',
      'highlights.gastronomy.description': 'Sabores únicos da culinária regional e internacional.',
      'highlights.gastronomy.features.0': 'Restaurante premiado',
      'highlights.gastronomy.features.1': 'Café da manhã especial',
      'highlights.gastronomy.features.2': 'Room service 24h',
      'highlights.nature.title': 'Natureza Exuberante',
      'highlights.nature.description': 'Cercado pela beleza natural das montanhas de Serra Negra.',
      'highlights.nature.features.0': 'Vista para as montanhas',
      'highlights.nature.features.1': 'Trilhas ecológicas',
      'highlights.nature.features.2': 'Ar puro da serra',
    };
    
    return translations[key] || key;
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };
  
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locale, options).format(date);
  };
  
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, options).format(number);
  };
  
  const i18nValue: I18nContextType = {
    locale,
    setLocale,
    t,
    dictionary: {},
    isLoading,
    formatCurrency,
    formatDate,
    formatNumber,
    isRTL: false,
    locales: ['pt-BR', 'en-US'] as Locale[],
    defaultLocale: 'pt-BR' as Locale
  };
  
  // Set document language and direction
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = 'ltr';
    }
  }, [locale]);
  
  return (
    <I18nContext.Provider value={i18nValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }
  return context;
}

// Convenience hook for translation only
export function useTranslation() {
  const { t, isLoading } = useI18nContext();
  return { t, isLoading };
}

// Hook for formatting functions
export function useFormatting() {
  const { formatCurrency, formatDate, formatNumber, locale } = useI18nContext();
  return { formatCurrency, formatDate, formatNumber, locale };
}