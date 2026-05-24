# Estructura del Proyecto - Perfumería Fullstack

## Árbol de directorios completo

```
Evaluación 2 Fullstack 3/
│
├── frontend/                          # Componente NPM Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   │   ├── useCarrito.ts
│   │   │   └── useProductos.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── package.json
│   └── README.md
│
├── bff/                               # Backend for Frontend
│   ├── src/
│   │   └── index.ts                   # Orquestador principal
│   ├── package.json
│   └── README.md
│
├── microservicio-productos/           # MS Productos (Java/Spring Boot)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/perfumeria/
│   │       │   ├── ProductosApplication.java
│   │       │   ├── controller/ProductoController.java
│   │       │   ├── service/ProductoService.java
│   │       │   ├── repository/ProductoRepository.java
│   │       │   └── model/Producto.java
│   │       └── resources/
│   │           └── application.yml
│   ├── pom.xml
│   └── README.md
│
├── microservicio-ordenes/             # MS Órdenes (Java/Spring Boot)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/perfumeria/
│   │       │   ├── OrdenesApplication.java
│   │       │   ├── controller/OrdenController.java
│   │       │   ├── service/OrdenService.java
│   │       │   ├── repository/OrdenRepository.java
│   │       │   └── model/Orden.java
│   │       └── resources/
│   │           └── application.yml
│   ├── pom.xml
│   └── README.md
│
├── Análisis_Patrones_Arquetipos.md    # Documentación patrones
├── Plan_Branching.md                  # Documentación versionado
├── REPOSITORIOS.md                    # Enlaces a GitHub
├── ESTRUCTURA_PROYECTO.md             # Este archivo
├── .gitignore
└── README_GENERAL.md                  # README general del proyecto
```

## Detalles por componente

### 1. Frontend (`frontend/`)

**Tecnología**: React 18 + TypeScript + Vite

**Responsabilidades**:
- Interfaz de usuario
- Catálogo de productos
- Carrito de compra
- Consumo de API BFF

**Estructura interna**:
```
src/
├── components/          # Componentes React reutilizables
├── hooks/              # Custom hooks (lógica)
├── types/              # Tipos TypeScript
└── index.ts            # Punto de entrada
```

### 2. BFF (`bff/`)

**Tecnología**: Node.js 18+ + Express + TypeScript

**Responsabilidades**:
- API Gateway
- Orquestación de microservicios
- Adaptación de datos para cliente
- CORS y autenticación

**Puertos**:
- Frontend: Puerto 5173 (Vite)
- BFF: Puerto 3001

**Rutas principales**:
```
GET  /api/productos        → MS-Productos
GET  /api/productos/:id    → MS-Productos
POST /api/ordenes          → MS-Órdenes
GET  /api/ordenes          → MS-Órdenes
GET  /health               → Health check
```

### 3. Microservicio Productos (`microservicio-productos/`)

**Tecnología**: Java 11 + Spring Boot 3.1 + JPA + H2

**Responsabilidades**:
- CRUD de productos
- Gestión de catálogo
- Consultas de productos

**Patrón de código**:
```
controller/  → service/  → repository/  → BD
```

**Puerto**: 8001

### 4. Microservicio Órdenes (`microservicio-ordenes/`)

**Tecnología**: Java 11 + Spring Boot 3.1 + JPA + H2

**Responsabilidades**:
- CRUD de órdenes
- Procesamiento de compras
- Estados de orden

**Patrón de código**:
```
controller/  → service/  → repository/  → BD
```

**Puerto**: 8002

## Flujo de datos

```
┌─────────────────────┐
│   Frontend React    │
│  (Catálogo, Carrito)│
└──────────┬──────────┘
           │ HTTP REST
           ▼
┌─────────────────────┐
│    BFF Express      │
│  (Orquestador)      │
└──────────┬──────────┘
           │ HTTP REST
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────┐  ┌──────────┐
│ MS Prod │  │ MS Orden │
│ (Java)  │  │ (Java)   │
└────┬────┘  └────┬─────┘
     │           │
     ▼           ▼
┌─────────────────────┐
│   H2 In-Memory BD   │
└─────────────────────┘
```

## Puertos utilizados

| Componente | Puerto | Estado |
|-----------|--------|--------|
| Frontend (Vite) | 5173 | Desarrollo |
| BFF (Express) | 3001 | Producción |
| MS Productos | 8001 | Producción |
| MS Órdenes | 8002 | Producción |
| H2 Console | 8001/h2-console | Debug |

## Variables de entorno

### BFF (.env)
```
MS_PRODUCTOS_URL=http://localhost:8001
MS_ORDENES_URL=http://localhost:8002
PORT=3001
```

### MS Productos (application.yml)
```yaml
server.port: 8001
```

### MS Órdenes (application.yml)
```yaml
server.port: 8002
```

## Patrones implementados

### Arquitectónicos
- Backend For Frontend (BFF)
- Microservicios
- API Gateway

### De Diseño
- Component Pattern (React)
- Container-Presentational (Hooks)
- Repository Pattern (Java)
- Service Layer

### Maven
- Maven Quickstart
- Spring Boot Parent

## Dependencias principales

### Frontend
- react@^18.2.0
- typescript@^5.0.0

### BFF
- express@^4.18.2
- axios@^1.6.0
- cors@^2.8.5

### Microservicios
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- h2 (database)

## Testing

**Frontend**:
```bash
npm test
```

**BFF**:
```bash
npm test
```

**Microservicios**:
```bash
mvn test
```

## Build y Deploy

### Frontend
```bash
npm run build
# Genera: dist/
```

### BFF
```bash
npm run build
npm start
```

### Microservicios
```bash
mvn clean package
mvn spring-boot:run
```

## Documentación complementaria

- `Análisis_Patrones_Arquetipos.md`: Patrones y arquetipos utilizados
- `Plan_Branching.md`: Estrategia de versionado Git
- `REPOSITORIOS.md`: Enlaces y descripción de repos GitHub
- `README.md` en cada componente: Instrucciones específicas
