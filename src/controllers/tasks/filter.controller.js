import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

/**
 * Normaliza parametros opcionales de query para reutilizar el mismo criterio
 * de filtrado aunque lleguen con espacios o en distintas variantes.
 *
 * @param {unknown} value
 * @param {{ lowerCase?: boolean }} [options]
 * @returns {string | undefined}
 */
const normalizeQueryValue = (value, { lowerCase = false } = {}) => {
    if (value === undefined) {
        return undefined;
    }

    const normalizedValue = String(value).trim();

    return lowerCase ? normalizedValue.toLowerCase() : normalizedValue;
};

/**
 * Filtra tareas por usuario asignado, estado y prioridad.
 * Acepta aliases de query como user/usuario y estado/prioridad.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const filterTasks = async (req, res) => {
    try {
        const userId = normalizeQueryValue(req.query.userId ?? req.query.user ?? req.query.usuario);
        const status = normalizeQueryValue(req.query.status ?? req.query.estado, { lowerCase: true });
        const priority = normalizeQueryValue(req.query.priority ?? req.query.prioridad, { lowerCase: true });

        const tasks = await TaskModel.filter({
            userId,
            status,
            priority
        });

        res.status(200).json({
            success: true,
            message: 'Tareas filtradas exitosamente',
            data: tasks,
            filters: {
                userId: userId || null,
                status: status || null,
                priority: priority || null
            },
            count: tasks.length
        });
    } catch (error) {
        console.error('Error al filtrar tareas:', error);
        sendErrorResponse(res, error, 'Error al filtrar tareas');
    }
};
