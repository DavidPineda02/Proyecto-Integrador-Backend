# Task Manager Backend

Proyecto de prueba para **GFPI-F-135 V04** que establece una API básica de gestión de usuarios y tareas.

## 📌 Propósito
Este repositorio contiene un servidor Express inicial con rutas de ejemplo que servirán como base para un gestor de tareas. La idea es validar la arquitectura y la estructura del proyecto sin lógica de negocio compleja ni base de datos.

## 🗂️ Estructura del proyecto
```
├── package.json
├── readme.md               # este documento
└── src/
    ├── data/
    │   └── store.js        # datos iniciales en memoria con arrays y objetos
    ├── main.js             # punto de entrada de la aplicación
    ├── controllers/        # lógica HTTP por módulo
    ├── models/             # acceso a datos en memoria y reglas de negocio
    └── routes/             # definición de endpoints
```

> Los datos simulados del proyecto se cargan desde `src/data/store.js`, sin depender de `db.json`.

## 🔌 Endpoints disponibles

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
- `PUT /api/tasks/:taskId`
- `DELETE /api/tasks/:taskId`
- `PATCH /api/tasks/:taskId/status`
- `POST /api/tasks/:taskId/assign`
- `GET /api/tasks/filter`

## 🔁 Relación usuarios-tareas

Las tareas ahora soportan asignación múltiple mediante el campo `assignedUserIds`, lo que permite que una misma tarea pertenezca a varios usuarios al mismo tiempo.

## ⚙️ Cómo ejecutar el servidor
1. Asegúrate de tener Node.js instalado (versión 18+ recomendada).
2. Desde el directorio raíz del proyecto, instala dependencias si es necesario:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   node src/main.js
   ```
4. El servidor escuchará en el puerto **3000**. Prueba los endpoints con tu navegador o `curl`:
   ```bash
   curl http://localhost:3000/users
   curl -X POST http://localhost:3000/tasks
   ```

---

## Integrantes

1. Keiner Fabian Arismendy
2. Julian Andres Sanchez
3. Yedher David Pineda
