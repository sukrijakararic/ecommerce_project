const db = require('../db/pool');

 const registerUser = async (request, response, next) => {
    const {email, password, firstName, lastName} = request.body;

    try {
        const result = await db.query(
            "INSERT INTO users (email, password, firstName, lastName) VALUES ($1, $2, $3, $4) RETURNING *", [email, password, firstName, lastName]
        );
        response.status(201).json({message: "User created", user: result.rows[0]});
    } catch (err) {
        console.log(err);
    }
}
module.exports = registerUser