const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  insert: user => {
    return db("users").insert(user);
  },
  findUsername: username => {
    return db("users").where("username", username);
  }
};
