import { findUserByIdInDb } from '../database.js';

export const findByIdModel = async (id) => {
    return findUserByIdInDb(id);
};
