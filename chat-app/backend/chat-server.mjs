import express from "express";
import cors from "cors";


const APP = express();
const PORT = 3000;


const EXAMPLE = [
  { user: "Tony", text: "Hi!" },
  { user: "Agnes", text: "Hello!" },
];


APP.use(cors());

APP.get("/", (req, res) => {
  console.log("Received a request for messages");
  res.send(JSON.stringify(EXAMPLE));
});

APP.listen(PORT, () =>{
  console.log(`Chat server starts and listening on port ${PORT}`);
})
