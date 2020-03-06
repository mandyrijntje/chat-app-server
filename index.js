const express = require("express");
const Sse = require("json-sse");
const app = express();
const port = 4000;

const db = {}; //fake database
db.messages = []; //fake db table

const parser = express.json();
app.use(parser); //make this before any ENDPOINT!!

const stream = new Sse();

app.get("/stream", (request, response) => {
  stream.init(request, response);
}); //connecting to the stream

app.post("/message", (request, response, next) => {
  const { text } = request.body; //destructuring text
  db.messages.push(text); //push message to db
  response.send(text); //send back what you made
  console.log("db test:", db);
  stream.send(text); //sending messages over stream
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
