const express = require('express');
const configMiddleware = require('../middleware/configMiddlewares');
const errorHandlers = require("../middleware/errorHandlers");

const userRouter = require('./users');

const server = express();

configMiddleware(server);

server.use('/api', userRouter);
server.use(errorHandlers.notFound);
server.use(errorHandlers.errorHandler);

module.exports = server;