import { tasksDatabase, usersDatabase } from '../database.js';
import { createModelError } from '../errors.js';

export const findUsersByTaskIdModel = async (taskId) => {
    const task = tasksDatabase.find((currentTask) => currentTask.id === taskId);

    if (!task) {
        throw createModelError('Tarea no encontrada', 404);
    }

    return usersDatabase.filter((user) => task.assignedUserIds.includes(user.id));
};
