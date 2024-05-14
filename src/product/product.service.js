const prisma = require('../db');

const getAllUsers = async () => {
    const users = await prisma.user.findMany();

    return users;
};

const getUsersById = async () => {
    const user = await findUsersById(id);

    if (!user) {
        throw Error("user ngga ketemu");
    }

    return user;
};

module.exports = {
    getAllUsers
};