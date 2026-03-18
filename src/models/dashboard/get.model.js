import { tasksDatabase, usersDatabase } from '../database.js';

const countByStatus = (status) => tasksDatabase.filter((task) => task.status === status).length;
const countByPriority = (priority) => tasksDatabase.filter((task) => task.priority === priority).length;

export const getDashboardModel = async () => {
    const totalTasks = tasksDatabase.length;
    const totalUsers = usersDatabase.length;

    return {
        totals: {
            users: totalUsers,
            activeUsers: usersDatabase.filter((user) => user.status === 'activo').length,
            inactiveUsers: usersDatabase.filter((user) => user.status === 'inactivo').length,
            suspendedUsers: usersDatabase.filter((user) => user.status === 'suspendido').length,
            deletedUsers: usersDatabase.filter((user) => user.status === 'eliminado').length,
            tasks: totalTasks,
            assignedTasks: tasksDatabase.filter((task) => task.assignedUserIds.length > 0).length,
            unassignedTasks: tasksDatabase.filter((task) => task.assignedUserIds.length === 0).length
        },
        tasksByStatus: {
            pendiente: countByStatus('pendiente'),
            enProgreso: countByStatus('en progreso'),
            completada: countByStatus('completada')
        },
        tasksByPriority: {
            baja: countByPriority('baja'),
            media: countByPriority('media'),
            alta: countByPriority('alta')
        }
    };
};
