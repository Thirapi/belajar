const express = require('express');
const prisma = require('../db');

const { getAllUsers,
        getUserById,
        createUser,
        deleteUserById,
        patchUserById,
        editUserById,
 } = require('./product.service');

 const router = express.Router();



router.get("/", async (req, res) => {
    const user = await getAllUsers(); 

    res.send(user);
});

router.get("/:id", async (req, res) => {
    try {
        const uid = parseInt(req.params.id)
        const user = await getUserById(parseInt(uid));
    
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }

})


router.post("/", async (req, res) => {
    try {
        const newUserData = req.body;

        const user = await createUser(newUserData);
    
        res.send({
            data: user,
            message: "create-product-success!!!"
        });        
    } catch (error) {
        res.status(400).send(error.message);    
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const uid = req.params.id;

        await deleteUserById(parseInt(uid));

        res.send("udah kehapus banh");  
    } catch (error) {
        res.status(400).send(error.message)
    }
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

    const user = await editUserById(parseInt(uid), userData)

    res.send({
        data: user,
        message: "keubah toddd",
    });
});

router.patch("/:id", async (req, res) => {
try {
    const uid = req.params.id;
    const userData = req.body;

    const user = await editUserById(parseInt(uid), userData);

    res.send({
        data: user,
        message: "edit patch berhasil euy",
    }); 
} catch (error) {
    res.status(400).send(error.message);
}
});

module.exports = router;