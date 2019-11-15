const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cardioSchema = new mongoose.Schema({
  workoutName: {
    type: String,
    required: true
  },
  addedBy: {
    type: ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  work: {
    time: [
      {
        type: Number,
        required: true
      }
    ],
    distance: [
      {
        type: Number,
        required: true
      }
    ]
  },
  pace: Number
});

module.exports = mongoose.model("Cardio", cardioSchema);
