import { usersDatabase } from './database.js';

export const deleteModel = async (id) => {
    const userIndex = usersDatabase.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
    }
    
    const deletedUser = usersDatabase[userIndex];
    usersDatabase.splice(userIndex, 1);
    
    return deletedUser;
};
