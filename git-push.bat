@echo off
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
git add -A
git commit -m "Pagina de venta Sitios a la Medida (sitios.html) con paquetes y enlace de pago del pago unico"
git push origin main
echo.
echo Done! Press any key to close...
pause >nul
