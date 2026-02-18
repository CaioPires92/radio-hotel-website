import { render, screen } from '@testing-library/react';
import Accommodations from './Accommodations';
import { describe, it, expect, vi } from 'vitest';

// Mock i18n
vi.mock('@/components/i18n/I18nProvider', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'accommodations.rooms.standard.name': 'Quarto Standard',
        'accommodations.amenities.wifi': 'Wi-Fi',
        'accommodations.amenities.parking': 'Estacionamento',
        'accommodations.amenities.minibar': 'Frigobar',
        'accommodations.amenities.tv': 'TV',
        'accommodations.amenities.bathroom': 'Banheiro Privativo',
        'accommodations.amenities.airConditioning': 'Ar Condicionado',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Accommodations Component', () => {
  it('renders correctly', () => {
    render(<Accommodations />);
    expect(screen.getByText('accommodations.title')).toBeInTheDocument();
  });

  it('renders non-empty alt text for the room image', () => {
    render(<Accommodations />);
    const images = screen.getAllByAltText(/apartamento standard/i);
    expect(images.length).toBeGreaterThan(0);
    expect(screen.queryAllByAltText('')).toHaveLength(0);
  });
});
