const prisma = require("../db");

const findUsers = async () => {
    const users = await prisma.user.findMany();

    return users;
};

const findUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    return user;
};

const insertUser = async (userData) => {
    const user = await prisma.user.create({
        data: {
          name: userData.name,
          description: userData.description,
          image: userData.image,
          price: userData.price,
        },
      });
    
      return user;
};

const deleteUser = async (id) => {
    await prisma.user.delete({
        where: {
            id,
        },
    });
};

const editUser = async (id, userData) => {
    const user = await prisma.user.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: userData.name,
            price: userData.price,
            description: userData.description,
            image: userData.image,  
        },
    });

    return user;
};

module.exports = {
    findUsers,
    findUserById,
    insertUser,
    deleteUser,
    editUser,
};