const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(express.json())

app.get("/api", (req, res) => {
    res.send("Hello World")
});

const PORT = process.env.PORT;

const productController = require('./product/product.controller');
app.use("/users", productController);

app.listen(PORT, () => {
    console.log("express API running " + PORT);
});