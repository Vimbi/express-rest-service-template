const router = require('express').Router({mergeParams: true});
// const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.status(200).json(tasks);
  })
  .post(async (req, res) => {
    const task = await tasksService
      .addTask(Object.assign(req.body, { boardId: req.params.boardId }));
    if (task) {
      res.status(201).json(task);
    } else {
      res.status(404).end('Something went wrong');
    }
  })

router.route('/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getTask(req.params.taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).end(`Task with id: ${req.params.taskId} does not exist`);
    }
  })
  .put(async (req, res) => {
    const task = await tasksService.updateTask(req.params.taskId, req.body);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).end(`Task with id: ${req.params.taskId} does not exist`);
    }
  })
  .delete(async (req, res) => {
    const result = await tasksService.deleteTask(req.params.taskId);
    if (result) {
      res.status(200).end(`Task with id: ${req.params.taskId} deleted`);
    } else {
      res.status(404).end(`Task with id: ${req.params.taskId} does not exist`);
    }
  })

module.exports = router;
