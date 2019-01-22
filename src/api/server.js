const express = require('express');
const configMiddleware = require('../middleware/configMiddlewares');

const userRouter = require('./users');

const server = express();

configMiddleware(server);

server.use('/api', userRouter);

module.exports = server;