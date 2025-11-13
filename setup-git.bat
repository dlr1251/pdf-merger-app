@echo off
echo ========================================
echo Configuracion de Git
echo ========================================
echo.
echo Por favor, ingresa tu informacion de Git:
echo.
set /p GIT_NAME="Daniel Luque"
set /p GIT_EMAIL="daniel.luque@gmail.com"
echo.
echo Configurando Git...
git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"
echo.
echo ========================================
echo Git configurado correctamente!
echo ========================================
echo.
echo Nombre: %GIT_NAME%
echo Email: %GIT_EMAIL%
echo.
pause

