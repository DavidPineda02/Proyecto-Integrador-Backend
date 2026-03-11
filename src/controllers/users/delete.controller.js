import { UserModel } from '../../models/users/index.models.js';

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedUser = await UserModel.delete(id);
        
        res.status(200).json({
            success: true,
            message: 'Usuario eliminado exitosamente',
            data: deletedUser
        });
        
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error al eliminar usuario'
        });
    }
};
