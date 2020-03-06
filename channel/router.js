const express = require("express");
const db = require("../db");
const stream = require("../stream");

const { Router } = express;

const router = Router();

router.post("/channel", (request, response, next) => {
  const { name } = request.body; //destructuring text
  db.channels.push(name); //push message to db
  response.send(name); //send back what you made

  const action = { type: "NEW_CHANNEL", payload: name };

  console.log("db test:", db);
  stream.send(action); //sending messages over stream
});

module.exports = router;
