@echo off
chcp 65001 >nul
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
echo Subiendo algora-web (sitio estatico, Vercel despliega solo)...
git add -A
git commit -m "Sitio: pagina Tarjeta de sellos (/monedero), avisos de Nuevo en inicio, POS y giros"
git pull --rebase origin main
git push origin main
echo.
echo Listo. Vercel publicara los cambios en un momento. Presiona una tecla para cerrar...
pause >nul
