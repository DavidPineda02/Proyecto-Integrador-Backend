import { AuthModel } from '../../models/index.models.js';
import { sanitizeUser } from '../../models/users/helpers.js';
import { sendErrorResponse } from '../utils.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await AuthModel.login({ email, password });

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            token,
            tokenType: 'Bearer',
            data: sanitizeUser(user)
        });
    } catch (error) {
        console.error('Error en login:', error);
        sendErrorResponse(res, error, 'Error en login');
    }
};
