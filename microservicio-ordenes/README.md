# Microservicio de Órdenes

Microservicio especializado para la gestión de órdenes y procesamiento de compras.

## Patrones implementados

- **Repository Pattern**: Abstracción de acceso a datos
- **Service Layer**: Lógica de negocio centralizada
- **REST API**: Interfaz estándar HTTP

## Requisitos

- Java 11+
- Maven 3.6+

## Instalación

```bash
mvn clean install
```

## Ejecución

```bash
mvn spring-boot:run
```

El servicio estará disponible en `http://localhost:8002`

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/ordenes` | Listar todas las órdenes |
| GET | `/api/ordenes/{id}` | Obtener orden por ID |
| POST | `/api/ordenes` | Crear nueva orden |
| PUT | `/api/ordenes/{id}` | Actualizar orden |
| DELETE | `/api/ordenes/{id}` | Eliminar orden |

## Ejemplo de solicitud POST

```json
{
  "items": "[{\"productoId\": 1, \"cantidad\": 2}]",
  "total": 179.98,
  "estado": "PENDIENTE"
}
```

## Base de datos

- H2 en memoria (desarrollo)
- Acceso a consola H2: `http://localhost:8002/h2-console`

## Estados de orden

- PENDIENTE: Orden creada, en espera de procesamiento
- CONFIRMADA: Orden confirmada
- ENVIADA: Orden en tránsito
- ENTREGADA: Orden entregada
- CANCELADA: Orden cancelada
