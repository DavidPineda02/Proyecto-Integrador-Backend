import express from 'express';
import { login } from '../controllers/index.controller.js';

// Rutas del modulo de autenticacion
const routesAuth = express.Router();

routesAuth.post('/auth/login', login);

export default routesAuth;
