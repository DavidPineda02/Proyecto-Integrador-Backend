import express from 'express'
import {
    create,
    getAll,
    getById,
    getUserTasks,
    update,
    updateStatus,
    deleteUser
} from '../controllers/index.controller.js';
import { authenticateUser, authorizeRoles } from '../middlewares/auth.middleware.js';

// Rutas del modulo de usuarios
const routesUsers = express.Router()

// Endpoints CRUD para usuarios
routesUsers.post('/users', authenticateUser, authorizeRoles('admin'), create);
routesUsers.get('/users', authenticateUser, authorizeRoles('admin'), getAll);
routesUsers.get('/users/:userId', authenticateUser, authorizeRoles('admin'), getById);
routesUsers.get('/users/:userId/tasks', authenticateUser, getUserTasks);
routesUsers.put('/users/:userId', authenticateUser, authorizeRoles('admin'), update);
routesUsers.patch('/users/:userId/status', authenticateUser, authorizeRoles('admin'), updateStatus);
routesUsers.delete('/users/:userId', authenticateUser, authorizeRoles('admin'), deleteUser);

export default routesUsers;
