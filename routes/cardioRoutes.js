const express = require("express");
const {
  createCardio,
  cardioById,
  isOwner,
  isCreator,
  cardioByUser,
  singleCardio,
  updateCardio,
  deleteCardio
} = require("../controllers/cardio");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createCardioValidator } = require("../controllers/validator/index");

const router = express.Router();

// Create a cardio
router.post(
  "/cardio/new/:userId",
  requireSignin,
  createCardio,
  createCardioValidator
);

// Get cardio
router.get("/cardio/by/:userId", requireSignin, isOwner, cardioByUser);

router.get("/cardio/:cardioId", requireSignin, isCreator, singleCardio);

// Update cardio
router.put("/cardio/:cardioId", requireSignin, isCreator, updateCardio);

// Delete a cardio
router.delete("/cardio/:cardioId", requireSignin, isCreator, deleteCardio);

router.param("userId", userById);
router.param("cardioId", cardioById);

module.exports = router;
