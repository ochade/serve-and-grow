import { ImageResponse } from '@vercel/og';
import { PNG } from 'pngjs';
import jpeg from 'jpeg-js';

export const config = { runtime: 'nodejs' };

const el = (type, props, ...children) => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Episode title';
  const guest = searchParams.get('guest') || '';
  const thumb = searchParams.get('thumb') || '';

  const GOLD = '#c9a84c';
  const CREAM = '#f0ebe0';
  const MUTED = '#8fb3ae';
  const TEAL_CARD = '#12403d';
  const TEAL_BG = '#0a2928';

  const tree = el(
    'div',
    {
      style: {
        width: '1080px',
        height: '1920px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #0d3533 0%, #0a2928 55%, #061c1b 100%)',
      },
    },
    el('div', { style: { marginTop: 110, fontSize: 34, letterSpacing: 14, color: GOLD, fontWeight: 700, display: 'flex' } }, 'SERVE & GROW'),
    el('div', { style: { marginTop: 12, fontSize: 20, letterSpacing: 10, color: MUTED, display: 'flex' } }, 'P O D C A S T'),
    el('div', { style: { marginTop: 40, fontSize: 22, letterSpacing: 6, color: GOLD, display: 'flex' } }, '— NEW EPISODE —'),
    el(
      'div',
      {
        style: {
          marginTop: 60, width: 912, height: 518, border: `3px solid ${GOLD}`,
          borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6,
        },
      },
      el(
        'div',
        {
          style: {
            width: 900, height: 506, borderRadius: 10, background: TEAL_CARD,
            display: 'flex', overflow: 'hidden',
          },
        },
        thumb
          ? el('img', { src: thumb, width: 900, height: 506, style: { objectFit: 'cover' } })
          : el('div', { style: { display: 'flex' } }, '')
      )
    ),
    el(
      'div',
      {
        style: {
          marginTop: 70, width: 900, display: 'flex', textAlign: 'center',
          justifyContent: 'center', fontSize: 52, lineHeight: 1.25, color: CREAM, fontWeight: 600,
        },
      },
      title
    ),
    guest
      ? el('div', { style: { marginTop: 30, fontSize: 36, fontStyle: 'italic', color: GOLD, display: 'flex' } }, guest)
      : el('div', { style: { display: 'flex' } }, ''),
    el('div', { style: { marginTop: 50, fontSize: 30, color: '#b8cbc8', display: 'flex' } }, 'Now streaming on YouTube'),
    el(
      'div',
      {
        style: {
          marginTop: 90, width: 500, height: 104, borderRadius: 52, background: GOLD,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, fontWeight: 700, letterSpacing: 3, color: TEAL_BG,
        },
      },
      'LINK IN BIO'
    ),
    el('div', { style: { marginTop: 'auto', marginBottom: 90, fontSize: 26, letterSpacing: 3, color: MUTED, display: 'flex' } }, '@serveandgrowpodcast')
  );

  // 1. Render to PNG via @vercel/og
  const pngResponse = new ImageResponse(tree, { width: 1080, height: 1920 });
  const pngBuffer = Buffer.from(await pngResponse.arrayBuffer());

  // 2. Decode PNG to raw pixels (pure JS, no native binaries)
  const png = PNG.sync.read(pngBuffer);

  // 3. Encode raw pixels to JPEG (pure JS)
  const jpegData = jpeg.encode({ data: png.data, width: png.width, height: png.height }, 90);

  return new Response(jpegData.data, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
