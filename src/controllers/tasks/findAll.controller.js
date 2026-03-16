import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';
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
