import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';
export const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
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
                message: 'No tiene permisos para consultar esta tarea'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tarea obtenida exitosamente',
            data: task
        });
    } catch (error) {
        console.error('Error al obtener tarea:', error);
        sendErrorResponse(res, error, 'Error al obtener tarea');
    }
};
