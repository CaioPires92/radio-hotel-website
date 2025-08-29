'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface Review {
  id: number;
  name: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
}

const Reviews = () => {
  const { t } = useI18n();
  const [currentReview, setCurrentReview] = useState(0);

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Maria Silva',
      location: 'São Paulo, SP',
      date: '15/01/2024',
      rating: 5,
      comment: t('reviews.review1.comment'),
      verified: true,
    },
    {
      id: 2,
      name: 'João Santos',
      location: 'Rio de Janeiro, RJ',
      date: '10/01/2024',
      rating: 5,
      comment: t('reviews.review2.comment'),
      verified: true,
    },
    {
      id: 3,
      name: 'Ana Costa',
      location: 'Belo Horizonte, MG',
      date: '05/01/2024',
      rating: 5,
      comment: t('reviews.review3.comment'),
      verified: true,
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      location: 'Campinas, SP',
      date: '28/12/2023',
      rating: 4,
      comment: t('reviews.review4.comment'),
      verified: true,
    },
    {
      id: 5,
      name: 'Lucia Ferreira',
      location: 'Santos, SP',
      date: '20/12/2023',
      rating: 5,
      comment: t('reviews.review5.comment'),
      verified: true,
    },
  ];

  const averageRating = 4.8;
  const totalReviews = reviews.length;

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setCurrentReview(index);
  };

  // Add useEffect to handle state changes
  useEffect(() => {
    // This ensures the component re-renders when currentReview changes
  }, [currentReview]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        data-testid="star-icon"
        className={`w-4 h-4 ${i < rating ? 'text-gold fill-gold' : 'text-gray-300'}`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <section className="py-20 bg-cream" role="region" aria-labelledby="reviews-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            id="reviews-title"
            className="text-4xl md:text-5xl font-serif text-navy mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('reviews.title')}
          </motion.h2>
          
          <motion.p
            className="text-lg text-navy/70 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('reviews.subtitle')}
          </motion.p>

          {/* Rating Summary */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-gold mb-2">{averageRating}</div>
              <div className="flex items-center justify-center mb-2">
                {renderStars(5)}
              </div>
              <p className="text-navy/60">{t('reviews.basedOn', { count: totalReviews })}</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-sm text-navy w-2">{stars}</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold rounded-full"
                      style={{ width: stars === 5 ? '80%' : stars === 4 ? '20%' : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Review Card */}
            <div
              key={currentReview}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-semibold">
                  <span>{getInitials(reviews[currentReview].name)}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-navy">{reviews[currentReview].name}</h3>
                    {reviews[currentReview].verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {t('reviews.verified')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-navy/60">
                    {reviews[currentReview].location} • {reviews[currentReview].date}
                  </p>
                  <div className="flex items-center mt-2">
                    {renderStars(reviews[currentReview].rating)}
                  </div>
                </div>
              </div>

              <p className="text-navy/80 text-lg leading-relaxed">
                &ldquo;{reviews[currentReview].comment}&rdquo;
              </p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              aria-label={t('reviews.navigation.previous')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold hover:text-navy transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextReview}
              aria-label={t('reviews.navigation.next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold hover:text-navy transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                aria-label={t('reviews.navigation.goToReview', { number: index + 1 })}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentReview ? 'bg-gold' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-navy/70 mb-6">{t('reviews.cta.text')}</p>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold/90 text-navy font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            {t('reviews.cta.button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;