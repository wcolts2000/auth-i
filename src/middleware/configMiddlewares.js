const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const errorHandlers = require("./errorHandlers");


module.exports = server => {
  server.use(morgan("dev"));
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  
  
  // server.use(errorHandlers.notFound);
  // server.use(errorHandlers.errorHandler);
};
