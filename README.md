# PDF Merger - Unir Páginas en Una

Una aplicación web simple y funcional construida con Next.js que permite a los usuarios subir un PDF multipágina y unir todas sus páginas en una sola página larga.

## Características

- 📄 Sube archivos PDF multipágina
- 🔗 Une todas las páginas en una sola página vertical larga
- ⬇️ Descarga automática del PDF resultante
- 🎨 Interfaz moderna y fácil de usar
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

1. Haz clic en "Sube un archivo" o arrastra y suelta un PDF
2. Selecciona un archivo PDF multipágina
3. Haz clic en "Unir Páginas en Una"
4. El PDF procesado se descargará automáticamente

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

