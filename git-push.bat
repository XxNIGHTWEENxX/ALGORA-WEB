@echo off
chcp 65001 >nul
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
echo Subiendo algora-web (sitio estatico, Vercel despliega solo)...
git add -A
git commit -m "Contacto: agregado WhatsApp de soporte tecnico (565 918 6986, numero central del agente) en seccion de contacto y pie, sin quitar el de ventas (294 111 4401). Antes: sitios.html galeria de demos por giro con mockups, fotos reales y hover, estilo dorado"
git pull --rebase origin main
git push origin main
echo.
echo Listo. Vercel publicara los cambios en un momento. Presiona una tecla para cerrar...
pause >nul
