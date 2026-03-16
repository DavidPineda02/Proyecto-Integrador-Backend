import { tasksDatabase } from '../database.js';

/**
 * Filtra tareas por usuario asignado, estado y prioridad.
 * Cualquier criterio omitido se considera comodin.
 *
 * @param {{ userId?: string, status?: string, priority?: string }} filters
 * @returns {Promise<object[]>}
 */
export const filterTasksModel = async ({ userId, status, priority }) => {
    return tasksDatabase.filter((task) => {
        const matchesUser = userId ? task.assignedUserIds.includes(userId) : true;
        const matchesStatus = status ? task.status === status : true;
        const matchesPriority = priority ? task.priority === priority : true;

        return matchesUser && matchesStatus && matchesPriority;
    });
};
