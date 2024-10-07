const express = require("express");
const cartRouter = express.Router();
const {getCartByUserId } = require("../queries/cart");

module.exports = (app) => {
    app.use("/cart", cartRouter);
    cartRouter.get("/:userid", getCartByUserId);
}