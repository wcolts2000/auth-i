const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 5000;
const db = require("./data/dbHelpers");

const server = express();

server.use(express.json());
server.use(morgan("short"));
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.post("/api/register", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 14);
  db.insert(user)
    .then(ids => res.status(201).json({ id: ids[0] }))
    .catch(err => res.status(500).send(err));
});

server.post("/api/login", (req, res) => {
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

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT}! ===\n`);
});

//Run app, then load http://localhost:5000 in a browser to see the output.
