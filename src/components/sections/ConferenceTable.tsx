'use client';

import { motion, Variants } from 'framer-motion';

// 1. Estrutura de Dados das Salas
const conferenceRooms = [
  {
    name: 'Millenium',
    sqm: 360,
    auditorium: 300,
    u_shape: 48,
    herringbone: 120,
    meeting: '-',
    ceiling: 5.0,
    dimensions: '21x18',
  },
  {
    name: 'Monterrey',
    sqm: 125,
    auditorium: 100,
    u_shape: 36,
    herringbone: 42,
    meeting: '-',
    ceiling: 2.7,
    dimensions: '10x12.5',
  },
];

// Configurações de animação para Framer Motion
const tableVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      // Usar cubic-bezier para compatibilidade estrita de tipos
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.05,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default function ConferenceTable() {
  return (
    // Contêiner principal com animação
    <motion.div
      className="max-w-7xl mx-auto p-4 md:p-8"
      variants={tableVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="overflow-x-auto shadow-2xl rounded-xl border border-gold/20">
        <table className="min-w-full divide-y divide-gold/10 text-left text-navy">
          {/* Cabeçalhos da Tabela */}
          <thead className="bg-navy/5 font-serif">
            <tr className="text-sm uppercase tracking-wider text-navy/90">
              <th scope="col" className="px-4 py-3 md:px-6 md:py-4 font-bold text-gold">Sala</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-4 font-bold">m²</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-4 font-bold text-center">Auditório</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-4 font-bold text-center">Formato "U"</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-4 font-bold text-center">Espinha</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-4 font-bold text-center">Reunião</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-4 font-bold">Pé direito (m)</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-4 font-bold">Dimensões</th>
            </tr>
          </thead>

          {/* Corpo da Tabela */}
          <tbody className="divide-y divide-gold/5 bg-white">
            {conferenceRooms.map((room, index) => (
              <motion.tr
                key={room.name}
                variants={rowVariants}
                className={`text-sm md:text-base transition-colors duration-300 hover:bg-cream ${index % 2 === 0 ? 'bg-white' : 'bg-cream'}`}
              >
                {/* Nome da Sala - Destaque */}
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap font-semibold text-navy">
                  {room.name}
                </td>

                {/* m² */}
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-navy/80">
                  {room.sqm}
                </td>

                {/* Auditório */}
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-center text-navy/80">
                  {room.auditorium}
                </td>

                {/* Formato "U" */}
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-center text-navy/80">
                  {room.u_shape}
                </td>

                {/* Espinha */}
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-center text-navy/80">
                  {room.herringbone}
                </td>

                {/* Reunião */}
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-center text-navy/80">
                  {room.meeting}
                </td>

                {/* Pé direito */}
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-navy/80">
                  {room.ceiling.toFixed(2)}
                </td>

                {/* Dimensões */}
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-navy/80">
                  {room.dimensions}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nota de rodapé opcional para ecrãs pequenos */}
      <div className="mt-4 text-xs text-navy/60 text-center md:hidden">
        <p>* Deslize para a esquerda para ver todas as colunas.</p>
      </div>
    </motion.div>
  );
}
