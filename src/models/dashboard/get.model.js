import pool from '../database.js';

export const getDashboardModel = async () => {
    const [[userStats]] = await pool.query(`
        SELECT
            COUNT(*) AS users,
            COALESCE(SUM(status = 'activo'), 0) AS activeUsers,
            COALESCE(SUM(status = 'inactivo'), 0) AS inactiveUsers,
            COALESCE(SUM(status = 'suspendido'), 0) AS suspendedUsers,
            COALESCE(SUM(status = 'eliminado'), 0) AS deletedUsers
        FROM users
    `);

    const [[taskStats]] = await pool.query(`
        SELECT
            COUNT(*) AS tasks,
            COALESCE(SUM(status = 'pendiente'), 0) AS pendiente,
            COALESCE(SUM(status = 'en progreso'), 0) AS enProgreso,
            COALESCE(SUM(status = 'completada'), 0) AS completada,
            COALESCE(SUM(priority = 'baja'), 0) AS baja,
            COALESCE(SUM(priority = 'media'), 0) AS media,
            COALESCE(SUM(priority = 'alta'), 0) AS alta
        FROM tasks
    `);

    const [[assignmentStats]] = await pool.query(`
        SELECT COUNT(DISTINCT task_id) AS assignedTasks
        FROM task_users
    `);

    const totalTasks = Number(taskStats.tasks || 0);
    const assignedTasks = Number(assignmentStats.assignedTasks || 0);

    return {
        totals: {
            users: Number(userStats.users || 0),
            activeUsers: Number(userStats.activeUsers || 0),
            inactiveUsers: Number(userStats.inactiveUsers || 0),
            suspendedUsers: Number(userStats.suspendedUsers || 0),
            deletedUsers: Number(userStats.deletedUsers || 0),
            tasks: totalTasks,
            assignedTasks,
            unassignedTasks: Math.max(totalTasks - assignedTasks, 0)
        },
        tasksByStatus: {
            pendiente: Number(taskStats.pendiente || 0),
            enProgreso: Number(taskStats.enProgreso || 0),
            completada: Number(taskStats.completada || 0)
        },
        tasksByPriority: {
            baja: Number(taskStats.baja || 0),
            media: Number(taskStats.media || 0),
            alta: Number(taskStats.alta || 0)
        }
    };
};
