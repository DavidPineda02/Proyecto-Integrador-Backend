import express from 'express';
import {
    assignUsersToTask,
    createTask,
    deleteTask,
    filterTasks,
    getAllTasks,
    getTaskById,
    getTaskUsers,
    removeUserFromTask,
    updateTask,
    updateTaskStatus
} from '../controllers/index.controller.js';
import { authenticateUser, authorizeRoles } from '../middlewares/auth.middleware.js';

// Rutas del modulo de tareas
const routesTasks = express.Router();

routesTasks.get('/tasks/filter', authenticateUser, authorizeRoles('admin'), filterTasks);
routesTasks.post('/tasks/:taskId/assign', authenticateUser, authorizeRoles('admin'), assignUsersToTask);
routesTasks.get('/tasks/:taskId/users', authenticateUser, authorizeRoles('admin'), getTaskUsers);
routesTasks.delete('/tasks/:taskId/users/:userId', authenticateUser, authorizeRoles('admin'), removeUserFromTask);
routesTasks.patch('/tasks/:taskId/status', authenticateUser, updateTaskStatus);
routesTasks.post('/tasks', authenticateUser, authorizeRoles('admin'), createTask);
routesTasks.get('/tasks', authenticateUser, authorizeRoles('admin'), getAllTasks);
routesTasks.get('/tasks/:taskId', authenticateUser, getTaskById);
routesTasks.put('/tasks/:taskId', authenticateUser, authorizeRoles('admin'), updateTask);
routesTasks.delete('/tasks/:taskId', authenticateUser, authorizeRoles('admin'), deleteTask);

export default routesTasks;
