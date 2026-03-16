/**
 * Crea errores con codigo HTTP para que la capa de controladores pueda
 * responder de forma uniforme sin conocer detalles internos del modelo.
 *
 * @param {string} message
 * @param {number} [statusCode=400]
 * @returns {Error & { statusCode: number }}
 */
export const createModelError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;

    return error;
};
