const router = require('express').Router();
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');

router.route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    if (boards) {
      res.status(200).json(boards);
    } else {
      res.status(404).end('Something went wrong');
    }
  })
  .post(async (req, res) => {
    const board = await boardsService.addBoard(req.body);
    if (board) {
      res.status(201).json(board);
    } else {
      res.status(404).end('Something went wrong');
    }
  })

router.route('/:boardId')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params.boardId);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).end(`Board with id: ${req.params.boardId} does not exist`);
    }
  })
  .put(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.boardId, req.body);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).end(`Board with id: ${req.params.boardId} does not exist`);
    }
  })
  .delete(async (req, res) => {
    const result = await boardsService.deleteBoard(req.params.boardId);
    if (result) {
      res.status(200).end(`Board with id: ${req.params.boardId} deleted`);
    } else {
      res.status(404).end(`Board with id: ${req.params.boardId} does not exist`);
    }
  })

router.use('/:boardId/tasks', taskRouter);

module.exports = router;
