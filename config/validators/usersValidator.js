const { check } = require("express-validator");
const usersValidator = {};

usersValidator.signup = [
  //name
  check("username").not().isEmpty().withMessage("User Name is Required"),
  check("username")
    .isLength({ min: 5, max: 32 })
    .withMessage("Username is Restricted from 5 till 32 characters"),

  //email
  check("email").not().isEmpty().withMessage("Email is Required"),
  check("email").isEmail().withMessage("Enter a valid email address"),

  //password
  check("password").not().isEmpty().withMessage("Password is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  check("password")
    .isLength({ max: 128 })
    .withMessage("Password must be maximum 128 characters long"),
];

usersValidator.signin = [
  //email
  check("email").not().isEmpty().withMessage("Email is Required"),
  check("email").isEmail().withMessage("Enter a valid email address"),

  //password
  check("password").not().isEmpty().withMessage("Password is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  check("password")
    .isLength({ max: 128 })
    .withMessage("Password must be a maximum 128 characters long"),
];

module.exports = usersValidator;
