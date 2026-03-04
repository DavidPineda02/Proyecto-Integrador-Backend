import express from 'express';

const app = express();
const PORT = 3000;

// import route setup functions (named exports)
import { Users } from './routes/users.routes.js';
import { Tasks } from './routes/tasks.routes.js';

// register routes with the app
Users(app);
Tasks(app);

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`)
})