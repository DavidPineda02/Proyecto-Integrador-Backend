import {
    ensureUsersExistInDb,
    findTaskByIdInDb,
    formatDateForSQL,
    withTransaction
} from '../database.js';
import { createModelError } from '../errors.js';
import { validateAssignedUserIds } from './helpers.js';

export const assignUsersToTaskModel = async (taskId, userIds) => {
    const normalizedUserIds = validateAssignedUserIds(userIds);

    if (normalizedUserIds.length === 0) {
        throw createModelError('Debe enviar al menos un ID de usuario');
    }

    const existingTask = await findTaskByIdInDb(taskId);

    if (!existingTask) {
        throw createModelError('Tarea no encontrada', 404);
    }

    await withTransaction(async (connection) => {
        const validUserIds = await ensureUsersExistInDb(normalizedUserIds, connection);
        const placeholders = validUserIds.map(() => '(?, ?)').join(', ');
        const values = validUserIds.flatMap((userId) => [taskId, userId]);

        await connection.query(
            `INSERT IGNORE INTO task_users (task_id, user_id) VALUES ${placeholders}`,
            values
        );

        await connection.query(
            'UPDATE tasks SET updatedAt = ? WHERE id = ?',
            [formatDateForSQL(), taskId]
        );
    });

    return findTaskByIdInDb(taskId);
};
