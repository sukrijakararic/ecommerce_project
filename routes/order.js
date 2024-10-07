const express = require("express");
const orderRouter = express.Router();
const { getOrders } = require("../queries/order");

module.exports = (app) => {
    app.use("/order", orderRouter);

    orderRouter.get("/myOrders", getOrders);
}