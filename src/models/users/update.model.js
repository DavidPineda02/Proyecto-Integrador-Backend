import { usersDatabase } from './database.js';
import { createModelError } from '../errors.js';
import { validateUserPayload } from './helpers.js';

/**
 * Actualiza parcialmente un usuario existente manteniendo la validacion
 * compartida y la unicidad del correo.
 *
 * @param {string} id
 * @param {Record<string, any>} userData
 * @returns {Promise<object>}
 */
export const updateModel = async (id, userData) => {
    const userIndex = usersDatabase.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        throw createModelError('Usuario no encontrado', 404);
    }

    const normalizedData = validateUserPayload(userData, { partial: true });

    if (normalizedData.email) {
        const existingUser = usersDatabase.find(
            (user) => user.email === normalizedData.email && user.id !== id
        );

        if (existingUser) {
            throw createModelError('El email ya existe');
        }
    }

    const updatedUser = {
        ...usersDatabase[userIndex],
        ...normalizedData,
        updatedAt: new Date().toISOString()
    };

    usersDatabase[userIndex] = updatedUser;

    return updatedUser;
};
