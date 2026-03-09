# Task Manager Backend

Proyecto de prueba para **GFPI-F-135 V04** que establece una API básica de gestión de usuarios y tareas.

## 📌 Propósito
Este repositorio contiene un servidor Express inicial con rutas de ejemplo que servirán como base para un gestor de tareas. La idea es validar la arquitectura y la estructura del proyecto sin lógica de negocio compleja ni base de datos.

## 🗂️ Estructura del proyecto
```
├── db.json                 # archivo de datos simulado (aún vacío)
├── package.json
├── readme.md               # este documento
└── src/
    ├── main.js             # punto de entrada de la aplicación
    └── routes/
        ├── users.routes.js # rutas de usuarios (GET, POST)
        └── tasks.routes.js # rutas de tareas (GET, POST)
```

> Las rutas actualmente devuelven mensajes simples en español para indicar su propósito.

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