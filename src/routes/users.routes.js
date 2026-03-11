import express from 'express'
import { create, getAll, getById, update, updateStatus, deleteUser } from '../controllers/users.controllers.js';

const routesUsers = express.Router()

// Endpoints CRUD para usuarios
routesUsers.post('/users', create);
routesUsers.get('/users', getAll);
routesUsers.get('/users/:id', getById);
routesUsers.put('/users/:id', update);
routesUsers.patch('/users/:id/status', updateStatus);
routesUsers.delete('/users/:id', deleteUser);

export default routesUsers;