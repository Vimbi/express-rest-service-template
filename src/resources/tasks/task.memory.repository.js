const tasks = require('../../common/data/tasks');
const Task = require('./task.model');

const getAll = async () => tasks;

const addTask = async (data) => {
  const task = new Task(data);
  tasks.push(task);
  return task;
}

const getTaskId = async (id) => {
  const result = tasks.find(task => task.id === id);
  return result;
}

const updateTask = async (id, data) => {
  let result = tasks.find(task => task.id === id);
  const { title, order, description, userId, boardId, columnId } = data;
  if (result) {
    result = Object.assign(result, { title, order, description, userId, boardId, columnId })
    tasks[id] = result;
  }
  return result;
}

const deleteTask = async (id) => {
  const index = tasks.findIndex(task => task.id === id);
  let result;
  if (index !== -1) {
    tasks.splice(index, 1);
    result = true;
  } else {
    result = false;
  }
  return result;
}

const deleteBoardTasks = async (id) => {
  const boardTasks = await tasks.filter(task => task.boardId === id);
  if (boardTasks.length) boardTasks.forEach(task => deleteTask(task.id));
}

const updateDeleteUserTasks = async (id) => {
  const userTasks = await tasks.filter(task => task.userId === id);
  if (userTasks.length) userTasks.forEach(task => updateTask(task.id, { userId: null }));
}

module.exports = { getAll, addTask, getTaskId, updateTask, deleteTask, deleteBoardTasks, updateDeleteUserTasks };
