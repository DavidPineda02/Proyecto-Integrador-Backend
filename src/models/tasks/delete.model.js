import { tasksDatabase } from '../database.js';
import { createModelError } from '../errors.js';

/**
 * Elimina una tarea por id.
 *
 * @param {string} id
 * @returns {Promise<object>}
 */
export const deleteTaskModel = async (id) => {
    const taskIndex = tasksDatabase.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        throw createModelError('Tarea no encontrada', 404);
    }

    const deletedTask = tasksDatabase[taskIndex];
    tasksDatabase.splice(taskIndex, 1);

    return deletedTask;
};
