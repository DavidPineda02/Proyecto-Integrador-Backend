import {
    ensureUsersExistInDb,
    findTaskByIdInDb,
    formatDateForSQL,
    generateEntityId,
    withTransaction
} from '../database.js';
import { validateTaskPayload } from './helpers.js';

export const createTaskModel = async (taskData) => {
    const normalizedData = validateTaskPayload(taskData);
    const assignedUserIds = await ensureUsersExistInDb(normalizedData.assignedUserIds || []);
    const taskId = generateEntityId();
    const timestamp = formatDateForSQL();

    await withTransaction(async (connection) => {
        await connection.query(
            `
                INSERT INTO tasks (
                    id,
                    title,
                    description,
                    status,
                    priority,
                    createdAt,
                    updatedAt
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                taskId,
                normalizedData.title,
                normalizedData.description || '',
                normalizedData.status || 'pendiente',
                normalizedData.priority || 'media',
                timestamp,
                timestamp
            ]
        );

        if (assignedUserIds.length > 0) {
            const placeholders = assignedUserIds.map(() => '(?, ?)').join(', ');
            const values = assignedUserIds.flatMap((userId) => [taskId, userId]);

            await connection.query(
                `INSERT INTO task_users (task_id, user_id) VALUES ${placeholders}`,
                values
            );
        }
    });

    return findTaskByIdInDb(taskId);
};
