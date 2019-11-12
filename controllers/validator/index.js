exports.userSignupValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();
  // email is not null, valid and normalized
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000
    });
  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.createLiftValidator = (req, res, next) => {
  // name
  req.check("name", "Which exercise are you doing?").notEmpty();
  req
    .check("name", "Name of exercise must be 4 to 150 characters")
    .isLength({ min: 4, max: 150 });

  //check for errors
  const errors = req.validationErrors();
  // if error show the rirst one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.createBodyValidator = (req, res, next) => {
  // height
  req.check("height", "Enter a height").notEmpty();
  req.check("height", "Height must be a number").typeof(Number);

  // weight
  req.check("weight", "Enter a weight").notEmpty();

  // age
  req.check("age", "Enter your age").notEmpty();
  req.check("age", "Age must be a number").typeof(Number);

  //sex
  req.check("sex", "Enter your sex").notEmpty();
  req.check("sex", "Enter a valid sex").isLength({ min: 4, max: 6 });

  //check for errors
  const errors = req.validationErrors();
  // if error show the rirst one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
