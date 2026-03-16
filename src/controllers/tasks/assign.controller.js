import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

export const assignUsersToTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { userIds } = req.body;

        const updatedTask = await TaskModel.assignUsers(taskId, userIds);

        res.status(200).json({
            success: true,
            message: 'Usuarios asignados a la tarea exitosamente',
            data: updatedTask
        });
    } catch (error) {
        console.error('Error al asignar usuarios a la tarea:', error);
        sendErrorResponse(res, error, 'Error al asignar usuarios a la tarea');
    }
};
