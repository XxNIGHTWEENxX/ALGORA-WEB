@echo off
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
git add -A
git commit -m "Precios: Agenda baja a 149 y bundle Todo ALGORA a 899"
git push origin main
echo.
echo Done! Press any key to close...
pause >nul
