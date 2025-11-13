# 🚀 Pasos Completos para Desplegar

## ✅ Estado Actual

- ✅ **Git CLI**: Instalado y configurado (Daniel Luque / daniel.luque@gmail.com)
- ✅ **Vercel CLI**: Instalado y funcionando
- ✅ **Commit inicial**: Realizado exitosamente
- ✅ **Repositorio local**: Listo

## 📋 Pasos para Completar el Despliegue

### Paso 1: Crear Repositorio en GitHub

**Opción A: Usar el script (Recomendado)**
```bash
crear-repo-github.bat
```

**Opción B: Manualmente**
1. Ve a https://github.com/new
2. Nombre: `pdf-merger-app`
3. **NO** marques "Add README"
4. Click **"Create repository"**

### Paso 2: Conectar y Subir a GitHub

**Opción A: Usar el script**
```bash
subir-github.bat
```

**Opción B: Manualmente**
```bash
git remote add origin https://github.com/TU-USUARIO/pdf-merger-app.git
git branch -M main
git push -u origin main
```

**⚠️ Nota sobre Autenticación:**
- GitHub ya no acepta contraseñas
- Necesitas un **Personal Access Token**
- Crea uno en: https://github.com/settings/tokens
- Permisos necesarios: `repo` (acceso completo a repositorios)

### Paso 3: Desplegar en Vercel

**Opción A: Desde la Web (Más Fácil) ⭐**

1. Ve a https://vercel.com
2. Inicia sesión con tu cuenta
3. Click **"Add New Project"**
4. Conecta GitHub si es la primera vez
5. Selecciona el repositorio `pdf-merger-app`
6. Vercel detectará Next.js automáticamente
7. Click **"Deploy"**
8. ¡Espera 2-3 minutos y listo! 🎉

**Opción B: Desde la Terminal**

```bash
desplegar-vercel.bat
```

O manualmente:
```bash
vercel --prod
```

La primera vez te pedirá que inicies sesión en Vercel.

## 🎯 Resultado Final

Tu aplicación estará disponible en:
- **URL de Vercel**: `https://pdf-merger-app.vercel.app` (o similar)
- **Actualizaciones automáticas**: Cada `git push` desplegará automáticamente

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `crear-repo-github.bat` | Te guía para crear el repo en GitHub |
| `subir-github.bat` | Sube el código a GitHub |
| `desplegar-vercel.bat` | Despliega en Vercel desde terminal |

## 🔄 Flujo de Trabajo Futuro

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel desplegará automáticamente si conectaste GitHub.

## ❓ Solución de Problemas

### Git pide credenciales
- Usa tu **usuario de GitHub** como usuario
- Usa un **Personal Access Token** como contraseña
- Crea el token en: https://github.com/settings/tokens

### Vercel CLI no funciona en PowerShell
- Usa **cmd** (no PowerShell) para ejecutar los scripts
- O usa la opción web (más fácil)

### Error "remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/pdf-merger-app.git
```

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub (`git push`)
- [ ] Proyecto desplegado en Vercel
- [ ] URL de Vercel funcionando
- [ ] Aplicación probada (subir un PDF)

¡Todo está listo! Sigue los pasos y tu app estará en línea en minutos. 🚀

