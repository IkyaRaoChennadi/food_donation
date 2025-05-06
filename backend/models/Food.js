const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    foodItem: { type: String, required: true },
    foodType: { type: String, enum: ["Veg", "Non-Veg"], required: true },
    quantity: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    description: { type: String },
    image: { type: String }, // Field to store the image URL
    donatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["available", "reserved", "accepted"], // Updated enum to include 'accepted'
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
