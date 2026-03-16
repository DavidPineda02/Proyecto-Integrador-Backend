import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';
export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, priority, status } = req.body;
        // Si llega esta lista, reemplaza los usuarios asignados actuales.
        const assignedUserIds = req.body.assignedUserIds ?? req.body.userIds;

        const updatedTask = await TaskModel.update(taskId, {
            title,
            description,
            priority,
            status,
            assignedUserIds
        });

        res.status(200).json({
            success: true,
            message: 'Tarea actualizada exitosamente',
            data: updatedTask
        });
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        sendErrorResponse(res, error, 'Error al actualizar tarea');
    }
};
