import { tasksDatabase } from '../database.js';

export const findAllTasksModel = async () => {
    return tasksDatabase;
};
