import express from 'express';
import { getDashboard } from '../controllers/index.controller.js';
import { authenticateUser, authorizeRoles } from '../middlewares/auth.middleware.js';

// Rutas del dashboard administrativo
const routesDashboard = express.Router();

routesDashboard.get('/dashboard', authenticateUser, authorizeRoles('admin'), getDashboard);

export default routesDashboard;
