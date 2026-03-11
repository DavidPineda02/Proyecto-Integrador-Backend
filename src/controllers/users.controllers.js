import { UserModel } from '../models/users/users.models.js';

const create = async (req, res) => {
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
        res.status(400).json({
            success: false,
            message: error.message || 'Error al crear usuario'
        });
    }
};

const getAll = async (req, res) => {
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

const getById = async (req, res) => {
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

const update = async (req, res) => {
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

const updateStatus = async (req, res) => {
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

const deleteUser = async (req, res) => {
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

export {
    create,
    getAll,
    getById,
    update,
    updateStatus,
    deleteUser
};