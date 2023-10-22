const client = require("../client");

const getAllFavorites = async () => {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM favorites;
          `);
    // console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getFavoriteById = async (favoriteId) => {
  try {
    const {
      rows: [favorite],
    } = await client.query(
      `
              SELECT *
              FROM favorites
              WHERE "favoriteId" = $1;
            `,
      [favoriteId]
    );
    return favorite;
  } catch (error) {
    throw error;
  }
};

const getFavoritesByUserId = async (userId) => {
  try {
    const { rows } = await client.query(
      `
                  SELECT *
                  FROM favorites
                  WHERE "userId" = $1;
                `,
      [userId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getFavoritesByVideoId = async (videoId) => {
  try {
    const { rows } = await client.query(
      `
                    SELECT *
                    FROM favorites
                    WHERE "videoId" = $1;
                  `,
      [videoId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createFavorite = async ({ userId, videoId }) => {
  try {
    const {
      rows: [favorite],
    } = await client.query(
      `
        INSERT INTO favorites("userId", "videoId")
        VALUES($1, $2)
        RETURNING *;
      `,
      [userId, videoId]
    );
    return favorite;
  } catch (error) {
    throw error;
  }
};

const deleteFavorite = async (favoriteId) => {
  try {
    const {
      rows: [favorite],
    } = await client.query(
      `
                DELETE FROM favorites
                WHERE "favoriteId" = $1
                RETURNING *;
              `,
      [favoriteId]
    );

    return favorite;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllFavorites,
  createFavorite,
  deleteFavorite,
  getFavoriteById,
  getFavoritesByUserId,
  getFavoritesByVideoId,
};
