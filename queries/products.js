const db = require("../db/pool");



  const getProducts = async (request, response, next) => {
    try {
      const result = await db.query("SELECT * FROM products");
      response.json(result.rows);
    } catch (err) {
      console.log(err);
    }};

    const getProductById = async (request, response, next) => {
      const { productId } = request.params;
      try {
        const result = await db.query("SELECT * FROM products WHERE id = $1", [
          productId,
        ]);
        response.json(result.rows);
      } catch (err) {
        console.log(err);
      }
    };

    module.exports = { getProducts, getProductById };
