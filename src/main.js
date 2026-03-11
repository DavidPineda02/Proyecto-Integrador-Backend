import express from 'express';
import routesUsers from './routes/users.routes.js';

const app = express();
const PORT = 3000;

// Middleware para parsear bodies JSON
app.use(express.json());

app.use('/api', routesUsers)

app.listen(PORT, () => {
  console.log(`backend escuchando en el puerto ${PORT}`)
})