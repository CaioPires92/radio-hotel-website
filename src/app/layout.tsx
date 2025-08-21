import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'Rádio Hotel - Experiência Exclusiva em Serra Negra',
    template: '%s | Rádio Hotel Serra Negra'
  },
  description: 'Descubra o Rádio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP. Cercado pela natureza exuberante, cachoeiras e muito verde, oferecemos uma experiência única de hospitalidade premium.',
  keywords: [
    'hotel serra negra',
    'hotel de luxo sp',
    'hospedagem serra negra',
    'radio hotel',
    'hotel fazenda',
    'turismo serra negra',
    'hotel natureza',
    'eventos corporativos',
    'casamentos serra negra',
    'hotel boutique'
  ],
  authors: [{ name: 'Rádio Hotel' }],
  creator: 'Rádio Hotel',
  publisher: 'Rádio Hotel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Rádio Hotel - Experiência Exclusiva em Serra Negra',
    description: 'Descubra o Rádio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP. Cercado pela natureza exuberante, cachoeiras e muito verde.',
    siteName: 'Rádio Hotel',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rádio Hotel - Vista externa do hotel em Serra Negra',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rádio Hotel - Experiência Exclusiva em Serra Negra',
    description: 'Descubra o Rádio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0d29" />
        <meta name="msapplication-TileColor" content="#0a0d29" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: 'Rádio Hotel',
              description: 'Hotel de luxo em Serra Negra, SP, cercado pela natureza',
              telephone: '+55 19 99999-9999',
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
              image: '/og-image.jpg',
              priceRange: '$$$',
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Piscina',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Spa',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Restaurante',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Wi-Fi gratuito',
                },
              ],
              starRating: {
                '@type': 'Rating',
                ratingValue: '5',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
