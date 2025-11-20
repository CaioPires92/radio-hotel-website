import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const baseDir = path.join(process.cwd(), 'public', 'images', 'rooms');

  const isImage = (file: string) => /\.(png|jpe?g|webp)$/i.test(file);

  // deriveType não utilizado – categorização feita por mapBaseTitle

  type RoomGalleryItem = { src: string; tag: string };
  type Room = {
    id: string;
    name: string;
    type: string;
    description: string;
    image: string;
    amenities: string[];
    tags: string[];
    gallery: RoomGalleryItem[];
  };

  const rooms: Room[] = [];

  try {
    const dirents = fs.readdirSync(baseDir, { withFileTypes: true });
    const folders = dirents.filter(d => d.isDirectory());

    const excluded = new Set([
      '112',
      '302',
      '305',
      '305 - Apartamento Conjugado',
      '310',
      '310 - Apartamento Conjugado',
    ]);

    const mapCaption = (rawName: string) => {
      const n = rawName.toLowerCase();
      if (n.includes('frente') || n.includes('rua')) return 'Apartamento Standard frente rua';
      if (n.includes('standard')) return 'Apartamento Standard com vista interna';
      if (n.includes('suíte master especial') || n.includes('suite master especial') || n.includes('master especial') || (n.includes('master') && n.includes('especial'))) return 'Suíte Master especial com sacada e vista para a piscina';
      if (n.includes('suíte master') || n.includes('suite master') || n.includes('master')) return 'Suíte Master com sacada e vista para a piscina';
      if ((n.includes('suíte luxo') || n.includes('suite luxo') || n.includes('luxo')) && n.includes('bosque')) return 'Apto Luxo com vista para a piscina ou bosque';
      if (n.includes('suíte luxo') || n.includes('suite luxo') || n.includes('luxo')) return 'Apartamento luxo com vista para a piscina ou jardim';
      return 'Apartamento Standard com vista interna';
    };

    const mapBaseTitle = (rawName: string) => {
      const n = rawName.toLowerCase();
      if (n.includes('master')) return 'Suíte Master';
      if (n.includes('luxo')) return 'Apartamento Luxo';
      return 'Apartamento Standard';
    };
    // 1) Varre subpastas (quando existirem)
    for (const folder of folders) {
      if (excluded.has(folder.name)) {
        continue;
      }
      const folderPath = path.join(baseDir, folder.name);
      const files = fs.readdirSync(folderPath).filter(isImage);

      if (files.length === 0) continue;

      const id = folder.name.toLowerCase().replace(/\s+/g, '-');
      const label = mapCaption(folder.name);
      const base = mapBaseTitle(folder.name);
      const name = base; // título simples
      const type = base;
      const description = label; // subtítulo com detalhes

      const toPublicPath = (file: string) => `/images/rooms/${folder.name}/${file}`;

      rooms.push({
        id,
        name,
        type,
        description,
        image: toPublicPath(files[0]),
        amenities: [],
        tags: [name],
        gallery: files.map(file => ({ src: toPublicPath(file), tag: name }))
      });
    }

    // 2) Também varre arquivos diretamente na pasta 'rooms' (atual estrutura)
    const rootFiles = dirents.filter(d => d.isFile()).map(f => f.name).filter(isImage);
    for (const file of rootFiles) {
      const id = path.parse(file).name.toLowerCase().replace(/\s+/g, '-');
      const label = mapCaption(file);
      const base = mapBaseTitle(file);
      const name = base;
      const type = base;
      const description = label;
      const toPublicPath = (f: string) => `/images/rooms/${f}`;

      rooms.push({
        id,
        name,
        type,
        description,
        image: toPublicPath(file),
        amenities: [],
        tags: [name],
        gallery: [{ src: toPublicPath(file), tag: name }]
      });
    }
  } catch {
    // Em caso de erro, retorna lista vazia para não quebrar a UI
    return NextResponse.json({ rooms: [] }, { status: 200 });
  }

  return NextResponse.json({ rooms }, { status: 200 });
}
