# Samenvatting van al mijn repos (om in een chat te plakken)

Bijgewerkt: 2 oktober 2026. Plak dit in een nieuwe chat zodat Claude weet waar ik mee bezig ben.

Over mij: ik ben Efe, student Software Developer (ROC van Twente, jaar 2) en stagiair bij SimpelScan. Antwoord in simpel Nederlands, kort en duidelijk.

---

## 1. website-business (Efe-Aydin303/website-business)
**Wat:** mijn bijverdienste. Ik bouw websites en promo video's voor lokale zaken in en rond Hengelo zonder website. Ik loop binnen met een demo van hún zaak op mijn telefoon.
- KvK + zakelijke Rabobank (sinds 29-09-2026), facturen via SnelStart. Video's edit ik in Premiere Pro 2020. Hosting gratis via Cloudflare Pages.
- **Prijzen:** site €250 (50% vooraf) + €15/maand. 3 promo video's €75, of +€50 bij een site. SEO: Google-pakket €75 eenmalig, maandpakket €40/maand extra.
- **Leads:** Barbershop Franko (Drienerstraat 13, demo klaar, beste kans), Kaan hair artist (budget ~€100–150, DM klaar), Samet / Lifestyle Center (heeft al Fresha, lage prioriteit), Best Mangal (nog niets gemaakt, niet als referentie noemen).
- **Afspraak:** geen koude e-mails naar eenmanszaken, alleen binnenlopen of een persoonlijke DM.
- **Bestanden:** `klantenwerving/` (stappenplan, leads.py om zaken zonder website uit Google Maps te halen, leadlijst Hengelo in Excel, berichten, SEO) en `video/reel-stijl-namaken.md`.

## 2. wallet-alert-bot (Efe-Aydin303/wallet-alert-bot, privé)
**Wat:** Telegram-bot die een alert stuurt als meerdere gevolgde Solana-wallets binnen korte tijd dezelfde token kopen (standaard 3 wallets in 15 minuten, minimaal 0,5 SOL).
- **Techniek:** TypeScript, Node 22.13+, Fastify, grammY, ingebouwde `node:sqlite`. Helius-webhook → koopfilter → SQLite → cluster-check → Telegram (en optioneel Discord).
- **Functies:** admin-commando's (`/add`, `/list`, `/set`, `/status`, `/record`, `/wallets`, `/leads`), RugCheck-risico per alert, prijscheck na 1 uur en 24 uur, wekelijkse track record op maandag, leads van niet-admins.
- **Draaien:** `npm run simulate` en `npm test` werken zonder accounts. Deploy via Dockerfile op Railway (volume op `/app/data`).
- **Laatste stand:** PR #4 "wallet-stats" (`/wallets` statistieken) is gemerged op 2 okt 2026.

## 3. spin-a-tun-tun-sahur (Efe-Aydin303/spin-a-tun-tun-sahur, privé)
**Wat:** Roblox-game. Spelers spinnen voor pets, vullen een Collection Book en reizen door biomes via portals.
- **Techniek:** Luau, code via Rojo naar Roblox Studio. Tools via Rokit, packages via Wally, check met `stylua src` en `selene src`.
- **Samenwerken:** iedereen bouwt samen in de Team Create place "tungtung test". Alleen Efe koppelt Rojo aan die place. Code in `src/server`, `src/client`, `src/shared` alleen via GitHub aanpassen.
- **Branches:** `develop` is standaard, `main` is live. Werk op `feature/...` of `fix/...`, altijd via pull request (squash merge, CI moet slagen).
- **Stand:** nog vroeg, versie 0.1.0. Code is nog bijna leeg, vooral de opzet staat.

## 4. Portfolio (Efe-Aydin303/Portfolio, privé)
**Wat:** mijn portfolio-site in het Engels. React 18 + TypeScript + Vite.
- Secties: hero, about, ervaring (SimpelScan), skills, opleiding, talen, projecten (Sentique webshop in Laravel, Aventuria dierentuin-site in C#/Razor), contact.
- Bevat ook een weer-app (Vue) in `weather-app/testing`, die meebouwt naar `/weatherapp`.
- Inhoud aanpassen in `src/App.tsx`. Laatste commit: maart 2026 ("klaar project 1").

## 5. website-build2 (ThijmenDEVONLEARN/website-build2, privé)
**Wat:** schoolproject samen met Thijmen. Website met home, about en pricing pagina.
- **Techniek:** Vite, Tailwind CSS 4, daisyUI, anime.js.
- Laatste commit: maart 2026.

## 6. EINDPROJECT (Efe-Aydin303/EINDPROJECT, privé)
Leeg. Er staat nog niets in.
