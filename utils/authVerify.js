const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function (req, res, next) {
  const bearer = req.header("authorization");
  const token = bearer.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const isVerfied = jwt.verify(token, process.env.JWT_SECRET);
    if (isVerfied) {
      next();
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};
