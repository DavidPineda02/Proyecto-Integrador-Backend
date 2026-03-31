import { createModelError } from '../errors.js';
import { formatDateForSQL, queryTaskRows } from '../database.js';
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

    const whereClauses = ['1=1'];
    const params = [];

    if (userId) {
        whereClauses.push(`
            EXISTS (
                SELECT 1
                FROM task_users tu_filter
                WHERE tu_filter.task_id = t.id
                  AND tu_filter.user_id = ?
            )
        `);
        params.push(userId);
    }

    if (normalizedStatus) {
        whereClauses.push('t.status = ?');
        params.push(normalizedStatus);
    }

    if (priority) {
        whereClauses.push('t.priority = ?');
        params.push(priority);
    }

    if (parsedDateFrom) {
        whereClauses.push('t.createdAt >= ?');
        params.push(formatDateForSQL(parsedDateFrom));
    }

    if (parsedDateTo) {
        whereClauses.push('t.createdAt <= ?');
        params.push(formatDateForSQL(parsedDateTo));
    }

    return queryTaskRows({
        whereSql: whereClauses.join(' AND '),
        params
    });
};
