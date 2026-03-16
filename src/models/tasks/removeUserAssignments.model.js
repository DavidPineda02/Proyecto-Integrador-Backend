import { tasksDatabase } from '../database.js';
export const removeUserAssignmentsModel = async (userId) => {
    let updatedTasks = 0;

    tasksDatabase.forEach((task) => {
        if (!task.assignedUserIds.includes(userId)) {
            return;
        }

        // Elimina al usuario de la lista de asignados de la tarea.
        task.assignedUserIds = task.assignedUserIds.filter(
            (assignedUserId) => assignedUserId !== userId
        );
        task.updatedAt = new Date().toISOString();
        updatedTasks += 1;
    });

    return updatedTasks;
};
