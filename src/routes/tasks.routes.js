// Define task-related routes. Function takes the Express app instance.
export const Tasks = (app) => {
    app.get('/tasks', (req, res) => {
        res.send('Ruta de tareas - se listarán las tareas');
    });

    app.post('/tasks', (req, res) => {
        res.send('Ruta de tareas - se creará una nueva tarea');
    });
};

