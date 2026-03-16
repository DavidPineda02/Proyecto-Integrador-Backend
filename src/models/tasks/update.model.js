import { tasksDatabase, usersDatabase } from '../database.js';
import { createModelError } from '../errors.js';
import { validateTaskPayload } from './helpers.js';

/**
 * Actualiza parcialmente una tarea existente.
 * Si el payload incluye assignedUserIds, estos reemplazan la lista anterior.
 *
 * @param {string} id
 * @param {Record<string, any>} taskData
 * @returns {Promise<object>}
 */
export const updateTaskModel = async (id, taskData) => {
    const taskIndex = tasksDatabase.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        throw createModelError('Tarea no encontrada', 404);
    }

    const normalizedData = validateTaskPayload(taskData, { partial: true });

    if (normalizedData.assignedUserIds !== undefined) {
        const missingUserIds = normalizedData.assignedUserIds.filter(
            (userId) => !usersDatabase.some((user) => user.id === userId)
        );

        if (missingUserIds.length > 0) {
            throw createModelError(`Usuarios no encontrados: ${missingUserIds.join(', ')}`, 404);
        }
    }

    const updatedTask = {
        ...tasksDatabase[taskIndex],
        ...normalizedData,
        updatedAt: new Date().toISOString()
    };

    tasksDatabase[taskIndex] = updatedTask;

    return updatedTask;
};
