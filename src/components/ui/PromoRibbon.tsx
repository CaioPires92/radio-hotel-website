'use client';

import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

export default function PromoRibbon() {
    return (
        <div className="sticky top-0 z-40 bg-gold text-navy px-4 py-2 shadow-md w-full">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-semibold">
                    <Gift className="w-4 h-4" />
                    <span>Pacotes de Natal, Réveillon e Férias de Janeiro</span>
                </div>
                <Button
                    className="bg-navy text-white hover:bg-navy/90"
                    onClick={() => window.open('https://wa.me/5519999999999?text=Olá! Quero saber dos pacotes.', '_blank')}
                >
                    Reserve agora
                </Button>
            </div>
        </div>
    );
}