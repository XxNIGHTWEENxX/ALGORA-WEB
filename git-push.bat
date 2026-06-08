@echo off
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
git add -A
git commit -m "rediseno landing: una sola plataforma todo-en-uno (POS, tienda, agenda, facturacion CFDI, finanzas, nomina, terminal), logo real ALGORA en blanco, precios escalonados con bundle destacado, SEO conservado y actualizado al nuevo posicionamiento"
git push origin main
echo.
echo Done! Press any key to close...
pause >nul
