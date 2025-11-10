import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const baseDir = path.join(process.cwd(), 'public', 'images', 'rooms');

  const isImage = (file: string) => /\.(png|jpe?g|webp)$/i.test(file);

  const deriveType = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('luxo') || lower.includes('master')) return 'Apartamento Luxo';
    if (lower.includes('standard')) return 'Apartamento Standard';
    if (lower.includes('frente')) return 'Apartamento Frente Rua';
    if (lower.includes('conjugado')) return 'Apartamento Conjugado';
    return 'Apartamento';
  };

  const rooms: Array<any> = [];

  try {
    const dirents = fs.readdirSync(baseDir, { withFileTypes: true });
    const folders = dirents.filter(d => d.isDirectory());

    const excluded = new Set(['112', '302', '305 - Apartamento Conjugado']);
    for (const folder of folders) {
      if (excluded.has(folder.name)) {
        continue;
      }
      const folderPath = path.join(baseDir, folder.name);
      const files = fs.readdirSync(folderPath).filter(isImage);

      if (files.length === 0) continue;

      const id = folder.name.toLowerCase().replace(/\s+/g, '-');
      const name = folder.name;
      const type = deriveType(name);
      const description = type;

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
  } catch (e) {
    // Em caso de erro, retorna lista vazia para não quebrar a UI
    return NextResponse.json({ rooms: [] }, { status: 200 });
  }

  return NextResponse.json({ rooms }, { status: 200 });
}
