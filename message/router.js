const express = require("express");
const db = require("../db");
const stream = require("../stream");

const { Router } = express;

const router = Router();

router.post("/message", (request, response) => {
  const { text, channel } = request.body;

  const message = { text, channel };

  db.messages.push(message);

  response.send(message);

  const action = {
    type: "NEW_MESSAGE",
    payload: message,
  };

  stream.send(action);
});

module.exports = router;
