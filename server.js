const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // ✅ body-parser remove kar diya

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.post("/send-plan", async (req, res) => {
  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required!" });
  }

  const fitnessPlan = {
    dailyCalories: 2000,
    workoutSplit: ["Day 1: Chest", "Day 2: Back", "Day 3: Legs"],
    dietPlan: ["Breakfast: Oatmeal", "Lunch: Chicken Salad", "Dinner: Grilled Fish"],
    macros: { protein: "150g", carbs: "200g", fats: "50g" },
  };

  const message = `Hi ${name}, here is your personalized fitness plan:\n
    - Daily Calories: ${fitnessPlan.dailyCalories}
    - Workout Split: ${fitnessPlan.workoutSplit.join("\n")}
    - Diet Plan: ${fitnessPlan.dietPlan.join("\n")}
    - Macros: Protein ${fitnessPlan.macros.protein}, Carbs ${fitnessPlan.macros.carbs}, Fats ${fitnessPlan.macros.fats}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Personalized Fitness Plan",
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Plan sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send plan." });
  }
});

// Corrected PORT Configuration
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
