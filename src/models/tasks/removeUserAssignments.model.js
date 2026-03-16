import { tasksDatabase } from '../database.js';

export const removeUserAssignmentsModel = async (userId) => {
    let updatedTasks = 0;

    tasksDatabase.forEach((task) => {
        if (!task.assignedUserIds.includes(userId)) {
            return;
        }

        task.assignedUserIds = task.assignedUserIds.filter(
            (assignedUserId) => assignedUserId !== userId
        );
        task.updatedAt = new Date().toISOString();
        updatedTasks += 1;
    });

    return updatedTasks;
};
