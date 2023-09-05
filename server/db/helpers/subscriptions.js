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

// GET - get all subscriptions

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

// GET - get subscription by user id

// SELECT subscriptions.*, users.user_id, users."subscriptionStatus" FROM subscriptions JOIN users ON users.user_id = subscriptions.user_id WHERE users.user_id = 1

const getSubByUserId = async (userId) => {
  try {
    const {
      rows: [subscriptions],
    } = await client.query(
      `
      SELECT subscriptions.*, users.user_id, users."subscriptionStatus"
      FROM subscriptions
      JOIN users ON users.user_id = subscriptions.user_id
      WHERE users.user_id = ${userId};
      `
    );
    return subscriptions;
  } catch (error) {
    throw error;
  }
};

// PUT - update instructor (if you added it)

const updateSubscription = async (updatedFields) => {
  try {
    const { userId, annual, monthly, studentDiscount } = updatedFields;
    const query = `
      UPDATE subscriptions
      SET annual = $2, monthly = $3, "studentDiscount" = $4
      WHERE user_id = $1
      RETURNING *;
    `;

    const { rows } = await client.query(query, [
      userId,
      annual,
      monthly,
      studentDiscount,
    ]);

    if (rows && rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

// DELETE subscription (if you added them)

const deleteSubscription = async (instructorId) => {
  try {
    await client.query(
      `
    DELETE FROM instructors
    WHERE instructor_id = $1;
    `,
      [instructorId]
    );
    const {
      rows: [instructor],
    } = await client.query(
      `
      DELETE FROM instructors
      WHERE instructor_id = $1
    RETURNING *
    `,
      [instructorId]
    );
    return instructor;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubByUserId,
  deleteSubscription,
  updateSubscription,
};
