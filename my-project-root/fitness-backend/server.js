const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); // ✅ Import JWT for authentication
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Secret Key for JWT
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Keep it safe!

// ✅ Generate Token Route (Use this to get a token)
app.post("/get-token", (req, res) => {
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ success: false, message: "Username is required!" });
  }

  // 🔥 Generate a JWT token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ success: true, token });
});

// ✅ Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied! No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token!" });
    }
    req.user = decoded;
    next();
  });
};

// ✅ Home Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// ✅ Send Plan Route (Now protected with JWT)
app.post("/send-plan", verifyToken, async (req, res) => {
  const { name, email, goal } = req.body;

  if (!email || !goal) {
    return res.status(400).json({ success: false, message: "Email and goal are required!" });
  }

  let fitnessPlan = {};

  if (goal === "muscle_gain") {
    fitnessPlan = {
      dailyCalories: 3000,
      workoutSplit: ["Day 1: Chest & Triceps", "Day 2: Back & Biceps", "Day 3: Legs & Abs"],
      dietPlan: {
        breakfast: "6 egg whites, 2 whole eggs, oatmeal with peanut butter",
        lunch: "Grilled chicken breast, brown rice, steamed broccoli",
        dinner: "Salmon, quinoa, sautéed vegetables",
        snacks: "Protein shake, almonds, banana",
        macros: { protein: "200g", carbs: "300g", fats: "80g" },
      },
    };
  } else if (goal === "weight_loss") {
    fitnessPlan = {
      dailyCalories: 1800,
      workoutSplit: ["Day 1: HIIT Cardio", "Day 2: Strength Training", "Day 3: Active Recovery"],
      dietPlan: {
        breakfast: "Scrambled egg whites, avocado toast, black coffee",
        lunch: "Grilled tofu, quinoa salad, green tea",
        dinner: "Baked fish, steamed spinach, sweet potato",
        snacks: "Greek yogurt, walnuts, blueberries",
        macros: { protein: "150g", carbs: "150g", fats: "50g" },
      },
    };
  } else if (goal === "maintain_weight") {
    fitnessPlan = {
      dailyCalories: 2500,
      workoutSplit: ["Day 1: Full Body Strength", "Day 2: Light Cardio & Core", "Day 3: Mobility & Stretching"],
      dietPlan: {
        breakfast: "Whole grain toast, boiled eggs, fruit smoothie",
        lunch: "Grilled turkey, mixed greens, whole wheat wrap",
        dinner: "Stir-fried veggies with tofu and brown rice",
        snacks: "Hummus with carrots, mixed nuts",
        macros: { protein: "170g", carbs: "250g", fats: "60g" },
      },
    };
  } else {
    return res.status(400).json({ success: false, message: "Invalid goal!" });
  }

  const message = `Hi ${name}, here is your personalized fitness plan:\n
  🏋️‍♂️ **Workout Split:**\n${fitnessPlan.workoutSplit.join("\n")}\n
  🍽️ **Diet Plan:**\n
  - **Breakfast:** ${fitnessPlan.dietPlan.breakfast}
  - **Lunch:** ${fitnessPlan.dietPlan.lunch}
  - **Dinner:** ${fitnessPlan.dietPlan.dinner}
  - **Snacks:** ${fitnessPlan.dietPlan.snacks}\n
  🔥 **Macros:** Protein: ${fitnessPlan.dietPlan.macros.protein}, Carbs: ${fitnessPlan.dietPlan.macros.carbs}, Fats: ${fitnessPlan.dietPlan.macros.fats}
  `;

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

// ✅ Required for Vercel Deployment
module.exports = app;
