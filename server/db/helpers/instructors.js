const client = require("../client");

const createInstructor = async ({
  name,
  bio,
  style,
  imageURL,
  submitted_by,
}) => {
  try {
    const {
      rows: [instructor],
    } = await client.query(
      `
        INSERT INTO instructors(name, bio, style, "imageURL", submitted_by)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      [name, bio, style, imageURL, submitted_by]
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

// GET - /api/instructors/:instructorId - get instructor by instructor id

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

// PUT - update instructor (if you added it)

const updateInstructor = async (instructorId, updatedFields) => {
  try {
    const { name, bio, style, imageURL, submitted_by } = updatedFields;
    const query = `
      UPDATE instructors
      SET name = $2, bio = $3, style = $4, "imageURL" = $5, submitted_by = $6
      WHERE instructor_id = $1
      RETURNING *;
    `;

    const { rows } = await client.query(query, [
      instructorId,
      name,
      bio,
      style,
      imageURL,
      submitted_by,
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

// DELETE instructor (if you added them)

const deleteInstructor = async (instructorId) => {
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
  createInstructor,
  getAllInstructors,
  getInstructorsById,
  updateInstructor,
  deleteInstructor,
};
