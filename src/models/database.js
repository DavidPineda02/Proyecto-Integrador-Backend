import pool from '../config/db.js';
import { createModelError } from './errors.js';

const USER_SELECT_FIELDS = `
    id,
    firstName,
    lastName,
    email,
    status,
    role,
    password,
    createdAt,
    updatedAt
`;

const normalizeDateValue = (value) => {
    if (!value) {
        return null;
    }

    const parsedDate = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return value;
    }

    return parsedDate.toISOString();
};

const parseAssignedUserIds = (value) => {
    if (Array.isArray(value)) {
        return value.map((userId) => String(userId).trim()).filter(Boolean);
    }

    if (!value) {
        return [];
    }

    return String(value)
        .split(',')
        .map((userId) => userId.trim())
        .filter(Boolean);
};

const buildTaskSelectQuery = (whereSql = '1=1', orderSql = 't.createdAt DESC') => `
    SELECT
        t.id,
        t.title,
        t.description,
        t.status,
        t.priority,
        t.createdAt,
        t.updatedAt,
        GROUP_CONCAT(tu.user_id ORDER BY tu.user_id SEPARATOR ',') AS assignedUserIdsCsv
    FROM tasks t
    LEFT JOIN task_users tu ON tu.task_id = t.id
    WHERE ${whereSql}
    GROUP BY
        t.id,
        t.title,
        t.description,
        t.status,
        t.priority,
        t.createdAt,
        t.updatedAt
    ORDER BY ${orderSql}
`;

export const formatDateForSQL = (value = new Date()) => {
    const parsedDate = value instanceof Date ? value : new Date(value);

    return parsedDate.toISOString().slice(0, 19).replace('T', ' ');
};

export const generateEntityId = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

export const mapUserRow = (row) => {
    if (!row) {
        return null;
    }

    return {
        id: String(row.id).trim(),
        firstName: row.firstName?.trim(),
        lastName: row.lastName?.trim(),
        email: row.email?.trim().toLowerCase(),
        status: row.status?.trim().toLowerCase() || 'activo',
        role: row.role?.trim().toLowerCase() || 'usuario',
        password: row.password,
        createdAt: normalizeDateValue(row.createdAt),
        updatedAt: normalizeDateValue(row.updatedAt)
    };
};

export const mapTaskRow = (row) => {
    if (!row) {
        return null;
    }

    return {
        id: String(row.id).trim(),
        title: row.title?.trim(),
        description: row.description?.trim?.() ?? row.description ?? '',
        status: row.status?.trim().toLowerCase() === 'en curso'
            ? 'en progreso'
            : row.status?.trim().toLowerCase() || 'pendiente',
        priority: row.priority?.trim().toLowerCase() || 'media',
        assignedUserIds: parseAssignedUserIds(row.assignedUserIdsCsv ?? row.assignedUserIds),
        createdAt: normalizeDateValue(row.createdAt),
        updatedAt: normalizeDateValue(row.updatedAt)
    };
};

export const queryTaskRows = async ({
    executor = pool,
    whereSql = '1=1',
    params = [],
    orderSql = 't.createdAt DESC'
} = {}) => {
    const [rows] = await executor.query(buildTaskSelectQuery(whereSql, orderSql), params);

    return rows.map(mapTaskRow);
};

export const findTaskByIdInDb = async (taskId, executor = pool) => {
    const tasks = await queryTaskRows({
        executor,
        whereSql: 't.id = ?',
        params: [taskId],
        orderSql: 't.createdAt DESC'
    });

    return tasks[0] || null;
};

export const findUserByIdInDb = async (userId, executor = pool) => {
    const [rows] = await executor.query(
        `SELECT ${USER_SELECT_FIELDS} FROM users WHERE id = ? LIMIT 1`,
        [userId]
    );

    return mapUserRow(rows[0]);
};

export const findUserByEmailInDb = async (email, executor = pool) => {
    const [rows] = await executor.query(
        `SELECT ${USER_SELECT_FIELDS} FROM users WHERE email = ? LIMIT 1`,
        [email]
    );

    return mapUserRow(rows[0]);
};

export const ensureUsersExistInDb = async (userIds, executor = pool) => {
    const normalizedUserIds = [...new Set(
        userIds
            .map((userId) => String(userId).trim())
            .filter(Boolean)
    )];

    if (normalizedUserIds.length === 0) {
        return normalizedUserIds;
    }

    const placeholders = normalizedUserIds.map(() => '?').join(', ');
    const [rows] = await executor.query(
        `SELECT id FROM users WHERE id IN (${placeholders})`,
        normalizedUserIds
    );

    const foundUserIds = new Set(rows.map((row) => String(row.id).trim()));
    const missingUserIds = normalizedUserIds.filter((userId) => !foundUserIds.has(userId));

    if (missingUserIds.length > 0) {
        throw createModelError(`Usuarios no encontrados: ${missingUserIds.join(', ')}`, 404);
    }

    return normalizedUserIds;
};

export const withTransaction = async (callback) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();

        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export default pool;
