const express = require("express");
const {
  createBody,
  bodyById,
  updateBody,
  isOwner,
  userBody,
  deleteBody
} = require("../controllers/body");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createBodyValidator } = require("../controllers/validator");

const router = express.Router();

// Create body
router.post(
  "/body/new/:userId",
  requireSignin,
  createBody,
  createBodyValidator
);

// Show body
router.get("/body/by/:userId/:bodyId", requireSignin, isOwner, userBody);

// Delete body
router.delete("/body/:bodyId", requireSignin, isOwner, deleteBody);

// Update body
router.put("/body/:bodyId", requireSignin, isOwner, updateBody);

router.param("userId", userById);
router.param("bodyId", bodyById);

module.exports = router;
