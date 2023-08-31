const client = require("../client");

// Query to create a videoLibrary

const createVideoLibrary = async ({
  instructor_id,
  style,
  level,
  videoURL,
}) => {
  try {
    // individual rows
    const {
      rows: [videoLibrary],
    } = await client.query(
      // INSERT SQL query
      // insert into table(col1, col2, col3, col4, col5)
      // VALUES(var1, var2, var3, var4, var5)
      // RETURNING everything
      `
        INSERT INTO videoLibraries(instructor_id, style, level, "videoURL")
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `,
      [instructor_id, style, level, videoURL]
    );
    return videoLibrary;
  } catch (error) {
    throw error;
  }
};

module.exports = { createVideoLibrary };
