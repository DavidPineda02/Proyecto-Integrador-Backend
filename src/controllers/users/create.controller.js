import { UserModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

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
