import { formatDateForSQL, withTransaction } from '../database.js';

export const removeUserAssignmentsModel = async (userId) => {
    return withTransaction(async (connection) => {
        const [rows] = await connection.query(
            'SELECT DISTINCT task_id FROM task_users WHERE user_id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return 0;
        }

        await connection.query('DELETE FROM task_users WHERE user_id = ?', [userId]);

        const taskIds = rows.map((row) => String(row.task_id));
        const placeholders = taskIds.map(() => '?').join(', ');

        await connection.query(
            `UPDATE tasks SET updatedAt = ? WHERE id IN (${placeholders})`,
            [formatDateForSQL(), ...taskIds]
        );

        return taskIds.length;
    });
};
