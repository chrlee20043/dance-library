const client = require("../client");

// POST to create/add a class

const createVideoClass = async ({
  instructor_id,
  instructor_name,
  style,
  level,
  videoURL,
  submitted_by,
}) => {
  try {
    // Define the SQL query
    const query = `
      INSERT INTO videoclasses(instructor_id, instructor_name, style, level, "videoURL", submitted_by)
      SELECT i.instructor_id, $2, $3, $4, $5, $6
      FROM instructors AS i
      WHERE i.instructor_id = $1
      RETURNING *;
    `;

    // Execute the SQL query
    const {
      rows: [videoClass],
    } = await client.query(query, [
      instructor_id,
      instructor_name,
      style,
      level,
      videoURL,
      submitted_by,
    ]);

    return videoClass;
  } catch (error) {
    throw error;
  }
};

// GET all videos

const getAllVideos = async () => {
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

// GET videos with instructor name

const getVideoClassesWithInstructorName = async () => {
  try {
    // console.log("get class with instructor name");
    const { rows } = await client.query(`
      SELECT instructors.name AS instructor_name, instructors."imageURL" AS "imageURL", instructors.bio AS "instructorBio", videoclasses.*
      FROM instructors
      JOIN videoclasses ON instructors.instructor_id = videoclasses.instructor_id;
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
        SELECT instructors.name AS instructor_name, instructors."imageURL" as "imageURL", instructors.bio AS "instructorBio", videoclasses.*
        FROM instructors
        JOIN videoclasses ON instructors.instructor_id = videoclasses.instructor_id
        WHERE video_id = ${videoId};
      `
    );
    return videoClasses;
  } catch (error) {
    throw error;
  }
};

// GET video by instructor id

const getVideoClassesByInstructorId = async (instructorId) => {
  try {
    const { rows } = await client.query(
      `
        SELECT instructors.name AS instructor_name, videoclasses.*
        FROM instructors
        JOIN videoclasses ON instructors.instructor_id = videoclasses.instructor_id WHERE videoclasses.instructor_id = ${instructorId};
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

// GET - get video by user id (if you submitted it)

const getVideoClassesBySubmitterId = async (userId) => {
  try {
    const { rows } = await client.query(
      `
        SELECT users.user_id AS "userId", users.username AS username, videoclasses.*
        FROM users
        JOIN videoclasses ON users.user_id = videoclasses.submitted_by
        WHERE videoclasses.submitted_by = $1;
      `,
      [userId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

// PUT - update video (if you added it)

const updateVideoClass = async (videoId, updatedFields) => {
  try {
    const { instructor_id, instructor_name, style, level, videoURL } =
      updatedFields;
    const query = `
      UPDATE videoclasses
      SET instructor_id = $2, instructor_name = $3, style = $4, level = $5, "videoURL" = $6
      WHERE video_id = $1
      RETURNING *;
    `;

    const { rows } = await client.query(query, [
      videoId,
      instructor_id,
      instructor_name,
      style,
      level,
      videoURL,
    ]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteVideoClass = async (videoId) => {
  try {
    await client.query(
      `
        DELETE FROM videoclasses
        WHERE video_id = ${videoId};
      `
    );
    const {
      rows: [videoClass],
    } = await client.query(
      `
        DELETE FROM videoclasses
        WHERE video_id = ${videoId}
        RETURNING *
      `
    );
    return videoClass;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllVideos,
  createVideoClass,
  getVideoClassesWithInstructorName,
  getVideoClassById,
  getVideoClassesByInstructorId,
  getVideoClassesBySubmitterId,
  updateVideoClass,
  deleteVideoClass,
};
