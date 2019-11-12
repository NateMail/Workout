const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bodySchema = new mongoose.Schema({
  addedBy: {
    type: ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: [Number],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  bmr: {
    type: Number
  },
  tdee: {
    type: Number
  }
});

module.exports = mongoose.model("Body", bodySchema);
