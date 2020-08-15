const User = require("../models/user");

module.exports.signup = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      const { _id, username, email } = user;
      res.json({ _id, username, email });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.signin = (req, res) => {
  const body = req.body;
  let user;
  User.findByCredentials(body.email, body.password)
    .then((userFound) => {
      user = userFound;
      return user.generateToken();
    })
    .then((token) => {
      user = { _id: user._id, username: user.username, email: user.email };
      res.cookie("token", token, {
        expires: new Date(Date.now() + 2592000000),
        sameSite: true,
        httpOnly: true,
      });
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.account = (req, res) => {
  const { _id, username, email } = req.user;
  res.json({ _id, username, email });
};

module.exports.signout = (req, res) => {
  const { user, token } = req;
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(() => {
      res.clearCookie("token");
      res.json({ message: "successfully logged out" });
    })
    .catch((err) => {
      res.json(err);
    });
};
