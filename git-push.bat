@echo off
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
git add -A
git commit -m "landing: cubre toda la plataforma - asistente IA Aura, lealtad y monedero, marketing, modulos restaurante y gimnasio, bundles Todo+RES y Todo+GYM, tabla comparativa ampliada"
git push origin main
echo.
echo Done! Press any key to close...
pause >nul
