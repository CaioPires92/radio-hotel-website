import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Analytics from '@/components/analytics/Analytics';
import PWAInstaller, { OfflineIndicator, UpdateBanner } from '@/components/pwa/PWAInstaller';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { getLocaleFromPathname, defaultLocale } from '@/lib/i18n';

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
    default: 'Radio Hotel - Experiência Exclusiva em Serra Negra',
    template: '%s | Radio Hotel Serra Negra'
  },
  description: 'Descubra o Radio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP. Cercado pela natureza exuberante e muito verde, oferecemos uma experiência única de hospitalidade premium com águas radioativas terapêuticas.',
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
    'hotel boutique',
    'águas radioativas',
    'spa serra negra',
    'hotel com piscina',
    'destination wedding',
    'hotel romântico'
  ],
  authors: [{ name: 'Radio Hotel' }],
  creator: 'Radio Hotel',
  publisher: 'Radio Hotel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Radio Hotel - Experiência Exclusiva em Serra Negra',
    description: 'Descubra o Radio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP. Cercado pela natureza exuberante e muito verde.',
    siteName: 'Radio Hotel',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Radio Hotel - Vista externa do hotel em Serra Negra',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radio Hotel - Experiência Exclusiva em Serra Negra',
    description: 'Descubra o Radio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP.',
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
  // Get locale from URL or use default
  const locale = defaultLocale; // Server-side rendering uses default locale

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0d29" />
        <meta name="msapplication-TileColor" content="#0a0d29" />

        {/* SEO and Analytics Meta Tags */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        <meta name="p:domain_verify" content="your-pinterest-verification-code" />

        {/* Additional SEO Meta Tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content={locale === 'pt-BR' ? 'Portuguese' : locale === 'en-US' ? 'English' : 'Spanish'} />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="Serra Negra" />
        <meta name="geo.position" content="-22.6167;-46.7000" />
        <meta name="ICBM" content="-22.6167, -46.7000" />

        {/* Alternate language versions */}
        <link rel="alternate" hrefLang="pt-BR" href="https://radiohotelserranegra.com.br" />
        <link rel="alternate" hrefLang="en-US" href="https://radiohotelserranegra.com.br/en-US" />
        <link rel="alternate" hrefLang="es-ES" href="https://radiohotelserranegra.com.br/es-ES" />
        <link rel="alternate" hrefLang="x-default" href="https://radiohotelserranegra.com.br" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: 'Radio Hotel',
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
                  name: 'Águas radioativas terapêuticas',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Área para eventos',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Trilhas ecológicas',
                  value: true,
                }
              ],
              starRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
              },
              checkInTime: '15:00',
              checkOutTime: '12:00',
              petsAllowed: false,
              smokingAllowed: false,
              numberOfRooms: 50,
              paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Pix'],
              currenciesAccepted: 'BRL',
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <I18nProvider initialLocale={locale}>
          <Analytics>
            <OfflineIndicator />
            <UpdateBanner />
            {children}
            <PWAInstaller />
          </Analytics>
        </I18nProvider>
      </body>
    </html>
  );
}
