const express = require('express');
const bcrypt = require("bcryptjs");
const db = require("../data/dbHelpers");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({message: "👋🌎🌍🌏"});
});

router.post("/register", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 14);
  db.insert(user)
    .then(ids => res.status(201).json({ id: ids[0] }))
    .catch(err => res.status(500).send(err));
});

router.post("/login", (req, res) => {
  const user = req.body;
  db.findUsername(user.username)
    .then(users => {
      if (
        users.length &&
        bcrypt.compareSync(user.password, users[0].password)
      ) {
        res.status(200).json({ message: "welcome" });
      } else {
        res.status(404).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).json({ message: "You shall not pass!" }));
});

router.get('/users', (req, res) => {
  db.findUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err))
})


module.exports = router;