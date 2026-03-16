import { tasksDatabase } from '../database.js';

/**
 * Quita un usuario de todas las tareas donde estuviera asignado.
 * Es util al eliminar usuarios o marcarlos como eliminados.
 *
 * @param {string} userId
 * @returns {Promise<number>}
 */
export const removeUserAssignmentsModel = async (userId) => {
    let updatedTasks = 0;

    tasksDatabase.forEach((task) => {
        if (!task.assignedUserIds.includes(userId)) {
            return;
        }

        task.assignedUserIds = task.assignedUserIds.filter(
            (assignedUserId) => assignedUserId !== userId
        );
        task.updatedAt = new Date().toISOString();
        updatedTasks += 1;
    });

    return updatedTasks;
};
