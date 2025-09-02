const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Simple API route for rover navigation
app.get("/", (req, res) => {
  res.send("🚀 Rover Navigation Backend is running...");
});

app.post("/api/rover/update", (req, res) => {
  const { roverId, location, velocity } = req.body;

  // Dummy prediction logic (can be replaced with RL model)
  const prediction = {
    nextPosition: {
      lat: location.lat + 0.0001 * velocity,
      lng: location.lng,
    },
    confidence: 0.9,
  };

  res.json({ message: "Rover updated", roverId, prediction });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
