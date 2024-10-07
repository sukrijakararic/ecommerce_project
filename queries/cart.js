const db = require("../db/pool");

const getCartByUserId = async (request, response, next) => {
  const userId = request.user.id;
  try {
    const result = await db.query(
      "SELECT name, price, description, cartid, productid, qty FROM carts INNER JOIN  cartitems ON carts.id = cartitems.cartid join products on cartitems.productid = products.id WHERE userid = $1",
      [userId]
    );
    response.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const deleteItemFromCart = async (request, response, next) => {
  const { productId } = request.body;
  const userId = request.user.id;
  try {
    const result = await db.query(
      "DELETE FROM cartitems WHERE productid = $1 AND cartid = (SELECT id FROM carts WHERE userid = $2)",
      [productId, userId]
    );
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
      return response
        .status(400)
        .json({ error: "Missing productId parameter" });
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
  deleteItemFromCart,
};
