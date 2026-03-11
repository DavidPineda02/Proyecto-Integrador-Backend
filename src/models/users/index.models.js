import { createModel } from './create.model.js';
import { findAllModel } from './findAll.model.js';
import { findByIdModel } from './findById.model.js';
import { updateModel } from './update.model.js';
import { updateStatusModel } from './updateStatus.model.js';
import { deleteModel } from './delete.model.js';

export const UserModel = {
    create: createModel,
    findAll: findAllModel,
    findById: findByIdModel,
    update: updateModel,
    updateStatus: updateStatusModel,
    delete: deleteModel
};
