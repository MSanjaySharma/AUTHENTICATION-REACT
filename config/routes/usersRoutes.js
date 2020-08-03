const express = require("express");

//controllers
const usersController = require("../../app/controllers/usersController");

//validators
const { runValidation } = require("../validators");
const usersValidator = require("../validators/usersValidator");

//middlewares
const { authenticateUser } = require("../../app/middlewares/authenticateUser");

const router = express.Router();

//REGISTER
router.post(
  "/register",
  usersValidator.register,
  runValidation,
  usersController.register
);

//LOGIN
router.post(
  "/login",
  usersValidator.login,
  runValidation,
  usersController.login
);

//LOGOUT
router.delete("/logout", authenticateUser, usersController.logout);

module.exports = router;
