const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerUser = async (name, email, password, role) => {
  const db = await connect();
  const userCreated = await db.collection('users').insertOne({ name, email, password, role });
  const { _id } = userCreated.ops[0];
  return { _id, name, email, role };
};

const findUserById = async (id) => {
  const db = await connect();
  const findedUser = await db.collection('users').findOne({ _id: new ObjectId(id) });
  
  if (!findedUser) return null;
  
  const { _id, name, email, role } = findedUser;
  return { _id, name, email, role };
};

const findUserByEmail = async (email) => {
  const db = await connect();
  const findedUser = await db.collection('users').findOne({ email });
  
  if (!findedUser) return null;
  
  const { _id, name, role } = findedUser;
  return { _id, name, email, role };
};

const findUserToLogin = async (email, password) => {
  const db = await connect();
  const findedUser = await db.collection('users').findOne({ email, password });
  
  if (!findedUser) return null;
  
  const { _id, role } = findedUser;
  return { _id, email, role };
};

module.exports = {
  registerUser,
  findUserByEmail,
  findUserToLogin,
  findUserById,
};