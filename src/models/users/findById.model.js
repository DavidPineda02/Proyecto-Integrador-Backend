let users = [];

export const findByIdModel = async (id) => {
    return users.find(user => user.id === id);
};
