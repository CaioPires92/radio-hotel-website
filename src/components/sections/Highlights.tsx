'use client';

import { motion } from 'framer-motion';
import {
  Leaf,
  Waves,
  Mountain,
  Utensils,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  TreePine,
  MapPin,
  Star
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const Highlights = () => {
  const highlights = [
    {
      id: 1,
      icon: MapPin,
      title: 'O Oásis no Coração da Cidade',
      description: 'Imagine-se hospedado no ponto mais privilegiado do centro de Serra Negra, com uma localização avaliada em 9,9/10 por sua conveniência. A poucos passos, você tem acesso a todas as atrações da cidade. Agora, imagine retornar ao hotel e adentrar um parque privativo de 60.000 m², com mata nativa preservada e uma cachoeira particular.',
      image: '/images/events/passeios-bosque.png',
      features: ['Localização 9,9/10', 'Parque privativo 60.000m²', 'Cachoeira particular'],
    },
    {
      id: 2,
      icon: Waves,
      title: 'Um Mergulho na História da Saúde',
      description: 'Em seu próprio apartamento, oferecemos uma conexão direta com a alma de Serra Negra. A experiência de um banho com nossas famosas "águas radioativas", cujas propriedades foram descobertas em 1928 e deram à cidade o título de "Cidade da Saúde", é o nosso diferencial mais distinto.',
      image: '/images/events/pacotes-especiais.png',
      features: ['Águas radioativas desde 1928', 'Cidade da Saúde', 'Ritual de bem-estar'],
    },
    {
      id: 3,
      icon: Utensils,
      title: 'Sabores que Contam Histórias',
      description: 'Vivencie uma jornada gastronômica em nosso Restaurante Cinquentenário, um dos pilares da nossa reputação de 78 anos. Nossos hóspedes descrevem nossa culinária brasileira como "excepcional". A experiência se adapta ao seu ritmo: durante a semana, desfrute de um refinado menu à la carte; nos fins de semana, delicie-se com um buffet completo e variado.',
      image: '/images/events/sabado-feijoada.png',
      features: ['Restaurante Cinquentenário', 'Culinária brasileira excepcional', 'Menu à la carte e buffet'],
    },
    {
      id: 4,
      icon: Leaf,
      title: 'O Refúgio do Silêncio e Conforto',
      description: 'Para quem busca máxima tranquilidade, criamos uma experiência de hospedagem superior. Nossos apartamentos da categoria Luxo são 8 m² mais espaçosos e estão estrategicamente voltados para a serena área da piscina, garantindo um ambiente mais silencioso. Alguns ainda oferecem o conforto de piso aquecido e antialérgico.',
      image: '/images/events/pacotes-especiais.png',
      features: ['8m² mais espaçosos', 'Vista para área da piscina', 'Piso aquecido antialérgico'],
    },
    {
      id: 5,
      icon: Star,
      title: 'A Arte de Bem-Receber',
      description: 'A verdadeira alma do Radio Hotel reside em nossa equipe. Com uma avaliação de 9,7/10, nosso time é consistentemente descrito como "impecável", "extremamente atencioso" e de "extrema educação e simpatia". A experiência aqui é sentir-se acolhido por uma cultura de serviço tão poderosa que se tornou um dos nossos ativos mais valiosos.',
      image: '/images/events/passeios-bosque.png',
      features: ['Avaliação 9,7/10', 'Equipe impecável', 'Cultura de serviço excepcional'],
    },
    {
      id: 6,
      icon: Mountain,
      title: 'Negócios em um Cenário Inspirador',
      description: 'Para o público corporativo, oferecemos a experiência de realizar um evento impecável sem abrir mão do lazer e da inspiração. Nosso moderno Centro de Convenções tem capacidade para até 300 pessoas em formato de auditório e conta com múltiplas salas de apoio. A combinação de uma estrutura profissional completa com estacionamento, gastronomia de ponta e todas as opções de lazer de um resort cria uma solução MICE única na região.',
      image: '/images/events/sabado-feijoada.png',
      features: ['Centro de Convenções 300 pessoas', 'Múltiplas salas de apoio', 'Solução MICE completa'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="highlights" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
            Nossos Diferenciais
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            Experiências Únicas
          </h2>
          <p className="text-lg text-navy/80 max-w-3xl mx-auto leading-relaxed">
            Descubra os elementos que tornam o Rádio Hotel um destino especial,
            onde tradição, natureza e conforto se encontram em perfeita harmonia.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.id}
                variants={itemVariants}
                className="group relative"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                  <CardContent className="p-0 relative">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={highlight.image}
                        alt={`${highlight.title} - ${highlight.description}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />

                      {/* Icon */}
                      <div className="absolute top-4 left-4 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-navy" />
                      </div>

                      {/* Golden Border Effect on Hover */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                        {highlight.title}
                      </h3>

                      <p className="text-navy/80 mb-4 leading-relaxed">
                        {highlight.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2">
                        {highlight.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                            <span className="text-sm text-navy/70">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Decorative Element */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-center">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Services */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-navy to-blue rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-cream mb-6">
            Serviços Complementares
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Wifi, name: 'Wi-Fi Gratuito', desc: 'Internet de alta velocidade' },
              { icon: Car, name: 'Estacionamento', desc: 'Vagas cobertas gratuitas' },
              { icon: Dumbbell, name: 'Academia', desc: 'Equipamentos modernos' },
              { icon: Coffee, name: 'Room Service', desc: 'Serviço 24 horas' },
            ].map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/30 transition-colors duration-300">
                    <ServiceIcon className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-semibold text-cream mb-1">{service.name}</h4>
                  <p className="text-sm text-cream/80">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;