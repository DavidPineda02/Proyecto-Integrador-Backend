// define user-related routes. function takes the express app instance.
export const users = (app) => {
    app.get('/users', (req, res) => {
        res.send('Ruta de usuarios - se listarán los usuarios');
    });

    app.post('/users', (req, res) => {
        res.send('Ruta de usuarios - se creará un nuevo usuario');
    });
};

