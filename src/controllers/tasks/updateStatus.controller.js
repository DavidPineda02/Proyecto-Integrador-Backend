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

        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Tarea no encontrada'
            });
        }

        const isAdmin = req.user?.role === 'admin';
        const isAssignedUser = task.assignedUserIds.includes(req.user?.id);

        if (!isAdmin && !isAssignedUser) {
            return res.status(403).json({
                success: false,
                message: 'No tiene permisos para actualizar esta tarea'
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
