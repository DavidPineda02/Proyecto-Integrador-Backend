/**
 * Barrel de modelos.
 * Expone una interfaz estable para usuarios y tareas sin acoplar controladores
 * a archivos internos concretos.
 */
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
import { updateTaskModel } from './tasks/update.model.js';
import { updateTaskStatusModel } from './tasks/updateStatus.model.js';
import { removeUserAssignmentsModel } from './tasks/removeUserAssignments.model.js';

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
    filter: filterTasksModel,
    assignUsers: assignUsersToTaskModel,
    update: updateTaskModel,
    updateStatus: updateTaskStatusModel,
    delete: deleteTaskModel,
    removeUserAssignments: removeUserAssignmentsModel
};
