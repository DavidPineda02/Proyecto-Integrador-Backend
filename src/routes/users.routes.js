// Define user-related routes. Function takes the Express app instance.
export const Users = (app) => {
    app.get('/users', (req, res) => {
        res.send('Ruta de usuarios - se listarán los usuarios');
    });

    app.post('/users', (req, res) => {
        res.send('Ruta de usuarios - se creará un nuevo usuario');
    });
};

