import { usersDatabase } from './database.js';
import { createModelError } from '../errors.js';

/**
 * Elimina un usuario por id desde la base en memoria.
 *
 * @param {string} id
 * @returns {Promise<object>}
 */
export const deleteModel = async (id) => {
    const userIndex = usersDatabase.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        throw createModelError('Usuario no encontrado', 404);
    }

    const deletedUser = usersDatabase[userIndex];
    usersDatabase.splice(userIndex, 1);

    return deletedUser;
};
