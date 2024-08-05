const pool = require("./pool");

module.exports = {
  getUserByUsername: async (username) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0];
  },

  createUser: async (user) => {
    const { username, password, first_name, last_name, membership_status } =
      user;
    const result = await pool.query(
      "INSERT INTO users (username, password, first_name, last_name, membership_status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, password, first_name, last_name, membership_status]
    );
    return result.rows[0];
  },

  findByIdAndUpdateMembership: async (id) => {
    const result = await pool.query(
      "UPDATE users SET membership_status = $1 WHERE id = $2 RETURNING *",
      ["member", id]
    );

    return result.rows[0];
  },

  createMessage: async (message) => {
    const { title, text, author } = message;
    const result = await pool.query(
      "INSERT INTO messages (title, text, author) VALUES ($1, $2, $3) RETURNING *",
      [title, text, author]
    );

    return result.rows[0];
  },

  deleteMessageById: async (id) => {
    const result = await pool.query(
      "DELETE from messages WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  },

  getAllMessagesAndTheirAuthors: async () => {
    const result = await pool.query(
      "SELECT m.id, m.text, m.title, m.timestamp, u.id AS author_id, u.username, u.first_name, u.last_name FROM messages m JOIN users u ON m.author = u.id ORDER BY m.timestamp DESC"
    );

    return result.rows;
  },
};
