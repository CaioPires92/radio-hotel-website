import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Events from '@/components/sections/Events';
import ConventionClients from '@/components/sections/ConventionClients';
import ConventionsHero from '@/components/sections/ConventionsHero';

export default function ConventionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ConventionsHero heightClass="min-h-[50vh] md:min-h-[60vh]" />
      <Events />
      <ConventionClients />
      <Footer />
    </main>
  );
}