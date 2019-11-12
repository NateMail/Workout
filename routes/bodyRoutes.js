const express = require("express");
const { createBody, bodyById } = require("../controllers/body");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createBodyValidator } = require("../controllers/validator");

const router = express.Router();

router.post(
  "/body/new/:userId",
  requireSignin,
  createBody,
  createBodyValidator
);

router.param("userId", userById);
router.param("bodyId", bodyById);

module.exports = router;
