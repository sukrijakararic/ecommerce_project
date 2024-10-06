const express = require("express");
const productsRouter = express.Router();
const { getProducts, getProductById } = require("../queries/products");

module.exports = (app) => {
    app.use("/products", productsRouter);
  productsRouter.get("/", getProducts);
  productsRouter.get("/:productId", getProductById);
};
