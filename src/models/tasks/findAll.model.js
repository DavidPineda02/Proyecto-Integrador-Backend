import { queryTaskRows } from '../database.js';

export const findAllTasksModel = async () => {
    return queryTaskRows();
};
