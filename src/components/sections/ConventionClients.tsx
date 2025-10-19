'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/components/i18n/I18nProvider';

const clients = [
  'ASMAE',
  'Avents Pharma (Rhodia)',
  'BAND FM',
  'Chapéus Cury',
  'Correio Popular',
  'Ford do Brasil',
  'FUNDEP',
  'IBGE',
  'Laboratórios Biosintética',
  'LIONS CLUB',
  'Magneti Marelli',
  'Minasgás',
  'NESME',
  'P.B.F.',
  'Sabão Ypê',
  'Secretária da Agricultura',
  'UNESP - Rio Claro',
  'Uniodonto',
  'Volkswagen do Brasil',
];

export default function ConventionClients() {
  const { t } = useTranslation();

  return (
    <section id="conventions-clients" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">
            {t('events.convention.clients.title')}
          </h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {clients.map((name) => (
              <div
                key={name}
                className="rounded-xl border border-navy/10 bg-cream px-4 py-3 text-navy/90 hover:bg-cream/80 transition"
              >
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}