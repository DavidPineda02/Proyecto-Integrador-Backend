import pool, { findTaskByIdInDb, mapUserRow } from '../database.js';
import { createModelError } from '../errors.js';

export const findUsersByTaskIdModel = async (taskId) => {
    const task = await findTaskByIdInDb(taskId);

    if (!task) {
        throw createModelError('Tarea no encontrada', 404);
    }

    const [rows] = await pool.query(
        `
            SELECT
                u.id,
                u.firstName,
                u.lastName,
                u.email,
                u.status,
                u.role,
                u.password,
                u.createdAt,
                u.updatedAt
            FROM users u
            INNER JOIN task_users tu ON tu.user_id = u.id
            WHERE tu.task_id = ?
            ORDER BY u.createdAt DESC
        `,
        [taskId]
    );

    return rows.map(mapUserRow);
};
