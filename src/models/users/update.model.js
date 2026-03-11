import { usersDatabase } from './database.js';

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const updateModel = async (id, userData) => {
    const userIndex = usersDatabase.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
    }
    
    if (userData.email && !validateEmail(userData.email)) {
        throw new Error('Formato de email inválido');
    }
    
    if (userData.email) {
        const existingUser = usersDatabase.find(user => user.email === userData.email && user.id !== id);
        if (existingUser) {
            throw new Error('El email ya existe');
        }
    }
    
    const updatedUser = {
        ...usersDatabase[userIndex],
        ...userData,
        updatedAt: new Date().toISOString()
    };
    
    usersDatabase[userIndex] = updatedUser;
    
    return updatedUser;
};
