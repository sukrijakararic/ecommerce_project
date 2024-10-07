const express = require("express");
const cartRouter = express.Router();
const {getCartByUserId, addProductToCart } = require("../queries/cart");

module.exports = (app) => {
    app.use("/cart", cartRouter);
    cartRouter.get("/:userid", getCartByUserId);
    //cartRouter.post("/:userid", addProductToCart);
}