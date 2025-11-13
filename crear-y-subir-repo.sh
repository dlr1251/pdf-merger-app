#!/bin/bash
# Script para crear y subir repositorio a GitHub

echo "========================================"
echo "Crear y Subir Repositorio a GitHub"
echo "========================================"
echo ""

# Verificar si ya existe un remote
if git remote | grep -q origin; then
    echo "⚠️  Ya existe un remote 'origin'"
    read -p "¿Deseas eliminarlo y crear uno nuevo? (s/n): " respuesta
    if [ "$respuesta" = "s" ] || [ "$respuesta" = "S" ]; then
        git remote remove origin
        echo "✅ Remote 'origin' eliminado"
    else
        echo "Usando el remote existente..."
        git remote -v
        exit 0
    fi
fi

echo ""
echo "PASO 1: Crear repositorio en GitHub"
echo "----------------------------------------"
echo "1. Ve a: https://github.com/new"
echo "2. Nombre del repositorio: pdf-merger-app"
echo "3. NO marques 'Add README'"
echo "4. Click en 'Create repository'"
echo ""
read -p "Presiona Enter cuando hayas creado el repositorio..."

echo ""
read -p "Ingresa tu usuario de GitHub: " GITHUB_USER
read -p "Nombre del repositorio (default: pdf-merger-app): " REPO_NAME

if [ -z "$REPO_NAME" ]; then
    REPO_NAME="pdf-merger-app"
fi

echo ""
echo "Conectando con GitHub..."
git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git

if [ $? -eq 0 ]; then
    echo "✅ Repositorio conectado exitosamente!"
    echo ""
    echo "PASO 2: Subiendo código..."
    echo "----------------------------------------"
    git branch -M main
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "========================================"
        echo "✅ Código subido exitosamente!"
        echo "========================================"
        echo ""
        echo "Ahora puedes desplegar en Vercel:"
        echo "1. Ve a https://vercel.com"
        echo "2. Add New Project"
        echo "3. Selecciona tu repositorio"
        echo "4. Deploy"
    else
        echo ""
        echo "⚠️  Error al subir el código"
        echo "Posibles causas:"
        echo "- Problemas de autenticación"
        echo "- GitHub requiere un Personal Access Token"
        echo "  Crea uno en: https://github.com/settings/tokens"
    fi
else
    echo "❌ Error al conectar el repositorio"
fi

