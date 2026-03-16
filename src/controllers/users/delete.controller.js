import { TaskModel, UserModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

/**
 * Elimina un usuario y limpia sus asignaciones de tareas para no dejar
 * referencias a usuarios inexistentes.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedUser = await UserModel.delete(userId);
        await TaskModel.removeUserAssignments(userId);

        res.status(200).json({
            success: true,
            message: 'Usuario eliminado exitosamente',
            data: deletedUser
        });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        sendErrorResponse(res, error, 'Error al eliminar usuario');
    }
};
