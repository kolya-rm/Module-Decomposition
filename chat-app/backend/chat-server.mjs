import express from "express";
import cors from "cors";


const APP = express();
const PORT = 3000;

const MESSAGES = [];


APP.use(cors());

APP.get("/messages", (req, res) => {
  const since = req.query.since;
  // console.log(`Received a request for messages since: ${since}`);
  res.send(JSON.stringify(MESSAGES.filter(m => m.time > since)));
});

APP.post("/", (req, res) => {
  const bodyBytes = [];

  req.on("data", chunk => bodyBytes.push(...chunk));
  req.on("end", () => {
    const bodyString = String.fromCharCode(...bodyBytes);
    let body;

    try {
      body = JSON.parse(bodyString);
    } catch(error) {
      console.error(`Failed to parse body ${bodyString} as JSON: ${error}`);
      res.status(400).send("Expected body to be JSON");
      return;
    }
    if (typeof body != "object" || !("user" in body) || !("text" in body) || !("time" in body)) {
      console.error(`Failed to extract user, text, time from post body: ${body}`);
      res.status(400).send("Expected body to be a JSON object contains keys quote and author");
      return;
    }
    if (!body.user.length) {
      console.error(`User is empty.`);
      res.status(400).send("Expected user to be a non-empty string");
      return;
    }
    if (!body.text.length) {
      console.error(`Text is empty.`);
      res.status(400).send("Expected text to be a non-empty string");
      return;
    }
    MESSAGES.push({
      user: body.user,
      text: body.text,
      time: body.time,
    });
    res.send("ok");
  });
});

APP.listen(PORT, () =>{
  console.log(`Chat server starts and listening on port ${PORT}`);
})
