const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const liftSchema = new mongoose.Schema({
  name: {
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
    weight: {
      type: [Number],
      required: true
    },
    reps: {
      type: [Number],
      required: true
    },
    sets: {
      type: [Number],
      required: true
    }
  }
});

module.exports = mongoose.model("Lift", liftSchema);
