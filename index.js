const express = require("express");
const app = express();
const port = 4000;

const db = {}; //fake database
db.messages = []; //fake db table

const parser = express.json();
app.use(parser); //make this before any ENDPOINT!!

app.post("/message", (request, response, next) => {
  const { text } = request.body; //destructuring text
  db.messages.push(text); //push message to db
  response.send(text); //send back what you made
  console.log("db test:", db);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
