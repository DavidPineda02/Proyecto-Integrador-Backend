import pool, { findTaskByIdInDb } from '../database.js';
import { createModelError } from '../errors.js';

export const deleteTaskModel = async (id) => {
    const existingTask = await findTaskByIdInDb(id);

    if (!existingTask) {
        throw createModelError('Tarea no encontrada', 404);
    }

    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);

    return existingTask;
};
