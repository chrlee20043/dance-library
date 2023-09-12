const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");

const authRequired = (req, res, next) => {
  const token = req.signedCookies.token;
  console.log("Cookie Token:", token);
  try {
    // verify token and secret, make sure token is valid
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
    return;
  }
  // allows server to keep running
  next();
};

module.exports = { authRequired };
