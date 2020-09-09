const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");
const repo = require("./../repos/user.repo");
const auth = require("./../common/auth");
const { encrypt } = require("./../common/encrypt");
require("./../common/db");

/**
 *
 * @param {*} req
 * @param {*} req
 * get an user by user id
 */
const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      const item = await repo.readById(id);

      res.status(200).send(item);
      return;
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(404);
  }
};

/**
 *
 * @param {*} req
 * @param {*} req
 * get an user by account number
 */
const getUserByAccountNumber = async (req, res) => {
  try {
    const key = req.params.key;

    if (key) {
      const item = await repo.readByAccountNumber(key);

      res.status(200).send(item);
      return;
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(404);
  }
};

/**
 *
 * @param {*} req
 * @param {*} req
 * get users by identity number
 */
const getUserByIdentityNumber = async (req, res) => {
  try {
    const key = req.params.key;

    if (key) {
      const list = await repo.readByIdentityNumber(key);

      res.status(200).send(list);
      return;
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(404);
  }
};

/**
 *
 * @param {*} req
 * @param {*} req
 * add new single user
 */
const addUser = async (req, res) => {
  try {    
    const item = await repo.insert(req.body);

    res.status(200).send(item);
  } catch (err) {
    res.sendStatus(400);
  }
};

/**
 *
 * @param {*} req
 * @param {*} req
 * update an existing user by user id
 */
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      const item = await repo.update({id, ...req.body});

      res.status(200).send(item);
      return;
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(400);
  }
};

/**
 *
 * @param {*} req
 * @param {*} req
 * delete an existing user by user id
 */
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      const item = await repo.deleteById(id);

      res.status(200).send(item);
      return;
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(400);
  }
};

/**
 *
 * @param {*} req
 * @param {*} req
 * login to the system
 */
const login = async (req, res) => {
  try {
    const {userName, password} = req.body;

    if (userName && password) {
      const item = await repo.readByCredentials(userName, encrypt(password));

      if (item) {
        const token = jwt.sign({username: userName}, auth.getSecretKey());
        
        res.status(200).send({token});
        return;
      }      
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(400);
  }
};


module.exports = {
  getUser,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  addUser,
  updateUser,
  deleteUser,
  login
}
