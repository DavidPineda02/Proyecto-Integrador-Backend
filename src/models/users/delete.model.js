let users = [];

export const deleteModel = async (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
    }
    
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    
    return deletedUser;
};
