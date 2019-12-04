const express = require("express");
const {
  createLift,
  liftById,
  isCreator,
  isOwner,
  liftsByUser,
  singleLift,
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
router.get("/lift/by/:userId/", requireSignin, isOwner, liftsByUser);

router.get("/lift/:liftId", requireSignin, isCreator, singleLift);

// Update lifts
router.put("/lift/edit/:liftId", requireSignin, isCreator, updateLift);

// Delete a lift
router.delete("/lift/remove/:liftId", requireSignin, isCreator, deleteLift);

router.param("userId", userById);
router.param("liftId", liftById);

module.exports = router;
