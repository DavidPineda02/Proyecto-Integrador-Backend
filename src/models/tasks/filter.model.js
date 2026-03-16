import { tasksDatabase } from '../database.js';
export const filterTasksModel = async ({ userId, status, priority }) => {
    return tasksDatabase.filter((task) => {
        const matchesUser = userId ? task.assignedUserIds.includes(userId) : true;
        const matchesStatus = status ? task.status === status : true;
        const matchesPriority = priority ? task.priority === priority : true;

        return matchesUser && matchesStatus && matchesPriority;
    });
};
