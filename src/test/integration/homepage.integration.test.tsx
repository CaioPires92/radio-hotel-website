import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { I18nProvider } from '@/components/i18n/I18nProvider';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock embla-carousel-react
vi.mock('embla-carousel-react', () => ({
  default: () => [{ current: null }, { scrollNext: vi.fn(), scrollPrev: vi.fn(), canScrollNext: () => true, canScrollPrev: () => false }],
}));

// Mock Navbar component
vi.mock('@/components/layout/Navbar', () => ({
  default: () => (
    <nav role="navigation" data-testid="navbar">
      <div>Mock Navbar</div>
    </nav>
  ),
}));

// Mock other layout components
vi.mock('@/components/layout/Footer', () => ({
  default: () => (
    <footer data-testid="footer">
      <div>Mock Footer</div>
    </footer>
  ),
}));

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  X: () => <div data-testid="close-icon">Close</div>,
  Phone: () => <div data-testid="phone-icon">Phone</div>,
  ChevronLeft: () => <div data-testid="chevron-left">←</div>,
  ChevronRight: () => <div data-testid="chevron-right">→</div>,
  Calendar: () => <div data-testid="calendar">📅</div>,
  Users: () => <div data-testid="users">👥</div>,
  MapPin: () => <div data-testid="map-pin">📍</div>,
  Mail: () => <div data-testid="mail">✉️</div>,
  ArrowUp: () => <div data-testid="arrow-up">↑</div>,
  Star: ({ className, ...props }: any) => <div className={className} {...props} data-testid="star">⭐</div>,
  Wifi: ({ className, ...props }: any) => <div className={className} {...props} data-testid="wifi">📶</div>,
  Car: ({ className, ...props }: any) => <div className={className} {...props} data-testid="car">🚗</div>,
  Coffee: ({ className, ...props }: any) => <div className={className} {...props} data-testid="coffee">☕</div>,
  Utensils: ({ className, ...props }: any) => <div className={className} {...props} data-testid="utensils">🍽️</div>,
  Dumbbell: ({ className, ...props }: any) => <div className={className} {...props} data-testid="dumbbell">🏋️</div>,
  Waves: ({ className, ...props }: any) => <div className={className} {...props} data-testid="waves">🌊</div>,
  TreePine: ({ className, ...props }: any) => <div className={className} {...props} data-testid="tree-pine">🌲</div>,
  Mountain: ({ className, ...props }: any) => <div className={className} {...props} data-testid="mountain">⛰️</div>,
  Bed: ({ className, ...props }: any) => <div className={className} {...props} data-testid="bed">🛏️</div>,
  Bath: ({ className, ...props }: any) => <div className={className} {...props} data-testid="bath">🛁</div>,
  Tv: ({ className, ...props }: any) => <div className={className} {...props} data-testid="tv">📺</div>,
  AirVent: ({ className, ...props }: any) => <div className={className} {...props} data-testid="air-vent">❄️</div>,
  Shield: ({ className, ...props }: any) => <div className={className} {...props} data-testid="shield">🛡️</div>,
  Clock: ({ className, ...props }: any) => <div className={className} {...props} data-testid="clock">🕐</div>,
  Heart: ({ className, ...props }: any) => <div className={className} {...props} data-testid="heart">❤️</div>,
  Award: ({ className, ...props }: any) => <div className={className} {...props} data-testid="award">🏆</div>,
  Sparkles: ({ className, ...props }: any) => <div className={className} {...props} data-testid="sparkles">✨</div>,
  Wind: ({ className, ...props }: any) => <div className={className} {...props} data-testid="wind">💨</div>,
  Leaf: ({ className, ...props }: any) => <div className={className} {...props} data-testid="leaf">🍃</div>,
}));

// Mock language selector
vi.mock('@/components/i18n/LanguageSelector', () => ({
  CompactLanguageSelector: () => (
    <div data-testid="language-selector">PT</div>
  ),
  LanguageSelector: () => (
    <div data-testid="language-selector-full">Language Selector</div>
  ),
}));

// Mock utils
vi.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

// Mock i18n hooks
vi.mock('@/hooks/useI18n', () => ({
  useI18n: () => ({
    locale: 'pt-BR',
    setLocale: vi.fn(),
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navbar.mobile.openMenu': 'Abrir menu',
        'navbar.mobile.closeMenu': 'Fechar menu',
        'navigation.home': 'Início',
        'navigation.bookNow': 'Reservar Agora',
        'navigation.accommodations': 'Acomodações',
        'navigation.events': 'Eventos',
        'navigation.contact': 'Contato',
        'about.title': 'Sobre o Hotel',
        'hero.title': 'Radio Hotel',
        'hero.subtitle': 'Tradição e elegância no coração de Serra Negra'
      };
      return translations[key] || key;
    },
    dictionary: {},
    isLoading: false,
    formatCurrency: (amount: number) => `R$ ${amount}`,
    formatDate: (date: Date) => date.toLocaleDateString('pt-BR'),
    formatNumber: (number: number) => number.toString(),
    isRTL: false,
    locales: ['pt-BR', 'en-US', 'es-ES'],
    defaultLocale: 'pt-BR'
  })
}))

