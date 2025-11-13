# 🚀 Comandos Directos para GitHub y Vercel

## ✅ Estado Actual
- Git CLI: ✅ Instalado y configurado
- Vercel CLI: ✅ Instalado (v48.9.2)
- Commit inicial: ✅ Realizado

## 📋 Pasos Rápidos

### 1. Crear Repositorio en GitHub

**Ve a:** https://github.com/new

- Nombre: `pdf-merger-app`
- **NO** marques "Add README"
- Click **"Create repository"**

### 2. Conectar y Subir Código

**En Git Bash o Terminal:**

```bash
cd C:\Users\harol\Projects

# Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/pdf-merger-app.git

# Cambiar a rama main
git branch -M main

# Subir código
git push -u origin main
```

**⚠️ Autenticación:**
- Usuario: Tu usuario de GitHub
- Contraseña: **Personal Access Token** (no tu contraseña)
- Crea token en: https://github.com/settings/tokens
- Permisos: `repo` (acceso completo)

### 3. Desplegar en Vercel

**Opción A: Web (Más Fácil) ⭐**

1. Ve a https://vercel.com
2. Inicia sesión
3. **"Add New Project"**
4. Conecta GitHub → Selecciona `pdf-merger-app`
5. **"Deploy"**
6. ¡Listo! 🎉

**Opción B: Terminal**

```bash
cd C:\Users\harol\Projects
vercel --prod
```

## 🔧 Si Usas Git Bash

Los scripts `.bat` no funcionan en Git Bash. Usa:

```bash
# Ejecutar script bash
bash crear-y-subir-repo.sh

# O comandos directos (ver arriba)
```

## 📝 Comandos Útiles

```bash
# Ver remotes configurados
git remote -v

# Eliminar remote si es necesario
git remote remove origin

# Ver estado
git status

# Ver commits
git log --oneline
```

## ✅ Checklist

- [ ] Repositorio creado en GitHub
- [ ] Código subido (`git push`)
- [ ] Proyecto desplegado en Vercel
- [ ] URL funcionando

¡Sigue los pasos y tu app estará en línea! 🚀

