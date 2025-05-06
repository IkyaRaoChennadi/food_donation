/*const express = require("express");
const { donateFood } = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route to donate food
router.post("/donate", authMiddleware, donateFood);

module.exports = router;
*/
const express = require("express");
const {
  donateFood,
  getAvailableFoods,
  requestFood,
  cancelRequest,
  getDonationHistory,
  acceptRequest,
} = require("../controllers/foodController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/donate", authMiddleware, donateFood);
router.get("/", authMiddleware, getAvailableFoods);
router.post("/request", authMiddleware, requestFood);
router.post("/cancel-request", authMiddleware, cancelRequest);
router.get("/history", authMiddleware, getDonationHistory);
router.post("/accept-request", authMiddleware, acceptRequest);

module.exports = router;
