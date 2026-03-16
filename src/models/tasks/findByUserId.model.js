import { tasksDatabase } from '../database.js';

/**
 * Devuelve todas las tareas donde el usuario aparece asignado.
 *
 * @param {string} userId
 * @returns {Promise<object[]>}
 */
export const findTasksByUserIdModel = async (userId) => {
    return tasksDatabase.filter((task) => task.assignedUserIds.includes(userId));
};
