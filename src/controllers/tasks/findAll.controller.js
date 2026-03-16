import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

/**
 * Retorna la coleccion completa de tareas.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.findAll();

        res.status(200).json({
            success: true,
            message: 'Tareas obtenidas exitosamente',
            data: tasks,
            count: tasks.length
        });
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        sendErrorResponse(res, error, 'Error al obtener tareas');
    }
};
