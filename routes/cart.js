const express = require("express");
const cartRouter = express.Router();
const {getCartByUserId, addProductToCart, deleteItemFromCart, checkout } = require("../queries/cart");

module.exports = (app) => {
    app.use("/cart", cartRouter);
    cartRouter.get("/myCart", getCartByUserId);
    cartRouter.post("/addToCart", addProductToCart);
    cartRouter.post("/checkout", checkout);
    cartRouter.delete("/deleteItemFromCart", deleteItemFromCart);
}