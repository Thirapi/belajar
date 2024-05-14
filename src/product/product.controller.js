const express = require('express');
const prisma = require('../db');

const { getAllUsers,
        getUsersById,
 } = require('./product.service');

 const router = express.Router();



router.get("/", async (req, res) => {
    const user = await getAllUsers(); 

    res.send(user);
});

router.get("/:id", async (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        const user = await getUsersById(parseInt(uid));
    
        res.send(user);
      } catch (err) {
        res.status(400).send(err.message);
      }
    });


router.post("/", async (req, res) => {
    const newUserData = req.body;

    const user = await prisma.user.create({
        data:{ 
            name: newUserData.name,
            price: newUserData.price,
            description: newUserData.description,
            image: newUserData.image,
        },
    });

    res.send({
        data: user,
        message: "create-product-success!!!"
    });
});

router.delete("/:id", async (req, res) => {
    const uid = req.params.id

    await prisma.user.delete({
        where: {
            id: parseInt(uid),
        }
    });

    res.send("Value deleted todd")
});

router.put("/:id", async (req, res) => {
    const uid = req.params.id;
    const userData = req.body;

    if (
        !(
            userData.name &&
            userData.price &&
            userData.description &&
            userData.image
        )
    ) {
        return res.status(400).send("ono seng kurang blog");
    }

    const user = await prisma.user.update({
        where: {
            id: parseInt(uid),
        },
        data: {
            name: userData.name,
            price: userData.price,
            description: userData.description,
            image: userData.image,  
        },
    });

    res.send({
        data: user,
        message: "keubah toddd",
    });
});

router.patch("/:id", async (req, res) => {
    const uid = req.params.id;
    const userData = req.body;

    const user = await prisma.user.update({
        where: {
            id: parseInt(uid),
        },
        data: {
            name: userData.name,
            price: userData.price,
            description: userData.description,
            image: userData.image,  
        },
    });

    res.send({
        data: user,
        message: "keubah toddd",
    });
});

module.exports = router;