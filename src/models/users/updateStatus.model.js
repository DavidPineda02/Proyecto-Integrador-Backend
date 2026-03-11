import { usersDatabase } from './database.js';

export const updateStatusModel = async (id, status) => {
    const validStatuses = ['activo', 'inactivo', 'suspendido', 'eliminado'];
    
    if (!validStatuses.includes(status)) {
        throw new Error('Estado inválido. Debe ser: activo, inactivo, suspendido, o eliminado');
    }
    
    const userIndex = usersDatabase.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
    }
    
    usersDatabase[userIndex].status = status;
    usersDatabase[userIndex].updatedAt = new Date().toISOString();
    
    return usersDatabase[userIndex];
};
