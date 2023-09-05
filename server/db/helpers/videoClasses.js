const client = require("../client");

// POST to create/add a class

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

// GET all videos

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

// GET video by video id

const getVideoClassById = async (videoId) => {
  try {
    const {
      rows: [videoClasses],
    } = await client.query(
      `
      SELECT *
      FROM videoclasses
      WHERE video_id = ${videoId}
    `
    );
    return videoClasses;
  } catch (error) {
    throw error;
  }
};

// PATCH - update video (if you added it)

const updateVideo = async (videoId, updatedFields) => {
  try {
    const { instructor_id, style, level, videoURL } = updatedFields;
    const query = `
      UPDATE videoclasses
      SET instructor_id = $2, style = $3, level = $4, "videoURL" = $5
      WHERE video_id = $1
      RETURNING *;
    `;

    const { rows } = await client.query(query, [
      videoId,
      instructor_id,
      style,
      level,
      videoURL,
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

const deleteVideo = async (videoId) => {
  try {
    await client.query(
      `
    DELETE FROM videoclasses
    WHERE video_id = $1;
    `,
      [videoId]
    );
    const {
      rows: [videoClass],
    } = await client.query(
      `
    DELETE FROM videoclasses
    WHERE video_id = $1
    RETURNING *
    `,
      [videoId]
    );
    return videoClass;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createVideoClass,
  getVideoClasses,
  getVideoClassById,
  updateVideo,
  deleteVideo,
};