import { tasksDatabase } from '../database.js';
export const findTaskByIdModel = async (id) => {
    return tasksDatabase.find((task) => task.id === id);
};
