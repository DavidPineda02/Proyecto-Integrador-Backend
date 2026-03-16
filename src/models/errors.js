// Crea errores con codigo HTTP para reutilizarlos en los controladores.
export const createModelError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;

    return error;
};
