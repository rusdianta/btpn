const User = require("../models/user");

/**
 *
 * @param {*} id
 * get user by id
 */
async function readById(id) {
  const item = User.findById(id);

  return item;
}

/**
 *
 * @param {*} userName
 * @param {*} password
 * get user by userName and password
 */
async function readByCredentials(userName, password) {
  const item = User.findOne({userName, password});

  return item;
}

/**
 *
 * @param {*} accountNumber
 * get user by account number
 */
async function readByAccountNumber(accountNumber) {
  const item = User.findOne({accountNumber});

  return item;
}

/**
 *
 * @param {*} identityNumber
 * get users by identity number
 */
async function readByIdentityNumber(identityNumber) {
  const list = User.find({identityNumber});

  return list;
}

/**
 *
 * @param {*} data
 * create new user
 */
async function insert(data) {
  const newItem = new User({userName: data.userName, password: data.password, accountNumber: data.accountNumber, emailAddress: data.emailAddress, identityNumber: data.identityNumber})

  return await newItem.save();
}

/**
 *
 * @param {*} data
 * update an existing user
 */
async function update(data) {
  const item = await User.findById(data.id);
  item.userName = data.userName;
  item.password = data.password;
  item.accountNumber = data.accountNumber;
  item.emailAddress = data.emailAddress;
  item.identityNumber = data.identityNumber;

  return await item.save();
}

/**
 *
 * @param {*} id
 * delete existing user by id
 */
async function deleteById(id) {
  return User.findByIdAndDelete(id);
}

module.exports = {
  readById,
  readByAccountNumber,
  readByIdentityNumber,
  readByCredentials,
  insert,
  update,
  deleteById
};