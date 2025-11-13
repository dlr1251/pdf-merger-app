@echo off
echo ========================================
echo Desplegar en Vercel
echo ========================================
echo.
cd /d "%~dp0"
echo Verificando Vercel CLI...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI no encontrado. Instalando...
    call npm install -g vercel@latest
    echo.
)
echo.
echo Iniciando despliegue en Vercel...
echo.
echo NOTA: La primera vez te pedira que inicies sesion.
echo Sigue las instrucciones en pantalla.
echo.
call vercel --prod
echo.
if %errorlevel% equ 0 (
    echo ========================================
    echo Despliegue completado exitosamente!
    echo ========================================
    echo.
) else (
    echo.
    echo ========================================
    echo Error en el despliegue
    echo ========================================
    echo.
    echo Alternativa: Despliega desde la web
    echo 1. Ve a https://vercel.com
    echo 2. Add New Project
    echo 3. Conecta GitHub y selecciona tu repo
    echo 4. Deploy
    echo.
)
pause

