@echo off
echo ========================================
echo Desplegando a Vercel...
echo ========================================
echo.
cd /d "%~dp0"
echo Verificando Vercel CLI...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI no encontrado en PATH.
    echo Intentando usar npm para ejecutar vercel...
    call npm exec -- vercel %*
) else (
    call vercel %*
)
echo.
echo ========================================
pause

