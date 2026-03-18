import { DashboardModel } from '../../models/index.models.js';
import { sendErrorResponse } from '../utils.js';

export const getDashboard = async (req, res) => {
    try {
        const dashboardData = await DashboardModel.getStats();

        res.status(200).json({
            success: true,
            message: 'Dashboard obtenido exitosamente',
            data: dashboardData
        });
    } catch (error) {
        console.error('Error al obtener dashboard:', error);
        sendErrorResponse(res, error, 'Error al obtener dashboard');
    }
};
