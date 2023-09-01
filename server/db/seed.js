// this file will reset database
// pulling in connection to my local database

const client = require("./client");

const { createUser, getAllUsers } = require("./helpers/users");
const {
  createInstructor,
  getInstructorsById,
} = require("./helpers/instructors");
const { createVideoLibrary } = require("./helpers/videoLibraries");
const { createSubscription } = require("./helpers/subscriptions");

// imports
const {
  users,
  instructors,
  videoLibraries,
  subscriptions,
} = require("./seedData");

// Drop tables
const dropTables = async () => {
  try {
    console.log("Starting to drop tables");
    await client.query(`
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS instructors CASCADE;
        DROP TABLE IF EXISTS videoLibraries CASCADE;
        DROP TABLE IF EXISTS subscriptions CASCADE;
        `);
    console.log("Tables dropped");
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
};

// Create tables
const createTables = async () => {
  console.log("Building tables");
  await client.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            name varchar(255) NOT NULL,
            "accountCreationDate" DATE NOT NULL,
            "subscriptionStatus" BOOLEAN NOT NULL
        );

        CREATE TABLE instructors (
            instructor_id SERIAL PRIMARY KEY,
            name varchar(255) NOT NULL,
            bio varchar(255) NOT NULL,
            style varchar(255) NOT NULL,
            "imageURL" varchar(255) NOT NULL
        );

        CREATE TABLE videoLibraries (
            video_id SERIAL PRIMARY KEY,
            instructor_id INTEGER REFERENCES instructors(instructor_id),
            style varchar(255) NOT NULL,
            level varchar(255) NOT NULL,
            "videoURL" varchar(255) NOT NULL
        );

        CREATE TABLE subscriptions (
            user_id INTEGER REFERENCES users(user_id),
            annual BOOLEAN NOT NULL,
            monthly BOOLEAN NOT NULL,
            "studentDiscount" BOOLEAN NOT NULL
        );
    `);
  console.log("Tables built!");
};

// Insert mock data from seedData

// Create users
const createInitialUsers = async () => {
  try {
    // Loop through the "users" array from the seedData
    for (const user of users) {
      // Insert each user into the table
      await createUser(user);
      await getAllUsers();
    }
    console.log("created users");
  } catch (error) {
    throw error;
  }
};

// Create instructors
const createInitialInstructors = async () => {
  try {
    for (const instructor of instructors) {
      await createInstructor(instructor);
    }
    console.log("created instructors");
  } catch (error) {
    throw error;
  }
};

// Create videoLibraries
const createVideoLibraries = async () => {
  try {
    for (const videoLibrary of videoLibraries) {
      await createVideoLibrary(videoLibrary);
    }
    console.log("created videoLibraries");
  } catch (error) {
    throw error;
  }
};

// Create subscriptions
const createSubscriptions = async () => {
  try {
    for (const subscription of subscriptions) {
      await createSubscription(subscription);
    }
    console.log("created subscriptions");
  } catch (error) {
    throw error;
  }
};

// Call all functions and 'BUILD' my database

const rebuildDb = async () => {
  try {
    // connect to local database
    client.connect();
    // run our functions
    await dropTables();
    await createTables();

    // Generating starting data
    console.log("starting to seed...");
    await createInitialUsers();
    await createInitialInstructors();
    await createVideoLibraries();
    await createSubscriptions();
    await getInstructorsById(1);
  } catch (error) {
    console.error(error);
  } finally {
    // close our connection
    client.end();
  }
};

rebuildDb();
