import { TaskModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

export const createTask = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const assignedUserIds = req.body.assignedUserIds ?? req.body.userIds;

        const newTask = await TaskModel.create({
            title,
            description,
            priority,
            status,
            assignedUserIds
        });

        res.status(201).json({
            success: true,
            message: 'Tarea creada exitosamente',
            data: newTask
        });
    } catch (error) {
        console.error('Error al crear tarea:', error);
        sendErrorResponse(res, error, 'Error al crear tarea');
    }
};
