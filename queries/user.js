const db = require("../db/pool");
const bcrypt = require("bcrypt");

const showUsers = async (request, response, next) => {
    try {
        const result = await db.query("SELECT firstname, lastname FROM users");
        response.json(result.rows);
    } catch (err) {
        console.log(err);
    }
}
// Register a new user
const registerUser = async (request, response, next) => {
  // Extract the email, password, firstname, and lastname from the request body
  const { email, password, firstname, lastname } = request.body;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the user into the database and return the newly inserted user
    const result = await db.query(
      "INSERT INTO users (email, password, firstName, lastName) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, firstname, lastname]
    );

    // Return a 201 Created response with the newly inserted user
    response
      .status(201)
      .json({ message: "User created", user: firstname });
  } catch (err) {
    console.log(err);
  }
};


// Get a user by their email and password
const getUserByEmailAndPassword = async (email) => {
  try {
    // Query the database for a user with the given email
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // Return the user if found, null otherwise
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }

};
const getUserById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {registerUser, getUserByEmailAndPassword, showUsers, getUserById};
