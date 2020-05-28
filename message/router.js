const express = require("express");
const { Router } = express;
const router = Router();
const Sse = require("json-sse");
const stream = new Sse();

const Message = require("./model");

router.get("/stream", async (request, response, next) => {
  try {
    const messages = await Message.findAll();
    const json = JSON.stringify(messages);
    stream.updateInit(json);
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});
router.get("/message", async (request, response, next) => {
  try {
    const messages = await Message.findAll();
    response.send(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/message", async (request, response, next) => {
  try {
    const { body } = request;
    const { text } = body;
    const unit = { text };
    const message = await Message.create(unit);
    const json = JSON.stringify(message);
    stream.send(json);
    response.send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
