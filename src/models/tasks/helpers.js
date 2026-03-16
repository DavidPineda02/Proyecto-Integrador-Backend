import { createModelError } from '../errors.js';

export const VALID_TASK_STATUSES = ['pendiente', 'en curso', 'completada'];
export const VALID_TASK_PRIORITIES = ['baja', 'media', 'alta'];

const normalizeStringField = (value) => {
    if (typeof value !== 'string') {
        return value;
    }

    return value.trim();
};

export const normalizeTaskPayload = (taskData) => {
    const normalizedData = {};

    if (taskData.title !== undefined) {
        normalizedData.title = normalizeStringField(taskData.title);
    }

    if (taskData.description !== undefined) {
        normalizedData.description = normalizeStringField(taskData.description);
    }

    if (taskData.status !== undefined) {
        normalizedData.status = normalizeStringField(taskData.status)?.toLowerCase();
    }

    if (taskData.priority !== undefined) {
        normalizedData.priority = normalizeStringField(taskData.priority)?.toLowerCase();
    }

    if (taskData.assignedUserIds !== undefined) {
        normalizedData.assignedUserIds = taskData.assignedUserIds;
    }

    return normalizedData;
};

export const validateAssignedUserIds = (assignedUserIds) => {
    if (!Array.isArray(assignedUserIds)) {
        throw createModelError('assignedUserIds debe ser un arreglo de IDs de usuario');
    }

    return [...new Set(
        assignedUserIds
            .map((userId) => String(userId).trim())
            .filter(Boolean)
    )];
};

export const validateTaskPayload = (taskData, { partial = false } = {}) => {
    const normalizedData = normalizeTaskPayload(taskData);

    if (!partial && !normalizedData.title) {
        throw createModelError('El campo title es requerido');
    }

    if (normalizedData.title !== undefined && !normalizedData.title) {
        throw createModelError('El título no puede estar vacío');
    }

    if (normalizedData.description !== undefined && typeof normalizedData.description !== 'string') {
        throw createModelError('La descripción debe ser un texto');
    }

    if (normalizedData.status !== undefined && !VALID_TASK_STATUSES.includes(normalizedData.status)) {
        throw createModelError('Estado inválido. Debe ser: pendiente, en curso o completada');
    }

    if (normalizedData.priority !== undefined && !VALID_TASK_PRIORITIES.includes(normalizedData.priority)) {
        throw createModelError('Prioridad inválida. Debe ser: baja, media o alta');
    }

    if (normalizedData.assignedUserIds !== undefined) {
        normalizedData.assignedUserIds = validateAssignedUserIds(normalizedData.assignedUserIds);
    }

    return normalizedData;
};
