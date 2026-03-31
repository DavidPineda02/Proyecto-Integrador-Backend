import {
    ensureUsersExistInDb,
    findTaskByIdInDb,
    formatDateForSQL,
    withTransaction
} from '../database.js';
import { createModelError } from '../errors.js';
import { validateTaskPayload } from './helpers.js';

export const updateTaskModel = async (id, taskData) => {
    const existingTask = await findTaskByIdInDb(id);

    if (!existingTask) {
        throw createModelError('Tarea no encontrada', 404);
    }

    const normalizedData = validateTaskPayload(taskData, { partial: true });

    await withTransaction(async (connection) => {
        if (normalizedData.assignedUserIds !== undefined) {
            normalizedData.assignedUserIds = await ensureUsersExistInDb(
                normalizedData.assignedUserIds,
                connection
            );
        }

        const fieldsToUpdate = [];
        const values = [];

        ['title', 'description', 'status', 'priority'].forEach((field) => {
            if (normalizedData[field] === undefined) {
                return;
            }

            fieldsToUpdate.push(`${field} = ?`);
            values.push(normalizedData[field]);
        });

        fieldsToUpdate.push('updatedAt = ?');
        values.push(formatDateForSQL(), id);

        await connection.query(
            `UPDATE tasks SET ${fieldsToUpdate.join(', ')} WHERE id = ?`,
            values
        );

        if (normalizedData.assignedUserIds !== undefined) {
            await connection.query('DELETE FROM task_users WHERE task_id = ?', [id]);

            if (normalizedData.assignedUserIds.length > 0) {
                const placeholders = normalizedData.assignedUserIds.map(() => '(?, ?)').join(', ');
                const assignmentValues = normalizedData.assignedUserIds.flatMap((userId) => [id, userId]);

                await connection.query(
                    `INSERT INTO task_users (task_id, user_id) VALUES ${placeholders}`,
                    assignmentValues
                );
            }
        }
    });

    return findTaskByIdInDb(id);
};
