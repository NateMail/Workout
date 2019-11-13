const express = require("express");
const {
  createLift,
  liftById,
  isOwner,
  deleteLift
} = require("../controllers/lift");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createLiftValidator } = require("../controllers/validator");

const router = express.Router();

// Create a lift
router.post(
  "/lift/new/:userId",
  requireSignin,
  createLift,
  createLiftValidator
);

// Delete a lift
router.delete("/lift/:liftId", requireSignin, isOwner, deleteLift);

router.param("userId", userById);
router.param("liftId", liftById);

module.exports = router;
