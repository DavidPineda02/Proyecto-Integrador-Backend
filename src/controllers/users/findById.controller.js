import { UserModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

/**
 * Busca un usuario por su identificador.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario obtenido exitosamente',
            data: user
        });
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        sendErrorResponse(res, error, 'Error al obtener usuario');
    }
};
