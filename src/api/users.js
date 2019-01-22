const express = require('express');
const bcrypt = require("bcryptjs");
const db = require("../data/dbHelpers");
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const router = express.Router();

const dbConfig = require('../data/configKnex')

const sessionConfig = {
  name: 'authBanana', //default is sid
  secret: 'ldfksghjmgndf;lkghd;sazc,xvn;safjSVGForeignObjectElement.,NDFO;SZ',
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 min. in milliseconds
    secure: false, // only send cookie over https when true, during dev, set to false
  },
  httpOnly: true, // JS cant touch cookie
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    tablename: 'sessions',
    sidfieldname: 'sid',
    knex: dbConfig,
    createtable: true,
    clearInterval: 1000 * 60 * 10, // in milliseconds
  })
};

router.use(session(sessionConfig))

// SANITY CHECK UNPROTECTED
router.get("/", (req, res) => {
  res.json({message: "👋🌎🌍🌏"});
});


// REGISTER A USER
router.post("/register", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 14);
  db.insert(user)
    .then(ids => res.status(201).json({ id: ids[0] }))
    .catch(err => res.status(500).send(err));
});

// LOGIN ROUTE
router.post("/login", (req, res) => {
  const userCred = req.body;
  db.findUsername(userCred.username)
    .then(user => {
      console.log('user', user);
      
      if (user && bcrypt.compareSync(userCred.password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `welcome ${user.username}` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).json({ message: "You shall not pass!" }));
});

// PROTECTED MIDDLEWARE FUNCTION
function protected(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "You shall not pass!! NOT AUTHORIZED!!"})
  }
}

// PROTECTED USER ROUTE
router.get('/users', protected, (req, res) => {
  db.findUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err))
})

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.status(500).json({ message: "you can never leave"})
      } else {
        res.json({ message: "goodbye"})
      }
    })
  } else {
    res.json({message: "logged out already"})
  }
});

module.exports = router;