// Mock I18nProvider
vi.mock('@/components/i18n/I18nProvider', () => ({
  I18nProvider: ({ children }: { children: React.ReactNode }) => children,
  useI18nContext: () => ({
    locale: 'pt-BR',
    setLocale: vi.fn(),
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navbar.mobile.openMenu': 'Abrir menu',
        'navbar.mobile.closeMenu': 'Fechar menu',
        'navigation.home': 'Início',
        'navigation.bookNow': 'Reservar Agora',
        'navigation.accommodations': 'Acomodações',
        'navigation.events': 'Eventos',
        'navigation.contact': 'Contato',
        'about.title': 'Sobre o Hotel',
        'hero.title': 'Radio Hotel',
        'hero.subtitle': 'Tradição e elegância no coração de Serra Negra'
      };
      return translations[key] || key;
    },
    dictionary: {},
    isLoading: false,
    formatCurrency: (amount: number) => `R$ ${amount}`,
    formatDate: (date: Date) => date.toLocaleDateString('pt-BR'),
    formatNumber: (number: number) => number.toString(),
    isRTL: false,
    locales: ['pt-BR', 'en-US', 'es-ES'],
    defaultLocale: 'pt-BR'
  }),
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navbar.mobile.openMenu': 'Abrir menu',
        'navbar.mobile.closeMenu': 'Fechar menu',
        'navigation.home': 'Início',
        'navigation.bookNow': 'Reservar Agora',
        'navigation.accommodations': 'Acomodações',
        'navigation.events': 'Eventos',
        'navigation.contact': 'Contato',
        'about.title': 'Sobre o Hotel',
        'hero.title': 'Radio Hotel',
        'hero.subtitle': 'Tradição e elegância no coração de Serra Negra'
      };
      return translations[key] || key;
    },
    isLoading: false
  }),
  useFormatting: () => ({
    formatCurrency: (amount: number) => `R$ ${amount}`,
    formatDate: (date: Date) => date.toLocaleDateString('pt-BR'),
    formatNumber: (number: number) => number.toString(),
    locale: 'pt-BR'
  })
}));

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn(),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

describe('Homepage Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all main sections', () => {
    render(<HomePage />);
    
    // Check if all main sections are present
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/radio hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/sobre o hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/acomodações/i)).toBeInTheDocument();
    expect(screen.getByText(/eventos/i)).toBeInTheDocument();
  });

  it('opens booking form when navbar booking button is clicked', async () => {
    render(<HomePage />);
    
    const bookingButton = screen.getByRole('button', { name: /reservar agora/i });
    fireEvent.click(bookingButton);
    
    await waitFor(() => {
      expect(screen.getByText('Fazer Reserva')).toBeInTheDocument();
    });
  });

  it('closes booking form when close button is clicked', async () => {
    render(<HomePage />);
    
    // Open booking form
    const bookingButton = screen.getByRole('button', { name: /reservar agora/i });
    fireEvent.click(bookingButton);
    
    await waitFor(() => {
      expect(screen.getByText('Fazer Reserva')).toBeInTheDocument();
    });
    
    // Close booking form
    const closeButton = screen.getByLabelText(/fechar formulário/i);
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Fazer Reserva')).not.toBeInTheDocument();
    });
  });

  it('navigates through accommodation carousel', () => {
    render(<HomePage />);
    
    const nextButton = screen.getByLabelText(/próxima acomodação/i);
    const prevButton = screen.getByLabelText(/acomodação anterior/i);
    
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    
    fireEvent.click(nextButton);
    // Carousel navigation is mocked, so we just verify the buttons exist and are clickable
  });

  it('navigates through events carousel', () => {
    render(<HomePage />);
    
    const nextEventButton = screen.getByLabelText(/próximo evento/i);
    const prevEventButton = screen.getByLabelText(/evento anterior/i);
    
    expect(nextEventButton).toBeInTheDocument();
    expect(prevEventButton).toBeInTheDocument();
    
    fireEvent.click(nextEventButton);
    // Carousel navigation is mocked, so we just verify the buttons exist and are clickable
  });

  it('displays highlights section with proper content', () => {
    render(<HomePage />);
    
    // Check if highlights section exists
    const highlightsSection = screen.getByText(/destaques/i).closest('section');
    expect(highlightsSection).toBeInTheDocument();
  });

  it('shows parallax section with CTA', () => {
    render(<HomePage />);
    
    // Check if parallax section with CTA exists
    const ctaButton = screen.getByText(/reserve sua experiência/i);
    expect(ctaButton).toBeInTheDocument();
  });

  it('renders footer with all sections', () => {
    render(<HomePage />);
    
    // Check footer sections
    expect(screen.getByText(/links rápidos/i)).toBeInTheDocument();
    expect(screen.getByText(/serviços/i)).toBeInTheDocument();
    expect(screen.getByText(/contato/i)).toBeInTheDocument();
  });

  it('handles mobile responsive behavior', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    render(<HomePage />);
    
    // Check if page renders properly on mobile
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/radio hotel/i)).toBeInTheDocument();
  });

  it('maintains accessibility standards', () => {
    render(<HomePage />);
    
    // Check for proper heading hierarchy
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements.length).toBeGreaterThan(0);
    
    // Check that buttons exist and are accessible
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
