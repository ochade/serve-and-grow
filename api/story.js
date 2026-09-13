import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler(req) {
  const { searchParams } = new URL(req.url);

  // Inputs from n8n
  const title    = searchParams.get('title')  || 'Episode title';
  const guest    = searchParams.get('guest')  || '';               // e.g. "with Dr. Ayo Shonibare"
  const thumb    = searchParams.get('thumb')  || '';               // public thumbnail URL

  const TEAL_BG   = '#0a2928';
  const TEAL_CARD = '#12403d';
  const GOLD      = '#c9a84c';
  const CREAM     = '#f0ebe0';
  const MUTED     = '#8fb3ae';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1080px',
          height: '1920px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(180deg, #0d3533 0%, #0a2928 55%, #061c1b 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Brand */}
        <div style={{ marginTop: 110, fontSize: 34, letterSpacing: 14, color: GOLD, fontWeight: 700 }}>
          SERVE &amp; GROW
        </div>
        <div style={{ marginTop: 12, fontSize: 20, letterSpacing: 10, color: MUTED }}>
          P O D C A S T
        </div>

        {/* Eyebrow */}
        <div style={{ marginTop: 40, fontSize: 22, letterSpacing: 6, color: GOLD }}>
          — NEW EPISODE —
        </div>

        {/* Thumbnail */}
        <div
          style={{
            marginTop: 60,
            width: 912,
            height: 518,
            border: `3px solid ${GOLD}`,
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 6,
          }}
        >
          <div
            style={{
              width: 900,
              height: 506,
              borderRadius: 10,
              background: TEAL_CARD,
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            {thumb ? (
              <img src={thumb} width="900" height="506" style={{ objectFit: 'cover' }} />
            ) : null}
          </div>
        </div>

        {/* Title — HTML wraps this automatically */}
        <div
          style={{
            marginTop: 70,
            width: 900,
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 52,
            lineHeight: 1.25,
            color: CREAM,
            fontWeight: 600,
          }}
        >
          {title}
        </div>

        {/* Guest */}
        {guest ? (
          <div style={{ marginTop: 30, fontSize: 36, fontStyle: 'italic', color: GOLD }}>
            {guest}
          </div>
        ) : null}

        {/* Now streaming */}
        <div style={{ marginTop: 50, fontSize: 30, color: '#b8cbc8', fontFamily: 'sans-serif' }}>
          Now streaming on YouTube
        </div>

        {/* Link in bio button */}
        <div
          style={{
            marginTop: 90,
            width: 500,
            height: 104,
            borderRadius: 52,
            background: GOLD,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 3,
            color: TEAL_BG,
          }}
        >
          LINK IN BIO
        </div>

        {/* Handle */}
        <div style={{ marginTop: 'auto', marginBottom: 90, fontSize: 26, letterSpacing: 3, color: MUTED, fontFamily: 'sans-serif' }}>
          @serveandgrowpodcast
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
