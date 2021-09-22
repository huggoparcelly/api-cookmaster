const connect = require('./connection');

const createAdmin = async (name, email, password, role) => {
  const db = await connect();
  const userCreated = await db.collection('users').insertOne({ name, email, password, role });
  const { _id } = userCreated.ops[0];
  return { _id, name, email, role };
};

module.exports = {
  createAdmin,
};