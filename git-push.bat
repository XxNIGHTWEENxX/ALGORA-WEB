@echo off
cd /d "%~dp0"
del /f /q .git\index.lock 2>nul
git add -A
git commit -m "SEO: datos estructurados Organization con logo y WebSite mas og site_name para que Google muestre el logo de marca"
git push origin main
echo.
echo Done! Press any key to close...
pause >nul
