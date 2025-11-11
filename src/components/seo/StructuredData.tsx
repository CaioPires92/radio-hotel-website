'use client';

import { useEffect } from 'react';
import { ADDRESS, EMAIL_RESERVAS, PHONE_RESERVAS } from '@/lib/config';

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
  telephone: PHONE_RESERVAS,
  email: EMAIL_RESERVAS,
  url: 'https://radiohotel.com.br',
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
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
  telephone: PHONE_RESERVAS,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
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
  telephone: PHONE_RESERVAS,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
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
