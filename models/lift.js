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
    weight: [Number],
    reps: [Number],
    sets: [Number]
  }
});

module.exports = mongoose.model("Lift", liftSchema);
