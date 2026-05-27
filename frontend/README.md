# Lumen Parfums - Frontend Component Library

Este repositorio contiene los componentes frontend para la plataforma de perfumería de lujo **Lumen Parfums**. Desarrollado con React 18, TypeScript y Tailwind CSS, siguiendo el patrón de componentes reutilizables NPM.

## Requisitos

- Node.js 18+
- NPM 9+

## Estructura de Carpetas

- `src/components`: Componentes visuales (Navbar, Catalogo, Carrito, etc.)
- `src/hooks`: Lógica de estado y consumo de API.
- `src/types`: Definiciones de interfaces TypeScript.
- `src/styles`: Configuraciones de Tailwind y CSS global.

## Instalación

```bash
npm install
```

## Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Uso como Librería

Para empaquetar los componentes como una librería NPM:

```bash
npm run build:lib
```

Esto generará la carpeta `dist/` con los archivos necesarios para ser publicados o consumidos por otros proyectos.

## Integración con BFF

Por defecto, la aplicación apunta al BFF en `http://localhost:3001/api`. Asegúrate de tener el BFF en ejecución para que el catálogo de productos se cargue correctamente.
