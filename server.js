const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running." });
});

app.post("/fb-track", (req, res) => {
  try {
    console.log(req.body);

    res.status(200).json({ success: true, message: "Tracking success." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to track." });
  }
});

app.listen(PORT, () => {
  console.log(`Tracking server is running successfully on port ${PORT}`);
});
