// Barrel de controladores
import { login } from './auth/login.controller.js';
import { getDashboard } from './dashboard/get.controller.js';
import { create } from './users/create.controller.js';
import { getAll } from './users/findAll.controller.js';
import { getById } from './users/findById.controller.js';
import { getUserTasks } from './users/findTasks.controller.js';
import { update } from './users/update.controller.js';
import { updateStatus } from './users/updateStatus.controller.js';
import { deleteUser } from './users/delete.controller.js';
import { createTask } from './tasks/create.controller.js';
import { getAllTasks } from './tasks/findAll.controller.js';
import { getTaskById } from './tasks/findById.controller.js';
import { filterTasks } from './tasks/filter.controller.js';
import { assignUsersToTask } from './tasks/assign.controller.js';
import { getTaskUsers } from './tasks/findUsers.controller.js';
import { removeUserFromTask } from './tasks/removeUser.controller.js';
import { updateTask } from './tasks/update.controller.js';
import { updateTaskStatus } from './tasks/updateStatus.controller.js';
import { deleteTask } from './tasks/delete.controller.js';

export {
    login,
    getDashboard,
    create,
    getAll,
    getById,
    getUserTasks,
    update,
    updateStatus,
    deleteUser,
    createTask,
    getAllTasks,
    getTaskById,
    filterTasks,
    assignUsersToTask,
    getTaskUsers,
    removeUserFromTask,
    updateTask,
    updateTaskStatus,
    deleteTask
};
