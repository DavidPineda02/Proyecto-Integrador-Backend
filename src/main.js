// Punto de entrada de la API.
// Se exporta app para poder reutilizarla en pruebas.
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import routesAuth from './routes/auth.routes.js';
import routesDashboard from './routes/dashboard.routes.js';
import routesUsers from './routes/users.routes.js';
import routesTasks from './routes/tasks.routes.js';

export const app = express();
const PORT = 3000;
const ALLOWED_ORIGINS = new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173'
]);

app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;

    if (requestOrigin && ALLOWED_ORIGINS.has(requestOrigin)) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
        res.setHeader('Vary', 'Origin');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    next();
});

// Middleware para parsear bodies JSON
app.use(express.json());

app.use('/api', routesAuth);
app.use('/api', routesDashboard);
app.use('/api', routesUsers);
app.use('/api', routesTasks);

const currentFilePath = fileURLToPath(import.meta.url);
const entryFilePath = process.argv[1] ? path.resolve(process.argv[1]) : null;

if (entryFilePath === currentFilePath) {
    app.listen(PORT, () => {
        console.log(`backend escuchando en el puerto ${PORT}`);
    });
}
