import { TaskModel, UserModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';
export const getUserTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const tasks = await TaskModel.findByUserId(userId);

        res.status(200).json({
            success: true,
            message: 'Tareas del usuario obtenidas exitosamente',
            data: tasks,
            user,
            count: tasks.length
        });
    } catch (error) {
        console.error('Error al obtener las tareas del usuario:', error);
        sendErrorResponse(res, error, 'Error al obtener las tareas del usuario');
    }
};
