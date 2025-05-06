/*

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Parse JSON data
const cors = require("cors");
app.use(cors()); // This enables CORS for all domains, can be restricted later if needed
const path = require("path");

// Serve uploaded images from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Parse JSON data
const cors = require("cors");
app.use(cors()); // This enables CORS for all domains, can be restricted later if needed
const path = require("path");

// Serve uploaded images from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
