const client = require("../client");

// Query to create a user

const createUser = async ({
  username,
  password,
  name,
  accountCreationDate,
  subscriptionStatus,
}) => {
  try {
    // individual rows
    const {
      rows: [user],
    } = await client.query(
      // INSERT SQL query
      // insert into table(col1, col2, col3, col4, col5)
      // VALUES(var1, var2, var3, var4, var5)
      // RETURNING everything
      `
        INSERT INTO users(username, password, name, "accountCreationDate", "subscriptionStatus")
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
    `,
      [username, password, name, accountCreationDate, subscriptionStatus]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM users;
        `);
    // console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const {
      rows: [users],
    } = await client.query(`
      SELECT *
      FROM users
      WHERE user_id = ${userId};
    `);
    return users;
  } catch {}
};

module.exports = { createUser, getAllUsers, getUserById };
