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

// Rutas del modulo de tareas
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
