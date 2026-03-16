import { readFileSync } from 'node:fs';

/**
 * Carga la semilla inicial desde db.json.
 * Mientras no exista una base de datos real, este archivo funciona como origen
 * de datos para poblar los arreglos en memoria al iniciar la app.
 *
 * @returns {{ users: Array<object>, tasks: Array<object> }}
 */
const loadSeedData = () => {
    try {
        const databaseFile = new URL('../../db.json', import.meta.url);
        const fileContent = readFileSync(databaseFile, 'utf-8');

        return JSON.parse(fileContent);
    } catch (error) {
        return {
            users: [],
            tasks: []
        };
    }
};

const seedData = loadSeedData();

/**
 * Normaliza los registros de usuario para que todos compartan el mismo shape
 * independientemente de como vengan desde la semilla.
 *
 * @param {Record<string, any>} user
 * @returns {object}
 */
const normalizeUser = (user) => {
    const timestamp = new Date().toISOString();

    return {
        id: String(user.id).trim(),
        firstName: user.firstName?.trim(),
        lastName: user.lastName?.trim(),
        email: user.email?.trim().toLowerCase(),
        status: user.status?.trim().toLowerCase() || 'activo',
        createdAt: user.createdAt || timestamp,
        updatedAt: user.updatedAt || timestamp
    };
};

/**
 * Normaliza los registros de tarea y elimina ids de usuario repetidos.
 *
 * @param {Record<string, any>} task
 * @returns {object}
 */
const normalizeTask = (task) => {
    const timestamp = new Date().toISOString();

    return {
        id: String(task.id).trim(),
        title: task.title?.trim(),
        description: task.description?.trim() || '',
        status: task.status?.trim().toLowerCase() || 'pendiente',
        priority: task.priority?.trim().toLowerCase() || 'media',
        assignedUserIds: Array.isArray(task.assignedUserIds)
            ? [...new Set(task.assignedUserIds.map((userId) => String(userId).trim()).filter(Boolean))]
            : [],
        createdAt: task.createdAt || timestamp,
        updatedAt: task.updatedAt || timestamp
    };
};

// Estos arreglos simulan la persistencia compartida por toda la aplicacion.
export const usersDatabase = Array.isArray(seedData.users)
    ? seedData.users.map(normalizeUser)
    : [];

export const tasksDatabase = Array.isArray(seedData.tasks)
    ? seedData.tasks.map(normalizeTask)
    : [];
