const Cardio = require("../models/cardio");
const formidable = require("formidable");
const _ = require("lodash");

exports.createCardio = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Cardio was not added"
      });
    }
    let cardio = new Cardio(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    cardio.addedBy = req.profile._id;
    cardio.pace =
      cardio.time[cardio.time.length - 1] /
      cardio.distance[cardio.distance.length - 1];
    cardio.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.cardioById = (req, res, next, id) => {
  Cardio.findById(id).exec((error, cardio) => {
    if (error || !cardio) {
      return res.status(400).json({
        error: error
      });
    }
    req.cardio = cardio;
    next();
  });
};

exports.isOwner = (req, res, next) => {
  let isOwner =
    req.cardio && req.auth && req.cardio.addedBy._id == req.auth._id;

  if (!isOwner) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.cardioByUser = (req, res) => {
  Cardio.find({ addedBy: req.profile._id })
    .select("workoutName work _id")
    .sort("_created")
    .exec((error, cardios) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ cardios });
    });
};

exports.deleteCardio = (req, res) => {
  let cardio = req.cardio;
  cardio.remove((error, cardio) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({
      message: "cardio deleted!"
    });
  });
};

exports.updateCardio = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "cardio could not be updated"
      });
    }
    let cardio = req.cardio;
    cardio = _.extend(cardio, fields);
    cardio.updated = Date.now();
    cardio.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(cardio);
    });
  });
};
