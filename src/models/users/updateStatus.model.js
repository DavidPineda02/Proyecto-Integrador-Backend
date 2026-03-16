import { usersDatabase } from './database.js';
import { createModelError } from '../errors.js';
import { VALID_USER_STATUSES } from './helpers.js';

/**
 * Cambia solo el estado administrativo del usuario.
 *
 * @param {string} id
 * @param {string} status
 * @returns {Promise<object>}
 */
export const updateStatusModel = async (id, status) => {
    const normalizedStatus = status?.trim().toLowerCase();

    if (!VALID_USER_STATUSES.includes(normalizedStatus)) {
        throw createModelError('Estado inválido. Debe ser: activo, inactivo, suspendido o eliminado');
    }

    const userIndex = usersDatabase.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        throw createModelError('Usuario no encontrado', 404);
    }

    usersDatabase[userIndex].status = normalizedStatus;
    usersDatabase[userIndex].updatedAt = new Date().toISOString();

    return usersDatabase[userIndex];
};
