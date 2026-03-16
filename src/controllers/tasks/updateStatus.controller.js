import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

export const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'El estado es requerido'
            });
        }

        const updatedTask = await TaskModel.updateStatus(taskId, status);

        res.status(200).json({
            success: true,
            message: 'Estado de la tarea actualizado exitosamente',
            data: updatedTask
        });
    } catch (error) {
        console.error('Error al actualizar el estado de la tarea:', error);
        sendErrorResponse(res, error, 'Error al actualizar el estado de la tarea');
    }
};
