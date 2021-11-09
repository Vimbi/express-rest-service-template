const users = require('../../common/data/users');
const User = require('./user.model');

const getAll = async () => users;

const addUser = async (data) => {
  const user = new User(data);
  users.push(user);
  return user;
}

const getUserId = async (id) => {
  const result = users.find(user => user.id === id);
  return result;
}

const updateUser = async (id, data) => {
  let result = users.find(user => user.id === id);
  const { name, login, password } = data;
  if (result) {
    result = Object.assign(result, { name, login, password })
    users[id] = result;
  }
  return result;
}

const deleteUser = async (id) => {
  const index = users.findIndex(user => user.id === id);
  let result;
  if (index !== -1) {
    users.splice(index, 1);
    result = true;
  } else {
    result = false;
  }
  return result;
}

module.exports = { getAll, addUser, getUserId, updateUser, deleteUser };
