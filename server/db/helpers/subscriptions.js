const client = require("../client");

// Query to create a subscription

const createSubscription = async ({
  user_id,
  annual,
  monthly,
  studentDiscount,
}) => {
  try {
    // individual rows
    const {
      rows: [subscription],
    } = await client.query(
      // INSERT SQL query
      // insert into table(col1, col2, col3, col4, col5)
      // VALUES(var1, var2, var3, var4, var5)
      // RETURNING everything
      `
        INSERT INTO subscriptions(user_id, annual, monthly, "studentDiscount")
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `,
      [user_id, annual, monthly, studentDiscount]
    );
    return subscription;
  } catch (error) {
    throw error;
  }
};

// GET - /api/subscriptions - get all subscriptions

const getAllSubscriptions = async () => {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM subscriptions;
        `);
    // console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
};

// GET - /api/subscriptions/:userId - get user by id

const getSubByUserId = async (userId) => {
  try {
    const { rows: subscriptions } = await client.query(
      `
      SELECT subscriptions.*, users.user_id, users.subscriptionStatus
      FROM subscriptions
      JOIN users ON users.user_id = subscriptions.user_id
      WHERE user_id = ${userId};
    `[userId]
    );
    return users;
  } catch (error) {
    throw error;
  }
};

// GET - get user by username

// async function getUserByUsername(username) {
//   // first get the user
//   try {
//     const { rows } = await client.query(
//       `
//       SELECT *
//       FROM users
//       WHERE username = $1;
//     `,
//       [username]
//     );
//     if (!rows || !rows.length) return null;
//     const [user] = rows;
//     delete user.password;
//     return user;
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubByUserId,
};
