import {
    findTaskByIdInDb,
    findUserByIdInDb,
    formatDateForSQL,
    withTransaction
} from '../database.js';
import { createModelError } from '../errors.js';

export const removeUserFromTaskModel = async (taskId, userId) => {
    const existingTask = await findTaskByIdInDb(taskId);

    if (!existingTask) {
        throw createModelError('Tarea no encontrada', 404);
    }

    const existingUser = await findUserByIdInDb(userId);

    if (!existingUser) {
        throw createModelError('Usuario no encontrado', 404);
    }

    await withTransaction(async (connection) => {
        const [result] = await connection.query(
            'DELETE FROM task_users WHERE task_id = ? AND user_id = ?',
            [taskId, userId]
        );

        if (result.affectedRows === 0) {
            throw createModelError('El usuario no está asignado a esta tarea', 404);
        }

        await connection.query(
            'UPDATE tasks SET updatedAt = ? WHERE id = ?',
            [formatDateForSQL(), taskId]
        );
    });

    return findTaskByIdInDb(taskId);
};
