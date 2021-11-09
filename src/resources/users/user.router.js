const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.addUser(req.body);
    if (user) {
      res.status(201).json(User.toResponse(user));
    } else {
      res.status(404).end('Something went wrong');
    }
  })

router.route('/:userId')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params.userId);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(404).end(`User with id: ${req.params.userId} does not exist`);
    }
  })
  .put(async (req, res) => {
    const user = await usersService.updateUser(req.params.userId, req.body);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(404).end(`User with id: ${req.params.userId} does not exist`);
    }
  })
  .delete(async (req, res) => {
    const result = await usersService.deleteUser(req.params.userId);
    if (result) {
      res.status(200).end(`User with id: ${req.params.userId} deleted`);
    } else {
      res.status(404).end(`User with id: ${req.params.userId} does not exist`);
    }
  })

module.exports = router;
