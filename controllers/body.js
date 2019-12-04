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
    if (body.sex === "Female") {
      let weight = (body.weight[body.weight.length - 1] / 2.2) * 9.6;
      let height = body.height * 2.54 * 1.8;
      let age = body.age * 4.7;
      body.bmr = 655 + weight + height - age;
    } else if (body.sex === "Male") {
      let weight = (body.weight[body.weight.length - 1] / 2.2) * 13.7;
      let height = body.height * 2.54 * 5;
      let age = body.age * 6.8;
      body.bmr = 66 + weight + height - age;
    }
    body.tdee = body.bmr * body.activity;
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
  let isOwner = req.profile && req.auth && req.profile._id == req.auth._id;

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
    if (body.weightToPush > 0) {
      body.weight.push(body.weightToPush);
    }
    if (body.sex === "Female") {
      let weight = (body.weightToPush / 2.2) * 9.6;
      let height = body.height * 2.54 * 1.8;
      let age = body.age * 4.7;
      body.bmr = 655 + weight + height - age;
    } else if (body.sex === "Male") {
      let weight = (body.weightToPush / 2.2) * 13.7;
      let height = body.height * 2.54 * 5;
      let age = body.age * 6.8;
      body.bmr = 66 + weight + height - age;
    }
    body.tdee = body.bmr * body.activity;
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
    .select("_id height weight age sex bmr tdee")
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

exports.singleBody = (req, res) => {
  return res.json(req.body);
};

exports.isCreator = (req, res, next) => {
  let isCreator = req.body && req.auth && req.body.addedBy._id == req.auth._id;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};
