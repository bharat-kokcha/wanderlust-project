require('dotenv').config(); // 🟢 Loads .env

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection URI from .env file
const uri = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose (without deprecated options)
mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  });

// Simple route
app.get('/', (req, res) => {
  res.send('🌍 Wanderlust Backend is Running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
