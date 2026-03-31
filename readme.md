# Task Manager Backend

Backend del proyecto integrador para la gestión de usuarios y tareas. Expone una
API REST con autenticación, dashboard administrativo, gestión de usuarios,
gestión de tareas y asignación múltiple de usuarios por tarea.

## Propósito

Este proyecto funciona como la capa backend del gestor de tareas. La API está
construida con Express y actualmente usa MySQL como capa de persistencia para:

- autenticación de usuarios
- consulta de dashboard
- CRUD de usuarios
- CRUD de tareas
- asignaciones entre tareas y usuarios

## Tecnologías

- Node.js
- Express
- MySQL
- mysql2
- dotenv

## Estructura del proyecto

```text
├── database.sql          # esquema principal y datos iniciales
├── database-user.sql     # usuario de aplicación para MySQL
├── package.json
├── readme.md
└── src/
    ├── config/           # configuración de conexión y variables de entorno
    ├── controllers/      # lógica HTTP
    ├── middlewares/      # autenticación y autorización
    ├── models/           # acceso a datos y reglas de negocio
    ├── routes/           # endpoints de la API
    └── main.js           # punto de entrada del servidor
```

## Configuración de base de datos

La base esperada por el proyecto es:

- base de datos: `tasks_manager_group3`
- usuario de aplicación: `task_manager_app`
- puerto por defecto: `3306`

### 1. Crear la base y las tablas

Desde la raíz del proyecto ejecuta:

```bash
mysql -uroot -p < database.sql
```

### 2. Crear el usuario de aplicación

```bash
mysql -uroot -p < database-user.sql
```

El script crea este usuario local:

- `DB_USER=task_manager_app`
- `DB_PASSWORD=TaskManager123!`

## Variables de entorno

Usa `.env.example` como base para crear tu archivo `.env`.

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_USER=task_manager_app
DB_PASSWORD=TaskManager123!
DB_NAME=tasks_manager_group3
DB_PORT=3306
```

## Instalación y ejecución

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea tu archivo `.env` con la configuración de MySQL.
3. Levanta el servidor:
   ```bash
   npm run dev
   ```

También puedes iniciarlo sin nodemon:

```bash
node src/main.js
```

El backend queda disponible en:

```text
http://localhost:3000
```

## Integración local con el frontend

El backend está preparado para recibir peticiones desde el frontend local en:

- `http://localhost:5173`
- `http://127.0.0.1:5173`

Se habilitan los headers necesarios para:

- `Authorization`
- `Content-Type`
- peticiones `OPTIONS`

## Endpoints disponibles

### Usuarios

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:userId`
- `PUT /api/users/:userId`
- `PATCH /api/users/:userId/status`
- `DELETE /api/users/:userId`
- `GET /api/users/:userId/tasks`

### Tareas

- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:taskId`
- `GET /api/tasks/:taskId/users`
- `PUT /api/tasks/:taskId`
- `DELETE /api/tasks/:taskId`
- `DELETE /api/tasks/:taskId/users/:userId`
- `PATCH /api/tasks/:taskId/status`
- `POST /api/tasks/:taskId/assign`
- `GET /api/tasks/filter`

### Autenticación y dashboard

- `POST /api/auth/login`
- `GET /api/dashboard`

## Credenciales de prueba

Administrador:

- `email`: `carlos.ramirez@email.com`
- `password`: `Admin12345`

Usuarios estándar:

- usa cualquiera de los correos insertados en `database.sql`
- `password`: `User12345`

## Prueba rápida del API

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"carlos.ramirez@email.com","password":"Admin12345"}'
```

### Consultar usuarios con token

```bash
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer <TOKEN>"
```

## Flujo recomendado junto al frontend

1. En este proyecto:
   ```bash
   npm install
   npm run dev
   ```
2. En `Proyecto-Integrador-Frontend`:
   ```bash
   npm install
   npm run dev
   ```
3. Abre `http://localhost:5173` e inicia sesión con las credenciales de prueba.

## Notas funcionales

- Las tareas soportan asignación múltiple mediante la tabla `task_users`.
- El estado de la tarea es global por tarea, no individual por usuario.
- Si un usuario asignado cambia el estado a `completada`, los demás verán la
  misma tarea como `completada`.

## Integrantes

1. Keiner Fabian Arismendy
2. Julian Andres Sanchez
3. Yedher David Pineda
