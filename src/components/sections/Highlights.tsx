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
  TreePine
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const Highlights = () => {
  const highlights = [
    {
      id: 1,
      icon: Leaf,
      title: 'Natureza Exuberante',
      description: 'Cercado por mata atlântica preservada, oferecemos uma experiência única de conexão com a natureza.',
      image: '/images/events/passeios-bosque.png',
      features: ['Trilhas ecológicas', 'Observação de aves', 'Jardins nativos'],
    },
    {
      id: 2,
      icon: Waves,
      title: 'Águas Termais',
      description: 'Relaxe nas famosas águas termais de Serra Negra, conhecidas por suas propriedades terapêuticas.',
      image: '/images/events/pacotes-especiais.png',
      features: ['Piscinas termais', 'Spa natural', 'Hidroterapia'],
    },
    {
      id: 3,
      icon: Mountain,
      title: 'Vista Panorâmica',
      description: 'Desfrute de vistas deslumbrantes das montanhas da Serra da Mantiqueira em todos os ambientes.',
      image: '/images/events/pacotes-especiais.png',
      features: ['Mirante exclusivo', 'Terraços panorâmicos', 'Pôr do sol único'],
    },
    {
      id: 4,
      icon: Utensils,
      title: 'Gastronomia Regional',
      description: 'Saboreie pratos da culinária mineira e internacional preparados com ingredientes locais frescos.',
      image: '/images/events/sabado-feijoada.png',
      features: ['Chef especializado', 'Ingredientes orgânicos', 'Cardápio sazonal'],
    },
    {
      id: 5,
      icon: TreePine,
      title: 'Atividades ao Ar Livre',
      description: 'Diversas opções de lazer e aventura para toda a família em meio à natureza preservada.',
      image: '/images/events/passeios-bosque.png',
      features: ['Caminhadas', 'Ciclismo', 'Pesca esportiva'],
    },
    {
      id: 6,
      icon: Coffee,
      title: 'Tradição Mineira',
      description: 'Experimente a autêntica hospitalidade mineira com café colonial e quitutes regionais.',
      image: '/images/events/sabado-feijoada.png',
      features: ['Café da manhã colonial', 'Produtos artesanais', 'Cultura local'],
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
        ease: 'easeOut',
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
                className="group"
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
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6">
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
                  <h4 className="font-semibold text-white mb-1">{service.name}</h4>
                  <p className="text-sm text-white/70">{service.desc}</p>
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