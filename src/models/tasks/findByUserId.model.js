import { tasksDatabase } from '../database.js';

export const findTasksByUserIdModel = async (userId) => {
    return tasksDatabase.filter((task) => task.assignedUserIds.includes(userId));
};
