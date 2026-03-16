/**
 * Punto de entrada de la API.
 * Exporta la app para reutilizarla en pruebas o futuras integraciones
 * y solo levanta el servidor cuando este archivo se ejecuta directamente.
 */
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import routesUsers from './routes/users.routes.js';
import routesTasks from './routes/tasks.routes.js';

export const app = express();
const PORT = 3000;

// Habilita la lectura de cuerpos JSON enviados por el cliente.
app.use(express.json());

app.use('/api', routesUsers);
app.use('/api', routesTasks);

const currentFilePath = fileURLToPath(import.meta.url);
const entryFilePath = process.argv[1] ? path.resolve(process.argv[1]) : null;

if (entryFilePath === currentFilePath) {
    app.listen(PORT, () => {
        console.log(`backend escuchando en el puerto ${PORT}`);
    });
}
