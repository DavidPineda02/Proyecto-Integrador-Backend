import { findTaskByIdInDb } from '../database.js';

export const findTaskByIdModel = async (id) => {
    return findTaskByIdInDb(id);
};
