// Contactformulier: POST /api/contact
// De mail-sleutel staat ALLEEN als geheim in Cloudflare (RESEND_API_KEY), nooit in de site-code.
const TO = 'info@efeweb.nl';
const FROM = 'Efe Web formulier <formulier@efeweb.nl>';
const ALLOWED = ['efeweb.nl', 'www.efeweb.nl', 'efeweb.pages.dev'];

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('origin') || '';
  let host = '';
  try { host = new URL(origin).hostname; } catch (e) {}
  if (!ALLOWED.includes(host) && !host.endsWith('.efeweb.pages.dev')) return json({ ok: false, error: 'forbidden' }, 403);

  let d;
  try { d = await request.json(); } catch (e) { return json({ ok: false, error: 'bad_request' }, 400); }
  const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
  const name = clean(d.name, 80), email = clean(d.email, 120), message = clean(d.message, 2000);

  // Honeypot en te snel verstuurd: doen alsof het gelukt is, maar niets versturen.
  if (clean(d.website, 200) || !(Number(d.elapsed) >= 3000)) return json({ ok: true });

  if (!name || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(email) || message.length < 5) return json({ ok: false, error: 'invalid' }, 422);

  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'not_configured' }, 503);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'authorization': 'Bearer ' + env.RESEND_API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: FROM, to: [TO], reply_to: email,
      subject: 'Nieuw bericht via efeweb.nl van ' + name.replace(/[\r\n]+/g, ' '),
      text: 'Naam: ' + name + '\nE-mail: ' + email + '\n\n' + message
    })
  });
  if (!res.ok) return json({ ok: false, error: 'send_failed' }, 502);
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: 'method' }, 405);
