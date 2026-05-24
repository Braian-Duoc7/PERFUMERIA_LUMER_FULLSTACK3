# Análisis de Patrones de Diseño y Arquetipos

## 1. Introducción

Este documento detalla los patrones de diseño, arquetipos arquitectónicos y patrones arquitectónicos implementados en la solución de Perfumería.

---

## 2. Patrones de Diseño

### 2.1. Patrón Component (Frontend)

**Uso**: Descomposición de la interfaz en componentes reutilizables.

**Componentes implementados**:
- `CatalogoPerfumes`: Listado de productos
- `CarritoCompra`: Gestión del carrito
- `ProductoCard`: Tarjeta individual de producto

**Justificación**: Facilita mantenibilidad, reusabilidad y testabilidad. Permite que cada componente sea independiente y aislado.

### 2.2. Patrón Container-Presentational

**Uso**: Separación entre lógica y presentación.

**Implementación**:
- Custom Hooks (`useCarrito`, `useProductos`) como contenedores
- Componentes React como presentacionales

**Justificación**: Mejora la testabilidad y reutilización de la lógica de negocio.

### 2.3. Patrón Repository (Backend)

**Uso**: Abstracción del acceso a datos.

**Implementación**:
```java
public interface ProductoRepository extends JpaRepository<Producto, Long> {}
```

**Justificación**: Desacopla la lógica de negocio de la implementación de persistencia, facilita cambios en la base de datos.

### 2.4. Patrón Service Layer

**Uso**: Centralización de lógica de negocio.

**Implementación**:
```java
@Service
public class ProductoService {
    // Lógica de negocio
}
```

**Justificación**: Separa la lógica de negocio del controlador, permite reutilización y facilita testing.

---

## 3. Arquetipos Arquitectónicos

### 3.1. Backend For Frontend (BFF)

**Definición**: Patrón que introduce una capa de API específicamente diseñada para el cliente frontend.

**Características**:
- Punto de entrada único para el frontend
- Orquestación de microservicios
- Adaptación de datos específicos del cliente

**Implementación**:
```
Frontend (React) → BFF (Node.js/Express) → Microservicios (Java)
```

**Ventajas**:
- Independencia del cliente y servidor
- Facilita cambios en microservicios sin afectar frontend
- Optimización de respuestas para el cliente

### 3.2. Microservicios

**Definición**: Arquitectura basada en servicios independientes y especializados.

**Servicios implementados**:
1. **Microservicio de Productos** (MS-Productos)
   - Responsabilidad: Gestión de catálogo
   - Puerto: 8001

2. **Microservicio de Órdenes** (MS-Órdenes)
   - Responsabilidad: Procesamiento de compras
   - Puerto: 8002

**Ventajas**:
- Escalabilidad independiente
- Despliegue independiente
- Menor acoplamiento

### 3.3. API Gateway (implementado en BFF)

**Uso**: Enrutamiento centralizado de solicitudes.

**Endpoints del BFF**:
- `/api/productos` → MS-Productos
- `/api/ordenes` → MS-Órdenes

**Ventajas**:
- Punto único de acceso
- Facilita manejo de autenticación/autorización
- Permite rate limiting centralizado

---

## 4. Arquetipos Maven

### 4.1. Maven Quickstart Archetype

**Base utilizada**: `maven-archetype-quickstart`

**Estructura**:
```
src/
├── main/
│   ├── java/
│   │   └── com/perfumeria/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       └── model/
│   └── resources/
│       └── application.yml
└── test/
    └── java/
```

**Ventajas**:
- Estructura estandarizada
- Fácil generación de nuevos servicios
- Compatible con IDE

### 4.2. Spring Boot Parent Archetype

**Configuración**:
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.1.0</version>
</parent>
```

**Beneficios**:
- Gestión automática de dependencias
- Configuración por defecto optimizada
- Compatibilidad garantizada

---

## 5. Patrones Arquitectónicos

### 5.1. Arquitectura de Tres Capas

**Capas implementadas**:

1. **Capa de Presentación (Frontend)**
   - React con Hooks
   - Componentes reutilizables
   - Lógica de estado con custom hooks

2. **Capa de Lógica de Negocio (Backend)**
   - BFF (orquestación)
   - Microservicios especializados
   - Service Layer para lógica

3. **Capa de Persistencia**
   - Repository Pattern
   - H2 en memoria (desarrollo)
   - JPA/Hibernate

### 5.2. Comunicación entre Capas

```
Frontend (React)
    ↓ HTTP/REST
BFF (Node.js/Express)
    ↓ HTTP/REST
Microservicios (Spring Boot)
    ↓ JDBC
Base de datos (H2)
```

---

## 6. Justificación de Selecciones

### 6.1. Tecnologías Seleccionadas

| Componente | Tecnología | Justificación |
|-----------|-----------|----------------|
| Frontend | React + TypeScript | Componentes, reutilización, tipos estáticos |
| BFF | Node.js + Express | Ligero, rápido, fácil orquestación |
| Microservicios | Java + Spring Boot | Robusto, escalable, empresarial |
| BD | H2 | En memoria, desarrollo rápido |
| Build | Maven | Estándar Java, fácil dependencias |

### 6.2. Ventajas de la Solución

1. **Escalabilidad**: Cada servicio puede escalar independientemente
2. **Mantenibilidad**: Separación de responsabilidades clara
3. **Flexibilidad**: Fácil agregar nuevos servicios
4. **Testabilidad**: Cada capa es testeable aisladamente
5. **Reutilización**: Componentes y servicios reutilizables

---

## 7. Conclusiones

La arquitectura propuesta utiliza patrones modernos y probados que facilitan:
- El desarrollo escalable
- El mantenimiento a largo plazo
- La colaboración en equipos
- La adaptación a cambios futuros

Los arquetipos Maven estandarizados aseguran consistencia en todos los microservicios.
