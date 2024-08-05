const pool = require("./db/pool")


module.exports = {
    getUserByUsername: async (username) => {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        return result.rows[0]
    },

    createUser: async(user) => {
        const {username, password, first_name, last_name, membership_status} = user
        const result = await pool.query(
            "INSERT INTO users (username, password, first_name, last_name, membership_status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [username, password, first_name, last_name, membership_status]
        )
        return result.rows[0]
    }
    

}