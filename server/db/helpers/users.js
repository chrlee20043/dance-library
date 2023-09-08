const client = require("../client");

// POST - register user

// const registerUser = async ({ username, password, name }) => {
//   try {
//     const {
//       rows: [user],
//     } = await client.query(
//       `
//       INSERT INTO users(username, password, name)
//       VALUES($1, $2, $3)
//       RETURNING *;
//     `,
//       [username, password, name]
//     );
//     console.log(user);
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

// POST - login user

const loginUser = async ({ username, password }) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT *
      FROM users
      WHERE username=${username}
      AND password=${password}
    `);
    return user;
  } catch (error) {
    throw error;
  }
};

// Query to create a user

const createUser = async ({ username, password, name }) => {
  try {
    console.log({ username, password, name });
    // individual rows
    const {
      rows: [user],
    } = await client.query(
      // INSERT SQL query
      // insert into table(col1, col2, col3, col4, col5)
      // VALUES(var1, var2, var3, var4, var5)
      // RETURNING everything
      `
        INSERT INTO users(username, password, name)
        VALUES($1, $2, $3)
        RETURNING *;
    `,
      [username, password, name]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

// GET - get all users

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

// GET  - get user by id

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
  } catch (error) {
    throw error;
  }
};

// PUT - update user (if you it is me)

const updateUser = async (userId, updatedFields) => {
  try {
    const {
      username,
      password,
      name,
      accountCreationDate,
      subscriptionStatus,
    } = updatedFields;
    const query = `
      UPDATE users
      SET username = $2, password = $3, name = $4, "accountCreationDate" = $5, "subscriptionStatus" = $6
      WHERE user_id = $1
      RETURNING *;
    `;

    const { rows } = await client.query(query, [
      userId,
      username,
      password,
      name,
      accountCreationDate,
      subscriptionStatus,
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

// DELETE user (only if it is you)

const deleteUser = async (userId) => {
  try {
    await client.query(
      `
        DELETE FROM users
        WHERE user_id = $1;
      `,
      [userId]
    );
    const {
      rows: [user],
    } = await client.query(
      `
        DELETE FROM users
        WHERE user_id = $1
        RETURNING *
      `,
      [userId]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
