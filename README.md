# Herramientas PDF - Unir y Comprimir

Una aplicación web completa construida con Next.js que permite a los usuarios unir páginas PDF en una sola página larga y comprimir PDFs con diferentes niveles de compresión para reducir su tamaño.

## Características

- 📄 Sube archivos PDF multipágina
- 🔗 Une todas las páginas en una sola página vertical larga
- 🗜️ Comprime PDFs con 5 niveles de compresión (Baja, Media, Alta, Máxima, Extrema)
- 🚀 Compresión Extrema: Hipermegacompresión que garantiza PDFs siempre menores a 2MB
- 📊 Vista previa del tamaño resultante antes de comprimir
- ⬇️ Descarga automática del PDF resultante
- 🎨 Interfaz moderna y fácil de usar con pestañas
- ⚡ Procesamiento rápido del lado del cliente

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos modernos
- **pdf-lib** - Manipulación de PDFs

## Instalación

### Opción 1: Scripts batch (Windows - Recomendado)

1. **Instalación**: Haz doble clic en `install.bat` o ejecútalo desde la terminal
2. **Ejecución**: Haz doble clic en `start.bat` o ejecuta `npm run dev`
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

### Opción 2: Terminal manual

1. Instala las dependencias:

```bash
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**Nota para Windows**: Si tienes problemas con PowerShell, usa `cmd` o ejecuta:
```powershell
powershell -ExecutionPolicy Bypass -Command "npm install"
```

## Uso

### Unir Páginas PDF

1. Selecciona la pestaña "Unir Páginas"
2. Haz clic en "Sube un archivo" o arrastra y suelta un PDF
3. Selecciona un archivo PDF multipágina
4. Haz clic en "Unir Páginas en Una"
5. El PDF procesado se descargará automáticamente

### Comprimir PDF

1. Selecciona la pestaña "Comprimir PDF"
2. Sube un archivo PDF
3. Elige el nivel de compresión:
   - **Baja**: Compresión ligera, mejor calidad
   - **Media**: Balance entre calidad y tamaño
   - **Alta**: Compresión fuerte, tamaño reducido
   - **Máxima**: Máxima compresión, menor tamaño
   - **Extrema**: Hipermegacompresión que garantiza siempre < 2MB (itera automáticamente hasta alcanzar el objetivo)
4. Ve la estimación del tamaño resultante y el porcentaje de reducción
5. Haz clic en "Comprimir PDF"
6. El PDF comprimido se descargará automáticamente

**Nota sobre Compresión Extrema**: Este nivel itera automáticamente reduciendo la escala hasta que el PDF sea menor a 2MB, garantizando el tamaño objetivo.

## Construcción

Para crear una versión de producción:

```bash
npm run build
npm start
```

## Despliegue en Vercel

Esta aplicación está lista para desplegarse en Vercel. Tienes varias opciones:

### Opción Rápida (CLI)

1. Instala Vercel CLI: `npm install -g vercel`
2. Ejecuta: `vercel` (para preview) o `vercel --prod` (para producción)

### Opción GitHub (Recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Vercel detectará automáticamente Next.js y desplegará

Para más detalles, consulta [DEPLOY.md](./DEPLOY.md)

## Notas

- El tamaño máximo recomendado del archivo es de 10MB
- El procesamiento se realiza completamente en el navegador (sin servidor)
- Compatible con documentos legales, informes largos y otros PDFs multipágina
- ✅ Listo para producción en Vercel

