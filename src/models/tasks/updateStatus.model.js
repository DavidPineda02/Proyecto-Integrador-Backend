import pool, { findTaskByIdInDb, formatDateForSQL } from '../database.js';
import { createModelError } from '../errors.js';
import { normalizeTaskStatus, VALID_TASK_STATUSES } from './helpers.js';

export const updateTaskStatusModel = async (id, status) => {
    const normalizedStatus = normalizeTaskStatus(status);

    if (!VALID_TASK_STATUSES.includes(normalizedStatus)) {
        throw createModelError('Estado inválido. Debe ser: pendiente, en progreso o completada');
    }

    const existingTask = await findTaskByIdInDb(id);

    if (!existingTask) {
        throw createModelError('Tarea no encontrada', 404);
    }

    await pool.query(
        'UPDATE tasks SET status = ?, updatedAt = ? WHERE id = ?',
        [normalizedStatus, formatDateForSQL(), id]
    );

    return findTaskByIdInDb(id);
};
