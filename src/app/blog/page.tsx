'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/components/i18n/I18nProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogHero from '@/components/sections/BlogHero';
import { ChevronLeft, ChevronRight, X, Camera } from 'lucide-react';

const blogPosts = [
  {
    id: 'alto-da-serra',
    image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025132413.jpg', // Substituir pelo caminho da imagem
  },
  {
    id: 'fontana-di-trevi',
    image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025095100.jpg', // Substituir pelo caminho da imagem
  },
  {
    id: 'teleferico-cristo-redentor',
    image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025133057.jpg', // Substituir pelo caminho da imagem
  },
];

const Blog = () => {
  const { t } = useTranslation();

  // Galeria organizada por categorias com tags
  const categories = [
    {
      id: 'familia',
      name: 'Para Família',
      tags: ['Suíte master', 'Suíte com 2 camas de casal'],
      photos: [
        { src: '/images/rooms/luxo-2.jpg', tags: ['Suíte master'] },
        { src: '/images/rooms/quadruplo-2.jpg', tags: ['Suíte com 2 camas de casal'] },
      ],
    },
    {
      id: 'casal',
      name: 'Para Casal',
      tags: ['Suíte master especial', 'Suíte master'],
      photos: [
        // Quando disponível, trocar pela imagem específica: '/images/rooms/master-especial.jpg'
        { src: '/images/rooms/luxo-2.jpg', tags: ['Suíte master especial'] },
        { src: '/images/rooms/standard-1.jpg', tags: ['Suíte master'] },
      ],
    },
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0].id);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isCatGalleryOpen, setIsCatGalleryOpen] = useState(false);
  const [currentCatPhotoIndex, setCurrentCatPhotoIndex] = useState(0);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)!;
  const uniqueTags = selectedCategory.tags;
  const visiblePhotos = selectedCategory.photos.filter((photo) =>
    selectedTag ? photo.tags.includes(selectedTag) : true
  );

  const openCatGalleryAt = (index: number) => {
    setCurrentCatPhotoIndex(index);
    setIsCatGalleryOpen(true);
  };
  const closeCatGallery = () => setIsCatGalleryOpen(false);
  const nextCatPhoto = () => setCurrentCatPhotoIndex((prev) => (prev + 1) % visiblePhotos.length);
  const prevCatPhoto = () => setCurrentCatPhotoIndex((prev) => (prev - 1 + visiblePhotos.length) % visiblePhotos.length);

  // Fechar galeria com ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isCatGalleryOpen) {
        closeCatGallery();
      }
    };

    if (isCatGalleryOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Previne scroll do body
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCatGalleryOpen]);

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

      {/* Galeria por Categoria */}
      <section id="category-gallery" className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">Galeria por Categoria</h2>
            <p className="text-navy/80">Selecione uma categoria para ver as fotos e filtre pelas tags da suíte.</p>
          </div>

          {/* Chips de categorias */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategoryId(cat.id); setSelectedTag(null); }}
                className={`text-sm px-4 py-2 rounded-full border transition ${
                  selectedCategoryId === cat.id
                    ? 'bg-gold text-navy border-gold'
                    : 'bg-white text-navy border-navy/20 hover:bg-navy/5'
                }`}
                aria-label={`Selecionar categoria ${cat.name}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Chips de tags da categoria selecionada */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-sm px-3 py-1 rounded-full border transition ${
                selectedTag === null ? 'bg-gold text-navy border-gold' : 'bg-white text-navy border-navy/20 hover:bg-navy/5'
              }`}
              aria-label="Filtrar por todas as tags"
            >
              Todas
            </button>
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-sm px-3 py-1 rounded-full border transition ${
                  selectedTag === tag ? 'bg-gold text-navy border-gold' : 'bg-white text-navy border-navy/20 hover:bg-navy/5'
                }`}
                aria-label={`Filtrar por tag ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid da galeria filtrada pela categoria e tag */}
          <motion.div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {visiblePhotos.map((photo, index) => (
              <motion.div
                key={`${photo.src}-${index}`}
                className="relative bg-white rounded-lg shadow overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative w-full h-60">
                  <Image src={photo.src} alt={`Foto ${index + 1}`} fill className="object-cover" quality={85} />
                  {/* Tags visíveis sobre a foto */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {photo.tags.map((tag) => (
                      <span key={tag} className="bg-white/90 text-navy text-xs px-3 py-1 rounded-full shadow">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Botão "Ver fotos" que aparece no hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openCatGalleryAt(index)}
                      className="bg-white/95 hover:bg-white text-navy px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-300"
                      aria-label={`Ver galeria da foto ${index + 1}`}
                    >
                      <Camera className="w-4 h-4" />
                      Ver fotos
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Modal de galeria responsivo */}
          <AnimatePresence>
            {isCatGalleryOpen && visiblePhotos.length > 0 && (
              <motion.div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCatGallery} // Clique fora fecha a galeria
              >
                <div 
                  className="relative w-full max-w-6xl mx-auto"
                  onClick={(e) => e.stopPropagation()} // Previne fechamento ao clicar na imagem
                >
                  <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] rounded-2xl overflow-hidden bg-white/95 shadow-2xl">
                    <Image
                      src={visiblePhotos[currentCatPhotoIndex].src}
                      alt={`Foto ${currentCatPhotoIndex + 1}`}
                      fill
                      className="object-cover"
                      quality={85}
                      priority
                    />

                    {/* Tags da foto atual */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-2">
                      {visiblePhotos[currentCatPhotoIndex].tags.map((tag) => (
                        <span key={tag} className="bg-navy text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Botão fechar */}
                    <button
                      onClick={closeCatGallery}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
                      aria-label="Fechar galeria"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-navy" />
                    </button>

                    {/* Navegação - apenas se houver mais de uma foto */}
                    {visiblePhotos.length > 1 && (
                      <>
                        <button
                          onClick={prevCatPhoto}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-colors"
                          aria-label="Foto anterior"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-navy" />
                        </button>
                        <button
                          onClick={nextCatPhoto}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-colors"
                          aria-label="Próxima foto"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-navy" />
                        </button>
                      </>
                    )}

                    {/* Thumbnails das fotos visíveis - apenas se houver mais de uma foto */}
                    {visiblePhotos.length > 1 && (
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
                          {visiblePhotos.map((photo, idx) => (
                            <button
                              key={`${photo.src}-thumb-${idx}`}
                              onClick={() => setCurrentCatPhotoIndex(idx)}
                              className={`relative flex-shrink-0 w-12 h-8 sm:w-16 sm:h-10 md:w-20 md:h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                                idx === currentCatPhotoIndex ? 'border-gold' : 'border-white/50 hover:border-white'
                              }`}
                              aria-label={`Selecionar foto ${idx + 1}`}
                            >
                              <Image src={photo.src} alt={`Thumb ${idx + 1}`} fill className="object-cover" quality={75} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Indicador de posição */}
                    {visiblePhotos.length > 1 && (
                      <div className="absolute top-3 right-12 sm:top-4 sm:right-16 bg-black/60 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                        {currentCatPhotoIndex + 1} / {visiblePhotos.length}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;