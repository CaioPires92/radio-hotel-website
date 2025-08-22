'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Baby, 
  Bed, 
  Phone, 
  X, 
  ChevronDown,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingForm = ({ isOpen, onClose }: BookingFormProps) => {
  // Debug log (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('BookingForm - isOpen:', isOpen);
  }
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    childrenAges: [] as string[],
    roomType: '',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus management - focus first input when modal opens
      const firstInput = document.querySelector('#booking-form input, #booking-form select') as HTMLElement;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const roomTypes = [
    { value: 'standard', label: 'Quarto Standard - R$ 220/noite', price: 220 },
    { value: 'deluxe', label: 'Quarto Deluxe - R$ 320/noite', price: 320 },
    { value: 'suite-master', label: 'Suíte Master - R$ 450/noite', price: 450 },
    { value: 'suite-familia', label: 'Suíte Família - R$ 520/noite', price: 520 },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle children ages array
    if (field === 'children') {
      const childrenCount = parseInt(value) || 0;
      const ages = Array(childrenCount).fill('');
      setFormData(prev => ({ ...prev, childrenAges: ages }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleChildAgeChange = (index: number, age: string) => {
    const newAges = [...formData.childrenAges];
    newAges[index] = age;
    setFormData(prev => ({ ...prev, childrenAges: newAges }));
    
    // Clear children ages error when user starts typing
    if (errors.childrenAges) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.childrenAges;
        return newErrors;
      });
    }
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const selectedRoom = roomTypes.find(room => room.value === formData.roomType);
    return nights * (selectedRoom?.price || 0);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.checkIn) {
      newErrors.checkIn = 'Data de check-in é obrigatória';
    }
    
    if (!formData.checkOut) {
      newErrors.checkOut = 'Data de check-out é obrigatória';
    }
    
    if (!formData.roomType) {
      newErrors.roomType = 'Selecione um tipo de acomodação';
    }
    
    // Validate date logic
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkInDate < today) {
        newErrors.checkIn = 'Data de check-in não pode ser anterior a hoje';
      }
      
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = 'Data de check-out deve ser posterior ao check-in';
      }
    }
    
    // Validate children ages if children > 0
    if (parseInt(formData.children) > 0) {
      const missingAges = formData.childrenAges.some(age => !age);
      if (missingAges) {
        newErrors.childrenAges = 'Informe a idade de todas as crianças';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Clear errors if validation passes
    setErrors({});

    // Create WhatsApp message
    const selectedRoom = roomTypes.find(room => room.value === formData.roomType);
    const nights = calculateNights();
    const total = calculateTotal();
    
    let message = `🏨 *SOLICITAÇÃO DE RESERVA - RÁDIO HOTEL*\n\n`;
    message += `📅 *Check-in:* ${formatDate(formData.checkIn)}\n`;
    message += `📅 *Check-out:* ${formatDate(formData.checkOut)}\n`;
    message += `🌙 *Noites:* ${nights}\n\n`;
    message += `👥 *Hóspedes:*\n`;
    message += `• Adultos: ${formData.adults}\n`;
    message += `• Crianças: ${formData.children}\n`;
    
    if (formData.childrenAges.length > 0 && formData.childrenAges.some(age => age)) {
      message += `• Idades das crianças: ${formData.childrenAges.filter(age => age).join(', ')} anos\n`;
    }
    
    message += `\n🛏️ *Acomodação:* ${selectedRoom?.label}\n`;
    message += `💰 *Valor estimado:* R$ ${total.toLocaleString('pt-BR')}\n`;
    
    if (formData.specialRequests) {
      message += `\n📝 *Observações:* ${formData.specialRequests}\n`;
    }
    
    message += `\n✨ Aguardo confirmação da disponibilidade e valores finais.`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Reset form and close
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      setFormData({
        checkIn: '',
        checkOut: '',
        adults: '2',
        children: '0',
        childrenAges: [],
        roomType: '',
        specialRequests: '',
      });
    }, 1000);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Form Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <Card 
              id="booking-form"
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0"
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-form-title"
            >
              <CardHeader className="bg-gradient-to-r from-navy to-blue text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold"
                  aria-label="Fechar formulário"
                  tabIndex={0}
                >
                  <X className="w-5 h-5" />
                </button>
                
                <CardTitle id="booking-form-title" className="text-2xl font-serif flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-gold" />
                  <span>Fazer Reserva</span>
                </CardTitle>
                
                <p className="text-white/95 mt-2">
                  Preencha os dados abaixo e enviaremos sua solicitação via WhatsApp
                </p>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Check-in *
                      </label>
                      <input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => handleInputChange('checkIn', e.target.value)}
                        min={getTodayDate()}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                          errors.checkIn ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.checkIn && (
                        <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Check-out *
                      </label>
                      <input
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => handleInputChange('checkOut', e.target.value)}
                        min={formData.checkIn || getTomorrowDate()}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                          errors.checkOut ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.checkOut && (
                        <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
                      )}
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        Adultos *
                      </label>
                      <Select value={formData.adults} onValueChange={(value) => handleInputChange('adults', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'adulto' : 'adultos'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        <Baby className="w-4 h-4 inline mr-1" />
                        Crianças
                      </label>
                      <Select value={formData.children} onValueChange={(value) => handleInputChange('children', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'criança' : 'crianças'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Children Ages */}
                  {parseInt(formData.children) > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-navy">
                        Idades das crianças
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {formData.childrenAges.map((age, index) => (
                          <input
                            key={index}
                            type="number"
                            placeholder={`Criança ${index + 1}`}
                            value={age}
                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                            min="0"
                            max="17"
                            className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-sm ${
                              errors.childrenAges ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {errors.childrenAges && (
                        <p className="text-red-500 text-sm mt-1">{errors.childrenAges}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Room Type */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      <Bed className="w-4 h-4 inline mr-1" />
                      Tipo de Acomodação *
                    </label>
                    <Select value={formData.roomType} onValueChange={(value) => handleInputChange('roomType', value)}>
                      <SelectTrigger className={`w-full ${
                        errors.roomType ? 'border-red-500' : ''
                      }`}>
                        <SelectValue placeholder="Selecione uma acomodação" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map(room => (
                          <SelectItem key={room.value} value={room.value}>
                            {room.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.roomType && (
                      <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Observações especiais
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder="Alguma solicitação especial? (aniversário, lua de mel, acessibilidade, etc.)"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Summary */}
                  {formData.checkIn && formData.checkOut && formData.roomType && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-cream p-4 rounded-lg border border-gold/20"
                    >
                      <h4 className="font-semibold text-navy mb-3 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Resumo da Reserva
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-navy/70">Período:</span>
                          <span className="font-medium text-navy">
                            {formatDate(formData.checkIn)} - {formatDate(formData.checkOut)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy/70">Noites:</span>
                          <span className="font-medium text-navy">{calculateNights()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy/70">Hóspedes:</span>
                          <span className="font-medium text-navy">
                            {formData.adults} adulto(s) + {formData.children} criança(s)
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-gold/20 pt-2">
                          <span className="font-semibold text-navy">Valor estimado:</span>
                          <span className="font-bold text-gold text-lg">
                            R$ {calculateTotal().toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.checkIn || !formData.checkOut || !formData.roomType}
                    className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    aria-label="Enviar solicitação de reserva via WhatsApp"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <LoadingSpinner size="md" color="navy" />
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-5 h-5" />
                        <span>Enviar Solicitação via WhatsApp</span>
                      </div>
                    )}
                  </Button>

                  {/* Info */}
                  <div className="text-center text-sm text-navy/60">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Você será redirecionado para o WhatsApp para finalizar sua reserva
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingForm;