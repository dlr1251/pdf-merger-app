@echo off
echo Instalando dependencias...
cd /d "%~dp0"
call npm install
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Instalacion completada exitosamente!
    echo ========================================
    echo.
    echo Para ejecutar la aplicacion, usa: npm run dev
    echo.
) else (
    echo.
    echo Error durante la instalacion.
    pause
)

