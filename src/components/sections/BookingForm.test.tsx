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

vi.mock('lucide-react', () => ({
  Calendar: () => <div data-testid="calendar">📅</div>,
  Users: () => <div data-testid="users">👥</div>,
  Baby: () => <div data-testid="baby">👶</div>,
  Bed: () => <div data-testid="bed">🛏️</div>,
  Phone: () => <div data-testid="phone">📞</div>,
  X: () => <div data-testid="x">✕</div>,
  ChevronLeft: () => <div data-testid="chevron-left">←</div>,
  ChevronRight: () => <div data-testid="chevron-right">→</div>,
  MapPin: () => <div data-testid="map-pin">📍</div>,
  Clock: () => <div data-testid="clock">🕐</div>,
}));

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
  SelectItem: ({ children, ...props }: PropsWithChildren<OptionHTMLAttributes<HTMLOptionElement>>) => (
    <option {...props}>{children}</option>
  ),
  SelectTrigger: () => null,
  SelectValue: () => null,
}));

vi.mock('@/components/ui/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

vi.mock('@/components/i18n/I18nProvider', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'booking.title': 'Faça sua Reserva',
        'booking.subtitle': 'Reserve sua estadia e desfrute de momentos únicos',
        'booking.checkIn': 'Check-in',
        'booking.checkOut': 'Check-out',
        'booking.adults': 'Adultos',
        'booking.children': 'Crianças',
        'booking.accommodationType': 'Tipo de Quarto',
        'booking.submitButton': 'Enviar Solicitação',
        'booking.submitAriaLabel': 'Enviar solicitação de reserva via WhatsApp',
        'booking.closeForm': 'Fechar',
        'booking.whatsappRedirect': 'Você será redirecionado para o WhatsApp',
        'booking.validation.checkInRequired': 'Check-in é obrigatório',
        'booking.validation.checkOutRequired': 'Check-out é obrigatório',
        'booking.validation.roomTypeRequired': 'Tipo de quarto é obrigatório',
        'booking.validation.checkOutAfterCheckIn': 'Check-out deve ser posterior ao check-in',
        'booking.validation.checkInPastDate': 'Check-in no passado não permitido',
        'booking.selectAccommodation': 'Selecione uma acomodação',
        'booking.roomTypes.standard': 'Apartamento Standard',
        'booking.roomTypes.deluxe': 'Apartamento Luxo',
        'booking.roomTypes.suiteMaster': 'Suíte Master',
        'booking.roomTypes.suiteFamily': 'Apto Conjugado',
        'booking.whatsapp.title': 'Solicitação de Reserva - Radio Hotel',
        'booking.whatsapp.checkIn': 'Check-in',
        'booking.whatsapp.checkOut': 'Check-out',
        'booking.whatsapp.nights': 'Noites',
        'booking.whatsapp.guests': 'Hóspedes',
        'booking.whatsapp.adults': 'Adultos',
        'booking.whatsapp.children': 'Crianças',
        'booking.whatsapp.accommodation': 'Acomodação',
        'booking.whatsapp.observations': 'Observações',
        'booking.whatsapp.confirmation': 'Aguardo confirmação da disponibilidade e valores finais',
      };
      return translations[key] || key;
    },
  }),
}));

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

  it('shows field validation messages for empty dates and room type', async () => {
    render(<BookingForm {...mockProps} />);

    const checkIn = screen.getByLabelText(/check-in/i);
    const checkOut = screen.getByLabelText(/check-out/i);

    fireEvent.change(checkIn, { target: { value: '' } });
    fireEvent.blur(checkIn);
    fireEvent.change(checkOut, { target: { value: '' } });
    fireEvent.blur(checkOut);

    fireEvent.click(screen.getByText('Enviar Solicitação'));

    await waitFor(() => {
      expect(screen.getByText('Check-in é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Check-out é obrigatório')).toBeInTheDocument();
    });
  });

  it('validates that check-out date is after check-in date', async () => {
    render(<BookingForm {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: '25/12/2026' } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: '24/12/2026' } });
    fireEvent.blur(screen.getByLabelText(/check-out/i));

    await waitFor(() => {
      expect(screen.getByText('Check-out deve ser posterior ao check-in')).toBeInTheDocument();
    });
  });

  it('submits the form and opens whatsapp with booking data', async () => {
    render(<BookingForm {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: '25/12/2026' } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: '27/12/2026' } });

    const selects = screen.getAllByTestId('select');
    fireEvent.change(selects[2], { target: { value: 'standard' } });

    fireEvent.click(screen.getByText('Enviar Solicitação'));

    await waitFor(() => {
      expect(window.open).toHaveBeenCalled();
      const [url, target] = (window.open as ReturnType<typeof vi.fn>).mock.calls[0];
      expect(url).toContain('https://wa.me/');
      expect(decodeURIComponent(url as string)).toContain('Apartamento Standard');
      expect(target).toBe('_blank');
    });
  });
});
