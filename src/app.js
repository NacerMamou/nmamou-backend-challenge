const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

// Importing postgres service throught knex name package
const knex = require("./services/postgres.service");

// Importing the categoriesRouter
const categoriesRouter = require("./routers/categories.router");

// Applying cors middleware to allow requests from anywhere
app.use(
  cors({
    origin: "*",
  })
);

// Applying BodyParser json middleware
app.use(bodyParser.json());

//Associate the categoriesRouter for all requests coming to  /categories
app.use("/categories", categoriesRouter);

module.exports = app;
