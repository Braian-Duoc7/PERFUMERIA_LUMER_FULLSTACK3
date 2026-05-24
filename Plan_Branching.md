# Plan de Estrategia de Branching

## 1. Introducción

Este documento detalla la estrategia de branching utilizada para el versionado y colaboración en el proyecto de Perfumería. Se implementa **Git Flow**, un modelo escalable y robusto para equipos de desarrollo.

---

## 2. Modelo de Branching: Git Flow

### 2.1. Ramas Principales

#### 2.1.1. Branch `main`

**Propósito**: Producción

**Características**:
- Contiene código listo para producción
- Cada commit en `main` es una versión
- Protegida: requiere Pull Request
- Tags: versionado semántico (v1.0.0, v1.1.0, etc.)

**Reglas**:
- Solo se mergea desde `release/` o `hotfix/`
- No se commitea directamente
- Requiere Code Review

#### 2.1.2. Branch `develop`

**Propósito**: Integración y desarrollo

**Características**:
- Rama de integración principal
- Contiene las últimas características
- Base para nuevas features
- Ambiente de staging/preproducción

**Reglas**:
- Punto de partida para `feature/` branches
- Recibe merges de `feature/` vía Pull Request
- Se mergea a `release/` cuando está lista

### 2.2. Ramas de Apoyo

#### 2.2.1. Ramas de Feature (`feature/*`)

**Nomenclatura**:
```
feature/nombre-descriptivo
feature/agregar-carrito-compra
feature/optimizar-productos
feature/autenticacion-usuarios
```

**Ciclo de vida**:
1. Se crea desde `develop`
2. Desarrollo local
3. Push a repositorio
4. Pull Request a `develop`
5. Code Review
6. Merge a `develop`
7. Eliminar branch local y remoto

**Ejemplo**:
```bash
# Crear feature
git checkout -b feature/agregar-carrito develop

# Trabajar en la feature
git add .
git commit -m "feat: implementar carrito de compra"

# Push
git push origin feature/agregar-carrito

# Pull Request en GitHub (develop ← feature/agregar-carrito)
# Después de merge: git branch -d feature/agregar-carrito
```

#### 2.2.2. Ramas de Release (`release/*`)

**Nomenclatura**:
```
release/v1.0.0
release/v1.1.0
```

**Propósito**: Preparar una nueva versión de producción

**Ciclo de vida**:
1. Se crea desde `develop`
2. Se hacen ajustes menores y fixes
3. Se actualiza versionado
4. Se mergea a `main` y `develop`

**Ejemplo**:
```bash
git checkout -b release/v1.0.0 develop
# Ajustes y fixes menores
git commit -m "chore: bump version to 1.0.0"
git push origin release/v1.0.0
# Pull Request en GitHub
```

#### 2.2.3. Ramas de Hotfix (`hotfix/*`)

**Nomenclatura**:
```
hotfix/parche-critico
hotfix/corregir-carrito
```

**Propósito**: Corregir bugs críticos en producción

**Ciclo de vida**:
1. Se crea desde `main`
2. Fix rápido
3. Se mergea a `main` y `develop`
4. Se elimina la rama

**Ejemplo**:
```bash
git checkout -b hotfix/corregir-error-carrito main
# Fix crítico
git commit -m "fix: corregir error en cálculo de total"
git push origin hotfix/corregir-error-carrito
# Pull Request a main y develop
```

---

## 3. Estructura de Repositorios

### 3.1. Repositorio Principal
```
perfumeria-main/
├── frontend/ (rama: feature/frontend, develop, main)
├── bff/ (rama: feature/bff, develop, main)
└── .gitignore
```

### 3.2. Repositorios de Microservicios

#### Repositorio: `ms-productos`
```
ms-productos/
├── src/main/java/com/perfumeria/
├── pom.xml
├── README.md
└── Branches:
    - main (v1.0.0, v1.1.0)
    - develop
    - feature/agregar-endpoints
    - release/v1.0.0
```

