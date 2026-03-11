import { UserModel } from '../../models/index.models.js';

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
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios'
        });
    }
};
