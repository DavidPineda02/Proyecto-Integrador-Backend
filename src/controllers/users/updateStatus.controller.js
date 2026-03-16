import { TaskModel, UserModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

export const updateStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'El estado es requerido'
            });
        }

        const updatedUser = await UserModel.updateStatus(userId, status);

        if (updatedUser.status === 'eliminado') {
            await TaskModel.removeUserAssignments(userId);
        }

        res.status(200).json({
            success: true,
            message: 'Estado del usuario actualizado exitosamente',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error al actualizar estado del usuario:', error);
        sendErrorResponse(res, error, 'Error al actualizar estado del usuario');
    }
};
