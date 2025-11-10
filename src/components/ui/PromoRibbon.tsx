'use client';

import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { useI18nContext } from '@/components/i18n/I18nProvider';

export default function PromoRibbon() {
  const { locale } = useI18nContext();

  const message =
    locale === 'en-US'
      ? 'Dec 26–28 · 80th Anniversary Week · Special Program'
      : locale === 'es-ES'
      ? '26–28 de diciembre · Semana del 80º aniversario · Programación especial'
      : '26–28 de dezembro · Semana de Aniversário 80 anos · Programação Especial';

  const cta = locale === 'en-US' ? 'Special program' : locale === 'es-ES' ? 'Programación especial' : 'Programação especial';

  const waText =
    locale === 'en-US'
      ? "Hello! I'd like details about the 80th anniversary special program (Dec 26–28)."
      : locale === 'es-ES'
      ? '¡Hola! Quiero saber sobre la programación especial del 80º aniversario (26 al 28 de diciembre).'
      : 'Olá! Quero saber da programação especial do aniversário de 80 anos (26 a 28 de dezembro).';

  const waUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(waText)}`;

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
