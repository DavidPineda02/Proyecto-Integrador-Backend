let users = [];

const generateUserId = () => {
    return Date.now().toString();
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const createModel = async (userData) => {
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
};
