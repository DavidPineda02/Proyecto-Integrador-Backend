import { UserModel } from '../../models/users/index.models.js';

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'El estado es requerido'
            });
        }
        
        const updatedUser = await UserModel.updateStatus(id, status);
        
        res.status(200).json({
            success: true,
            message: 'Estado del usuario actualizado exitosamente',
            data: updatedUser
        });
        
    } catch (error) {
        console.error('Error al actualizar estado del usuario:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error al actualizar estado del usuario'
        });
    }
};
