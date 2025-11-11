// Contatos centralizados (placeholders até confirmação)
export const WHATSAPP_NUMBER = '5519999999999'

export const PHONE_RESERVAS = '+55 19 3892-2284'
export const PHONE_RECEPCAO_1 = '+55 19 3892-3311'
export const PHONE_RECEPCAO_2 = '+55 19 3892-1928'

export const EMAIL_RESERVAS = 'reservas@radiohotel.com.br'

export const ADDRESS = {
  street: 'R. Cel. Pedro Penteado, 387',
  city: 'Serra Negra',
  region: 'SP',
  postalCode: '',
  country: 'BR',
}

export const SOCIALS = {
  facebook: 'https://www.facebook.com/RadioHotelSerraNegra/',
  instagram: 'https://www.instagram.com/radiohotelsn/',
  twitter: 'https://twitter.com/radiohotel', // placeholder
}

export function buildWhatsAppUrl(message: string, number: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
