import { tasksDatabase, usersDatabase } from '../database.js';
import { createModelError } from '../errors.js';

export const removeUserFromTaskModel = async (taskId, userId) => {
    const taskIndex = tasksDatabase.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        throw createModelError('Tarea no encontrada', 404);
    }

    const userExists = usersDatabase.some((user) => user.id === userId);

    if (!userExists) {
        throw createModelError('Usuario no encontrado', 404);
    }

    if (!tasksDatabase[taskIndex].assignedUserIds.includes(userId)) {
        throw createModelError('El usuario no está asignado a esta tarea', 404);
    }

    tasksDatabase[taskIndex].assignedUserIds = tasksDatabase[taskIndex].assignedUserIds.filter(
        (assignedUserId) => assignedUserId !== userId
    );
    tasksDatabase[taskIndex].updatedAt = new Date().toISOString();

    return tasksDatabase[taskIndex];
};
