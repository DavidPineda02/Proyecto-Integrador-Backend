import { tasksDatabase } from '../database.js';
import { createModelError } from '../errors.js';
import { VALID_TASK_STATUSES } from './helpers.js';

export const updateTaskStatusModel = async (id, status) => {
    const normalizedStatus = status?.trim().toLowerCase();

    if (!VALID_TASK_STATUSES.includes(normalizedStatus)) {
        throw createModelError('Estado inválido. Debe ser: pendiente, en curso o completada');
    }

    const taskIndex = tasksDatabase.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        throw createModelError('Tarea no encontrada', 404);
    }

    tasksDatabase[taskIndex].status = normalizedStatus;
    tasksDatabase[taskIndex].updatedAt = new Date().toISOString();

    return tasksDatabase[taskIndex];
};
