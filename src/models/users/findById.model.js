import { usersDatabase } from './database.js';

export const findByIdModel = async (id) => {
    return usersDatabase.find(user => user.id === id);
};