#### Repositorio: `ms-ordenes`
```
ms-ordenes/
├── src/main/java/com/perfumeria/
├── pom.xml
├── README.md
└── Branches:
    - main (v1.0.0, v1.1.0)
    - develop
    - feature/procesar-pagos
    - release/v1.0.0
```

---

## 4. Convenciones de Commits

### 4.1. Formato de Mensaje

```
<tipo>(<scope>): <asunto>

<cuerpo>

<footer>
```

### 4.2. Tipos de Commits

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (sin código)
- `refactor`: Refactorización de código
- `perf`: Mejora de rendimiento
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### 4.3. Ejemplos

```bash
# Nuevo feature
git commit -m "feat(carrito): agregar funcionalidad de descuentos"

# Bug fix
git commit -m "fix(productos): corregir filtro por marca"

# Documentación
git commit -m "docs(README): actualizar instrucciones de instalación"

# Refactoring
git commit -m "refactor(service): simplificar lógica de órdenes"
```

---

## 5. Flujo de Trabajo Diario

### 5.1. Inicio de Feature

```bash
# Actualizar develop
git checkout develop
git pull origin develop

# Crear feature branch
git checkout -b feature/nombre-descriptivo develop
```

### 5.2. Durante el Desarrollo

```bash
# Commits frecuentes
git add .
git commit -m "feat(scope): descripción del cambio"

# Push a remoto
git push origin feature/nombre-descriptivo
```

### 5.3. Completar Feature

```bash
# Pull Request en GitHub
# 1. Ir a GitHub
# 2. Crear PR de feature/ a develop
# 3. Agregar descripción
# 4. Request review

# Después del merge automático
git checkout develop
git pull origin develop
git branch -d feature/nombre-descriptivo
git push origin --delete feature/nombre-descriptivo
```

---

## 6. Protecciones de Rama

### 6.1. Reglas para `main`

- ✅ Requiere Pull Request
- ✅ Requiere 1 Code Review
- ✅ Requiere estado de checks pasados
- ✅ No permitir fuerza push
- ✅ Proteger contra eliminación

### 6.2. Reglas para `develop`

- ✅ Requiere Pull Request
- ✅ Requiere 1 Code Review
- ✅ Requiere estado de checks pasados

### 6.3. Reglas para `feature/*`

- ❌ No protegida
- Desarrollo libre

---

## 7. Integración Continua (CI/CD)

### 7.1. Triggers Automáticos

**En cada Push a feature/**:
- Linting
- Tests unitarios
- Build

**En cada PR a develop**:
- Todas las checks anteriores
- Code coverage

**En main**:
- Despliegue a producción automático
- Post a Slack

---

## 8. Versionado Semántico

### 8.1. Formato

```
MAJOR.MINOR.PATCH
v1.0.0
```

### 8.2. Incrementos

- **MAJOR**: Cambios incompatibles
- **MINOR**: Nuevas características compatibles
- **PATCH**: Bug fixes

### 8.3. Ejemplos

```
v1.0.0 → v1.1.0  (feature nueva: agregar filtros)
v1.0.0 → v1.0.1  (bug fix: corregir carrito)
v1.0.0 → v2.0.0  (cambio mayor: nueva BD)
```

---

## 9. Roles y Responsabilidades

| Rol | Responsabilidades |
|-----|-------------------|
| Developer | Crear feature branches, commits, PRs |
| Code Reviewer | Review de PRs, aprobación |
| Tech Lead | Merge a develop, crear releases |
| DevOps | Deploy a producción, hotfixes |

---

## 10. Checklist para Pull Request

Antes de solicitar review:

- [ ] Código cumple estándares
- [ ] Tests pasan localmente
- [ ] Sin conflictos con develop
- [ ] Commits con mensajes claros
- [ ] README actualizado si es necesario
- [ ] Sin código debug o comentarios

---

## 11. Conclusión

Este plan de branching asegura:
- ✅ Flujo organizado de desarrollo
- ✅ Integración continua de cambios
- ✅ Trazabilidad de cambios
- ✅ Fácil rollback en caso necesario
- ✅ Colaboración efectiva en equipo
