@echo off
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
git add -A
git commit -m "landing: nuevo posicionamiento una sola plataforma, logo real ALGORA blanco, botones de accion a algorapos.com.mx, plan Lite $349 agregado a precios, SEO conservado"
git push origin main
echo.
echo Done! Press any key to close...
pause >nul
