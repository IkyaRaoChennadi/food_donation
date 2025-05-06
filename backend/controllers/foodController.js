const multer = require("multer");
const path = require("path");
const Food = require("../models/Food");
const fs = require("fs");

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array("image", 10); // Allow multiple images

// Donate food with image upload
const donateFood = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Image upload failed", error: err });
    }

    try {
      const rawDonations = req.body.donations;
      let donations = [];

      if (Array.isArray(rawDonations)) {
        donations = rawDonations.map((d) => JSON.parse(d));
      } else {
        donations = [JSON.parse(rawDonations)];
      }

      if (donations.length === 0) {
        return res.status(400).json({ message: "No donation data provided" });
      }

      const newFoods = donations.map((donation, index) => ({
        ...donation,
        donatedBy: req.userId,
        image: req.files[index]
          ? `/uploads/${req.files[index].filename}`
          : null,
      }));

      const savedFoods = await Food.insertMany(newFoods);

      res.status(201).json({
        message: "Food items posted successfully",
        donated: savedFoods,
      });
    } catch (err) {
      console.error("Donation error:", err);
      res
        .status(500)
        .json({ message: "Error donating food", error: err.message });
    }
  });
};

// Get available/reserved foods
const getAvailableFoods = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("donatedBy", "firstName email")
      .populate("requestedBy", "firstName email")
      .select(
        "foodItem foodType quantity expiryDate description image status requestedBy donatedBy"
      )
      .sort({ createdAt: -1 });

    const foodsWithFullImageUrl = foods.map((food) => ({
      ...food.toObject(),
      image: food.image ? `http://localhost:5000${food.image}` : null,
    }));

    res.status(200).json(foodsWithFullImageUrl);
  } catch (err) {
    console.error("Fetch error:", err);
    res
      .status(500)
      .json({ message: "Error fetching foods", error: err.message });
  }
};

// Request food
const requestFood = async (req, res) => {
  const { foodId } = req.body;

  try {
    // Fetch the food to check if it's available
    const food = await Food.findOne({ _id: foodId, status: "available" });

    if (!food) {
      return res
        .status(400)
        .json({ message: "Food item is no longer available" });
    }

    // If food is available, update its status to reserved and set the requester
    food.status = "reserved";
    food.requestedBy = req.userId;
    await food.save();

    res.status(200).json({ message: "Food requested successfully", food });
  } catch (err) {
    console.error("Request error:", err);
    res
      .status(500)
      .json({ message: "Error requesting food", error: err.message });
  }
};

// ✅ Cancel food request
const cancelRequest = async (req, res) => {
  const { foodId } = req.body;
  const userId = req.userId; // Use req.userId directly

  try {
    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (String(food.requestedBy) !== userId) {
      return res.status(403).json({ message: "You didn't request this item" });
    }

    food.status = "available";
    food.requestedBy = null;
    await food.save();

    res.status(200).json({ message: "Request cancelled successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error cancelling request", error: err.message });
  }
};

// Accept a food request (donor accepts the request)
const acceptRequest = async (req, res) => {
  const { foodId } = req.body;
  const { userId } = req; // The user making the request is the donor

  try {
    // Find the food item by its ID and check if the user is the donor
    const food = await Food.findOne({ _id: foodId, donatedBy: userId });

    if (!food) {
      return res
        .status(404)
        .json({ message: "Food item not found or you are not the donor" });
    }

    // Check if the food is already reserved (requested)
    if (food.status === "reserved" && food.requestedBy) {
      // Accept the request by updating the status and confirming who requested it
      food.status = "accepted"; // Change the status to 'accepted'
      await food.save();

      // Send a response with updated food data
      res.status(200).json({
        message: "Food request accepted",
        food,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Food is not reserved or already accepted" });
    }
  } catch (err) {
    console.error("Accept request error:", err);
    res
      .status(500)
      .json({ message: "Error accepting request", error: err.message });
  }
};
// Get donation history
const getDonationHistory = async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";

    // Fetch the food donated by the user
    const donatedFoods = await Food.find({ donatedBy: req.userId })
      .populate("donatedBy", "firstName email")
      .populate("requestedBy", "firstName email")
      .select(
        "foodItem quantity expiryDate description image status requestedBy donatedBy"
      )
      .sort({ createdAt: -1 });

    // Fetch the food requested by the user
    const requestedFoods = await Food.find({ requestedBy: req.userId })
      .populate("donatedBy", "firstName email")
      .populate("requestedBy", "firstName email")
      .select(
        "foodItem quantity expiryDate description image status requestedBy donatedBy"
      )
      .sort({ createdAt: -1 });

    // Add full URL to images
    const donatedFoodsWithUrl = donatedFoods.map((food) => ({
      ...food.toObject(),
      image: food.image ? `${baseUrl}${food.image}` : null,
    }));

    const requestedFoodsWithUrl = requestedFoods.map((food) => ({
      ...food.toObject(),
      image: food.image ? `${baseUrl}${food.image}` : null,
    }));

    res.status(200).json({
      donatedFoods: donatedFoodsWithUrl,
      requestedFoods: requestedFoodsWithUrl,
    });
  } catch (err) {
    console.error("History fetch error:", err);
    res
      .status(500)
      .json({ message: "Error fetching donation history", error: err.message });
  }
};

/*
// Get donation history
const getDonationHistory = async (req, res) => {
  try {
    // Fetch the food donated by the user
    const donatedFoods = await Food.find({ donatedBy: req.userId })
      .populate("donatedBy", "firstName email")
      .populate("requestedBy", "firstName email")
      .select(
        "foodItem quantity expiryDate description image status requestedBy donatedBy"
      )
      .sort({ createdAt: -1 });

    // Fetch the food requested by the user
    const requestedFoods = await Food.find({ requestedBy: req.userId })
      .populate("donatedBy", "firstName email")
      .populate("requestedBy", "firstName email")
      .select(
        "foodItem quantity expiryDate description image status requestedBy donatedBy"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({ donatedFoods, requestedFoods });
  } catch (err) {
    console.error("History fetch error:", err);
    res
      .status(500)
      .json({ message: "Error fetching donation history", error: err.message });
  }
};
*/
module.exports = {
  donateFood,
  getAvailableFoods,
  requestFood,
  cancelRequest,
  acceptRequest, // Export the new function for accepting requests
  getDonationHistory,
};
