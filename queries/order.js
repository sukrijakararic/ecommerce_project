const db = require("../db/pool");

const getOrders = async (request, response, next) => {
  if (!request.user) {
    return response
      .status(401)
      .json({ error: "Please log in to see your orders" });
   }
  const userId = request.user.id;
  try {
    const result = await db.query("SELECT * FROM orders WHERE userid = $1", [
      userId,
    ]);
    response.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const viewOrderItems = async (request, response, next) => {
  if (!request.user) {
    return response.json({ error: "Please log in to view order items" });
  }
  const userId = request.user.id;
  try {
    const result = await db.query("SELECT * FROM orderitems JOIN orders ON orderitems.orderid = orders.id WHERE userid = $1", [
      userId,
    ]);
    response.json(result.rows);
  } catch (err) {
    console.log(err);
  }
 }

const deleteOrder = async (request, response, next) => { 
  if (!request.user) {
    return response.json({ error: "Please log in to delete an order" });
  }
  const userId = request.user.id;
  try {
    const deleteOrderItems = await db.query(
      "DELETE FROM orderitems WHERE orderid IN (SELECT id FROM orders WHERE userid = $1)",
      [userId]
    );

    const result = await db.query("DELETE FROM orders WHERE userid = $1", [userId]);
    response.json({ message: "Order deleted" });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getOrders, deleteOrder, viewOrderItems };