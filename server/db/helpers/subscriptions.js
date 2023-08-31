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

module.exports = { createSubscription };
