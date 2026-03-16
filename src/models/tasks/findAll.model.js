import { tasksDatabase } from '../database.js';

/**
 * Retorna todas las tareas almacenadas.
 *
 * @returns {Promise<object[]>}
 */
export const findAllTasksModel = async () => {
    return tasksDatabase;
};
