const Body = require("../models/body");
const formidable = require("formidable");

exports.createBody = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Body was not added"
      });
    }
    let body = new Body(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    body.addedBy = req.profile._id;
    body.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.bodyById = (req, res, next, id) => {
  Lift.findById(id).exec((error, body) => {
    if (error || !body) {
      return res.status(400).json({
        error: error
      });
    }
    req.body = body;
    next();
  });
};
