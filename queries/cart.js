const db = require("../db/pool");

// This function just shows the cart for the logged in user before the order is placed by checking out.
const getCartByUserId = async (request, response, next) => {
  if (!request.user) {
    return response
      .status(401)
      .json({ error: "Please log in to veiw your cart" });
  }
  const userId = request.user.id;
  try {
    const result = await db.query(
      "SELECT name, qty, SUM(price * qty) AS total, description, cartid, productid FROM carts INNER JOIN  cartitems ON carts.id = cartitems.cartid join products on cartitems.productid = products.id WHERE userid = $1 GROUP BY name, description, cartid, productid, qty",
      [userId]
    );
    if (result.rows.length === 0) {
      return response.json({ message: "No items in cart" });
    } else {
      response.json(result.rows);
    }
  } catch (err) {
    console.log(err);
  }
};

//This function checks out the cart for the logged in user. It runs certain select queries to obtain the necessary information
//for the order and then inserts it into the orders table.
const checkout = async (request, response, next) => {
  if (!request.user) {
    return response
      .status(401)
      .json({ error: "Please log in to view your cart" });
  }
  const userId = request.user.id;
  const created = new Date();
  const modified = new Date();
  const status = "pending";

  try {
    const cartResult = await db.query(
      "SELECT SUM(price * qty) AS total FROM carts INNER JOIN cartitems ON carts.id = cartitems.cartid JOIN products ON cartitems.productid = products.id WHERE userid = $1",
      [userId]
    );

    const userCartResult = await db.query(
      "SELECT name, qty, price, description, cartid, productid FROM carts INNER JOIN cartitems ON carts.id = cartitems.cartid join products on cartitems.productid = products.id WHERE userid = $1",
      [userId]
    );

    const total = cartResult.rows[0].total;

    const result = await db.query(
      "INSERT INTO orders (userid, created, modified, status, total) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, created, modified, status, total]
    );

    const orderIdResult = await db.query(
      "SELECT id FROM orders WHERE userid = $1",
      [userId]
    );

    const orderId = orderIdResult.rows[0].id;

    const orderItemsResult = await Promise.all(
      userCartResult.rows.map(async (item) => {
        return await db.query(
          "INSERT INTO orderitems (productid, created, orderid, qty, price, name, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          [
            item.productid,
            created,
            orderId,
            item.qty,
            item.price,
            item.name,
            item.description,
          ]
        );
      })
    );

    const deleteCartItemsResult = await db.query(
      "DELETE FROM cartitems WHERE cartid = (SELECT id FROM carts WHERE userid = $1)",
      [userId]
    );
    response.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};
const deleteItemFromCart = async (request, response, next) => {
  const { productId } = request.body;
  if (!request.user) {
    return response
      .status(401)
      .json({ error: "Please log in to delete items from your cart" });
  }
  const userId = request.user.id;
  try {
    const result = await db.query(
      "DELETE FROM cartitems WHERE productid = $1 AND cartid = (SELECT id FROM carts WHERE userid = $2)",
      [productId, userId]
    );
    response.json({ message: "Item deleted from cart" });
  } catch (err) {
    console.log(err);
  }
};
const addProductToCart = async (request, response, next) => {
  if (!request.user) {
    return response
      .status(401)
      .json({ error: "Please log in to add items to your cart" });
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
  checkout,
};
