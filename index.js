const express = require("express");
const cors = require("cors");
const db = require("./db");
const stream = require("./stream");
const messageRouter = require("./message/router");
const channelRouter = require("./channel/router");
const app = express();
const port = process.env.PORT || 4000;

const corsMiddleWare = cors();
app.use(corsMiddleWare);

const parser = express.json();
app.use(parser); //make this before any ENDPOINT!!

app.get("/stream", (request, response) => {
  stream.init(request, response); //to be able to use stream.send later ////connecting to the stream

  const action = { type: "ALL_MESSAGES", payload: db.messages }; //coming from db//OUTPUT IS JSON NOT OBJ!!

  stream.send(action); //sending update with all past msgs // change to action

  const channelAction = { type: "ALL_CHANNELS", payload: db.channels }; //coming from db

  stream.send(channelAction); //sending update with all past msgs // change to action
});

app.use(messageRouter);
app.use(channelRouter);

app.listen(port, () => console.log(`Listening on port: ${port}`));
