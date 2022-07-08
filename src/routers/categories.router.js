const express = require("express");
const categoriesRouter = express.Router();

// Import the handler functions for the requests
const {
  getCategories,
  getCategoriesAndChildren,
  // getCategoriesAndAll,
} = require("../controllers/categories.controller");

// Associating handlers for the routes
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/children", getCategoriesAndChildren);
// categoriesRouter.get("/all", getCategoriesAndAll);

// Exporting the categoryRouter to be used in app.js
module.exports = categoriesRouter;
