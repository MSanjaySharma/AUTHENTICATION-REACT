const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../app/middlewares/authentication");

const usersController = require("../app/controllers/usersController");

router.post("/users/registration", usersController.register);
router.post("/users/login", usersController.login);
router.get("/users/account", authenticateUser, usersController.account);
router.delete("/users/logout", authenticateUser, usersController.logout);

module.exports = router;
