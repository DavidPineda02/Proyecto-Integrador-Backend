let users = [];

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const updateModel = async (id, userData) => {
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
    }
    
    if (userData.email && !validateEmail(userData.email)) {
        throw new Error('Formato de email inválido');
    }
    
    if (userData.email) {
        const existingUser = users.find(user => user.email === userData.email && user.id !== id);
        if (existingUser) {
            throw new Error('El email ya existe');
        }
    }
    
    const updatedUser = {
        ...users[userIndex],
        ...userData,
        updatedAt: new Date().toISOString()
    };
    
    users[userIndex] = updatedUser;
    
    return updatedUser;
};
