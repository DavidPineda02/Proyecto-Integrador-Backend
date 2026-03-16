import { UserModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

/**
 * Retorna la lista completa de usuarios registrados en memoria.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAll = async (req, res) => {
    try {
        const users = await UserModel.findAll();

        res.status(200).json({
            success: true,
            message: 'Usuarios obtenidos exitosamente',
            data: users,
            count: users.length
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        sendErrorResponse(res, error, 'Error al obtener usuarios');
    }
};
