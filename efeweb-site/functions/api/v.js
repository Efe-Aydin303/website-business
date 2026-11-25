// Bezoekersteller: POST /api/v
// Geen cookies en geen ID's of sleutels in de site-code. Het site-ID van Umami staat ALLEEN
// als variabele in Cloudflare (UMAMI_SITE_ID). Optioneel UMAMI_HOST: het adres van Umami
// (leeg = Umami Cloud, later bv. https://stats.efeweb.nl op de eigen VPS).
// Gaat er iets mis, dan merkt de bezoeker niets: we antwoorden altijd 204.

const done = () => new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
const cut = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001F]/g, '').slice(0, n);
const safe = (v) => v.replace(/^[=+\-@]+/, ''); // Umami weigert tekst die met = + - @ begint

export async function onRequestPost({ request, env, waitUntil }) {
  try {
    if (!env.UMAMI_SITE_ID) return done();

    const host = new URL(request.url).hostname;
    // Alleen tellen als de aanvraag van de site zelf komt.
    const origin = request.headers.get('origin');
    if (origin) { try { if (new URL(origin).hostname !== host) return done(); } catch (e) { return done(); } }
    const site = request.headers.get('sec-fetch-site');
    if (site && site !== 'same-origin') return done();

    const text = await request.text();
    if (text.length > 3000) return done();
    const d = JSON.parse(text);

    const ua = request.headers.get('user-agent') || '';
    const payload = {
      website: env.UMAMI_SITE_ID,
      hostname: host.replace(/^www\./, ''),
      url: cut(d.u, 500).startsWith('/') ? cut(d.u, 500) : '/',
      title: safe(cut(d.t, 200)),
      screen: cut(d.s, 20),
      language: cut(d.l, 20),
      // Echte bezoeker doorgeven, anders lijkt elke bezoeker op Cloudflare zelf.
      // Umami bewaart het IP niet, het maakt er alleen een anonieme code van.
      ip: request.headers.get('cf-connecting-ip') || undefined,
      userAgent: ua,
    };
    const ref = cut(d.r, 500);
    if (/^https?:\/\//.test(ref)) payload.referrer = ref;

    const base = (env.UMAMI_HOST || 'https://cloud.umami.is').replace(/\/+$/, '');
    waitUntil(
      fetch(base + '/api/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'user-agent': ua || 'Mozilla/5.0' },
        body: JSON.stringify({ type: 'event', payload }),
      }).catch(() => {})
    );
  } catch (e) { /* stil falen: de site moet altijd blijven werken */ }
  return done();
}

export const onRequest = () => new Response(null, { status: 405 });
