// define task-related routes. function takes the express app instance.
export const tasks = (app) => {
    app.get('/tasks', (req, res) => {
        res.send('Ruta de tareas - se listarán las tareas');
    });

    app.post('/tasks', (req, res) => {
        res.send('Ruta de tareas - se creará una nueva tarea');
    });
};

