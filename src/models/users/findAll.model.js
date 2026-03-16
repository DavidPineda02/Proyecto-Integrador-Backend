import { usersDatabase } from './database.js';

/**
 * Devuelve todos los usuarios almacenados.
 *
 * @returns {Promise<object[]>}
 */
export const findAllModel = async () => {
    return usersDatabase;
};
