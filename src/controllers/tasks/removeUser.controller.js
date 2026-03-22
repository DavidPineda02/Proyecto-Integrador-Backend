import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

export const removeUserFromTask = async (req, res) => {
    try {
        const { taskId, userId } = req.params;
        const updatedTask = await TaskModel.removeUserFromTask(taskId, userId);

        res.status(200).json({
            success: true,
            message: 'Usuario removido de la tarea exitosamente',
            data: updatedTask
        });
    } catch (error) {
        console.error('Error al remover usuario de la tarea:', error);
        sendErrorResponse(res, error, 'Error al remover usuario de la tarea');
    }
};
