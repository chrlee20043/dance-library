// Require Client from pg
const { Client } = require("pg");

// Establishing connect to database

const dbName = "dancelibrary";

// const client = new Client(`postgres://localhost:5433/${dancelibrary}`);
const client = new Client(
  `postgres://dancelibrary_2qwe_user:AruzamZbTU0GzYyZFJ2K7u6S2K8RCB6C@dpg-cl00gr6b0mos73di1o5g-a/dancelibrary_2qwe`
);

// Export for use in other files

module.exports = client;
