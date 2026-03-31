import pool, { mapUserRow } from '../database.js';

export const findAllModel = async () => {
    const [rows] = await pool.query(`
        SELECT
            id,
            firstName,
            lastName,
            email,
            status,
            role,
            password,
            createdAt,
            updatedAt
        FROM users
        ORDER BY createdAt DESC
    `);

    return rows.map(mapUserRow);
};
