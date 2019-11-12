const express = require("express");
const { createLift, liftById } = require("../controllers/lift");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createLiftValidator } = require("../controllers/validator");

const router = express.Router();

router.post(
  "/lift/new/:userId",
  requireSignin,
  createLift,
  createLiftValidator
);

router.param("userId", userById);
router.param("liftId", liftById);

module.exports = router;
