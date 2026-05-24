# Frontend - Catálogo de Perfumes

Componente NPM reutilizable para catálogo y carrito de compra de perfumes.

## Instalación

```bash
npm install @perfumeria/frontend
```

## Uso

```tsx
import { CatalogoPerfumes, CarritoCompra } from '@perfumeria/frontend';

export default function App() {
  return (
    <>
      <CatalogoPerfumes apiUrl="http://localhost:3001/api" />
      <CarritoCompra />
    </>
  );
}
```

## Estructura

```
src/
├── components/
│   ├── CatalogoPerfumes.tsx      # Listado de productos
│   ├── CarritoCompra.tsx          # Carrito de compras
│   └── ProductoCard.tsx           # Tarjeta individual
├── hooks/
│   ├── useCarrito.ts              # Lógica del carrito
│   └── useProductos.ts            # Lógica de productos
├── types/
│   └── index.ts                   # Tipos TypeScript
└── index.ts                       # Punto de entrada
```

## Props principales

- `apiUrl`: URL de la API BFF
- `onCompraRealizada`: Callback después de comprar

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build:lib
```
