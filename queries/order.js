const db = require("../db/pool");

const getOrders = async (request, response, next) => {
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

module.exports = { getOrders };