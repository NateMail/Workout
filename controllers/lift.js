const Lift = require("../models/lift");
const formidable = require("formidable");

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
    lift.addedBy = req.profile;
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
  Lift.findById(id).exec((error, post) => {
    if (error || !post) {
      return res.status(400).json({
        error: error
      });
    }
    req.post = post;
    next();
  });
};
