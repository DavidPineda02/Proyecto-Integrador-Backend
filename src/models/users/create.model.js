import pool, {
    findUserByEmailInDb,
    findUserByIdInDb,
    formatDateForSQL,
    generateEntityId
} from '../database.js';
import { createModelError } from '../errors.js';
import { validateUserPayload } from './helpers.js';

export const createModel = async (userData) => {
    const normalizedData = validateUserPayload(userData);
    const existingUser = await findUserByEmailInDb(normalizedData.email);

    if (existingUser) {
        throw createModelError('El email ya existe');
    }

    const userId = generateEntityId();
    const timestamp = formatDateForSQL();

    await pool.query(
        `
            INSERT INTO users (
                id,
                firstName,
                lastName,
                email,
                status,
                role,
                password,
                createdAt,
                updatedAt
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            userId,
            normalizedData.firstName,
            normalizedData.lastName,
            normalizedData.email,
            normalizedData.status || 'activo',
            normalizedData.role || 'usuario',
            normalizedData.password || 'User12345',
            timestamp,
            timestamp
        ]
    );

    return findUserByIdInDb(userId);
};
