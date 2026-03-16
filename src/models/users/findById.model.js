import { usersDatabase } from './database.js';

/**
 * Busca un usuario por id.
 *
 * @param {string} id
 * @returns {Promise<object | undefined>}
 */
export const findByIdModel = async (id) => {
    return usersDatabase.find((user) => user.id === id);
};
