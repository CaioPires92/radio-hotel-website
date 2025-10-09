'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: object;
}

const StructuredData = ({ data }: StructuredDataProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
};

export default StructuredData;

// Dados estruturados para diferentes tipos de conteúdo
export const hotelStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Radio Hotel',
  description: 'Hotel de luxo em Serra Negra, SP, cercado pela natureza exuberante e muito verde.',
  telephone: '+55 19 99999-9999',
  email: 'contato@radiohotel.com.br',
  url: 'https://radiohotel.com.br',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Principal, 123',
    addressLocality: 'Serra Negra',
    addressRegion: 'SP',
    postalCode: '13930-000',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -22.6167,
    longitude: -46.7000,
  },
  image: [
    'https://radiohotel.com.br/images/hero/hero1.jpg',
    'https://radiohotel.com.br/images/hero/hero2.jpg',
    'https://radiohotel.com.br/images/hero/hero3.jpg',
  ],
  priceRange: '$$$',
  starRating: {
    '@type': 'Rating',
    ratingValue: '5',
    bestRating: '5',
  },
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Piscina',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Spa e Wellness',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Restaurante',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Wi-Fi gratuito',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Estacionamento gratuito',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Academia',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Área para eventos',
      value: true,
    },
  ],
  checkInTime: '15:00',
  checkOutTime: '12:00',
  petsAllowed: false,
};

export const restaurantStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Restaurante Radio Hotel',
  description: 'Restaurante do Radio Hotel oferecendo culinária regional e internacional em ambiente elegante.',
  telephone: '+55 19 99999-9999',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Principal, 123',
    addressLocality: 'Serra Negra',
    addressRegion: 'SP',
    postalCode: '13930-000',
    addressCountry: 'BR',
  },
  servesCuisine: ['Brasileira', 'Internacional', 'Regional'],
  priceRange: '$$$',
  openingHours: [
    'Mo-Su 07:00-10:00', // Café da manhã
    'Mo-Su 12:00-15:00', // Almoço
    'Mo-Su 19:00-22:00', // Jantar
  ],
};

export const eventVenueStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: 'Radio Hotel - Espaço para Eventos',
  description: 'Espaço elegante para casamentos, eventos corporativos e celebrações especiais em Serra Negra.',
  telephone: '+55 19 99999-9999',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Principal, 123',
    addressLocality: 'Serra Negra',
    addressRegion: 'SP',
    postalCode: '13930-000',
    addressCountry: 'BR',
  },
  maximumAttendeeCapacity: 200,
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Sistema de som profissional',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Projeção e iluminação',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Catering completo',
      value: true,
    },
  ],
};