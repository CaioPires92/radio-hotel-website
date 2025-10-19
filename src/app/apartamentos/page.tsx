import Accommodations from "@/components/sections/Accommodations";

export const metadata = {
    title: 'Apartamentos | Radio Hotel',
    description: 'Veja todos os apartamentos e detalhes de acomodações do Radio Hotel.'
};

export default function ApartamentosPage() {
    return (
        <main className="bg-cream">
            <Accommodations />
        </main>
    );
}