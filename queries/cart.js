const db = require("../db/pool");

const getCartByUserId = async (request, response, next) => {
  const { userid } = request.params;
  try {
    const result = await db.query("SELECT * FROM carts WHERE id = $1", [
      userid,
    ]);
    response.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const addProductToCart = async (request, response, next) => {
  if (!request.user) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { productId, qty } = request.body;

    if (!productId) {
      return response.status(400).json({ error: "Missing productId parameter" });
    }

    const productResult = await db.query(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );
    if (!productResult.rows[0]) {
      throw new Error(`Product not found with ID ${productId}`);
    }

    const cartResult = await db.query(
      "SELECT * FROM carts WHERE userid = $1",
      [request.user.id] // Use req.user.id directly
    );
    if (!cartResult.rows[0]) {
      throw new Error(`Cart not found for user with ID ${request.user.id}`);
    }
    const cartId = cartResult.rows[0].id;

    await db.query(
      "INSERT INTO cartItems (cartId, productid, qty ) VALUES ($1, $2, $3)",
      [cartId, productId, qty]
    );

    response.json({ message: "Product added to cart" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getCartByUserId,
  addProductToCart,
};
