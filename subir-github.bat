@echo off
echo ========================================
echo Subir Codigo a GitHub
echo ========================================
echo.
cd /d "%~dp0"
echo Verificando estado de Git...
git status
echo.
echo Subiendo codigo a GitHub...
echo.
git branch -M main
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ========================================
    echo Codigo subido exitosamente a GitHub!
    echo ========================================
    echo.
    echo Ahora puedes desplegar en Vercel:
    echo 1. Ve a https://vercel.com
    echo 2. Add New Project
    echo 3. Selecciona tu repositorio
    echo 4. Deploy
    echo.
) else (
    echo.
    echo ========================================
    echo Error al subir el codigo
    echo ========================================
    echo.
    echo Posibles causas:
    echo - El repositorio remoto no esta configurado
    echo   Ejecuta: crear-repo-github.bat primero
    echo.
    echo - Problemas de autenticacion
    echo   GitHub requiere un Personal Access Token
    echo   Ve a: https://github.com/settings/tokens
    echo.
)
pause

