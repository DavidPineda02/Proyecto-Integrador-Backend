import { seedData } from '../data/store.js';

// Normaliza los usuarios cargados desde la semilla.
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

// Normaliza las tareas y evita ids repetidos en las asignaciones.
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

// Estos arreglos simulan la base de datos en memoria.
export const usersDatabase = Array.isArray(seedData.users)
    ? seedData.users.map(normalizeUser)
    : [];

export const tasksDatabase = Array.isArray(seedData.tasks)
    ? seedData.tasks.map(normalizeTask)
    : [];
