// Require Client from pg
const { Client } = require("pg");

// Establishing connect to database

const dancelibrary = "dancelibrary";

// const client = new Client(`postgres://localhost:5433/${dancelibrary}`);
const client = new Client(
  `postgres://dancelibrary_user:IDld0Vrsbb7IsOIfCnn71YzJ7uP2bRjE@dpg-ckmvahv83ejs738j3v1g-a/dancelibrary`
);

// Export for use in other files

module.exports = client;
