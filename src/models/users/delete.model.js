import {
    findUserByIdInDb,
    formatDateForSQL,
    withTransaction
} from '../database.js';
import { createModelError } from '../errors.js';

export const deleteModel = async (id) => {
    const existingUser = await findUserByIdInDb(id);

    if (!existingUser) {
        throw createModelError('Usuario no encontrado', 404);
    }

    await withTransaction(async (connection) => {
        const [rows] = await connection.query(
            'SELECT DISTINCT task_id FROM task_users WHERE user_id = ?',
            [id]
        );

        if (rows.length > 0) {
            const taskIds = rows.map((row) => String(row.task_id));
            const placeholders = taskIds.map(() => '?').join(', ');

            await connection.query('DELETE FROM task_users WHERE user_id = ?', [id]);
            await connection.query(
                `UPDATE tasks SET updatedAt = ? WHERE id IN (${placeholders})`,
                [formatDateForSQL(), ...taskIds]
            );
        }

        await connection.query('DELETE FROM users WHERE id = ?', [id]);
    });

    return existingUser;
};
