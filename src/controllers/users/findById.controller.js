import { UserModel } from '../../models/index.models.js';

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await UserModel.findById(id);
        
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
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuario'
        });
    }
};
