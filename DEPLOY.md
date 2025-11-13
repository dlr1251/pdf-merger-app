# Guía de Despliegue en Vercel

Esta aplicación está lista para desplegarse en Vercel. Sigue estos pasos:

## Opción 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Subir el código a GitHub

1. Crea un nuevo repositorio en GitHub
2. Inicializa git en tu proyecto (si no lo has hecho):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Conecta con tu repositorio de GitHub:
   ```bash
   git remote add origin https://github.com/tu-usuario/tu-repositorio.git
   git branch -M main
   git push -u origin main
   ```

### Paso 2: Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión (o crea una cuenta)
2. Haz clic en **"Add New Project"** o **"Import Project"**
3. Conecta tu cuenta de GitHub si aún no lo has hecho
4. Selecciona el repositorio que acabas de crear
5. Vercel detectará automáticamente que es un proyecto Next.js
6. Haz clic en **"Deploy"**
7. ¡Listo! Tu aplicación estará disponible en unos minutos

## Opción 2: Despliegue desde la CLI de Vercel

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Desplegar

1. En el directorio del proyecto, ejecuta:
   ```bash
   vercel
   ```
2. Sigue las instrucciones en la terminal:
   - ¿Quieres configurar y desplegar? → **Y**
   - ¿Qué directorio contiene tu código? → **.** (presiona Enter)
   - ¿Quieres sobrescribir la configuración? → **N** (a menos que quieras cambiar algo)
3. Para producción, ejecuta:
   ```bash
   vercel --prod
   ```

## Opción 3: Despliegue desde la interfaz web (sin GitHub)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New Project"**
3. Selecciona **"Upload"** o **"Import"**
4. Arrastra la carpeta del proyecto o sube los archivos
5. Vercel detectará automáticamente Next.js
6. Haz clic en **"Deploy"**

## Verificación Post-Despliegue

Después del despliegue:

1. ✅ Verifica que la aplicación carga correctamente
2. ✅ Prueba subir un PDF pequeño para verificar la funcionalidad
3. ✅ Revisa los logs en el dashboard de Vercel si hay problemas

## Configuración Adicional (Opcional)

### Variables de Entorno

Si necesitas agregar variables de entorno en el futuro:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las variables necesarias

### Dominio Personalizado

1. Ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

## Notas Importantes

- ✅ La aplicación procesa PDFs completamente en el cliente, por lo que no hay límites de tamaño del servidor
- ✅ No se requieren variables de entorno para esta aplicación
- ✅ Vercel detecta automáticamente Next.js y configura todo correctamente
- ✅ El build se ejecuta automáticamente en cada push a la rama principal (si usas GitHub)

## Solución de Problemas

### Error de Build

Si el build falla:
1. Verifica que `npm run build` funcione localmente
2. Revisa los logs en el dashboard de Vercel
3. Asegúrate de que todas las dependencias estén en `package.json`

### Error en Runtime

1. Revisa los logs de función en Vercel
2. Verifica la consola del navegador para errores del cliente
3. Asegúrate de que no haya problemas con CORS (no debería haberlos)

## Comandos Útiles

```bash
# Ver el estado del despliegue
vercel ls

# Ver los logs
vercel logs

# Eliminar un despliegue
vercel remove
```

¡Tu aplicación estará en línea en minutos! 🚀

