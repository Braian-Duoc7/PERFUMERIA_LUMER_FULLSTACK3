# Enlaces a Repositorios GitHub

Este documento contiene los enlaces a todos los repositorios versionados en GitHub para el proyecto de Perfumería.

---

## Repositorio Principal

**Proyecto**: Perfumería Fullstack - Evaluación Parcial 2

**URL**: `https://github.com/equipo-nombre/perfumeria-evaluacion-2`

**Descripción**: Repositorio principal que contiene la estructura general del proyecto, documentación y configuración.

**Contenido**:
- Documentación (Análisis de Patrones, Plan de Branching)
- Configuración general
- Scripts de deployment

---

## Repositorios de Componentes

### 1. Frontend - Componente NPM

**Nombre**: `perfumeria-frontend`

**URL**: `https://github.com/equipo-nombre/perfumeria-frontend`

**Rama principal**: `main` / `develop`

**Descripción**: Componente React empaquetado como módulo NPM reutilizable. Incluye catálogo de perfumes y carrito de compra.

**Contenido**:
```
perfumeria-frontend/
├── src/
│   ├── components/
│   │   ├── CatalogoPerfumes.tsx
│   │   ├── CarritoCompra.tsx
│   │   └── ProductoCard.tsx
│   ├── hooks/
│   │   ├── useCarrito.ts
│   │   └── useProductos.ts
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

**Tecnologías**: React 18, TypeScript, Vite

**Instalación**: 
```bash
npm install @perfumeria/frontend
```

---

### 2. Backend for Frontend (BFF)

**Nombre**: `perfumeria-bff`

**URL**: `https://github.com/equipo-nombre/perfumeria-bff`

**Rama principal**: `main` / `develop`

**Descripción**: API Gateway que orquesta la comunicación entre el frontend y los microservicios. Implementa patrones de BFF y API Gateway.

**Contenido**:
```
perfumeria-bff/
├── src/
│   ├── routes/
│   │   ├── productos.ts
│   │   └── ordenes.ts
│   └── index.ts
├── package.json
└── README.md
```

**Tecnologías**: Node.js, Express, TypeScript

**Puerto**: 3001

**Endpoints principales**:
- `GET /api/productos`
- `POST /api/ordenes`
- `GET /health`

---

### 3. Microservicio - Productos

**Nombre**: `ms-productos`

**URL**: `https://github.com/equipo-nombre/ms-productos`

**Rama principal**: `main` / `develop`

**Descripción**: Microservicio especializado en gestión del catálogo de perfumes. Implementa Repository Pattern y Service Layer.

**Contenido**:
```
ms-productos/
├── src/main/java/com/perfumeria/
│   ├── controller/
│   │   └── ProductoController.java
│   ├── service/
│   │   └── ProductoService.java
│   ├── repository/
│   │   └── ProductoRepository.java
│   ├── model/
│   │   └── Producto.java
│   └── ProductosApplication.java
├── src/main/resources/
│   └── application.yml
├── pom.xml
└── README.md
```

**Tecnologías**: Java 11, Spring Boot 3.1.0, JPA/Hibernate, H2

**Puerto**: 8001

**Endpoints**:
- `GET /api/productos` - Listar productos
- `GET /api/productos/{id}` - Obtener producto
- `POST /api/productos` - Crear producto
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

---

### 4. Microservicio - Órdenes

**Nombre**: `ms-ordenes`

**URL**: `https://github.com/equipo-nombre/ms-ordenes`

**Rama principal**: `main` / `develop`

**Descripción**: Microservicio especializado en procesamiento de órdenes y compras. Implementa estados de orden y validaciones.

**Contenido**:
```
ms-ordenes/
├── src/main/java/com/perfumeria/
│   ├── controller/
│   │   └── OrdenController.java
│   ├── service/
│   │   └── OrdenService.java
│   ├── repository/
│   │   └── OrdenRepository.java
│   ├── model/
│   │   └── Orden.java
│   └── OrdenesApplication.java
├── src/main/resources/
│   └── application.yml
├── pom.xml
└── README.md
```

**Tecnologías**: Java 11, Spring Boot 3.1.0, JPA/Hibernate, H2

**Puerto**: 8002

**Endpoints**:
- `GET /api/ordenes` - Listar órdenes
- `GET /api/ordenes/{id}` - Obtener orden
- `POST /api/ordenes` - Crear orden
- `PUT /api/ordenes/{id}` - Actualizar orden
- `DELETE /api/ordenes/{id}` - Eliminar orden

---

## Estrategia de Versionado

### Ramas

```
main (Producción)
  ├── Tags: v1.0.0, v1.1.0, etc.
  └── ← Merges desde release/

develop (Integración)
  ├── ← Merges desde feature/
  └── → Branching para release/

feature/nombre (Desarrollo)
  ├── Creadas desde develop
  └── → PR a develop

release/vX.X.X (Preparación)
  └── → PR a main y develop

hotfix/nombre (Producción)
  ├── Creadas desde main
  └── → PR a main y develop
```

### Versionado Semántico

```
v1.0.0  (Initial release)
v1.0.1  (Hotfix)
v1.1.0  (Nueva feature)
v2.0.0  (Breaking change)
```

---

## Clonación y Setup Local

### 1. Clonar todos los repositorios

```bash
# Crear carpeta de trabajo
mkdir perfumeria-project
cd perfumeria-project

# Clonar repositorios
git clone https://github.com/equipo-nombre/perfumeria-frontend.git
git clone https://github.com/equipo-nombre/perfumeria-bff.git
git clone https://github.com/equipo-nombre/ms-productos.git
git clone https://github.com/equipo-nombre/ms-ordenes.git
```

### 2. Setup Frontend

```bash
cd perfumeria-frontend
npm install
npm run dev
```

### 3. Setup BFF

```bash
cd ../perfumeria-bff
npm install
npm run dev
```

### 4. Setup Microservicio Productos

```bash
cd ../ms-productos
mvn clean install
mvn spring-boot:run
```

### 5. Setup Microservicio Órdenes

```bash
cd ../ms-ordenes
mvn clean install
mvn spring-boot:run
```

---

## Configuración de Ambiente

### Variables de Entorno (BFF)

```env
MS_PRODUCTOS_URL=http://localhost:8001
MS_ORDENES_URL=http://localhost:8002
PORT=3001
```

---

## CI/CD

Todos los repositorios cuentan con:

- ✅ GitHub Actions para CI/CD
- ✅ Tests automáticos en cada PR
- ✅ Linting
- ✅ Code coverage
- ✅ Deploy automático a producción desde `main`

---

## Contacto y Documentación Adicional

Para más información sobre el proyecto:

- Documentación técnica: Ver `Análisis_Patrones_Arquetipos.md`
- Estrategia de branching: Ver `Plan_Branching.md`
- README individual en cada repositorio

---

**Última actualización**: Mayo 2026

**Equipo**: Nombre del equipo

**Evaluación**: Parcial 2 - Fullstack
