import { tasksDatabase } from '../database.js';

/**
 * Busca una tarea por id.
 *
 * @param {string} id
 * @returns {Promise<object | undefined>}
 */
export const findTaskByIdModel = async (id) => {
    return tasksDatabase.find((task) => task.id === id);
};
