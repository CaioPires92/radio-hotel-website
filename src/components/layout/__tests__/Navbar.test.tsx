import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/layout/Navbar';
import type {
  AnchorHTMLAttributes,
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
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
    <button {...props}>{children}</button>
  ),
}));

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
        'navigation.restaurant': 'Restaurante',
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

vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
      <nav {...stripMotionProps(props)}>{children}</nav>
    ),
    div: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
      <div {...stripMotionProps(props)}>{children}</div>
    ),
    a: ({ children, ...props }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) => (
      <a {...stripMotionProps(props)}>{children}</a>
    ),
  },
  AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
}));

describe('Navbar', () => {
  it('renders main navigation items', () => {
    render(<Navbar />);

    expect(screen.getByAltText('Radio Hotel Logo')).toBeInTheDocument();
    expect(screen.getAllByText('Início').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sobre').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Acomodações').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Convenções').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contato').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Reservar Agora').length).toBeGreaterThan(0);
  });

  it('opens and closes mobile menu', () => {
    render(<Navbar />);

    const mobileMenuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(mobileMenuButton);
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');

    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).not.toBeNull();
    if (!mobileMenu) return;

    expect(within(mobileMenu).getByText('Início')).toBeInTheDocument();

    fireEvent.click(mobileMenuButton);
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu when a menu item is clicked', () => {
    render(<Navbar />);

    const mobileMenuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(mobileMenuButton);
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');

    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).not.toBeNull();
    if (!mobileMenu) return;

    const aboutLink = within(mobileMenu).getByText('Sobre');
    fireEvent.click(aboutLink);

    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
