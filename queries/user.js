const db = require("../db/pool");

const registerUser = async (request, response, next) => {
  const { email, password, firstname, lastname } = request.body;

  try {
    const result = await db.query(
      "INSERT INTO users (email, password, firstName, lastName) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, password, firstname, lastname]
    );
    response
      .status(201)
      .json({ message: "User created", user: result.rows[0] });
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (request, response, next) => {
  const id = parseInt(request.params.id);
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    response.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {registerUser, getUserById};
