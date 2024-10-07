const express = require("express");
const cartRouter = express.Router();
const {getCartByUserId, addProductToCart, deleteItemFromCart } = require("../queries/cart");

module.exports = (app) => {
    app.use("/cart", cartRouter);
    cartRouter.get("/myCart", getCartByUserId);
    cartRouter.post("/addToCart", addProductToCart);
    cartRouter.delete("/deleteItemFromCart", deleteItemFromCart);
}