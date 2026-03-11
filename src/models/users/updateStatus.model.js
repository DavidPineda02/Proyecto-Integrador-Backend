let users = [];

export const updateStatusModel = async (id, status) => {
    const validStatuses = ['activo', 'inactivo', 'suspendido', 'eliminado'];
    
    if (!validStatuses.includes(status)) {
        throw new Error('Estado inválido. Debe ser: activo, inactivo, suspendido, o eliminado');
    }
    
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
    }
    
    users[userIndex].status = status;
    users[userIndex].updatedAt = new Date().toISOString();
    
    return users[userIndex];
};
