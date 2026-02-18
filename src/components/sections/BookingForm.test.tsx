import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from '@/components/ui/custom/BookingForm';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  HTMLAttributes,
  OptionHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
    form: ({ children, ...props }: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) => (
      <form {...props}>{children}</form>
    ),
  },
  AnimatePresence: ({ children }: { children?: ReactNode }) => children,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Calendar: () => <div data-testid="calendar">📅</div>,
  Users: () => <div data-testid="users">👥</div>,
  Baby: () => <div data-testid="baby">👶</div>,
  Bed: () => <div data-testid="bed">🛏️</div>,
  Phone: () => <div data-testid="phone">📞</div>,
  X: () => <div data-testid="x">✕</div>,
  ChevronDown: () => <div data-testid="chevron-down">⌄</div>,
  MapPin: () => <div data-testid="map-pin">📍</div>,
  Clock: () => <div data-testid="clock">🕐</div>,
}));

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  CardContent: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  CardHeader: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  CardTitle: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => (
    <h3 {...props}>{children}</h3>
  ),
}));

type MockSelectProps = {
  children?: ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
};

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, value }: MockSelectProps) => (
    <select onChange={(e) => onValueChange?.(e.target.value)} value={value} data-testid="select">
      {children}
    </select>
  ),
  SelectContent: ({ children }: { children?: ReactNode }) => <>{children}</>,
  SelectItem: ({
    children,
    ...props
  }: PropsWithChildren<OptionHTMLAttributes<HTMLOptionElement>>) => <option {...props}>{children}</option>,
  SelectTrigger: ({ children }: { children?: ReactNode }) => <button>{children}</button>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
}));

vi.mock('@/components/ui/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

// Mock i18n
vi.mock('@/components/i18n/I18nProvider', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'booking.title': 'Faça sua Reserva',
        'booking.checkIn': 'Check-in',
        'booking.checkOut': 'Check-out',
        'booking.adults': 'Adultos',
        'booking.children': 'Crianças',
        'booking.accommodationType': 'Tipo de Quarto',
        'booking.submitButton': 'Enviar Solicitação',
        'booking.closeForm': 'Fechar',
        'booking.whatsappRedirect': 'Você será redirecionado para o WhatsApp',
        'booking.validation.checkInRequired': 'Check-in é obrigatório',
        'booking.validation.checkOutRequired': 'Check-out é obrigatório',
        'booking.validation.roomTypeRequired': 'Tipo de quarto é obrigatório',
        'booking.validation.checkOutAfterCheckIn': 'Check-out deve ser posterior ao check-in',
        'booking.selectAccommodation': 'Selecione uma acomodação',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn(),
});

describe('BookingForm Component', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders booking form when open', () => {
    render(<BookingForm {...mockProps} />);
    expect(screen.getByText('Faça sua Reserva')).toBeInTheDocument();
    expect(screen.getByLabelText(/check-in/i)).toBeInTheDocument();
  });

  it('validates required fields on submit', async () => {
    render(<BookingForm {...mockProps} />);
    const submitButton = screen.getByText('Enviar Solicitação');
    
    // Clear default dates to test validation
    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: '' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Check-in é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Check-out é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Tipo de quarto é obrigatório')).toBeInTheDocument();
    });
  });

  it('validates that check-out date is after check-in date', async () => {
    render(<BookingForm {...mockProps} />);
    const submitButton = screen.getByText('Enviar Solicitação');
    
    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: '2025-12-25' } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: '2025-12-24' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Check-out deve ser posterior ao check-in')).toBeInTheDocument();
    });
  });

  it('submits the form and opens whatsapp with correct data', async () => {
    render(<BookingForm {...mockProps} />);
    
    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: '2025-12-25' } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: '2025-12-27' } });
    
    const selects = screen.getAllByTestId('select');
    fireEvent.change(selects[0], { target: { value: '2' } }); // Adults
    fireEvent.change(selects[2], { target: { value: 'standard' } }); // Room Type
    
    const submitButton = screen.getByText('Enviar Solicitação');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
        expect(window.open).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/'), '_blank');
        expect(window.open).toHaveBeenCalledWith(expect.stringContaining('standard'), '_blank');
    });
  });
});
