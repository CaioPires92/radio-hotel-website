'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogHero from '@/components/sections/BlogHero';

const blogPosts = [
  {
    id: 'alto-da-serra',
    image: '/path/to/image.jpg', // Substituir pelo caminho da imagem
  },
  {
    id: 'fontana-di-trevi',
    image: '/path/to/image.jpg', // Substituir pelo caminho da imagem
  },
  {
    id: 'teleferico-cristo-redentor',
    image: '/path/to/image.jpg', // Substituir pelo caminho da imagem
  },
];

const Blog = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      {/* Hero estática com imagem fixa e texto simplificado */}
      <BlogHero heightClass="min-h-[50vh] md:min-h-[60vh]" imageSrc="/images/hero/hero2.jpg" />
      <section id="blog" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho oculto removido para evitar duplicidade com a hero */}

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-64 bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold font-serif text-navy mb-3">
                    {t(`blog.${post.id}.title`)}
                  </h3>
                  <p className="text-navy/80 leading-relaxed">
                    {t(`blog.${post.id}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;