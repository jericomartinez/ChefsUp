import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'storefronts.json');

const ensureFileExists = async () => {
  try {
    await fs.access(dataPath);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(path.dirname(dataPath), { recursive: true });
      await fs.writeFile(dataPath, JSON.stringify({}, null, 2), 'utf8');
    } else {
      throw error;
    }
  }
};

const readStorefronts = async () => {
  await ensureFileExists();
  const raw = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(raw);
};

const writeStorefronts = async (payload: unknown) => {
  await fs.writeFile(dataPath, JSON.stringify(payload, null, 2), 'utf8');
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, storefront } = body || {};

    if (!email || !storefront) {
      return NextResponse.json(
        { error: 'Missing email or storefront payload' },
        { status: 400 }
      );
    }

    const existing = await readStorefronts();
    existing[email] = storefront;
    await writeStorefronts(existing);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to persist storefront data' },
      { status: 500 }
    );
  }
}
