import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Radio Hotel - Experiência Exclusiva em Serra Negra',
    short_name: 'Radio Hotel',
    description: 'Descubra o Radio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP. Cercado pela natureza exuberante, cachoeiras e muito verde.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f5f1',
    theme_color: '#0a0d29',
    orientation: 'portrait-primary',
    categories: ['travel', 'hospitality', 'luxury'],
    lang: 'pt-BR',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/logo-color.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo-color.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}