const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { facebookEventHandler } = require("./modules/facebook");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running." });
});

// Facebook
app.get("/fb/:eventName/:eventId", facebookEventHandler);

app.listen(PORT, () => {
  console.log(`Tracking server is running successfully on port ${PORT}`);
});
