# addhengelo.nl (Atatürkçü Düşünce Derneği Hengelo)

Nieuwe site voor ADD Hengelo, ter vervanging van de "under construction"-pagina.
Eén pagina, Turks + Nederlands (knop TR/NL rechtsboven). Geen build nodig.

## Online zetten (Cloudflare Pages)
1. Cloudflare > Workers & Pages > Create > Pages > Upload assets.
2. Upload de map `sites/addhengelo`. Je krijgt `addhengelo.pages.dev`.
3. Later: custom domain `addhengelo.nl` koppelen (DNS bij de vereniging).

## Nog nodig van de vereniging
- Logo (het Atatürk-logo van de oude site) en eigen foto's van evenementen
- Adres van het verenigingsgebouw (als ze dat hebben) + telefoon
- Social links (Facebook / Instagram)
- Check of de tekst over de 102-jaar-viering en de namen (Aynur Tamer, Büşra Önerbay) mogen blijven staan
- KvK-nummer voor de footer
- Formulier opent nu de mail-app (mailto). Eventueel later Formspree o.i.d.

## SEO
- Title + meta description met "Hengelo"
- JSON-LD `NGO` (vereniging, geen LocalBusiness), adres alleen plaats tot het echte adres bekend is
- robots.txt + sitemap.xml, canonical, hreflang tr/nl
