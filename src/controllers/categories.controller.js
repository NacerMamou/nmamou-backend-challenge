const knex = require("../services/postgres.service");

// This function make a call to the database to get categories data as it is specified in level1
// It uses the function getCategoriesFromDatabase wich return a promise
// The response is sent back when the categories data are fetched
// Otherwise error will be sent back

async function getCategories(request, response) {
  getCategoriesFromDatabase()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return response.status(404).json(err);
    });
}

// This function does the same job as the getCategories function
// It will add the children field for each category
// It uses the function getChildren to get data from database

async function getCategoriesAndChildren(request, response) {
  getCategoriesFromDatabase()
    .then((data) => {
      let childrenPromises = new Array();
      // We iterate to get children of each category
      for (let i = 0; i < data.length; i++) {
        // All the database queries promises are fired asynchronously
        let children = getChildren(data[i]);

        // Then they are pushed to a table to get track of them later
        childrenPromises.push(children);

        // When a children Promise resolves
        // We set the children field of the current category
        children.then((children) => {
          data[i].children = children;
        });
      }

      // To avoid blocking the event loop when awaiting all promises inside the for loop
      // We use Promise.all to assign a callback when all the promises resolve
      // The callback consists of sending back the response containg the data
      // This will make code performant and non blocking
      Promise.all([...childrenPromises]).then(() => {
        response.status(200).json(data);
      });
    })
    .catch((err) => {
      console.log(err);
      return response.status(404).json(err);
    });
}

// // This function does the same job as the getCategoriesAndChildren function
// // It will add the ancestors field for each category
// // IT uses the function getAncestors for this purpose

async function getCategoriesAndAll(request, response) {
  getCategoriesFromDatabase()
    .then((data) => {
      let childrenPromises = new Array();
      let ancestorsPromises = new Array();

      // We iterate to get children and ancestors of each category
      for (let i = 0; i < data.length; i++) {
        // All the database queries promises are fired asynchronously
        let children = getChildren(data[i]);
        let ancestors = getAncestors(data[i]);

        // Then they are pushed to a table to get track of them later
        childrenPromises.push(children);
        ancestorsPromises.push(ancestors);

        // When a children Promise resolves
        // We set the children field of the current category
        children.then((children) => {
          data[i].children = children;
        });

        // When an ancestors Promise resolves
        // We set the ancestors field of the current category
        ancestors.then((ancestors) => {
          data[i].ancestors = ancestors;
        });
      }

      // To avoid blocking the event loop when awaiting all promises inside the for loop
      // We use Promise.all to assign a callback when all the promises resolve
      // The callback consists of sending back the response containg the data
      // This will make code performant and non blocking
      Promise.all([...childrenPromises, ...ancestorsPromises]).then(() => {
        response.status(200).json(data);
      });
    })
    .catch((err) => {
      console.log(err);
      return response.status(404).json(err);
    });
}

// This function make a database query to get all the categories
// It will be used by the request handler functions inorder to sendback a response with data

async function getCategoriesFromDatabase() {
  return new Promise((resolve, reject) => {
    knex
      .select("id", "name")
      .from("categories")
      .orderBy("id", "asc")
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(new Error(`Failed to get categories from database. ${err}`));
      });
  });
}

// This function makes a database query to get the children of a category
// The fetched data are resolved through a promise
// If an errors occurs, it will be rejected
async function getChildren(category) {
  return new Promise((resolve, reject) => {
    knex
      .select("id", "name")
      .from("categories")
      .where("parent_id", category.id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(
          new Error(
            `Failed to get children of category ${category.name} : ${err}`
          )
        );
      });
  });
}

// // This function makes a database query to get the ancestors of a category
// // The fetched data are resolved through a promise
// // If an errors occurs, it will be rejected
async function getAncestors(category) {
  return new Promise((resolve, reject) => {
    knex
      .select("id", "name")
      .from("categories")
      .innerJoin("categories_closure", function () {
        this.on("categories.id", "=", "categories_closure.ancestor_id")
          .on("categories_closure.descendant_id", "=", category.id)
          .on("categories_closure.ancestor_id", "!=", category.id);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(
          new Error(
            `Failed to get ancestors of category ${category.name} : ${err}`
          )
        );
      });
  });
}

// Exporting the needed functions to handle requests for the categoriesRouter

module.exports = {
  getCategories,
  getCategoriesAndChildren,
  getCategoriesAndAll,
};
