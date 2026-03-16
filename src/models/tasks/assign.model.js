import { tasksDatabase, usersDatabase } from '../database.js';
import { createModelError } from '../errors.js';
import { validateAssignedUserIds } from './helpers.js';

export const assignUsersToTaskModel = async (taskId, userIds) => {
    const normalizedUserIds = validateAssignedUserIds(userIds);

    if (normalizedUserIds.length === 0) {
        throw createModelError('Debe enviar al menos un ID de usuario');
    }

    const taskIndex = tasksDatabase.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        throw createModelError('Tarea no encontrada', 404);
    }

    const missingUserIds = normalizedUserIds.filter(
        (userId) => !usersDatabase.some((user) => user.id === userId)
    );

    if (missingUserIds.length > 0) {
        throw createModelError(`Usuarios no encontrados: ${missingUserIds.join(', ')}`, 404);
    }

    const mergedUserIds = [...new Set([
        ...tasksDatabase[taskIndex].assignedUserIds,
        ...normalizedUserIds
    ])];

    tasksDatabase[taskIndex].assignedUserIds = mergedUserIds;
    tasksDatabase[taskIndex].updatedAt = new Date().toISOString();

    return tasksDatabase[taskIndex];
};
