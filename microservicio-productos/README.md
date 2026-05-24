# Microservicio de Productos

Microservicio especializado para la gestión del catálogo de perfumes.

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

El servicio estará disponible en `http://localhost:8001`

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Listar todos los productos |
| GET | `/api/productos/{id}` | Obtener producto por ID |
| POST | `/api/productos` | Crear nuevo producto |
| PUT | `/api/productos/{id}` | Actualizar producto |
| DELETE | `/api/productos/{id}` | Eliminar producto |

## Ejemplo de solicitud POST

```json
{
  "nombre": "Parfum Éxito",
  "marca": "Marca Premium",
  "precio": 89.99,
  "descripcion": "Perfume premium para hombres",
  "imagen": "url-imagen.jpg"
}
```

## Base de datos

- H2 en memoria (desarrollo)
- Acceso a consola H2: `http://localhost:8001/h2-console`
