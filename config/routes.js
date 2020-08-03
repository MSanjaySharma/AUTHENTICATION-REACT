const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../app/middlewares/authentication");

const usersController = require("../app/controllers/usersController");
const customersController = require("../app/controllers/customersController");
const departmentsController = require("../app/controllers/departmentsController");
const employeesController = require("../app/controllers/employeesController");
const ticketsController = require("../app/controllers/ticketsController");

router.post("/users/registration", usersController.register);
router.post("/users/login", usersController.login);
router.get("/users/account", authenticateUser, usersController.account);
router.delete("/users/logout", authenticateUser, usersController.logout);

router.get("/customers", authenticateUser, customersController.list);
router.get("/customers/:id", authenticateUser, customersController.show);
router.post("/customers", authenticateUser, customersController.create);
router.put("/customers/:id", authenticateUser, customersController.update);
router.delete("/customers/:id", authenticateUser, customersController.delete);


module.exports = router;
