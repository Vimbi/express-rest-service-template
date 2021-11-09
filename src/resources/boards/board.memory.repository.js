const boards = require('../../common/data/boards');
const Board = require('./board.model');

const getAll = async () => boards;

const addBoard = async (data) => {
  const board = new Board(data);

  boards.push(board);
  return board;
}

const getBoardId = async (id) => {
  const result = boards.find(board => board.id === id);
  return result;
}

const updateBoard = async (boardId, data) => {
  let result = boards.find(board => board.id === boardId);
  const { title, columns } = data;
  if (result) {
    result = Object.assign(result, { title, columns })
    boards[boardId] = result;
  }
  return result;
}

const deleteBoard = async (id) => {
  const index = boards.findIndex(board => board.id === id);
  let result;
  if (index !== -1) {
    boards.splice(index, 1);
    result = true;
  } else {
    result = false;
  }
  return result;
}

module.exports = { getAll, addBoard, getBoardId, updateBoard, deleteBoard };
