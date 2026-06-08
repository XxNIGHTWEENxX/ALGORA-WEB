@echo off
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
git add -A
git commit -m "landing: tabla comparativa de planes (Lite vs POS vs Todo ALGORA) por categorias con badge POPULAR; nuevo posicionamiento una sola plataforma, logo real, botones a algorapos.com.mx, plan Lite, SEO"
git push origin main
echo.
echo Done! Press any key to close...
pause >nul
