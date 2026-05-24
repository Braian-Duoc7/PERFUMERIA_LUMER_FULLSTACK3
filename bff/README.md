# Backend for Frontend (BFF) - Perfumería

Orquestador que actúa como punto de entrada único para el frontend, consumiendo microservicios especializados.

## Patrones implementados

- **API Gateway**: Enrutamiento centralizado
- **BFF Pattern**: Optimización específica para cliente frontend
- **Circuit Breaker Ready**: Estructura preparada para resiliencia

## Instalación

```bash
npm install
```

## Variables de entorno

```
MS_PRODUCTOS_URL=http://localhost:8001
MS_ORDENES_URL=http://localhost:8002
PORT=3001
```

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm run build
npm start
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Listar productos |
| GET | `/api/productos/:id` | Obtener producto |
| POST | `/api/ordenes` | Crear orden |
| GET | `/api/ordenes` | Listar órdenes |
| GET | `/health` | Health check |

## Arquitectura

```
BFF (Puerto 3001)
├── Microservicio Productos (8001)
└── Microservicio Órdenes (8002)
```
