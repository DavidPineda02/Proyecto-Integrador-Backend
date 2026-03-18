import { tasksDatabase } from '../database.js';
import { createModelError } from '../errors.js';
import { normalizeTaskStatus } from './helpers.js';

const normalizeDateBoundary = (value, { endOfDay = false } = {}) => {
    if (!value) {
        return null;
    }

    const preparedValue = /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? `${value}${endOfDay ? 'T23:59:59.999Z' : 'T00:00:00.000Z'}`
        : value;

    const parsedDate = new Date(preparedValue);

    if (Number.isNaN(parsedDate.getTime())) {
        throw createModelError('Rango de fechas inválido');
    }

    return parsedDate;
};

export const filterTasksModel = async ({ userId, status, priority, dateFrom, dateTo }) => {
    const normalizedStatus = status ? normalizeTaskStatus(status) : undefined;
    const parsedDateFrom = normalizeDateBoundary(dateFrom);
    const parsedDateTo = normalizeDateBoundary(dateTo, { endOfDay: true });

    if (parsedDateFrom && parsedDateTo && parsedDateFrom > parsedDateTo) {
        throw createModelError('La fecha inicial no puede ser mayor que la fecha final');
    }

    return tasksDatabase.filter((task) => {
        const matchesUser = userId ? task.assignedUserIds.includes(userId) : true;
        const matchesStatus = normalizedStatus ? task.status === normalizedStatus : true;
        const matchesPriority = priority ? task.priority === priority : true;
        const createdAt = new Date(task.createdAt);
        const matchesDateFrom = parsedDateFrom ? createdAt >= parsedDateFrom : true;
        const matchesDateTo = parsedDateTo ? createdAt <= parsedDateTo : true;

        return matchesUser && matchesStatus && matchesPriority && matchesDateFrom && matchesDateTo;
    });
};
