# Guía Rápida de Despliegue

## ✅ Estado Actual

- ✅ Git CLI instalado y configurado
- ✅ Vercel CLI instalado
- ✅ Repositorio Git inicializado
- ✅ Archivos listos para commit

## 🚀 Pasos para Desplegar

### Paso 1: Configurar Git (si aún no lo has hecho)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### Paso 2: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** (arriba a la derecha) → **"New repository"**
3. Nombre del repositorio: `pdf-merger-app` (o el que prefieras)
4. **NO** marques "Initialize with README" (ya tenemos archivos)
5. Haz clic en **"Create repository"**

### Paso 3: Conectar y Subir a GitHub

Ejecuta estos comandos (reemplaza `tu-usuario` y `tu-repo` con tus datos):

```bash
cd C:\Users\harol\Projects
git remote add origin https://github.com/tu-usuario/tu-repo.git
git branch -M main
git push -u origin main
```

**Nota**: GitHub te pedirá autenticación. Puedes usar:
- Personal Access Token (recomendado)
- GitHub CLI
- Credenciales de Windows

### Paso 4: Desplegar en Vercel

#### Opción A: Desde la Web (Más Fácil)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New Project"**
3. Conecta tu cuenta de GitHub si aún no lo has hecho
4. Selecciona el repositorio que acabas de crear
5. Vercel detectará automáticamente Next.js
6. Haz clic en **"Deploy"**
7. ¡Listo! Tu app estará en línea en 2-3 minutos

#### Opción B: Desde la Terminal

Si Vercel CLI está disponible en tu PATH:

```bash
cd C:\Users\harol\Projects
vercel
```

O usa el script batch:

```bash
deploy-vercel.bat
```

**Nota**: La primera vez te pedirá que inicies sesión en Vercel. Sigue las instrucciones.

### Paso 5: Verificar Despliegue

1. Vercel te dará una URL como: `https://tu-proyecto.vercel.app`
2. Abre la URL en tu navegador
3. Prueba subir un PDF para verificar que funciona

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel desplegará automáticamente los cambios si conectaste GitHub.

## ❓ Solución de Problemas

### Si Vercel CLI no funciona desde PowerShell:

Usa el script `deploy-vercel.bat` o ejecuta desde **cmd** (no PowerShell):

```cmd
cd C:\Users\harol\Projects
vercel
```

### Si Git pide credenciales:

1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Crea un token con permisos de `repo`
3. Úsalo como contraseña cuando Git lo pida

### Si hay errores de build:

1. Verifica que `npm run build` funcione localmente
2. Revisa los logs en el dashboard de Vercel
3. Asegúrate de que todas las dependencias estén en `package.json`

## 📝 Comandos Útiles

```bash
# Ver estado de Git
git status

# Ver commits
git log --oneline

# Ver despliegues de Vercel
vercel ls

# Ver logs de Vercel
vercel logs
```

¡Tu aplicación estará en línea muy pronto! 🎉

