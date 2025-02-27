import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Email sending route
app.post("/send-email", async (req, res) => {
  const { name, email, mobile, age, gender, current_weight, height, activity, goal } = req.body;

  // Setup email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your Gmail email from .env
      pass: process.env.PASSWORD, // Your App password from .env
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your Custom Fitness Plan",
    text: `Hello ${name},\n\nHere is your personalized fitness plan:\n\nMobile: ${mobile}\nAge: ${age}\nGender: ${gender}\nCurrent Weight: ${current_weight}kg\nHeight: ${height}cm\nActivity Level: ${activity}\nGoal: ${goal}\n\nStay healthy!\n- GymCPP Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
