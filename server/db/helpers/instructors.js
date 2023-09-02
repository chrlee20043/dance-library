const client = require("../client");

const createInstructor = async ({ name, bio, style, imageURL }) => {
  try {
    const {
      rows: [instructor],
    } = await client.query(
      `
            INSERT INTO instructors(name, bio, style, "imageURL")
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `,
      [name, bio, style, imageURL]
    );
    return instructor;
  } catch (error) {
    throw error;
  }
};

// GET - /api/instructors - get all instructors

const getAllInstructors = async () => {
  try {
    const { rows } = await client.query(`
        SELECT *
        from instructors;
      `);
    return rows;
  } catch (error) {
    throw error;
  }
};

// GET - /api/instructors/:instructorId - get instructor by id

const getInstructorsById = async (instructorId) => {
  try {
    const {
      rows: [instructors],
    } = await client.query(`
      SELECT *
      FROM instructors
      WHERE instructor_id = ${instructorId};
    `);
    return instructors;
  } catch (error) {
    throw error;
  }
};

module.exports = { createInstructor, getAllInstructors, getInstructorsById };
