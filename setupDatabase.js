const { Client } = require("pg");
const { DB } = require("./config");

(async () => {
  const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS users (
      id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      email           VARCHAR(50)      NOT NULL,      
      password        TEXT             NOT NULL,
      firstName       VARCHAR(50)      NOT NULL,
      lastName        VARCHAR(50)      NOT NULL
    );
  `;

  const productsTableStmt = `
    CREATE TABLE IF NOT EXISTS products (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      name            VARCHAR(100)     NOT NULL,
      price           BIGINT          NOT NULL,
      description     VARCHAR(500)     NOT NULL
    );
  `;

  const ordersTableStmt = `
    CREATE TABLE IF NOT EXISTS orders (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      total           INT             NOT NULL,
      status          VARCHAR(50)     NOT NULL,
      userId          INT             NOT NULL,
      created         DATE            NOT NULL,
      modified        DATE            NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `;

  const orderItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS orderItems (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      created         DATE            NOT NULL,
      orderId         INT             NOT NULL,
      qty             INT             NOT NULL,
      price           INT             NOT NULL,
      productId       INT             NOT NULL,
      name            VARCHAR(50)     NOT NULL,
      description     VARCHAR(500)    NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id)
    );
  `;

  const cartsTableStmt = `
    CREATE TABLE IF NOT EXISTS carts (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      userId          INT             NOT NULL,
      modified        DATE            NOT NULL,
      created         DATE            NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `;

  const cartItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS cartItems (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      cartId          INT             NOT NULL,
      productId       INT             NOT NULL,
      qty             INT             NOT NULL,
      FOREIGN KEY (cartId) REFERENCES carts(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    );
  `;

  const populateProductsStmt = `
    INSERT INTO products (name, price, description)
    VALUES
      ('Cessna 172 Skyhawk', 359000, 'American four-seat, single-engine, high wing, fixed-wing aircraft made by the Cessna Aircraft Company.'),
      ('Searey', 1000000, 'The Progressive Aerodyne Searey is an American two-seat, single-engine, amphibious flying boat designed and manufactured by Progressive Aerodyne originally in Orlando, Florida, and now in Tavares, Florida.'),
      ('Cirrus Vision SF50', 3000000, 'The Cirrus Vision SF50, also known as the Vision Jet, is a single-engine very light jet designed and produced by Cirrus Aircraft of Duluth, Minnesota, United States.'),
      ('Vans RV-10', 120000, 'The RV-10 is a true four-person airplane, not just an airplane with four seats. It will carry four FAA standard adults, full fuel and sixty pounds of baggage while remaining at or below max gross weight.'),
      ('Lockheed Martin F-35 Lightning II', 100000000, 'The F-35 Lightning II, also known as the F-35 Lightning, is a family of single-seat, single-engine, all-weather stealth multirole fighters manufactured by Lockheed Martin.'),
      ('Cessna 150', 75000, 'The Cessna 150 is a two-seat, single-engine, fixed-wing aircraft manufactured by Cessna. It is one of the most popular flight training aircraft in the world.'),
      ('Cessna 182 Skylane', 790000, 'The Cessna 182 Skylane is an American four-seat, single-engine, light airplane built by Cessna of Wichita, Kansas. It has the option of adding two child seats in the baggage area.');
  `;

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT,
    });

    await db.connect();

    // Create tables on database
    await db.query(usersTableStmt);
    await db.query(productsTableStmt);
    await db.query(ordersTableStmt);
    await db.query(orderItemsTableStmt);
    await db.query(cartsTableStmt);
    await db.query(cartItemsTableStmt);

    // Populate products table
    await db.query(populateProductsStmt);

    await db.end();
  } catch (err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }
})();
