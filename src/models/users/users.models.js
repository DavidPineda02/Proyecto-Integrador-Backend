let users = [
  
];

const generateUserId = () => {
    return Date.now().toString();
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const UserModel = {
    findAll: async () => {
        return users;
    },

    findById: async (id) => {
        return users.find(user => user.id === id);
    },

    create: async (userData) => {
        if (!userData.firstName || !userData.lastName || !userData.email) {
            throw new Error('Faltan campos requeridos: firstName, lastName, email');
        }
        
        if (!validateEmail(userData.email)) {
            throw new Error('Formato de email inválido');
        }
        
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('El email ya existe');
        }
        
        const newUser = {
            id: generateUserId(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            status: userData.status || 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        users.push(newUser);
        
        return newUser;
    },

    update: async (id, userData) => {
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
    },

    updateStatus: async (id, status) => {
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
    },

    delete: async (id) => {
        const userIndex = users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            throw new Error('Usuario no encontrado');
        }
        
        const deletedUser = users[userIndex];
        users.splice(userIndex, 1);
        
        return deletedUser;
    }
};