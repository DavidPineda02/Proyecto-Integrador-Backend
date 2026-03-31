import pool, {
    findUserByEmailInDb,
    findUserByIdInDb,
    formatDateForSQL
} from '../database.js';
import { createModelError } from '../errors.js';
import { validateUserPayload } from './helpers.js';

export const updateModel = async (id, userData) => {
    const existingUser = await findUserByIdInDb(id);

    if (!existingUser) {
        throw createModelError('Usuario no encontrado', 404);
    }

    const normalizedData = validateUserPayload(userData, { partial: true });

    if (normalizedData.email) {
        const duplicatedUser = await findUserByEmailInDb(normalizedData.email);

        if (duplicatedUser && duplicatedUser.id !== id) {
            throw createModelError('El email ya existe');
        }
    }

    const fieldsToUpdate = [];
    const values = [];

    Object.entries(normalizedData).forEach(([field, value]) => {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
    });

    fieldsToUpdate.push('updatedAt = ?');
    values.push(formatDateForSQL(), id);

    await pool.query(
        `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`,
        values
    );

    return findUserByIdInDb(id);
};
