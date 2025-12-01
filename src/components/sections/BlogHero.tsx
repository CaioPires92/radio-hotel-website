'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/components/i18n/I18nProvider';

interface BlogHeroProps {
  heightClass?: string;
  imageSrc?: string;
}

export default function BlogHero({ heightClass = 'min-h-[50vh] md:min-h-[60vh]', imageSrc = '/images/hero/hero2.jpg' }: BlogHeroProps) {
  const { t } = useTranslation();

  return (
    <section
      id="blog-hero"
      className={`relative ${heightClass} overflow-hidden flex items-center justify-center`}
      role="region"
      aria-label={t('navigation.blog')}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={t('navigation.blog')}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-navy bg-gradient-to-r from-navy to-blue opacity-70" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <motion.h1
                className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('navigation.blog')}
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl font-medium mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t('blog.subtitle')}
              </motion.h2>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
