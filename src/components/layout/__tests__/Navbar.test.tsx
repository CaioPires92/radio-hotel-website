import { describe, it, expect, vi } from 'vitest';
console.log('Executing Navbar.test.tsx');
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/layout/Navbar';

// Mock dependencies to isolate the component
vi.mock('@/components/i18n/LanguageSelector', () => ({
  CompactLanguageSelector: () => <div data-testid="language-selector">PT</div>,
}));

vi.mock('@/components/i18n/I18nProvider', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navigation.home': 'Início',
        'navigation.bookNow': 'Reservar Agora',
        'navigation.accommodations': 'Acomodações',
        'navigation.events': 'Convenções',
        'navigation.contact': 'Contato',
        'about.title': 'Sobre',
        'navbar.whatsapp.bookingMessage': 'Olá! Gostaria de fazer uma reserva.',
        'navbar.mobile.openMenu': 'Abrir menu',
        'navbar.mobile.closeMenu': 'Fechar menu',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Navbar', () => {
  it('renders the navbar with navigation links', () => {
    render(<Navbar />);
    expect(screen.getByAltText('Rádio Hotel Logo')).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Acomodações')).toBeInTheDocument();
    expect(screen.getByText('Convenções')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('Reservar Agora')).toBeInTheDocument();
  });

  it('opens and closes the mobile menu', () => {
    render(<Navbar />);
    const mobileMenuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(mobileMenuButton);

    // Menu should be open
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
    // Check for a link that is only visible in the mobile menu
    const mobileLink = screen.getAllByText('Início').find(el => el.closest('.md\\:hidden'));
    expect(mobileLink).toBeInTheDocument();

    fireEvent.click(mobileMenuButton);
    // Menu should be closed
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu when a link is clicked', () => {
    render(<Navbar />);
    const mobileMenuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(mobileMenuButton);

    // Find the "Sobre" link in the mobile menu and click it
    const aboutLink = screen.getAllByText('Sobre').find(el => el.closest('.md\\:hidden'));
    expect(aboutLink).toBeInTheDocument();
    if (aboutLink) {
      fireEvent.click(aboutLink);
    }

    // Menu should be closed
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  });
});