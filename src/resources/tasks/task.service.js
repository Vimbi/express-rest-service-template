const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const addTask = (data) => tasksRepo.addTask(data);

const getTask = (id) => tasksRepo.getTaskId(id);

const updateTask = (id, data) => tasksRepo.updateTask(id, data);

const deleteTask = (id) => tasksRepo.deleteTask(id);

const deleteBoardTasks = (id) => tasksRepo.deleteBoardTasks(id);

const updateDeleteUserTasks = (id) => tasksRepo.updateDeleteUserTasks(id);

module.exports = { getAll, addTask, getTask, updateTask, deleteTask, deleteBoardTasks, updateDeleteUserTasks };
