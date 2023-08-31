// this file will reset database
// pulling in connection to my local database

const client = require("./client");

// Drop tables
const dropTables = async () => {
  try {
    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS instructors;
        DROP TABLE IF EXISTS videoLibraries;
        DROP TABLE IF EXISTS subscriptions;
        `);
  } catch (error) {
    throw error;
  }
};

// Create tables
const createTables = async () => {
  await client.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            name varchar(255) NOT NULL,
            accountCreationDate NOT NULL,
            subscriptionStatus BOOLEAN NOT NULL
        );

        CREATE TABLE instructors (
            instructor_id SERIAL PRIMARY KEY,
            name varchar(255) NOT NULL,
            bio varchar(255) NOT NULL,
            style varchar(255) NOT NULL,
            imageURL varchar(255) NOT NULL
        );

        CREATE TABLE videoLibraries (
            video_id SERIAL PRIMARY KEY,
            main_instructor_id INTEGER REFERENCES instructors(instructor_id),
            style varchar(255) NOT NULL,
            level varchar(255) NOT NULL,
            videoURL varchar(255) NOT NULL
        );

        CREATE TABLE subscriptions (
            subscription_user_id INTEGER REFERENCES users(user_id),
            annual BOOLEAN NOT NULL,
            monthly BOOLEAN NOT NULL,
            studentDiscount BOOLEAN NOT NULL
        );
    `);
};

// Insert mock data from seedData

// Call all functions and 'BUILD' my database

const rebuildDb = async () => {
  try {
    // connect to local database
    client.connect();
    // run our functions
    await dropTables();
    await createTables();
  } catch (error) {
    console.error(error);
  } finally {
    // close our connection
    client.end();
  }
};

rebuildDb();
