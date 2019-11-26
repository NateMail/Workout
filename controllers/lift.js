const Lift = require("../models/lift");
const formidable = require("formidable");
const _ = require("lodash");

exports.createLift = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Lift was not added"
      });
    }
    let lift = new Lift(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    lift.addedBy = req.profile._id;
    lift.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.liftById = (req, res, next, id) => {
  Lift.findById(id).exec((error, lift) => {
    if (error || !lift) {
      return res.status(400).json({
        error: error
      });
    }
    req.lift = lift;
    next();
  });
};

exports.isOwner = (req, res, next) => {
  let isOwner = req.lift && req.auth && req.lift.addedBy._id == req.auth._id;

  if (!isOwner) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.liftsByUser = (req, res) => {
  Lift.find({ addedBy: req.profile._id })
    .select("workoutName created weight reps sets _id")
    .sort("_created")
    .exec((error, lifts) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ lifts });
    });
};

exports.deleteLift = (req, res) => {
  let lift = req.lift;
  lift.remove((error, lift) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({
      message: "Lift deleted!"
    });
  });
};

exports.updateLift = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Lift could not be updated"
      });
    }
    let lift = req.lift;
    lift = _.extend(lift, fields);
    lift.updated = Date.now();
    lift.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(lift);
    });
  });
};
