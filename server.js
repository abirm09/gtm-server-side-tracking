const express = require("express");
const cors = require("cors");
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

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running." });
});

app.get("/fb-track", (req, res) => {
  try {
    console.log({ ...req.query });

    res.status(200).json({ success: true, message: "Tracking success." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to track." });
  }
});

app.listen(PORT, () => {
  console.log(`Tracking server is running successfully on port ${PORT}`);
});
