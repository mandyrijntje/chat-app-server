const express = require("express");
const db = require("../db");
const stream = require("../stream");

const { Router } = express;

const router = Router();

router.post("/message", (request, response, next) => {
  const { text } = request.body; //destructuring text
  db.messages.push(text); //push message to db
  response.send(text); //send back what you made

  const action = { type: "NEW_MESSAGE", payload: text };

  console.log("db test:", db);
  stream.send(action); //sending messages over stream
});

module.exports = router;
