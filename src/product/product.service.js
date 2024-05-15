const prisma = require('../db');
const {
    findUsers,
    findUserById,
    insertUser,
    deleteUser,
    editUser,
  } = require("./product.repository");

const getAllUsers = async () => {
    const users = await findUsers();

    return users;
};

const getUserById = async (id) => {

const user = await findUserById(parseInt(id));

if (!user) {
    throw Error("User Not Found")
}; 

return user
};

const createUser = async (newUserData) => {
    const user = await insertUser(newUserData);

    return user;
};

const deleteUserById = async (id) => {
    await getUserById(id);

    await deleteUser(id);
};

const editUserById = async (id, userData) => {
    await getUserById(id);

    const user = await editUser(id, userData)

    return user;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    editUserById,
};