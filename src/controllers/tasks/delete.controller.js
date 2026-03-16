import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await TaskModel.delete(taskId);

        res.status(200).json({
            success: true,
            message: 'Tarea eliminada exitosamente',
            data: deletedTask
        });
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        sendErrorResponse(res, error, 'Error al eliminar tarea');
    }
};
