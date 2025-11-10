import Head from 'next/head';

interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

const PageSEO = ({
  title,
  description,
  keywords = [],
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
}: PageSEOProps) => {
  const baseUrl = 'https://radiohotel.com.br'; // Substitua pela URL real
  const fullTitle = title ? `${title} | Radio Hotel Serra Negra` : 'Radio Hotel - Experiência Exclusiva em Serra Negra';
  const defaultDescription = 'Descubra o Radio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP. Cercado pela natureza exuberante e muito verde.';
  const metaDescription = description || defaultDescription;
  const canonical = canonicalUrl || baseUrl;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content="Radio Hotel" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Additional SEO tags */}
      <meta name="author" content="Radio Hotel" />
      <meta name="publisher" content="Radio Hotel" />
      <meta name="theme-color" content="#0a0d29" />
    </Head>
  );
};

export default PageSEO;

// Predefined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: 'Radio Hotel Serra Negra — 80 anos',
    description: 'Em 2025, o Radio Hotel completa 80 anos. O nome “Radio” vem das águas radioativas de Serra Negra, famosas por suas propriedades terapêuticas. Viva tradição, elegância e natureza em um endereço único.',
    keywords: ['hotel serra negra', 'hotel de luxo sp', 'hospedagem serra negra', 'radio hotel', 'hotel fazenda', 'turismo serra negra', '80 anos', 'águas radioativas'],
  },
  accommodations: {
    title: 'Acomodações de Luxo - Suítes e Apartamentos',
    description: 'Conheça nossas elegantes acomodações: suítes luxo, apartamentos standard e quartos familiares. Todos com vista para a natureza, ar-condicionado e águas radioativas terapêuticas.',
    keywords: ['suites luxo serra negra', 'apartamentos hotel', 'quartos familiares', 'acomodações serra negra', 'hotel com vista natureza'],
  },
  events: {
    title: 'Eventos e Celebrações - Casamentos e Corporativo',
    description: 'Realize seu evento dos sonhos no Radio Hotel. Espaços elegantes para casamentos, eventos corporativos, formaturas e celebrações especiais em meio à natureza de Serra Negra.',
    keywords: ['casamentos serra negra', 'eventos corporativos', 'espaço para eventos', 'salão de festas', 'destination wedding'],
  },
  restaurant: {
    title: 'Restaurante - Culinária Regional e Internacional',
    description: 'Saboreie pratos da culinária regional e internacional em nosso restaurante. Ingredientes frescos, ambiente acolhedor e vista privilegiada para a natureza.',
    keywords: ['restaurante serra negra', 'culinária regional', 'gastronomia', 'café da manhã', 'jantar romântico'],
  },
  facilities: {
    title: 'Facilidades e Lazer - Piscina, Spa e Natureza',
    description: 'Desfrute de nossas facilidades: spa, bosque de pinheiros e trilhas ecológicas. Relaxamento e bem-estar garantidos.',
keywords: ['spa serra negra', 'trilhas ecológicas', 'bosque pinheiros'],
  },
  contact: {
    title: 'Contato e Localização - Como Chegar ao Radio Hotel',
    description: 'Entre em contato conosco para reservas e informações. Localizado no centro de Serra Negra, SP, com fácil acesso e estacionamento gratuito.',
    keywords: ['contato radio hotel', 'reservas serra negra', 'localização hotel', 'como chegar serra negra', 'telefone hotel'],
  },
};
