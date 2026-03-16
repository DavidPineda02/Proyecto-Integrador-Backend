import { usersDatabase } from './database.js';
import { createModelError } from '../errors.js';
import { validateUserPayload } from './helpers.js';

const generateUserId = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

export const createModel = async (userData) => {
    const normalizedData = validateUserPayload(userData);

    const existingUser = usersDatabase.find((user) => user.email === normalizedData.email);
    if (existingUser) {
        throw createModelError('El email ya existe');
    }

    const timestamp = new Date().toISOString();
    const newUser = {
        id: generateUserId(),
        ...normalizedData,
        status: normalizedData.status || 'activo',
        createdAt: timestamp,
        updatedAt: timestamp
    };

    usersDatabase.push(newUser);

    return newUser;
};
