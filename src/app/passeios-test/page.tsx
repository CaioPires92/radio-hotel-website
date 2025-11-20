'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import CardImageCarousel from '@/components/ui/custom/CardImageCarousel';
import { Button } from '@/components/ui/button';

export default function PasseiosTestPage() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center text-center text-white">
        <Image src="/images/hero/hero3.jpg" alt="Passeios em Serra Negra" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Passeios</h1>
          <p className="text-white/90 text-lg">Experiências pela cidade e região.</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/trenzinho.jpg', alt: 'Trenzinho Maria Fumaça e Tia Linda' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Trenzinho Maria Fumaça e Tia Linda</h3>
            <p className="text-navy/80">Embarque nesta aventura!</p>
            <p className="text-navy/75">O Tradicional passeio de Trenzinho é uma atração turística imperdível para toda a família desde 1991!</p>
            <p className="text-navy/75">São oito quilômetros de percurso, passando pelo centro da cidade e com duração média de cinquenta minutos. Segue pelos principais pontos turísticos da cidade e faz uma parada programada de 10 minutos no Parque Fontes Santo Agostinho e Santa Luzia.</p>
            <p className="text-navy/75">Aproveite ao máximo este delicioso passeio com descontração e lazer.</p>
            <p className="text-navy/75">Saída em frente à Rodoviária.</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://maps.google.com/maps?ll=-22.609194,-46.702379&z=15&t=m&hl=pt-BR&gl=US&mapclient=embed&cid=8848056373113614187" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa">
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full">Localização</Button>
              </a>
              <a href="https://www.instagram.com/trenzinhomariafumaca/" target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram">
                <Button className="bg-navy hover:bg-navy/90 text-white font-semibold px-4 py-2 rounded-full">Instagram</Button>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5519997643614&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full">WhatsApp</Button>
              </a>
            </div>

            <div className="text-sm text-navy/60">
              <div>Av. 23 de Setembro - Estância Suíça, Serra Negra - SP</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Fazenda Benedetti</h3>
            <div className="text-navy/75">
              <div>Circuito das Águas Paulista, Amparo-SP</div>
              <div>Rod. SP-360, Km 138, Amparo/Serra Negra</div>
            </div>
            <p className="text-navy/75">A Fazenda Benedetti está localizada entre Serra Negra e Amparo, no Circuito das Águas Paulista, oferecendo experiências autênticas de lazer rural, produtos artesanais e contato com a natureza. Com mais de 90 anos de tradição, produz premiadas cachaças, licores, vinhos, mel e delícias de padaria artesanal. O espaço conta com empório, cafeteria, panetteria, apiário e loja virtual, destacando qualidade, história e atendimento acolhedor. Ideal para famílias aproveitarem momentos especiais, degustando cafés e produtos frescos em meio à natureza. Venha conhecer e se encantar com a tradição Benedetti!</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.google.com/maps?ll=-22.680037,-46.732812&z=16&t=m&hl=en&gl=BR&mapclient=embed&cid=3735467585740457921" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa">
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full">Localização</Button>
              </a>
              <a href="https://www.instagram.com/fazendabenedetti/" target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram">
                <Button className="bg-navy hover:bg-navy/90 text-white font-semibold px-4 py-2 rounded-full">Instagram</Button>
              </a>
              <a href="https://api.whatsapp.com/send?phone=5519971144731&text=Ol%C3%A1%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20Fazenda%20Benedetti" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full">WhatsApp</Button>
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/benedetti.jpg', alt: 'Fazenda Benedetti' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/silotto.jpg', alt: 'Museu do Vinho e da Cachaça – Família Silotto' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Museu do Vinho e da Cachaça – Família Silotto</h3>
            <p className="text-navy/75">Experimente toda a tradição italiana na fabricação de bebidas artesanais. Vinhos elaborados com uvas cultivadas em nossa propriedade, em nosso parreiral de mais de 100 anos. Ambiente preservado, mantendo os traços rústicos do passado. Venha desfrutar de momentos agradáveis junto à natureza, degustando um bom vinho.</p>
            <p className="text-navy/75">Produtos: vinhos artesanais, cachaça artesanal, grappa, vinagre de vinho, café moído, queijos, doces, mel e demais produtos da roça. Contamos também com playground e animais de fazenda.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.google.com/maps/search/?api=1&query=Rodovia+SP-360,+Km+158,5+-+Sítio+São+Pedro,+Serra+Negra+-+SP" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa">
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full">Localização</Button>
              </a>
              <a href="https://www.instagram.com/familiasilotto/" target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram">
                <Button className="bg-navy hover:bg-navy/90 text-white font-semibold px-4 py-2 rounded-full">Instagram</Button>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5519971493543&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full">WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Vale do Ouro Verde – Museu do Café</h3>
            <p className="text-navy/75">A produção de café em Serra Negra constitui uma das principais atividades agrícolas desenvolvidas na cidade. Na Fazenda Vale do Ouro Verde, o turista poderá agendar uma visita monitorada e conhecer todo o processo de produção artesanal do café, da evolução nas formas de plantio às técnicas de colheita, preparação de grãos, torrefação e moagem. Um pequeno museu reúne a história do café, curiosidades e virtudes do produto, além de equipamentos e ferramentas de época.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.google.com/maps/place/Museu+do+Caf%C3%A9+-+Emp%C3%B3rio+e+Cafeteria/@-22.6021613,-46.6623062,17z/data=!3m1!4b1!4m6!3m5!1s0x94c917e26d2d3125:0xea64fb156e28ef49!8m2!3d-22.6021663!4d-46.6574353!16s%2Fg%2F11b73n1wjs?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa">
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full">Localização</Button>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5519971476542&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full">WhatsApp</Button>
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/vale-ouro.jpg', alt: 'Vale do Ouro Verde – Museu do Café' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/carra.jpg', alt: 'Sítio Bom Retiro – Família Carra' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Sítio Bom Retiro – Família Carra – Produção de Vinhos e Destilados</h3>
            <p className="text-navy/75">Situado entre belas montanhas, reúne uma produção artesanal de saborosos vinhos de uva e laranja, além de uma variedade de destilados, incluindo cachaças de vários tipos, grappa, rum e conhaque. No sítio ainda se produz melado, rapadura, açúcar mascavo e mel, além do cultivo de frutas e exportação de manga.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.google.com/maps/place/Fam%C3%ADlia+Carra/@-22.5800196,-46.7718494,17z/data=!3m1!4b1!4m6!3m5!1s0x94c91ebfd43d102b:0xb93a7c7532605b3c!8m2!3d-22.5800246!4d-46.7669785!16s%2Fg%2F11c2kfx3vl?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa">
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full">Localização</Button>
              </a>
              <a href="https://www.instagram.com/familiacarra/" target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram">
                <Button className="bg-navy hover:bg-navy/90 text-white font-semibold px-4 py-2 rounded-full">Instagram</Button>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5519997222961&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full">WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Sítio Chapadão – Produção de Queijos</h3>
            <p className="text-navy/75">O Sítio produz os melhores queijos da região, que levam a marca &quot;Queijos da Fazenda&quot;. No local, o visitante terá a oportunidade de presenciar todo o processo de produção, desde a ordenha no curral à degustação do produto final, entre queijos frescal, ricota de leite e ricota temperada, queijo meia cura e coalhada.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.google.com/maps/search/?api=1&query=Rodovia+SP-105,+Km+5,5+-+Bairro+Santo+Aleixo,+Serra+Negra+-+SP" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa">
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full">Localização</Button>
              </a>
              <a href="https://www.instagram.com/afazendachapadao/" target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram">
                <Button className="bg-navy hover:bg-navy/90 text-white font-semibold px-4 py-2 rounded-full">Instagram</Button>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5519999846555&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full">WhatsApp</Button>
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: '/images/facilities/chapadao.jpg', alt: 'Sítio Chapadão – Produção de Queijos' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025132413.jpg', alt: 'Alto da Serra' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Alto da Serra (Serra Negra)</h3>
            <p className="text-navy/75">Prepare-se para uma vista de tirar o fôlego no Alto da Serra, o ponto culminante da região com 1.310m de altitude! De lá, você pode contemplar uma das paisagens mais belas do Circuito das Águas, avistando mais de 10 cidades vizinhas. O acesso é feito pela Rua 14 de Julho. Uma experiência inesquecível para quem ama natureza e fotografia!</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.google.com/maps/dir/-22.6202854,-46.6995035/Alto+da+Serra+-+Alto+da+Serra,+Serra+Negra+-+SP/data=!4m10!4m9!1m1!4e1!1m5!1m4!1s0x94c922ae2bce4df7:0xaf49b917fa40df7!8m2!3d-22.619121!4d-46.6774705!3e0?utm_source=mstt_0" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa">
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full">Localização</Button>
              </a>
              <a href="https://www.instagram.com/espacosantarosasn/" target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram">
                <Button className="bg-navy hover:bg-navy/90 text-white font-semibold px-4 py-2 rounded-full">Instagram</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Fontana Di Trevi - Serra Negra/SP</h3>
            <p className="text-navy/75">Encante-se com a deslumbrante réplica da Fontana di Trevi em Serra Negra! Um ponto turístico imperdível para tirar fotos incríveis e, claro, fazer aquele pedido especial jogando uma moeda. Venha conferir essa beleza arquitetônica que traz o charme da Itália para o interior de São Paulo. Visite e se apaixone!</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.google.de/maps/place/Fontana+di+Trevi+em+Serra+Negra/@-22.6100055,-46.7050937,17z/data=!3m1!4b1!4m6!3m5!1s0x94c9199f6374d031:0xe1c5336db6515312!8m2!3d-22.6100105!4d-46.7002228!16s%2Fg%2F11k4b8h95v?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa">
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full">Localização</Button>
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025095100.jpg', alt: 'Fontana Di Trevi - Serra Negra/SP' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg h-80 md:h-96">
            <CardImageCarousel
              images={[
                { src: 'https://ecrie.com.br/sistema/conteudos/imagem/g_107_0_1_29012025133057.jpg', alt: 'Teleférico e Cristo Redentor' },
              ]}
              className="h-80 md:h-96"
              showDots
              fit="cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">Teleférico e Cristo Redentor</h3>
            <p className="text-navy/75">Suba a Serra Negra de um jeito emocionante! Pegue o Teleférico na Praça João Zelante e desfrute de um passeio com vistas panorâmicas da cidade. Ele te leva diretamente ao Cristo Redentor, no topo do Pico do Fonseca! Lá de cima, a estátua de 18 metros te recebe com um visual espetacular, perfeito para fotos e momentos de paz. É o combo perfeito de aventura e contemplação!</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.google.com/maps/place/Cristo+Redentor+de+Serra+Negra/@-22.6041517,-46.7016246,17z/data=!3m1!4b1!4m6!3m5!1s0x94c919af9d840e0f:0x55e3a025772f7564!8m2!3d-22.6041567!4d-46.6990497!16s%2Fg%2F11f6d8ptg5?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Ver localização no mapa">
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-full">Localização</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
