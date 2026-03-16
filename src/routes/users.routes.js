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

/**
 * Router del modulo de usuarios.
 * Agrupa las rutas administrativas y la vista personal de tareas.
 */
const routesUsers = express.Router()

// Endpoints CRUD para usuarios
routesUsers.post('/users', create);
routesUsers.get('/users', getAll);
routesUsers.get('/users/:userId', getById);
routesUsers.get('/users/:userId/tasks', getUserTasks);
routesUsers.put('/users/:userId', update);
routesUsers.patch('/users/:userId/status', updateStatus);
routesUsers.delete('/users/:userId', deleteUser);

export default routesUsers;
