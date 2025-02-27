const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

app.use(cors());
app.use(express.json());

app.post("/get-token", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ success: false, message: "Username required!" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ success: true, token });
});

app.post("/send-plan", async (req, res) => {
  // Process and send the email with all user details.
});
 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
