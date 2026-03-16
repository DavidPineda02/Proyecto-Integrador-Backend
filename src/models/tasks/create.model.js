import { tasksDatabase, usersDatabase } from '../database.js';
import { createModelError } from '../errors.js';
import { validateTaskPayload } from './helpers.js';

const generateTaskId = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

const validateUsersExist = (userIds) => {
    const missingUserIds = userIds.filter(
        (userId) => !usersDatabase.some((user) => user.id === userId)
    );

    if (missingUserIds.length > 0) {
        throw createModelError(`Usuarios no encontrados: ${missingUserIds.join(', ')}`, 404);
    }
};

export const createTaskModel = async (taskData) => {
    const normalizedData = validateTaskPayload(taskData);
    const assignedUserIds = normalizedData.assignedUserIds || [];

    validateUsersExist(assignedUserIds);

    const timestamp = new Date().toISOString();
    const newTask = {
        id: generateTaskId(),
        title: normalizedData.title,
        description: normalizedData.description || '',
        status: normalizedData.status || 'pendiente',
        priority: normalizedData.priority || 'media',
        assignedUserIds,
        createdAt: timestamp,
        updatedAt: timestamp
    };

    tasksDatabase.push(newTask);

    return newTask;
};
