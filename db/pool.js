const { Pool} = require("pg")

require("dotenv").config()



module.exports = new Pool({
    connectionString: process.env.PROD_DB || process.env.DEV_DB
})