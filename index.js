const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const messageRouter = require("./message/router");
const channelRouter = require("./channel/router");

const corsMiddleWare = cors();
app.use(corsMiddleWare);

const jsonParser = express.json();
app.use(jsonParser);

app.use(messageRouter);
app.use(channelRouter);

app.listen(port, () => console.log(`Listening on port: ${port}`));
