import { createModel } from './users/create.model.js';
import { findAllModel } from './users/findAll.model.js';
import { findByIdModel } from './users/findById.model.js';
import { updateModel } from './users/update.model.js';
import { updateStatusModel } from './users/updateStatus.model.js';
import { deleteModel } from './users/delete.model.js';

export const UserModel = {
    create: createModel,
    findAll: findAllModel,
    findById: findByIdModel,
    update: updateModel,
    updateStatus: updateStatusModel,
    delete: deleteModel
};
