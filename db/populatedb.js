const { Client } = require("pg");
require("dotenv").config();
const { argv } = require("node_process");

const SQLTABLES = `
 CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(200) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  membership_status VARCHAR(50) NOT NULL CHECK (membership_status IN ('regular', 'member', 'admin')) DEFAULT 'regular'
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  author INTEGER NOT NULL REFERENCES users(id)
);

  `;

async function main() {
  if (argv.length < 3) {
    console.error("Please provide the connection string as an argument.");
    process.exit(1);
  }

  const connectionString = argv[2];
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    await client.query(SQLTABLES);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    await client.end();
  }

  console.log("done");
}

main();
