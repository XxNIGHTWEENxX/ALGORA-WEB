@echo off
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
git add -A
git commit -m "ALGORA TECH: home corporativo con logo en barra y pie; productos ALGORA POS Florinia NoFollow y servicios; landing POS en pos.html; sitios.html; sitemap"
git push origin main
echo.
echo Done! Press any key to close...
pause >nul
