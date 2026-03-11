import { UserModel } from '../../models/users/index.models.js';

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, status } = req.body;
        
        const updatedUser = await UserModel.update(id, {
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
        res.status(400).json({
            success: false,
            message: error.message || 'Error al actualizar usuario'
        });
    }
};
