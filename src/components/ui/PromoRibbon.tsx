'use client';

import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { useI18nContext } from '@/components/i18n/I18nProvider';
import { buildWhatsAppUrl } from '@/lib/config';

export default function PromoRibbon() {
  const { locale } = useI18nContext();

  const message =
    locale === 'en-US'
      ? 'Special Program'
      : locale === 'es-ES'
      ? 'Programación especial'
      : 'Programação especial';

  const cta = locale === 'en-US' ? 'Special program' : locale === 'es-ES' ? 'Programación especial' : 'Programação especial';

  const waText =
    locale === 'en-US'
      ? "Hello! I'd like details about the special program."
      : locale === 'es-ES'
      ? '¡Hola! Quiero saber sobre la programación especial.'
      : 'Olá! Quero saber da programação especial.';

  const waUrl = buildWhatsAppUrl(waText);

  return (
    <div className="sticky top-0 z-40 bg-gold text-navy px-4 py-2 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold">
          <Gift className="w-4 h-4" />
          <span>{message}</span>
        </div>
        <Button className="bg-navy text-white hover:bg-navy/90" onClick={() => window.open(waUrl, '_blank')}>
          {cta}
        </Button>
      </div>
    </div>
  );
}
