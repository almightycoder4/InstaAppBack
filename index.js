require("dotenv").config();
const jwt = process.env.JWT_SECRET_KEY;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDatabase = require("./database/connectDB");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/", authRouter);
app.use("/", postRouter);

app.get("/", (req, res) => {
  res.send("Hello Instagram App Evaluation..!!");
});
const port = process.argv[2] || 3035;

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(
      `Server listening to http requests on http://localhost:${port}`
    );
  });
});
