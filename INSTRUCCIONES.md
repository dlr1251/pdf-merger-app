# Instrucciones de Instalación y Ejecución

## Opción 1: Usar los scripts batch (Recomendado para Windows)

### Instalación:
1. Haz doble clic en `install.bat` o ejecútalo desde la terminal
2. Espera a que se instalen todas las dependencias

### Ejecución:
1. Haz doble clic en `start.bat` o ejecuta `npm run dev` desde la terminal
2. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## Opción 2: Usar la terminal manualmente

### Instalación:
```bash
cd C:\Users\harol\Projects
npm install
```

### Ejecución:
```bash
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Solución de problemas

### Si tienes problemas con PowerShell:
1. Abre **cmd** (Símbolo del sistema) en lugar de PowerShell
2. O cambia la política de ejecución temporalmente:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### Si las dependencias no se instalan:
1. Elimina la carpeta `node_modules` si existe
2. Elimina el archivo `package-lock.json` si existe
3. Ejecuta `npm install` nuevamente

## Comandos disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

