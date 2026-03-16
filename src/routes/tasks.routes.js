import express from 'express';
import {
    assignUsersToTask,
    createTask,
    deleteTask,
    filterTasks,
    getAllTasks,
    getTaskById,
    updateTask,
    updateTaskStatus
} from '../controllers/index.controller.js';

/**
 * Router del modulo de tareas.
 * Expone CRUD, filtrado, asignacion multiple y cambio de progreso.
 */
const routesTasks = express.Router();

routesTasks.get('/tasks/filter', filterTasks);
routesTasks.post('/tasks/:taskId/assign', assignUsersToTask);
routesTasks.patch('/tasks/:taskId/status', updateTaskStatus);
routesTasks.post('/tasks', createTask);
routesTasks.get('/tasks', getAllTasks);
routesTasks.get('/tasks/:taskId', getTaskById);
routesTasks.put('/tasks/:taskId', updateTask);
routesTasks.delete('/tasks/:taskId', deleteTask);

export default routesTasks;
