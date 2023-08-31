// Require Client from pg
const { Client } = require("pg");

// Establishing connect to database

const dancelibrary = "dancelibrary";

const client = new Client(`postgres://localhost:5431/${dancelibrary}`);

// Export for use in other files

module.exports = client;
