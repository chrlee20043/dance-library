// this file will reset database
// pulling in connection to my local database

const client = require("./client");

const { createUser, getAllUsers } = require("./helpers/users");
const {
  createInstructor,
  getAllInstructors,
} = require("./helpers/instructors");
const { createVideoClass } = require("./helpers/videoClasses");
const { createSubscription } = require("./helpers/subscriptions");
const { createFavorite } = require("./helpers/favorites");

// imports
const {
  users,
  instructors,
  videoClasses,
  subscriptions,
  favorites,
} = require("./seedData");

// Drop tables
const dropTables = async () => {
  try {
    console.log("Starting to drop tables");
    await client.query(`
    DROP TABLE IF EXISTS favorites;
    DROP TABLE IF EXISTS subscriptions;
    DROP TABLE IF EXISTS videoClasses;
    DROP TABLE IF EXISTS instructors;
    DROP TABLE IF EXISTS users;
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
            "accountCreationDate" TIMESTAMPTZ,
            "subscriptionStatus" BOOLEAN
        );

        CREATE TABLE instructors (
            instructor_id SERIAL PRIMARY KEY,
            name varchar(255) NOT NULL,
            bio varchar(255) NOT NULL,
            style varchar(255) NOT NULL,
            "imageURL" varchar(255) NOT NULL
        );

        CREATE TABLE videoclasses (
            video_id SERIAL PRIMARY KEY,
            instructor_id INTEGER REFERENCES instructors(instructor_id) NOT NULL,
            instructor_name varchar(255) NOT NULL,
            style varchar(255) NOT NULL,
            level varchar(255) NOT NULL,
            "videoURL" varchar(255) NOT NULL,
            submitted_by INTEGER REFERENCES users(user_id) NOT NULL
        );

        CREATE TABLE subscriptions (
          subscription_id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(user_id) NOT NULL,
            annual BOOLEAN NOT NULL,
            monthly BOOLEAN NOT NULL,
            "studentDiscount" BOOLEAN NOT NULL
        );
        CREATE TABLE favorites (
          "favoriteId" SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(user_id) NOT NULL,
          "videoId" INTEGER REFERENCES videoclasses(video_id) NOT NULL
        )
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
      await getAllInstructors();
    }
    console.log("created instructors");
  } catch (error) {
    throw error;
  }
};

// Create videoLibraries
const createInitialVideoClasses = async () => {
  try {
    for (const videoClass of videoClasses) {
      await createVideoClass(videoClass);
      console.log(videoClass);
    }
    console.log("created classes");
  } catch (error) {
    throw error;
  }
};

// Create subscriptions
const createInitialSubscriptions = async () => {
  try {
    for (const subscription of subscriptions) {
      await createSubscription(subscription);
    }
    console.log("created subscriptions");
  } catch (error) {
    throw error;
  }
};

// Create favorites
const createInitialFavorites = async () => {
  try {
    for (const favorite of favorites) {
      await createFavorite(favorite);
    }
    console.log("created favorites");
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
    await createInitialVideoClasses();
    await createInitialSubscriptions();
    await createInitialFavorites();
    // await getInstructorsById(1);
    // await getUserById(1);
  } catch (error) {
    console.error(error);
  } finally {
    // close our connection
    client.end();
  }
};

rebuildDb();
