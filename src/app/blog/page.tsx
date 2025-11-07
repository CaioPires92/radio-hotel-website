'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogHero from '@/components/sections/BlogHero';

const blogPosts = [
  {
    id: 'alto-da-serra',
    image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025132413.jpg',
  },
  {
    id: 'fontana-di-trevi',
    image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025095100.jpg',
  },
  {
    id: 'teleferico-cristo-redentor',
    image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025133057.jpg',
  },
  {
    id: 'museu-vinho-cachaca-silotto',
    image: '/images/facilities/silotto.jpg',
  },
  {
    id: 'vale-ouro-verde-museu-cafe',
    image: '/images/facilities/vale-ouro.jpg',
  },
  {
    id: 'sitio-bom-retiro-familia-carra',
    image: '/images/facilities/carra.jpg',
  },
  {
    id: 'sitio-chapadao-queijos',
    image: '/images/facilities/chapadao.jpg',
  },
];

const Blog = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <BlogHero heightClass="min-h-[50vh] md:min-h-[60vh]" imageSrc="/images/hero/hero2.jpg" />

      <section id="blog" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-navy/80 leading-relaxed whitespace-pre-line">
              {t('blog.intro')}
            </p>
          </div>
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
                <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={`Imagem do post ${post.id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                  />
                </div>
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
