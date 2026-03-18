import { TaskModel } from '../../models/index.models.js';
import { sanitizeUsers } from '../../models/users/helpers.js';
import { sendErrorResponse } from '../utils.js';

export const getTaskUsers = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await TaskModel.findById(taskId);
        const users = await TaskModel.findUsersByTaskId(taskId);

        res.status(200).json({
            success: true,
            message: 'Usuarios asignados obtenidos exitosamente',
            data: sanitizeUsers(users),
            task,
            count: users.length
        });
    } catch (error) {
        console.error('Error al obtener usuarios asignados a la tarea:', error);
        sendErrorResponse(res, error, 'Error al obtener usuarios asignados a la tarea');
    }
};
