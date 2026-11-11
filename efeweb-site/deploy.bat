@echo off
REM Zet de site in deze map live op efeweb.nl (Cloudflare Pages project "efeweb").
REM Geen sleutels in dit bestand. Inloggen gaat via "npx wrangler login" (eenmalig).
cd /d "%~dp0"
set CLOUDFLARE_API_TOKEN=
echo.
echo Site wordt live gezet op efeweb.nl ...
echo.
call npx wrangler pages deploy . --project-name efeweb --branch main --commit-dirty=true
echo.
if errorlevel 1 (echo Er ging iets mis. Lees de melding hierboven.) else (echo Klaar! Ververs efeweb.nl met Ctrl+F5.)
pause
