const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  console.log(req.header("Authorization"));
  let tokenData;
  try {
    tokenData = jwt.verify(token, "secretkey");
    User.findById(tokenData._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (e) {
    res.json(e.message);
  }
};

// const authorizeUser = () => {

// }

module.exports = {
  authenticateUser,
};
