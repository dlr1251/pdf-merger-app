@echo off
echo ========================================
echo Crear Repositorio en GitHub
echo ========================================
echo.
echo Este script te ayudara a crear el repositorio en GitHub.
echo.
echo PASO 1: Ve a https://github.com/new
echo PASO 2: Nombre del repositorio: pdf-merger-app
echo PASO 3: NO marques "Add README"
echo PASO 4: Click en "Create repository"
echo.
echo Despues de crear el repositorio, presiona cualquier tecla...
pause
echo.
set /p GITHUB_USER="Ingresa tu usuario de GitHub: "
set /p REPO_NAME="Nombre del repositorio (default: pdf-merger-app): "
if "%REPO_NAME%"=="" set REPO_NAME=pdf-merger-app
echo.
echo Conectando con GitHub...
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Repositorio conectado exitosamente!
    echo ========================================
    echo.
    echo Ahora ejecuta: git push -u origin main
    echo.
) else (
    echo.
    echo Error: El repositorio remoto ya existe o hay un problema.
    echo Si ya existe, puedes continuar con: git push -u origin main
    echo.
)
pause

