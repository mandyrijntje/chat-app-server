const express = require("express");
const cors = require("cors");
const messageRouter = require("./message/router");
const channelRouter = require("./channel/router");
const stream = require("./stream");
const db = require("./db");

const app = express();

const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const parser = express.json();
app.use(parser);

app.get("/stream", (request, response) => {
  stream.init(request, response);

  const action = {
    type: "ALL_MESSAGES",
    payload: db.messages,
  };
  stream.send(action);

  const channelAction = {
    type: "ALL_CHANNELS",
    payload: db.channels,
  };

  stream.send(channelAction);
});

app.use(messageRouter);
app.use(channelRouter);

app.listen(port, () => console.log(`App listening on :${port}`));
