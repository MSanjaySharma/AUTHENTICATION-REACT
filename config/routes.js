const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../app/middlewares/authentication");

const usersController = require("../app/controllers/usersController");
const usersValidator = require("./validators/usersValidator");
const { runValidation } = require("./validators");

router.post(
  "/users/signup",
  usersValidator.signup,
  runValidation,
  usersController.signup
);
router.post(
  "/users/signin",
  usersValidator.signin,
  runValidation,
  usersController.signin
);
router.get("/users/account", authenticateUser, usersController.account);
router.delete("/users/signout", authenticateUser, usersController.signout);

module.exports = router;
