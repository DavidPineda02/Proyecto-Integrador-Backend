import express from 'express';

const app = express();
const PORT = 3000;

// import route setup functions (named exports)
import { users } from './routes/users.routes.js';
import { tasks } from './routes/tasks.routes.js';

// register routes with the app
users(app);
tasks(app);

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`)
})