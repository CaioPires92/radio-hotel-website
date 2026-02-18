import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

type MotionProps = {
  animate?: unknown;
  initial?: unknown;
  exit?: unknown;
  transition?: unknown;
  whileHover?: unknown;
  whileTap?: unknown;
  whileInView?: unknown;
  viewport?: unknown;
};

const stripMotionProps = <T extends Record<string, unknown>>(
  props: T
): Omit<T, keyof MotionProps> => {
  const {
    animate,
    initial,
    exit,
    transition,
    whileHover,
    whileTap,
    whileInView,
    viewport,
    ...rest
  } = props as T & MotionProps;
  void animate;
  void initial;
  void exit;
  void transition;
  void whileHover;
  void whileTap;
  void whileInView;
  void viewport;
  return rest;
};

vi.mock('next/image', () => ({
  default: ({ alt }: { alt?: string }) => <span>{alt}</span>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
      <div {...stripMotionProps(props)}>{children}</div>
    ),
    section: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
      <section {...stripMotionProps(props)}>{children}</section>
    ),
    nav: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
      <nav {...stripMotionProps(props)}>{children}</nav>
    ),
    a: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLAnchorElement>>) => (
      <a {...stripMotionProps(props)}>{children}</a>
    ),
    button: ({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
      <button {...stripMotionProps(props)}>{children}</button>
    ),
    form: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLFormElement>>) => (
      <form {...stripMotionProps(props)}>{children}</form>
    ),
    h1: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => (
      <h1 {...stripMotionProps(props)}>{children}</h1>
    ),
    h2: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => (
      <h2 {...stripMotionProps(props)}>{children}</h2>
    ),
    p: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) => (
      <p {...stripMotionProps(props)}>{children}</p>
    ),
    span: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
      <span {...stripMotionProps(props)}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: { children?: ReactNode }) => children,
  useInView: () => true,
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}));

vi.mock('embla-carousel-react', () => ({
  default: () => [
    { current: null },
    { scrollNext: vi.fn(), scrollPrev: vi.fn(), canScrollNext: () => true, canScrollPrev: () => false },
  ],
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock('@/components/i18n/LanguageSelector', () => ({
  CompactLanguageSelector: () => <div data-testid="language-selector">PT</div>,
  LanguageSelector: () => <div data-testid="language-selector-full">Language Selector</div>,
}));

vi.mock('@/components/i18n/I18nProvider', () => ({
  I18nProvider: ({ children }: { children: ReactNode }) => children,
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navbar.mobile.openMenu': 'Abrir menu',
        'navbar.mobile.closeMenu': 'Fechar menu',
        'navigation.home': 'Início',
        'navigation.bookNow': 'Reservar Agora',
        'navigation.accommodations': 'Acomodações',
        'navigation.events': 'Convenções',
        'navigation.contact': 'Contato',
        'navigation.restaurant': 'Restaurante',
        'about.title': 'Sobre o Hotel',
        'booking.title': 'Faça sua Reserva',
        'booking.closeForm': 'Fechar',
        'hero.title': 'Radio Hotel',
        'hero.subtitle': 'Tradição e elegância no coração de Serra Negra',
      };
      return translations[key] || key;
    },
    isLoading: false,
  }),
  useI18nContext: () => ({
    locale: 'pt-BR',
    setLocale: vi.fn(),
    t: (key: string) => key,
    dictionary: {},
    isLoading: false,
    formatCurrency: (amount: number) => `R$ ${amount}`,
    formatDate: (date: Date) => date.toLocaleDateString('pt-BR'),
    formatNumber: (number: number) => number.toString(),
    isRTL: false,
    locales: ['pt-BR', 'en-US', 'es-ES'],
    defaultLocale: 'pt-BR',
  }),
  useFormatting: () => ({
    formatCurrency: (amount: number) => `R$ ${amount}`,
    formatDate: (date: Date) => date.toLocaleDateString('pt-BR'),
    formatNumber: (number: number) => number.toString(),
    locale: 'pt-BR',
  }),
}));

Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

describe('Homepage Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders homepage with navigation and key sections', () => {
    render(<HomePage />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByText(/sobre o hotel/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/acomodações/i).length).toBeGreaterThan(0);
  });

  it('opens booking form from CTA interaction', async () => {
    render(<HomePage />);

    const bookingButtons = screen.getAllByRole('button', { name: /reservar agora/i });
    fireEvent.click(bookingButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Faça sua Reserva')).toBeInTheDocument();
    });
  });

  it('closes booking form when close action is triggered', async () => {
    render(<HomePage />);

    const bookingButtons = screen.getAllByRole('button', { name: /reservar agora/i });
    fireEvent.click(bookingButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Faça sua Reserva')).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText(/fechar|booking\.closeform/i);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Faça sua Reserva')).not.toBeInTheDocument();
    });
  });

  it('keeps basic accessibility structure', () => {
    render(<HomePage />);

    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements.length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
