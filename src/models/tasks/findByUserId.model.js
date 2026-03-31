import { queryTaskRows } from '../database.js';

export const findTasksByUserIdModel = async (userId) => {
    return queryTaskRows({
        whereSql: `
            EXISTS (
                SELECT 1
                FROM task_users tu_filter
                WHERE tu_filter.task_id = t.id
                  AND tu_filter.user_id = ?
            )
        `,
        params: [userId]
    });
};
