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
      'events.description': 'Espaços versáteis para seus eventos corporativos e sociais',
      'events.carousel.ariaLabel': 'Carrossel de eventos do hotel',
      'events.features.title': 'Recursos Inclusos',
      'events.whatsapp.eventInquiry': 'Olá! Gostaria de saber mais sobre o evento:',
      'events.whatsapp.planningInquiry': 'Olá! Preciso de ajuda para planejar um evento no Radio Hotel.',
      'events.requestQuote.button': 'Solicitar Orçamento',
      'events.requestQuote.ariaLabel': 'Solicitar orçamento para evento',
      'events.navigation.previous': 'Evento anterior',
      'events.navigation.next': 'Próximo evento',
      'events.navigation.viewEvent': 'Ver evento',
      'events.planning.title': 'Planejamento Personalizado',
      'events.planning.description': 'Nossa equipe especializada está pronta para ajudar você a criar o evento perfeito.',
      'events.specialist.button': 'Falar com Especialista',
      'events.specialist.ariaLabel': 'Falar com especialista em eventos',
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
      'events.corporate.capacity': 'Até 100 pessoas',
      'events.corporate.duration': 'Horário comercial',
      'events.corporate.location': '1º Andar - Sala Executiva',
      'events.corporate.features.multimedia': 'Equipamentos multimídia',
      'events.corporate.features.videoConference': 'Videoconferência',
      'events.corporate.features.coffeeBreak': 'Coffee break incluso',
      'events.corporate.features.parking': 'Estacionamento gratuito',
      'events.corporate.features.technicalSupport': 'Suporte técnico',
      'events.social.title': 'Eventos Sociais',
      'events.social.description': 'Celebre momentos especiais em nossos salões elegantes.',
      'events.social.capacity': 'Até 150 pessoas',
      'events.social.duration': 'Flexível',
      'events.social.location': 'Salão de Festas',
      'events.social.features.decoration': 'Decoração personalizada',
      'events.social.features.gourmetBuffet': 'Buffet gourmet',
      'events.social.features.parking': 'Estacionamento valet',
      'events.social.features.technicalSupport': 'Suporte completo',
      'events.social.features.audiovisual': 'Som e iluminação',
      'events.cta.contact': 'Solicitar Orçamento',
      'events.cta.explore': 'Ver Mais Detalhes',
      
      // Accommodations translations
      'accommodations.badge': 'Acomodações',
      'accommodations.title': 'Acomodações',
      'accommodations.subtitle': 'Quartos e suítes elegantes para uma estadia inesquecível',
      'accommodations.whatsapp.bookingMessage': 'Olá! Gostaria de fazer uma reserva para:',
      'accommodations.navigation.previous': 'Acomodação anterior',
      'accommodations.navigation.next': 'Próxima acomodação',
      'accommodations.navigation.viewRoom': 'Ver quarto',
      'accommodations.buttons.bookNow': 'Reservar Agora',
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
      'accommodations.rooms.luxury.features.0': 'Cama king size',
      'accommodations.rooms.luxury.features.1': 'Banheira de hidromassagem',
      'accommodations.rooms.luxury.features.2': 'Vista panorâmica',
      'accommodations.rooms.luxury.features.3': 'Sala de estar',
      'accommodations.rooms.quadruple.name': 'Quarto Quádruplo',
      'accommodations.rooms.quadruple.type': 'Ideal para Famílias',
      'accommodations.rooms.quadruple.description': 'Quartos amplos perfeitos para famílias, com espaço e conforto para todos.',
      'accommodations.rooms.quadruple.capacity': 'Até 4 pessoas',
      'accommodations.rooms.quadruple.features.0': 'Duas camas de casal',
      'accommodations.rooms.quadruple.features.1': 'Área de estar ampla',
      'accommodations.rooms.quadruple.features.2': 'Banheiro espaçoso',
      'accommodations.rooms.quadruple.features.3': 'Varanda privativa',
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
      'highlights.badge': 'Destaques',
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
      'highlights.comfort.title': 'Conforto Premium',
      'highlights.comfort.description': 'Quartos e suítes com o máximo de conforto e elegância.',
      'highlights.comfort.features.0': 'Camas premium',
      'highlights.comfort.features.1': 'Roupas de cama luxuosas',
      'highlights.comfort.features.2': 'Climatização individual',
      'highlights.service.title': 'Atendimento Excepcional',
      'highlights.service.description': 'Equipe dedicada para tornar sua estadia inesquecível.',
      'highlights.service.features.0': 'Recepção 24h',
      'highlights.service.features.1': 'Concierge personalizado',
      'highlights.service.features.2': 'Room service premium',
      'highlights.business.title': 'Centro de Negócios',
      'highlights.business.description': 'Facilidades completas para viajantes corporativos.',
      'highlights.business.features.0': 'Salas de reunião',
      'highlights.business.features.1': 'Wi-Fi de alta velocidade',
      'highlights.business.features.2': 'Serviços executivos',
      'highlights.nature.title': 'Natureza Exuberante',
      'highlights.nature.description': 'Cercado pela beleza natural das montanhas de Serra Negra.',
      'highlights.nature.features.0': 'Vista para as montanhas',
      'highlights.nature.features.1': 'Trilhas ecológicas',
      'highlights.nature.features.2': 'Ar puro da serra',
      
      // Parallax translations
      'parallax.badge': 'Experiência Única',
      'parallax.title.line1': 'Viva uma',
      'parallax.title.highlight': 'experiência única',
      'parallax.title.line2': 'em Serra Negra',
      'parallax.subtitle': 'Descubra a hospitalidade tradicional em meio à natureza exuberante das montanhas.',
      'parallax.stats.tradition': '80+ Anos de Tradição',
      'parallax.stats.rating': '4.8 Estrelas',
      'parallax.stats.location': 'Serra Negra, SP',
      'parallax.buttons.bookNow': 'Reservar Agora',
      'parallax.buttons.checkAvailability': 'Verificar Disponibilidade',
      'parallax.buttons.bookingAriaLabel': 'Fazer reserva no Radio Hotel',
      'parallax.buttons.availabilityAriaLabel': 'Verificar disponibilidade de quartos',
      'parallax.whatsapp.bookingMessage': 'Olá! Gostaria de fazer uma reserva no Radio Hotel.',
      'parallax.fallback.title': 'Radio Hotel - Serra Negra',
      
      // About translations
      'about.badge': 'Sobre o Hotel',
      'about.title': 'Radio Hotel',
      'about.location': 'Serra Negra, SP',
      'about.description1': 'Há mais de 80 anos, o Radio Hotel é sinônimo de hospitalidade e tradição em Serra Negra. Localizado no coração da cidade, oferecemos uma experiência única que combina o charme clássico com o conforto moderno.',
      'about.description2': 'Cercado pela exuberante natureza das montanhas paulistas, nosso hotel proporciona momentos inesquecíveis em um ambiente acolhedor e sofisticado, ideal para relaxar e se reconectar com o que realmente importa.',
      'about.features.wifi.title': 'Wi-Fi Gratuito',
      'about.features.wifi.description': 'Internet de alta velocidade em todas as áreas',
      'about.features.parking.title': 'Estacionamento',
      'about.features.parking.description': 'Vagas gratuitas e seguras para hóspedes',
      'about.features.breakfast.title': 'Café da Manhã',
      'about.features.breakfast.description': 'Buffet completo com produtos regionais',
      'about.features.restaurant.title': 'Restaurante',
      'about.features.restaurant.description': 'Culinária regional e internacional',
      'about.features.gym.title': 'Academia',
      'about.features.gym.description': 'Equipamentos modernos e personal trainer',
      'about.features.events.title': 'Eventos',
      'about.features.events.description': 'Salões para casamentos e corporativo',
      'about.stats.years': 'Anos de Tradição',
      'about.stats.park': 'm² de Área Verde',
      'about.stats.rating': 'Avaliação Google',
      'about.stats.location': 'Localização',
      'about.award.years': '80+ Anos',
      'about.award.excellence': 'de Excelência',
      
      // Hero translations
      'hero.slide1.title': 'Bem-vindo ao Radio Hotel',
      'hero.slide1.subtitle': 'Tradição e Elegância',
      'hero.slide1.description': 'Há mais de 80 anos oferecendo hospitalidade excepcional no coração de Serra Negra.',
      'hero.slide2.title': 'Natureza Exuberante',
      'hero.slide2.subtitle': 'Cercado pela Serra',
      'hero.slide2.description': 'Desfrute da tranquilidade e beleza natural das montanhas paulistas.',
      'hero.slide3.title': 'Experiências Únicas',
      'hero.slide3.subtitle': 'Momentos Inesquecíveis',
      'hero.slide3.description': 'Eventos especiais, gastronomia refinada e atendimento personalizado.',
      'hero.whatsapp.bookingMessage': 'Olá! Gostaria de fazer uma reserva no Radio Hotel.',
      'hero.carousel.ariaLabel': 'Carrossel de imagens do hotel',
      'hero.discoverMore': 'Descobrir Mais',
      'hero.previousSlide': 'Slide anterior',
      'hero.nextSlide': 'Próximo slide',
      'hero.goToSlide': 'Ir para slide',
      
      // Navbar translations
      'navbar.whatsapp.bookingMessage': 'Olá! Gostaria de fazer uma reserva no Radio Hotel.',
      'navbar.mobile.closeMenu': 'Fechar menu',
      'navbar.mobile.openMenu': 'Abrir menu',
      
      // Footer translations (additional)
      'footer.logo.alt': 'Logo do Radio Hotel',
      'footer.description': 'Há mais de 80 anos oferecendo hospitalidade excepcional no coração de Serra Negra, SP.',
      'footer.quickLinks.title': 'Links Rápidos',
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
      'footer.contact.phone.label': 'Telefone',
      'footer.contact.email.label': 'E-mail',
      'footer.contact.address.label': 'Endereço',
      'footer.contact.address.value': 'Rua Principal, 123 - Centro, Serra Negra - SP',
      'footer.contact.hours.label': 'Funcionamento',
      'footer.contact.hours.value': '24 horas por dia',
      'footer.whatsapp.message': 'Olá! Gostaria de mais informações sobre o Radio Hotel.',
      
      // EventsModal translations
      'eventsModal.title': 'Eventos Especiais',
      'eventsModal.subtitle': 'Descubra experiências únicas no Radio Hotel',
      'eventsModal.italianNight.title': 'Noite Italiana',
      'eventsModal.italianNight.description': 'Uma noite especial com o melhor da culinária italiana.',
      'eventsModal.italianNight.date': '15 de Dezembro',
      'eventsModal.italianNight.time': '19:30',
      'eventsModal.italianNight.location': 'Restaurante Principal',
      'eventsModal.feijoada.title': 'Feijoada Tradicional',
      'eventsModal.feijoada.description': 'Sábado de feijoada com música ao vivo.',
      'eventsModal.feijoada.date': '21 de Dezembro',
      'eventsModal.feijoada.time': '12:00',
      'eventsModal.feijoada.location': 'Área de Lazer',
      'eventsModal.guidedTour.title': 'Tour Guiado',
      'eventsModal.guidedTour.description': 'Conheça as belezas de Serra Negra com guia especializado.',
      'eventsModal.guidedTour.date': 'Todos os dias',
      'eventsModal.guidedTour.time': '09:00',
      'eventsModal.guidedTour.location': 'Recepção',
      'eventsModal.romanticPackage.title': 'Pacote Romântico',
      'eventsModal.romanticPackage.description': 'Experiência especial para casais.',
      'eventsModal.romanticPackage.date': 'Sob consulta',
      'eventsModal.romanticPackage.time': '18:00',
      'eventsModal.romanticPackage.location': 'Suíte Master',
      'eventsModal.novemberHoliday.title': 'Feriado de Novembro',
      'eventsModal.novemberHoliday.description': 'Programação especial para o feriado.',
      'eventsModal.novemberHoliday.date': '15 de Novembro',
      'eventsModal.novemberHoliday.time': 'Todo o dia',
      'eventsModal.novemberHoliday.location': 'Hotel',
      'eventsModal.childrensWeek.title': 'Semana das Crianças',
      'eventsModal.childrensWeek.description': 'Atividades especiais para toda a família.',
      'eventsModal.childrensWeek.date': '12 de Outubro',
      'eventsModal.childrensWeek.time': '14:00',
      'eventsModal.childrensWeek.location': 'Área de Lazer',
      'eventsModal.categories.gastronomy': 'Gastronomia',
      'eventsModal.categories.wellness': 'Bem-estar',
      'eventsModal.categories.packages': 'Pacotes',
      'eventsModal.categories.holiday': 'Feriados',
      'eventsModal.categories.family': 'Família',
      'eventsModal.whatsapp.bookingMessage': 'Olá! Gostaria de participar do evento',
      'eventsModal.whatsapp.onDay': 'no dia',
      'eventsModal.whatsapp.atTime': 'às',
      'eventsModal.whatsapp.helpRequest': 'Podem me ajudar com mais informações?',
      'eventsModal.navigation.backToEvents': 'Voltar aos Eventos',
      'eventsModal.labels.date': 'Data',
      'eventsModal.labels.time': 'Horário',
      'eventsModal.labels.location': 'Local',
      'eventsModal.buttons.bookWhatsApp': 'Reservar via WhatsApp',
      
      // Booking Form translations
      'booking.title': 'Faça sua Reserva',
      'booking.subtitle': 'Preencha os dados abaixo para solicitar sua reserva',
      'booking.closeForm': 'Fechar formulário de reserva',
      'booking.checkIn': 'Check-in',
      'booking.checkOut': 'Check-out',
      'booking.adults': 'Adultos',
      'booking.adultSingular': 'adulto',
      'booking.adultPlural': 'adultos',
      'booking.children': 'Crianças',
      'booking.childSingular': 'criança',
      'booking.childPlural': 'crianças',
      'booking.childrenAges': 'Idades das crianças',
      'booking.child': 'Criança',
      'booking.accommodationType': 'Tipo de Acomodação',
      'booking.selectAccommodation': 'Selecione a acomodação',
      'booking.specialRequests': 'Solicitações Especiais',
      'booking.specialRequestsPlaceholder': 'Descreva suas necessidades especiais...',
      'booking.roomTypes.standard': 'Quarto Standard',
      'booking.roomTypes.deluxe': 'Quarto Deluxe',
      'booking.roomTypes.suiteMaster': 'Suíte Master',
      'booking.roomTypes.suiteFamily': 'Suíte Família',
      'booking.currency': 'R$',
      'booking.perNight': 'noite',
      'booking.summary.title': 'Resumo da Reserva',
      'booking.summary.period': 'Período',
      'booking.summary.nights': 'Noites',
      'booking.summary.guests': 'Hóspedes',
      'booking.summary.adults': 'adultos',
      'booking.summary.children': 'crianças',
      'booking.summary.estimatedValue': 'Valor Estimado',
      'booking.submitButton': 'Enviar Solicitação',
      'booking.sending': 'Enviando...',
      'booking.submitAriaLabel': 'Enviar solicitação de reserva',
      'booking.whatsappRedirect': 'Você será redirecionado para o WhatsApp',
      'booking.validation.checkInRequired': 'Data de check-in é obrigatória',
      'booking.validation.checkOutRequired': 'Data de check-out é obrigatória',
      'booking.validation.roomTypeRequired': 'Tipo de quarto é obrigatório',
      'booking.validation.checkInPastDate': 'Data de check-in não pode ser no passado',
      'booking.validation.checkOutAfterCheckIn': 'Check-out deve ser após check-in',
      'booking.validation.childrenAgesRequired': 'Idades das crianças são obrigatórias',
      'booking.whatsapp.title': 'Solicitação de Reserva - Radio Hotel',
      'booking.whatsapp.checkIn': 'Check-in',
      'booking.whatsapp.checkOut': 'Check-out',
      'booking.whatsapp.nights': 'Noites',
      'booking.whatsapp.guests': 'Hóspedes',
      'booking.whatsapp.adults': 'Adultos',
      'booking.whatsapp.children': 'Crianças',
      'booking.whatsapp.childrenAges': 'Idades das crianças',
      'booking.whatsapp.years': 'anos',
      'booking.whatsapp.accommodation': 'Acomodação',
      'booking.whatsapp.estimatedValue': 'Valor Estimado',
      'booking.whatsapp.observations': 'Observações',
      'booking.whatsapp.confirmation': 'Aguardo confirmação da disponibilidade',
      
      // Reviews translations
      'reviews.title': 'O que nossos hóspedes dizem',
      'reviews.subtitle': 'Experiências reais de quem se hospedou conosco',
      'reviews.basedOn': 'Baseado em {count} avaliações',
      'reviews.verified': 'Avaliação Verificada',
      'reviews.review1.comment': 'Experiência incrível! O atendimento é excepcional e as instalações são de primeira qualidade. Voltarei com certeza.',
      'reviews.review2.comment': 'Local perfeito para relaxar. A vista das montanhas é deslumbrante e o café da manhã é maravilhoso.',
      'reviews.review3.comment': 'Hotel tradicional com muito charme. Funcionários atenciosos e localização privilegiada no centro de Serra Negra.',
      'reviews.review4.comment': 'Ficamos na suíte master e foi uma experiência única. Conforto, elegância e um atendimento personalizado.',
      'reviews.review5.comment': 'Perfeito para eventos corporativos. Salas bem equipadas e equipe muito profissional.',
      'reviews.navigation.previous': 'Avaliação anterior',
      'reviews.navigation.next': 'Próxima avaliação',
      'reviews.navigation.goToReview': 'Ir para avaliação {number}',
      'reviews.cta.text': 'Compartilhe sua experiência conosco',
      'reviews.cta.button': 'Deixar Avaliação',
      
      // Navigation translations
      'navigation.home': 'Início',
      'navigation.accommodations': 'Acomodações',
      'navigation.events': 'Eventos',
      'navigation.contact': 'Contato',
      'navigation.bookNow': 'Reservar',
      'navigation.language': 'Idioma',
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