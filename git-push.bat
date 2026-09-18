@echo off
chcp 65001 >nul
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
echo Subiendo algora-web (sitio estatico, Vercel despliega solo)...
git add -A
git commit -m "sitios.html: galeria de demos por giro (restaurante, barberia, clinica, supermercado, spa, dentista) con mockups en marco de navegador, fotos reales y hover; estilo dorado del sitio"
git pull --rebase origin main
git push origin main
echo.
echo Listo. Vercel publicara los cambios en un momento. Presiona una tecla para cerrar...
pause >nul
