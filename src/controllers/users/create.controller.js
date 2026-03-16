import { UserModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

/**
 * Crea un usuario nuevo a partir del body recibido por la API.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const create = async (req, res) => {
    try {
        const { firstName, lastName, email, status } = req.body;

        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            status
        });

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: newUser
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        sendErrorResponse(res, error, 'Error al crear usuario');
    }
};
