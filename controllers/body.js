const Body = require("../models/body");
const formidable = require("formidable");
const _ = require("lodash");

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
  Body.findById(id).exec((error, body) => {
    if (error || !body) {
      return res.status(400).json({
        error: error
      });
    }
    req.body = body;
    next();
  });
};

exports.isOwner = (req, res, next) => {
  let isOwner = req.body && req.auth && req.body.addedBy._id == req.auth._id;

  if (!isOwner) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.updateBody = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Body could not be updated"
      });
    }
    let body = req.body;
    console.log(body);
    body = _.extend(body, fields);
    body.updated = Date.now();
    body.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(body);
    });
  });
};

exports.userBody = (req, res) => {
  Body.find({ addedBy: req.profile._id })
    .populate("addedBy", "_id name")
    .select("_id height weight age sex")
    .sort("_created")
    .exec((error, body) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ body });
    });
};

exports.deleteBody = (req, res) => {
  let body = req.body;
  body.remove((error, body) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({
      message: "Body deleted!"
    });
  });
};
