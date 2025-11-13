# 🚀 Inicio Rápido - Despliegue Completo

## ✅ Lo que ya está listo:

- ✅ Git CLI instalado
- ✅ Vercel CLI instalado  
- ✅ Repositorio Git inicializado
- ✅ Archivos preparados para commit

## 📋 Pasos para Completar el Despliegue:

### 1️⃣ Configurar Git (Solo la primera vez)

Ejecuta el script `setup-git.bat` o manualmente:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### 2️⃣ Hacer el Commit Inicial

```bash
cd C:\Users\harol\Projects
git commit -m "Initial commit: PDF Merger app"
```

### 3️⃣ Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre: `pdf-merger-app` (o el que prefieras)
3. **NO** marques "Add README"
4. Click en **"Create repository"**

### 4️⃣ Subir a GitHub

```bash
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git branch -M main
git push -u origin main
```

**Nota**: Te pedirá usuario y contraseña. Usa un **Personal Access Token** como contraseña.

### 5️⃣ Desplegar en Vercel

#### Opción A: Web (Más Fácil) ⭐

1. Ve a https://vercel.com
2. Click **"Add New Project"**
3. Conecta GitHub → Selecciona tu repo
4. Click **"Deploy"**
5. ¡Listo! 🎉

#### Opción B: Terminal

Abre **cmd** (no PowerShell) y ejecuta:

```cmd
cd C:\Users\harol\Projects
vercel
```

O usa el script:
```cmd
deploy-vercel.bat
```

## 🎯 Resultado

Tu app estará disponible en: `https://tu-proyecto.vercel.app`

## 📝 Archivos de Ayuda Creados:

- `setup-git.bat` - Configura Git automáticamente
- `deploy-vercel.bat` - Script para desplegar a Vercel
- `SETUP-DEPLOY.md` - Guía detallada completa
- `INICIO-RAPIDO.md` - Este archivo (resumen rápido)

## ❓ ¿Necesitas Ayuda?

- **Git no funciona**: Ejecuta `setup-git.bat`
- **Vercel CLI no funciona**: Usa la opción web (Opción A)
- **GitHub pide autenticación**: Crea un Personal Access Token en GitHub Settings

¡Todo está listo para desplegar! 🚀

