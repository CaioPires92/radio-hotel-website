import Accommodations from '@/components/sections/Accommodations'
import AccommodationsHero from '@/components/sections/AccommodationsHero'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
  title: 'Acomodações | Rádio Hotel',
  description: 'Conheça todas as opções de acomodações do Rádio Hotel.',
}

export default function AcomodacoesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <AccommodationsHero heightClass="min-h-[50vh] md:min-h-[60vh]" />
      <Accommodations />
      <Footer />
    </main>
  )
}