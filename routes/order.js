const express = require("express");
const orderRouter = express.Router();
const { getOrders, deleteOrder, viewOrderItems } = require("../queries/order");

module.exports = (app) => {
    app.use("/orders", orderRouter);

    orderRouter.get("/myOrders", getOrders);
    orderRouter.get("/viewOrderItems", viewOrderItems);
    orderRouter.delete("/deleteOrder", deleteOrder);
}