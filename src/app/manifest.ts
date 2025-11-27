import { MetadataRoute } from 'next'

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Radio Hotel - Experiência Exclusiva em Serra Negra',
    short_name: 'Radio Hotel',
    description: 'Descubra o Radio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP. Cercado pela natureza exuberante e muito verde.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f5f1',
    theme_color: '#0a0d29',
    orientation: 'portrait-primary',
    categories: ['travel', 'hospitality', 'luxury'],
    lang: 'pt-BR',
    icons: [
      {
        src: '/icons/icon-192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
