import { UserModel } from '../../models/index.models.js';
import { sanitizeUsers } from '../../models/users/helpers.js';
import { sendErrorResponse } from '../utils.js';
export const getAll = async (req, res) => {
    try {
        const users = await UserModel.findAll();

        res.status(200).json({
            success: true,
            message: 'Usuarios obtenidos exitosamente',
            data: sanitizeUsers(users),
            count: users.length
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        sendErrorResponse(res, error, 'Error al obtener usuarios');
    }
};
