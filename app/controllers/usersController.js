const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const usersController = {};

usersController.register = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.json({
        error: "Email is taken",
      });
    } else {
      const body = req.body;
      const user = new User(body);
      bcryptjs.genSalt().then((salt) => {
        bcryptjs.hash(user.password, salt).then((encrypted) => {
          user.password = encrypted;
          user
            .save()
            .then(() => {
              res.json({ message: "Signup success! Please Signin" });
            })
            .catch((err) => {
              res.json(err);
            });
        });
      });
    }
  });
};

usersController.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email }).then((user) => {
    if (!user) {
      res.json({
        error: "invalid email or password",
      });
      return;
    } else {
      bcryptjs.compare(body.password, user.password).then((match) => {
        if (match) {
          const tokenData = {
            _id: user._id,
            email: user.email,
            username: user.username,
          };
          const token = jwt.sign(
            tokenData,
            process.env.JWT_SIGN_KEY || "secretkey",
            {
              expiresIn: "30d",
            }
          );
          res.cookie("token", token, { expiresIn: "30d" });
          res.json({ message: "login sucess" });
        } else {
          res.json({ error: "invalid email or password" });
        }
      });
    }
  });
};

usersController.logout = (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (user) {
        res.clearCookie("token");
        res.json({ message: "Logout success!" });
      } else {
        res.json({ error: "Logout error!" });
      }
    })
    .catch((err) => {
      res.json({ error: "Logout error!" });
    });
};

module.exports = usersController;
