// Load the environement variables using dotenv package
require("dotenv").config();

// This is the configuration of the postgress service using knex package
// It uses the environement variables loaded from .env file
// Inorder to make this service working in your machine
// You have to set your own parameters( user, password, database, host and port) in .env file
// Your postgres user must have the authorization to create and manage databases
const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

module.exports = knex;
