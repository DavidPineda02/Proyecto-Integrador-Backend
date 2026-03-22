// Barrel de modelos
import { loginModel, verifyTokenModel } from './auth/login.model.js';
import { getDashboardModel } from './dashboard/get.model.js';
import { createModel } from './users/create.model.js';
import { findAllModel } from './users/findAll.model.js';
import { findByIdModel } from './users/findById.model.js';
import { updateModel } from './users/update.model.js';
import { updateStatusModel } from './users/updateStatus.model.js';
import { deleteModel } from './users/delete.model.js';
import { createTaskModel } from './tasks/create.model.js';
import { deleteTaskModel } from './tasks/delete.model.js';
import { findAllTasksModel } from './tasks/findAll.model.js';
import { findTaskByIdModel } from './tasks/findById.model.js';
import { findTasksByUserIdModel } from './tasks/findByUserId.model.js';
import { filterTasksModel } from './tasks/filter.model.js';
import { assignUsersToTaskModel } from './tasks/assign.model.js';
import { findUsersByTaskIdModel } from './tasks/findUsersByTaskId.model.js';
import { removeUserFromTaskModel } from './tasks/removeUserFromTask.model.js';
import { updateTaskModel } from './tasks/update.model.js';
import { updateTaskStatusModel } from './tasks/updateStatus.model.js';
import { removeUserAssignmentsModel } from './tasks/removeUserAssignments.model.js';

export const AuthModel = {
    login: loginModel,
    verifyToken: verifyTokenModel
};

export const DashboardModel = {
    getStats: getDashboardModel
};

export const UserModel = {
    create: createModel,
    findAll: findAllModel,
    findById: findByIdModel,
    update: updateModel,
    updateStatus: updateStatusModel,
    delete: deleteModel
};

export const TaskModel = {
    create: createTaskModel,
    findAll: findAllTasksModel,
    findById: findTaskByIdModel,
    findByUserId: findTasksByUserIdModel,
    findUsersByTaskId: findUsersByTaskIdModel,
    filter: filterTasksModel,
    assignUsers: assignUsersToTaskModel,
    removeUserFromTask: removeUserFromTaskModel,
    update: updateTaskModel,
    updateStatus: updateTaskStatusModel,
    delete: deleteTaskModel,
    removeUserAssignments: removeUserAssignmentsModel
};
