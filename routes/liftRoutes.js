const express = require("express");
const {
  createLift,
  liftById,
  isOwner,
  liftsByUser,
  updateLift,
  deleteLift
} = require("../controllers/lift");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createLiftValidator } = require("../controllers/validator/index");

const router = express.Router();

// Create a lift
router.post(
  "/lift/new/:userId",
  requireSignin,
  createLift,
  createLiftValidator
);

// Get lifts
router.get("/lift/by/:userId/:liftId", requireSignin, isOwner, liftsByUser);

// Update lifts
router.put("/lift/:liftId", requireSignin, isOwner, updateLift);

// Delete a lift
router.delete("/lift/:liftId", requireSignin, isOwner, deleteLift);

router.param("userId", userById);
router.param("liftId", liftById);

module.exports = router;
