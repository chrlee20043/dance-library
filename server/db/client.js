// Require Client from pg
const { Client } = require("pg");

// Establishing connect to database

const danceLibrary = "danceLibrary";

const client = new Client(`postgres://localhost:5431/${danceLibrary}`);

// Export for use in other files

module.exports = client;
