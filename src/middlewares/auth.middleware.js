import { AuthModel } from '../models/index.models.js';

const getTokenFromRequest = (authorizationHeader = '') => {
    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return null;
    }

    return token;
};

export const authenticateUser = async (req, res, next) => {
    try {
        const token = getTokenFromRequest(req.headers.authorization);
        const user = await AuthModel.verifyToken(token);

        req.user = {
            id: user.id,
            role: user.role,
            email: user.email
        };

        next();
    } catch (error) {
        res.status(error.statusCode || 401).json({
            success: false,
            message: error.message || 'No autorizado'
        });
    }
};

export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: 'No tiene permisos para realizar esta acción'
        });
    }

    next();
};
