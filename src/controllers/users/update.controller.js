import { UserModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';
export const update = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, email, status } = req.body;

        const updatedUser = await UserModel.update(userId, {
            firstName,
            lastName,
            email,
            status
        });

        res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        sendErrorResponse(res, error, 'Error al actualizar usuario');
    }
};
