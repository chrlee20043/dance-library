const client = require("../client");

// Query to create a class

const createVideoClass = async ({ instructor_id, style, level, videoURL }) => {
  try {
    // individual rows
    const {
      rows: [videoClass],
    } = await client.query(
      // INSERT SQL query
      // insert into table(col1, col2, col3, col4, col5)
      // VALUES(var1, var2, var3, var4, var5)
      // RETURNING everything
      `
        INSERT INTO videoclasses(instructor_id, style, level, "videoURL")
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `,
      [instructor_id, style, level, videoURL]
    );
    return videoClass;
  } catch (error) {
    throw error;
  }
};

const getVideoClasses = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM videoclasses;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getVideoClassById = async (videoId) => {
  try {
    const {
      rows: [videoClasses],
    } = await client.query(`
      SELECT *
      FROM videoclasses
      WHERE video_id = ${videoId};
    `);
    return videoClasses;
  } catch (error) {
    throw error;
  }
};

const addVideoClass = async () => {
  try {
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createVideoClass,
  getVideoClasses,
  getVideoClassById,
  addVideoClass,
};
