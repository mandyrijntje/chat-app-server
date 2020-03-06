const express = require("express");
const cors = require("cors");
const Sse = require("json-sse");
const app = express();
const port = 4000;

const db = {}; //fake database
db.messages = []; //fake db table

const corsMiddleWare = cors();
app.use(corsMiddleWare);

const parser = express.json();
app.use(parser); //make this before any ENDPOINT!!

const stream = new Sse();

app.get("/stream", (request, response) => {
  const action = { type: "ALL_MESSAGES", payload: db.messages }; //coming from db//OUTPUT IS JSON NOT OBJ!!
  stream.updateInit(action); //sending update with all past msgs // change to action
  stream.init(request, response);
}); //connecting to the stream

app.post("/message", (request, response, next) => {
  const { text } = request.body; //destructuring text
  db.messages.push(text); //push message to db
  response.send(text); //send back what you made

  const action = { type: "NEW_MESSAGE", payload: text };

  console.log("db test:", db);
  stream.send(action); //sending messages over stream
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
