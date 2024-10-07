const db = require("../db/pool");

const getCartByUserId = async (request, response, next) => {
    const { userid } = request.params;
    try {
        const result = await db.query("SELECT * FROM carts WHERE id = $1", [userid]);
        response.json(result.rows);
    } catch (err) {
        console.log(err);
    }
}

const addProductToCart = async (request, response, next) => {
    try {
        const result = await db.query("INSERT INTO cartItems (cartId, productId, qty) VALUES ($1, $2, $3) RETURNING *", [cartId, productId, quantity]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCartByUserId,
    addProductToCart
}