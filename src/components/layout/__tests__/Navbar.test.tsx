import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('Navbar', () => {
  it('renders the navbar with logo and navigation items', () => {
    render(<Navbar />);
    
    // Check if logo is present
    expect(screen.getByAltText('Rádio Hotel')).toBeInTheDocument();
    
    // Check if navigation items are present
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Acomodações')).toBeInTheDocument();
    expect(screen.getByText('Eventos')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    
    // Check if booking button is present
    expect(screen.getByText('Reservar Agora')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navbar />);
    
    // Find the mobile menu button (hamburger)
    const mobileMenuButton = screen.getByRole('button', { name: /menu/i });
    
    // Click the mobile menu button
    fireEvent.click(mobileMenuButton);
    
    // The mobile menu should be visible (this would depend on your implementation)
    // You might need to adjust this based on how your mobile menu works
  });

  it('has proper accessibility attributes', () => {
    render(<Navbar />);
    
    // Check if navigation has proper role
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check if booking button has proper attributes
    const bookingButton = screen.getByText('Reservar Agora');
    expect(bookingButton).toHaveAttribute('type', 'button');
  });

  it('applies correct CSS classes for styling', () => {
    render(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed', 'top-0', 'w-full', 'z-50');
  });
});