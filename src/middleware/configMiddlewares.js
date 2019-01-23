const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// const session = require('express-session');
// const knexSessionStore = require('connect-session-knex')(session);

// const db = require('../data/configKnex')

// const sessionConfig = {
//   name: 'authBanana', //default is sid
//   secret: 'ldfksghjmgndf;lkghd;sazc,xvn;safjSVGForeignObjectElement.,NDFO;SZ',
//   cookie: {
//     maxAge: 1000 * 60 * 10, // 10 min. in milliseconds
//     secure: false, // only send cookie over https when true, during dev, set to false
//   },
//   httpOnly: true, // JS cant touch cookie
//   resave: false,
//   saveUninitialized: false,
//   store: new knexSessionStore({
//     tablename: 'sessions',
//     sidfieldname: 'sid',
//     knex: db,
//     createtable: true,
//     clearInterval: 1000 * 60 * 10, // in milliseconds
//   })
// };


module.exports = server => {
  // server.use(session(sessionConfig))
  server.use(morgan("dev"));
  server.use(helmet());
  server.use(express.json());
  server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
};
