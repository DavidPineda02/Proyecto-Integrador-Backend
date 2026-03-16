/**
 * Estandariza las respuestas de error devolviendo el statusCode definido
 * por la capa de modelos o un 500 por defecto.
 *
 * @param {import('express').Response} res
 * @param {Error & { statusCode?: number }} error
 * @param {string} fallbackMessage
 * @returns {import('express').Response}
 */
export const sendErrorResponse = (res, error, fallbackMessage) => {
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || fallbackMessage
    });
};
