const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { PORT, SESSION_SECRET } = require("./config");
const passport = require("passport");
const session = require("express-session");

const userRouter = require("./routes/user");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

// secuirty
app.use(cors());
app.use(helmet());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
      secure: false, // set to true if you're using HTTPS
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    Greetings: "Welcome to Pleigns! The best place to buy planes!",
    to_Make_Account_Or_Log_in:
      "Please use POST /users/register or POST /users/login. For /register please input a json of email, password, firstname and lastname and for /login please input a json of email and password. To see all users, go to GET /users. You can also GET user/:id",
    to_Change_Password:
      "Please use PUT /users/changePassword. For /changePassword please input a json of email and password",
    to_Delete_User:
      "Please use DELETE /users/:id to delete a user.",
    to_Log_out:
        "Please use POST /users/logout.",
    to_Get_Products:
      "Please use GET /products. You can also GET products/:productId",
    to_Add_To_Cart:
      "Please use POST /cart/addToCart. For /addToCart please input a json of productId and qty (qty can be amount you like)",
    to_See_Your_Cart: "Please use GET /cart/myCart",
    to_Delete_Item_From_Cart:
      "Please use DELETE /cart/deleteItemFromCart. For /deleteItemFromCart please input a json of the specific productId you want to delete from your cart",
    to_checkout: "Please use POST /cart/checkout",
    });
});

userRouter(app);
productsRouter(app);
cartRouter(app);
orderRouter(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
